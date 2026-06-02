export default function ConstellationLines({
  phase,
  stars,
  visible
}) {

  if (phase !== "final") return null;

  if (!visible) return null;

  return (
    <svg className="constellation">
      {stars.slice(0, -1).map((star, index) => (
        <line
          key={index}
          x1={`${star.finalX}%`}
          y1={`${star.finalY}%`}
          x2={`${stars[index + 1].finalX}%`}
          y2={`${stars[index + 1].finalY}%`}
        />
      ))}
    </svg>
  );
}