import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mountain,
  Menu,
  User,
  Heart,
  Plus,
  Globe,
  LogOut,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/contexts/ContentContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isLoggedIn, currentUser, logout, bookmarks } = useContent();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-10">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-bold text-xl text-foreground">
                  Ghumda <span className="text-secondary">Ghumdai</span>
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Travel Together
                </p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                }`
              }
            >
              {t("nav.about")}
            </NavLink>
            {/* {isLoggedIn && currentUser?.role === "admin" && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-secondary bg-secondary/10 shadow-sm"
                      : "text-secondary hover:text-secondary-foreground hover:bg-secondary/10"
                  }`
                }
              >
                Admin Panel
              </NavLink>
            )} */}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "np" : "en")}
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === "en" ? "नेपाली" : "English"}
            </Button>

            {isLoggedIn ? (
              <>
                <Button
                  onClick={() => navigate("/bookmarks")}
                  variant="ghost"
                  size="sm"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Bookmarks ({bookmarks.length})
                </Button>

                {currentUser?.role === "admin" && (
                  <Button variant="ghost" size="sm" onClick={() => navigate("/admin")} className="hover:translate-y-[-1px] transition-all">
                    Admin Panel
                  </Button>
                )}

                <Button variant="outline" size="sm" onClick={() => navigate("/add-content")}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    Hi, {currentUser?.email?.split("@")[0]}
                  </span>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button size="sm" variant="outline">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary-glow"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t("nav.signup")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <NavLink
                to="/"
                className={({ isActive }) => `px-2 py-1 rounded-md ${isActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-primary/5"}`}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => `px-2 py-1 rounded-md ${isActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-primary/5"}`}
              >
                {t("nav.about")}
              </NavLink>
              {isLoggedIn && currentUser?.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) => `px-2 py-1 rounded-md ${isActive ? "text-secondary bg-secondary/10" : "text-secondary hover:bg-secondary/10"}`}
                >
                  Admin Panel
                </NavLink>
              )}

              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => setLanguage(language === "en" ? "np" : "en")}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {language === "en" ? "नेपाली" : "English"}
                </Button>

                {isLoggedIn ? (
                  <>
                    <Button variant="ghost" size="sm" className="justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      Bookmarks ({bookmarks.length})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => navigate("/add-content")}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Content
                    </Button>
                    <div className="px-2 py-1 text-sm text-muted-foreground">
                      Hi, {currentUser?.email?.split("@")[0]}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start w-full"
                      >
                        {t("nav.login")}
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-primary to-primary-glow justify-start w-full"
                      >
                        <User className="h-4 w-4 mr-2" />
                        {t("nav.signup")}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
