import React, { useEffect, useState } from "react";
import "./CustomCursor.css";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };
    
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const hoverDetect = (e) => {
      const isInteractive = !!e.target.closest("a, button, [role='button'], input, textarea, select");
      setHover(isInteractive);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", hoverDetect);

    // Smooth following animation
    let animationFrame;
    const animate = () => {
      setPos(prev => ({
        x: prev.x + (targetPos.x - prev.x) * 0.18,
        y: prev.y + (targetPos.y - prev.y) * 0.18
      }));
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", hoverDetect);
      cancelAnimationFrame(animationFrame);
    };
  }, [targetPos]);

  return (
    <>
      <div
        className={`minimal-cursor-dot ${pressed ? "press" : ""} ${hover ? "hover" : ""}`}
        style={{ 
          left: `${targetPos.x}px`, 
          top: `${targetPos.y}px`
        }}
      />
      
      <div
        className={`minimal-cursor-outline ${hover ? "hover" : ""} ${pressed ? "press" : ""}`}
        style={{ 
          left: `${pos.x}px`, 
          top: `${pos.y}px`
        }}
      />
    </>
  );
};

export default CustomCursor;