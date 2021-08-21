export interface VideoGalleryProps {
  cards: any[];
  size?: number;
  page?: number;
  primarycolor?: string;
  pagechange?: () => void;
}

export const createVideoGallery = ({
  cards,
  size,
  page,
  primarycolor,
  pagechange,
}: VideoGalleryProps) => {
  const script = document.createElement("script");
  script.src =
    "http://localhost:6006/videogallery/dist/videogallerycomponent.js";
  document.body.appendChild(script);

  document.body.appendChild(script);
  const c = document.createElement("videogallery-bootstrap-component");
  c.setAttribute("cards", JSON.stringify(cards));
  if (size) {
    c.setAttribute("size", size.toString());
  }
  if (page) {
    c.setAttribute("page", page.toString());
  }
  if (primarycolor) {
    c.setAttribute("primarycolor", primarycolor);
  }
  c.addEventListener("pagechange", pagechange);

  return c;
};
