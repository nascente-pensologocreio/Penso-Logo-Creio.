// src/components/PageTransition.jsx
import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const timer = setTimeout(() => {
      if (isMounted) {
        setVisible(true);
      }
    }, 80);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`transition-all duration-[1600ms] ease-[cubic-bezier(0.25,1,0.3,1)] transform-gpu ${
        visible
          ? "opacity-100 translate-y-0 scale-100 blur-0"
          : "opacity-0 translate-y-8 scale-[1.02] blur-sm"
      }`}
    >
      {children}
    </div>
  );
}
