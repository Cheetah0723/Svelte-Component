export interface VideoModalProps {
  id: string;
  uri: string;
  item: string;
  title: string;
}

export const createVideoModal = ({ id, uri, item, title }: VideoModalProps) => {
  if (!document.getElementById("bootstrapvideomodalcomponentscript")) {
    const script = document.createElement("script");
    script.id = "bootstrapvideomodalcomponentscript";
    script.src =
      "http://localhost:6006/bootstrapvideomodal/dist/bootstrapvideomodalcomponent.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("bootstrap-videomodal-component");
    c.id = id;
  }
  if (uri) {
    c.setAttribute("uri", uri);
  } else {
    if (c.hasAttribute("uri")) c.removeAttribute("uri");
  }
  if (item) {
    c.setAttribute("item", item);
  } else {
    if (c.hasAttribute("item")) c.removeAttribute("item");
  }
  if (title) {
    c.setAttribute("title", title);
  } else {
    if (c.hasAttribute("title")) c.removeAttribute("title");
  }
  return c;
};
