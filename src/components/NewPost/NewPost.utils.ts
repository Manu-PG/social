export const getCountColor = (count?: number) => {
  if (count === undefined) return "#666";
  if (count <= 0) return "red";
  if (count < 30) return "yellow";
  return "#666";
};
