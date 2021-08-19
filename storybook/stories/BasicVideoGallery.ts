export interface VideoGalleryProps {
  cards: any[];
  size?: number;
  page?: number;
  primarycolor?: string;
}

export const createVideoGallery = ({
  cards,
  size,
  page,
  primarycolor,
}: VideoGalleryProps) => {
  const script = document.createElement("script");
  script.src =
    "http://localhost:6006/videogallery/dist/videogallerycomponent.js";
  document.body.appendChild(script);

  let html = `<videogallery-bootstrap-component cards='${JSON.stringify(
    cards
  )}'`;
  if (size) {
    html += ` size='${size.toString()}'`;
  }
  if (page) {
    html += ` page='${page.toString()}'`;
  }
  if (primarycolor) {
    html += ` primarycolor='${primarycolor.toString()}'`;
  }
  html += "></videogallery-bootstrap-component>";

  return html;
};
