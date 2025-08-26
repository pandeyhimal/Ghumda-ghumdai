import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { ContentItem } from "@/data/mockData";
import { toast } from "sonner";
import { API_BASE } from "@/lib/utils";

interface SearchFilters {
  keyword: string;
  province: string;
  district: string;
  municipality: string;
  category: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  } | null;
  radius?: number;
}

interface User {
  _id: string;
  email: string;
  bookmarks: string[];
  role?: "user" | "admin";
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
  login: (email: string, password: string) => Promise<{ error?: string; user?: User | null }>;
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
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] =
    useState<ContentItem[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    keyword: "",
    province: "",
    district: "",
    municipality: "",
    category: "",
    location: null,
    radius: 10
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

  // Fetch content from backend on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/content`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to fetch content");

        const mapped: ContentItem[] = (Array.isArray(data) ? data : []).map((item) => ({
          id: item._id ?? item.id ?? "",
          title: item.title ?? "",
          description: item.description ?? "",
          fullDescription: item.fullDescription ?? "",
          category: item.category,
          province: item.province ?? "",
          district: item.district ?? "",
          municipality: item.municipality ?? "",
          ward: item.ward ?? "",
          image: item.image ?? "",
          images: Array.isArray(item.images) ? item.images : [],
          rating: typeof item.rating === "number" ? item.rating : 0,
          reviewCount: typeof item.reviewCount === "number" ? item.reviewCount : 0,
          location: item.location ?? null,
          tips: Array.isArray(item.tips) ? item.tips : [],
          bestTime: item.bestTime ?? "",
          price: item.price ?? "",
          difficulty: item.difficulty ?? "",
        }));

        // Attach auxiliary fields for detail page via a parallel map
        const auxById = new Map<string, { authorName: string; createdAt?: string }>();
        (Array.isArray(data) ? data : []).forEach((item) => {
          const key = (item._id ?? item.id ?? "") as string;
          auxById.set(key, {
            authorName: item?.author?.fullName || "",
            createdAt: item?.createdAt,
          });
        });

        const withMeta = mapped.map((m) => ({
          ...m,
          _meta: auxById.get(m.id) || { authorName: "", createdAt: undefined },
        })) as Array<ContentItem & { _meta: { authorName: string; createdAt?: string } }>;

        // Store with metadata so detail page can read it via type assertion
        setContent(withMeta as unknown as ContentItem[]);
        setFilteredContent(withMeta as unknown as ContentItem[]);
      } catch (e) {
        const err = e as { message?: string };
        toast(err?.message || "Failed to load content");
      }
    };

    fetchContent();
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    let results = [...content];

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      results = results.filter((item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.fullDescription.toLowerCase().includes(keyword)
      );
    }

    if (filters.district && filters.district !== "all") {
      results = results.filter(
        (item) => item.district.toLowerCase() === filters.district.toLowerCase()
      );
    }

    if (filters.municipality && filters.municipality !== "all") {
      results = results.filter(
        (item) => item.municipality.toLowerCase() === filters.municipality.toLowerCase()
      );
    }

    if (filters.category && filters.category !== "all") {
      results = results.filter((item) => item.category === filters.category);
    }

    if (filters.location && filters.radius && filters.radius > 0) {
      results = results.filter((item) => {
        if (!item.location) return false;
        const distance = calculateDistance(
          filters.location!.lat,
          filters.location!.lng,
          item.location.lat,
          item.location.lng
        );
        return distance <= (filters.radius as number);
      });
    }

    setFilteredContent(results);
  };

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 100) / 100;
  }

  function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
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
        return { user: data.user };
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
      const res = await fetch(`${API_BASE}/api/auth/register`, {
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

    console.log("ContentContext: Sending content to backend:", newContent);
    console.log("ContentContext: Location data:", newContent.location);

    const res = await fetch(`${API_BASE}/api/content`, {
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
        url = `${API_BASE}/api/users/${userId}/bookmarks/${contentId}`;
        method = "DELETE";
        body = undefined;
      } else {
        // Add bookmark
        url = `${API_BASE}/api/users/${userId}/bookmarks`;
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