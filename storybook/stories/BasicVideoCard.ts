export interface VideoCardProps {
  videosrc: string;
  title?: string;
  description?: string;
  time?: string;
}

export const createVideoCard = ({
  videosrc,
  title,
  description,
  time,
}: VideoCardProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/videocard/dist/videocardbootstrap.js";

  document.body.appendChild(script);

  let html = `<videocardbootstrap-component videosrc='${videosrc}'`;
  if (title) {
    html += ` title='${title}'`;
  }
  if (description) {
    html += ` description='${description}'`;
  }
  if (time) {
    html += ` time='${time.toString()}'`;
  }
  html += "></videocardbootstrap-component>";

  return html;
};
