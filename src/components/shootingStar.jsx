import { useState, useEffect } from "react";
import heroImg from "../assets/hero.png";

export default function ShootingStar() {
  const [state, setState] = useState("flying"); // "flying" | "floating" | "clicked"
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (state === "flying") {
      // After flight animation completes (2.5s), transition to floating
      const timer = setTimeout(() => {
        setState("floating");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  if (closed) return null;

  const handleClick = (e) => {
    e.stopPropagation();
    setState("clicked");
  };

  return (
    <>
      <div 
        className={`shooting-star-container ${state}`}
        onClick={handleClick}
      >
        <div className="star-avatar-wrapper">
          <img src={heroImg} alt="Him" className="star-avatar-img" />
          <div className="star-avatar-glow" />
          {state === "flying" && <div className="star-tail" />}
        </div>
      </div>

      {state === "clicked" && (
        <div className="whimsical-modal-overlay" onClick={() => setState("floating")}>
          <div className="whimsical-card" onClick={(e) => e.stopPropagation()}>
            <div className="whimsical-sparkles">
              <span className="sparkle s1">✨</span>
              <span className="sparkle s2">💖</span>
              <span className="sparkle s3">⭐</span>
              <span className="sparkle s4">💫</span>
              <span className="sparkle s5">🌸</span>
              <span className="sparkle s6">🎈</span>
              <span className="sparkle s7">🎉</span>
              <span className="sparkle s8">✨</span>
            </div>
            
            <div className="whimsical-avatar-container">
              <img src={heroImg} alt="Him" className="whimsical-avatar-large" />
              <div className="whimsical-avatar-glow" />
            </div>

            <h3 className="whimsical-title">Make a Wish! ✨</h3>
            <p className="whimsical-message">
              "I'm so glad you caught me! May all your days be filled with starry magic, cozy moments, and endless happiness." 💫❤️
            </p>

            <button className="close-whimsical-btn" onClick={() => setState("floating")}>
              Keep Wishing ✦
            </button>
          </div>
        </div>
      )}
    </>
  );
}