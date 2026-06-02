import { useState, useEffect } from "react";
import "./App.css";

import Star from "./components/stars";
import NoteCard from "./components/noteCard";
import BackgroundStar from "./components/backGroundStars";
// import ShootingStar from "./components/shootingStar";
import ConstellationLines from "./components/constellationLines";
import { messages, finalMessages } from "./data/messages";
import heroImg from "./assets/hero.png";

const stars = [
  // top arc
  {
    x: 12,
    y: 18,
    size: 14,
    finalX: 65,
    finalY: 24
  },

  {
    x: 75,
    y: 16,
    size: 14,
    finalX: 52,
    finalY: 13
  },

  {
    x: 20,
    y: 40,
    size: 14,
    finalX: 42,
    finalY: 21
  },

  // right side
  {
    x: 35,
    y: 55,
    size: 14,
    finalX: 33,
    finalY: 30
  },

  // inner G stroke
  {
    x: 60,
    y: 30,
    size: 14,
    finalX: 38,
    finalY: 44
  },

  {
    x: 82,
    y: 42,
    size: 14,
    finalX: 43,
    finalY: 58
  },

  // bottom arc
  {
    x: 30,
    y: 76,
    size: 14,
    finalX: 48,
    finalY: 72
  },

  {
    x: 76,
    y: 72,
    size: 14,
    finalX: 67,
    finalY: 66
  },

  // left side
  {
    x: 60,
    y: 60,
    size: 14,
    finalX: 67,
    finalY: 48
  },

  {
    x: 15,
    y: 62,
    size: 14,
    finalX: 56,
    finalY: 48
  }
];

// export const constellationStars = [
//   { finalX: 45, finalY: 20 },
//   { finalX: 52, finalY: 18 },
//   { finalX: 60, finalY: 20 },
//   { finalX: 66, finalY: 28 },
//   { finalX: 66, finalY: 40 },
//   { finalX: 58, finalY: 40 },
//   { finalX: 52, finalY: 40 },
//   { finalX: 40, finalY: 30 },
//   { finalX: 36, finalY: 42 },
//   { finalX: 40, finalY: 55 },
//   { finalX: 46, finalY: 62 },
//   { finalX: 54, finalY: 62 },
//   { finalX: 62, finalY: 60 },
//   { finalX: 64, finalY: 50 },
//   { finalX: 60, finalY: 50 },
//   { finalX: 58, finalY: 45 }
// ];

const backgroundStars = Array.from(
  { length: 120 },
  (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size:
      Math.random() < 0.8
        ? 2
        : Math.random() < 0.95
        ? 3
        : 4
  })
);

export default function App() {
  const [discovered, setDiscovered] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [phase, setPhase] = useState("explore");
  const [showPhotoInMoon, setShowPhotoInMoon] = useState(false);
  const [fadePhotoInMoon, setFadePhotoInMoon] = useState(false);
  const [moonGlows, setMoonGlows] = useState(false);
  const [linesVisible, setLinesVisible] = useState(true);
  const [finalMessage, setFinalMessage] = useState("");
  const [showIntroCard, setShowIntroCard] = useState(true);

  const startSequence = () => {
  setPhase("pause");

  setTimeout(() => {
    setPhase("glow");
  }, 500);

  setTimeout(() => {
    setPhase("forming");
  }, 2500);

  setTimeout(() => {
    setPhase("final");
  }, 6500);

  setTimeout(() => {
    document.body.classList.add("full-moon");
  }, 500);

  setShowPhotoInMoon(true);
  setFinalMessage(finalMessages[0]);

  setTimeout(() => {
    setFadePhotoInMoon(true);
    setMoonGlows(true);
  }, 4000);

  setTimeout(() => {
    setLinesVisible(false);
  }, 5000);

  setTimeout(() => {
  console.log("LINES OFF");
  setLinesVisible(false);
}, 11000);
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntroCard(false);
    }, 5000);

    if (discovered.length === 10) {
      startSequence();
    }
  }, [discovered]);

  const handleStarClick = (index) => {

  if (discovered.includes(index)) return;

  setDiscovered(prev => [...prev, index]);

  setActiveNote({
    id: index,
    message: messages[index],
    x: stars[index].x + 2,
    y: stars[index].y - 5
  });

  setTimeout(() => {
    setActiveNote(null);
  }, 4000);
};

  return (
    <div className={`sky ${phase}`}>
      {
        showIntroCard && (
          <div className="intro-card">
            <div className="intro-star">✦</div>

            <p>Some stars are hiding little messages.</p>

            <span>Find them all.</span>
          </div>
        )
      }
      <ConstellationLines
        phase={phase}
        visible={linesVisible}
        stars={stars}
      />
      <div className={`moon ${moonGlows ? "glow-active" : ""}`}>
  
        {showPhotoInMoon && (
          <img
            src={heroImg}
            alt=""
            className={`moon-photo ${
              fadePhotoInMoon ? "fade-out" : ""
            }`}
          />
        )}
        {!showPhotoInMoon && (
          <div
            className="moon-shadow"
            style={{
              left: `${discovered.length * 7}px`
            }}
          />
        )}
      </div>  
      {backgroundStars.map(star => (
        <BackgroundStar
          key={star.id}
          x={star.x}
          y={star.y}
          size={star.size}
        />
      ))}
      {stars.map((star, index) => (
        <Star
          key={index}
          index={index}
          x={star.x}
          y={star.y}
          finalX={star.finalX}
          finalY={star.finalY}
          phase={phase}
          discovered={discovered.includes(index)}
          onClick={() => handleStarClick(index)}
        />
      ))}
      {/* {
        showConstellation &&
        constellationStars.map((star, index) => (
          <div
            key={index}
            className="constellation-star"
            style={{
              left: `${star.finalX}%`,
              top: `${star.finalY}%`
            }}
          >
            ✦
          </div>
        ))
      } */}

      {
        activeNote && (
          <NoteCard
            message={activeNote.message}
            x={activeNote.x}
            y={activeNote.y}
          />
        )
      }
      {/* {
        showShootingStar &&
        <ShootingStar />
      } */}
      {
        discovered.length === 10 ? (
          <div className="bottom-message">
            {finalMessage}
          </div>
        ) : (
          <div className="progress">
            {discovered.length} little discoveries
          </div>
        )
      }
    </div>
  );
}