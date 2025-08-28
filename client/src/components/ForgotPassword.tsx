import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleRequestOTP = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        // setMessage(data.message);
        toast({
          title: data.message || "OTP sent successfully!",
          description: "Please check your email for the OTP.",
          variant: "default",
        });
        setOtpTimer(300);
      } else
        toast({
          title: "Something went wrong",
          description: data.message || "Please try again.",
          variant: "destructive",
        });
    } catch {
      toast({
        title: "Network error",
        description: "Something went wrong with network.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(3);
        // setMessage(data.message);
        toast({
          title: data.message || "OTP verified successfully!",
          description: "You can now reset your password.",
          variant: "default",
        });
      } else
        toast({
          title: "Invalid OTP",
          description: data.message || "Please try again.",
          variant: "destructive",
        });
    } catch {
      toast({
        title: "Network error",
        description: "Something went wrong with network.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      });
      return; // Stop execution
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        toast({
          title: data.message || "Password reset successfully!",
          description: "You can now log in with your new password.",
          variant: "default",
        });
        setTimeout(() => navigate("/login"), 1500); // Redirect to login
      } else {
        toast({
          title: "Failed to reset password",
          description: data.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Network error",
        description: "Something went wrong with network.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("OTP resent successfully!");
        toast({
          title: "OTP resent successfully!",
          description: "Something went wrong with network.",
          variant: "default",
        });
        setOtpTimer(300);
      } else
        toast({
          title: "Failed to resend OTP",
          description: data.message || "Please try again.",
          variant: "destructive",
        });
    } catch {
      toast({
        title: "Network error",
        description: "Something went wrong with network.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="max-w-md w-full mx-auto mt-12 p-8 bg-white shadow-lg rounded-xl ">
      {message && <p className="mb-4 text-sm text-red-600">{message}</p>}

      <AnimatePresence>
        {step === 1 && (
          <motion.div
            key="step1"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.3 }}
            className="relative space-y-6 p-3"
          >
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Forgot Your Password?
              </h2>
              <p className="text-gray-500 text-sm">
                Enter your email address below and we’ll send you a 4-digit OTP
                to reset your password.
              </p>
            </div>

            {/* Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                {/* Mail Icon (Heroicons / Lucide) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12H8m0 0l-4 4m4-4l-4-4m12 8l4-4m-4 4l4-4"
                  />
                </svg>
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Info */}
            <p className="text-xs text-gray-400">
              Make sure you enter the email associated with your account. We’ll
              send an OTP valid for 5 minutes.
            </p>

            {/* Button */}
            <button
              onClick={handleRequestOTP}
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Send OTP"}
            </button>

            {/* Optional small note */}
            <p className="text-center text-sm text-gray-300 mt-2">
              Need help? Contact{" "}
              <a
                href="mailto:contact.ghumdaghumdai@gmail.com"
                className="text-blue-500 hover:underline"
              >
                Support
              </a>
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.3 }}
            className="space-y-6 bg-white p-3"
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">Enter OTP</h2>
              <p className="text-gray-500 text-sm">
                We’ve sent a 4-digit OTP to{" "}
                <span className="font-medium">{email}</span>. Enter it below to
                reset your password.
              </p>
              {/* <p className="text-gray-400 text-xs">
                OTP expires in:{" "}
                <span className="font-semibold text-blue-600">
                  {formatTimer(otpTimer)}
                </span>
              </p> */}
            </div>

            {/* OTP Input */}
            <input
              type="text"
              placeholder="Enter 4-digit OTP"
              className="w-full border border-gray-300 p-3 rounded-lg text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
            />

            {/* Timer & Resend */}
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                OTP expires in:{" "}
                <span className="font-medium">{formatTimer(otpTimer)}</span>
              </span>
              <button
                onClick={handleResendOTP}
                disabled={loading || otpTimer > 0}
                className={`text-blue-600 hover:underline ${
                  loading || otpTimer > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Resend OTP
              </button>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition-all duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={stepVariants}
            transition={{ duration: 0.3 }}
            className="space-y-6 bg-white p-3"
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">
                Reset Password
              </h2>
              <p className="text-gray-500 text-sm">
                Enter your new password below. Make sure it’s strong and
                memorable.
              </p>
            </div>

            {/* New Password Input */}
            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            {/* Confirm Password Input */}
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Reset Button */}
            <button
              onClick={handleResetPassword}
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition-all duration-200 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Reset Password"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
