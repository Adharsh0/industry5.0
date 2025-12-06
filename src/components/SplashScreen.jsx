import { useEffect } from "react";
import "./SplashScreen.css";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.add("loaded");
    }, 2500); // splash duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="splash-screen">
      <img
        src="logosp.png"
        alt="Logo"
        className="splash-logo"
      />
      
    </div>
  );
}
