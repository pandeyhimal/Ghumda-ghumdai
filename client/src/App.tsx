import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContentProvider } from "@/contexts/ContentContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContentDetail from "./pages/ContentDetail";
import NotFound from "./pages/NotFound";
import { Bookmarks } from "./pages/Bookmarks";
import SocialLogin from "./components/SocialLogin";
import Layout from "./components/Layout";
import  {ScrollToTop}  from "../utils/ScrolltoTop";
import AddContent from "./pages/AddContent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <ContentProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <ScrollToTop />
            <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/add-content" element={<AddContent />} />
              <Route path="/content/:title" element={<ContentDetail />} />
              {/* social login callback handler */}
              <Route path="/auth/callback" element={<SocialLogin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ContentProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
