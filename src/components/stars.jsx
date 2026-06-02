export default function Star({
  x,
  y,
  finalX,
  finalY,
  phase,
  index,
  discovered,
  onClick
}) {
  return (
    <div
      className={`star ${
        discovered ? "found" : ""
      }`}
      onClick={onClick}
      style={{
        left:
          phase === "forming" ||
          phase === "final"
            ? `${finalX}%`
            : `${x}%`,

        top:
          phase === "forming" ||
          phase === "final"
            ? `${finalY}%`
            : `${y}%`,

        transitionDelay:
          phase === "forming"
            ? `${index * 0.15}s`
            : "0s"
      }}
    >
      {discovered ? "✦" : "stars"}
    </div>
  );
}