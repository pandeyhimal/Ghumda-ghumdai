import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SocialLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/");
    }
  }, [navigate]);

  return <p>Logging you in...</p>;
}
