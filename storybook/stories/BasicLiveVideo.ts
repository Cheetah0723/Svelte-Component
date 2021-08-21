export interface VideoCardProps {
  mediauri: string;
  width?: number;
  height?: number;
}

export const createVideoCard = ({
  mediauri,
  width,
  height,
}: VideoCardProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/liveplayer/dist/liveplayer.js";

  document.body.appendChild(script);

  const c = document.createElement("liveplayer-component");

  c.setAttribute("mediauri", mediauri.toString());
  if (width) c.style.maxWidth = `${width}px`;
  if (height) c.style.maxHeight = `${height}px`;
  if (width) c.style.width = `${width}px`;
  if (height) c.style.height = `${height}px`;
  if (width || height) c.style.display = "block";

  return c;
};
