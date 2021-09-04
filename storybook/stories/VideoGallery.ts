export interface VideoGalleryProps {
  id: string;
  cards: any[];
  size?: number;
  page?: number;
  primarycolor?: string;
  pagechange?: () => void;
}

export const createVideoGallery = ({
  id,
  cards,
  size,
  page,
  primarycolor,
  pagechange,
}: VideoGalleryProps) => {
  if (!document.getElementById("videogallerycomponentscript")) {
    const script = document.createElement("script");
    script.id = "videogallerycomponentscript";
    script.src =
      "http://localhost:6006/videogallery/dist/videogallerycomponent.js";

    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("videogallery-bootstrap-component");
    c.id = id;
    c.addEventListener("pagechange", pagechange);
  }

  c.setAttribute("cards", JSON.stringify(cards));
  if (size) {
    c.setAttribute("size", size.toString());
  } else {
    if (c.hasAttribute("size")) c.removeAttribute("size");
  }
  if (page) {
    c.setAttribute("page", page.toString());
  } else {
    if (c.hasAttribute("page")) c.removeAttribute("page");
  }
  if (primarycolor) {
    c.setAttribute("primarycolor", primarycolor);
  } else {
    if (c.hasAttribute("primarycolor")) c.removeAttribute("primarycolor");
  }

  return c;
};
