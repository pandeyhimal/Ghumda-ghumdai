import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mountain, Eye, EyeOff, Github, Facebook, Mail } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContent();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await login(email, password);
    setIsLoading(false);

    if (result.error) {
      toast({
        title: "Login failed",
        description: result.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login successful!",
        description: "Welcome back to Ghumda Ghumdai",
      });
      const role = result.user?.role;
      navigate(role === "admin" ? "/admin" : "/");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20">
      <main className="pt-20 pb-12 flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="shadow-[var(--shadow-card)]">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Mountain className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">Ghumda Ghumdai</span>
              </div>
              <CardTitle className="text-2xl">{t("nav.login")}</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-2 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-2 focus:border-primary pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary-glow"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>

                <div className="flex items-center gap-2 w-full">
                  <div className="flex-1 h-px bg-muted-foreground/30"></div>
                  <span className="text-xs text-muted-foreground">
                    or continue with
                  </span>
                  <div className="flex-1 h-px bg-muted-foreground/30"></div>
                </div>

                <div className="flex flex-col space-y-2 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      (window.location.href =
                        "http://localhost:5000/api/auth/google")
                    }
                  >
                    <Mail className="mr-2 h-4 w-4" /> Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      (window.location.href =
                        "http://localhost:5000/api/auth/github")
                    }
                  >
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      (window.location.href =
                        "http://localhost:5000/api/auth/facebook")
                    }
                  >
                    <Facebook className="mr-2 h-4 w-4" /> Facebook
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo credentials:</p>
            <p>Email: demo@ghumdaghumdai.com | Password: demo123</p>
          </div>
        </div>
      </main>
    </div>
  );
}
