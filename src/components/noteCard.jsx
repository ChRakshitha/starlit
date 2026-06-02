export default function NoteCard({
  message,
  x,
  y
}) {
  return (
    <div
      className="note"
      style={{
        left: `${x}%`,
        top: `${y}%`
      }}
    >
      {message}
    </div>
  );
}