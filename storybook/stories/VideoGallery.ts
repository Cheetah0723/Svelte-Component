interface IRestApi {}
import pkg from "../../lerna.json";
export interface VideoGalleryProps {
  id: string;
  cards: any[];
  size?: number;
  page?: number;
  externalfilter?: boolean;
  primarycolor?: string;
  dateFilterVideos?: (e) => void;
  textFilterVideos?: (e) => void;
  pagechange?: (e) => void;
}

export const createVideoGallery = ({
  id,
  cards,
  size,
  page,
  primarycolor,
  externalfilter,
  pagechange,
  textFilterVideos,
  dateFilterVideos,
}: VideoGalleryProps) => {
  if (!document.getElementById("videogallerycomponentscript")) {
    const script = document.createElement("script");
    script.id = "videogallerycomponentscript";
    if (window.location.href.includes("localhost")) {
      script.src =
        "http://localhost:6006/videogallery/dist/videogallerycomponent.js";
    } else {
      script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/videogallerybootstrap-component@${pkg.version}/release/videogallerycomponent.js`;
    }

    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("videogallery-bootstrap-component");
    c.id = id;
    c.addEventListener("pagechange", (p: any) => pagechange(p.detail));
    c.addEventListener("textFilterVideos", (p: any) =>
      textFilterVideos(p.detail)
    );
    c.addEventListener("dateFilterVideos", (p: any) =>
      dateFilterVideos(p.detail)
    );
  }

  if (cards) {
    c.setAttribute("cards", JSON.stringify(cards));
  } else {
    if (c.hasAttribute("cards")) c.removeAttribute("cards");
  }

  if (externalfilter) {
    c.setAttribute("externalfilter", "yes");
  } else {
    if (c.hasAttribute("externalfilter")) c.removeAttribute("externalfilter");
  }
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
