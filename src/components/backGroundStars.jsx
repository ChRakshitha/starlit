export default function BackgroundStar({ x, y, size }) {
  return (
    <div
      className="background-star"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`
      }}
    />
  );
}