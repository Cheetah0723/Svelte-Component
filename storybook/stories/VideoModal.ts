export interface VideoModalProps {
  id: string;
  uri: string;
  elementid: string;
  videotitle: string;
}

export const createVideoModal = ({
  id,
  uri,
  elementid,
  videotitle,
}: VideoModalProps) => {
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
  if (elementid) {
    c.setAttribute("elementid", elementid);
  } else {
    if (c.hasAttribute("elementid")) c.removeAttribute("elementid");
  }
  if (videotitle) {
    c.setAttribute("videotitle", videotitle);
  } else {
    if (c.hasAttribute("videotitle")) c.removeAttribute("videotitle");
  }
  return c;
};
