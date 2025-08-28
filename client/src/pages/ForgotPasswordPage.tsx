import { Header } from "@/components/Header";
import ForgotPassword from "@/components/ForgotPassword";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex flex-col">
      <Header minimal /> 
      <div className="flex-1 flex items-center justify-center">
        <ForgotPassword />
      </div>
    </div>
  );
}
