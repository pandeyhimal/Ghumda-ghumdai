import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ContentItem, mockContent, searchContent } from "@/data/mockData";
import { toast } from "sonner";

interface SearchFilters {
  keyword: string;
  province: string;
  district: string;
  municipality: string;
  category: string;
}

interface User {
  _id: string;
  email: string;
  bookmarks: string[];
}

interface ValidationErrorItem { field: string; message: string }

interface AddContentPayload { [key: string]: unknown }

interface ContentContextType {
  content: ContentItem[];
  filteredContent: ContentItem[];
  searchFilters: SearchFilters;
  bookmarks: string[];
  isLoggedIn: boolean;
  currentUser: User | null;
  searchContent: (filters: SearchFilters) => void;
  toggleBookmark: (contentId: string) => Promise<void>;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ error?: string }>;
  addContent: (payload: AddContentPayload) => Promise<unknown>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content] = useState<ContentItem[]>(mockContent);
  const [filteredContent, setFilteredContent] =
    useState<ContentItem[]>(mockContent);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    keyword: "",
    province: "",
    district: "",
    municipality: "",
    category: "",
  });

  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ghumda-user");
    const token = localStorage.getItem("ghumda-token");

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
      setIsLoggedIn(true);
      setBookmarks(parsedUser.bookmarks || []);
    }
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    const results = searchContent(filters);
    setFilteredContent(results);
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.token) {
        localStorage.setItem("ghumda-token", data.token);
        localStorage.setItem("ghumda-user", JSON.stringify(data.user));
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        setBookmarks(data.user.bookmarks || []);
        return {};
      } else {
        return { error: data.error || "Login failed" };
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      return { error: e?.message || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("ghumda-token");
    localStorage.removeItem("ghumda-user");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setBookmarks([]);
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token + user if provided
        if (data.token) {
          localStorage.setItem("ghumda-token", data.token);
        }
        if (data.user) {
          localStorage.setItem("ghumda-user", JSON.stringify(data.user));
        }
        return { user: data.user, token: data.token };
      } else {
        return { error: data.error || data.message || "Registration failed" };
      }
    } catch (err: unknown) {
      const e = err as { message?: string };
      return { error: e?.message || "Registration failed" };
    }
  };

  const addContent = async (newContent: AddContentPayload) => {
    const token = localStorage.getItem("ghumda-token");
    if (!token) throw new Error("Not authenticated");

    const res = await fetch("http://localhost:5000/api/content", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContent),
    });

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { message?: string; errors?: ValidationErrorItem[] };
      if (res.status === 422 && Array.isArray(err?.errors)) {
        const error = new Error(err.message || "Validation failed") as Error & { type?: string; errors?: ValidationErrorItem[] };
        error.type = "validation";
        error.errors = err.errors;
        throw error;
      }
      throw new Error(err.message || "Failed to add content");
    }
    return res.json();
  };

  const toggleBookmark = async (contentId: string) => {
    if (!isLoggedIn || !currentUser) {
      toast("Please login to bookmark content");
      return;
    }

    const token = localStorage.getItem("ghumda-token");
    if (!token) {
      toast("Login token missing. Please login again.");
      return;
    }

    const isBookmarked = bookmarks.includes(contentId);
    const userId = currentUser._id;

    try {
      let url: string;
      let method: string;
      let body: string | undefined;

      if (isBookmarked) {
        // Remove bookmark
        url = `http://localhost:5000/api/users/${userId}/bookmarks/${contentId}`;
        method = "DELETE";
        body = undefined;
      } else {
        // Add bookmark
        url = `http://localhost:5000/api/users/${userId}/bookmarks`;
        method = "POST";
        body = JSON.stringify({ contentId });
      }

      console.log(`Making ${method} request to:`, url);
      console.log("With body:", body);
      console.log("User ID:", userId);
      console.log("Content ID:", contentId);

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      const data = await res.json();
      console.log("Response data:", data);

      if (res.ok) {
        // Handle successful response
        const updatedBookmarks = data.bookmarks || data.user?.bookmarks || [];
        setBookmarks(updatedBookmarks);
        
        const updatedUser = { ...currentUser, bookmarks: updatedBookmarks };
        setCurrentUser(updatedUser);
        
        localStorage.setItem("ghumda-user", JSON.stringify(updatedUser));
        
        toast(isBookmarked ? "Bookmark removed" : "Bookmark added");
      } else {
        // Handle error response
        const errorMessage = data.message || data.error || "Failed to update bookmark";
        console.error("Bookmark error:", errorMessage);
        console.error("Full error response:", data);
        toast(errorMessage);
      }
    } catch (err) {
      console.error("Error toggling bookmark:", err);
      toast("Network error while updating bookmark");
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        filteredContent,
        searchFilters,
        bookmarks,
        isLoggedIn,
        currentUser,
        searchContent: handleSearch,
        toggleBookmark,
        login,
        logout,
        register,
        addContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context)
    throw new Error("useContent must be used within a ContentProvider");
  return context;
};