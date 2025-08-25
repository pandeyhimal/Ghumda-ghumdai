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
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isLoggedIn, currentUser, logout, bookmarks } = useContent();
  const navigate = useNavigate();

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
                  Ghumda <span className="text-pink-500">Ghumdai</span>
                </h1>
                <p className="text-xs text-muted-foreground -mt-1">
                  Travel Together
                </p>
              </div>
            </Link>

            {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t("search.keyword.placeholder")}
              className="max-w-2xl pl-10 border-2 border-gray-700 focus:border-primary"
              // value={filters.keyword}
              // onChange={(e) => handleKeywordChange(e.target.value)}
            />
          </div> */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              {t("nav.about")}
            </Link>
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

                <Button variant="outline" size="sm">
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
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors px-2 py-1"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary transition-colors px-2 py-1"
              >
                {t("nav.about")}
              </Link>

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
