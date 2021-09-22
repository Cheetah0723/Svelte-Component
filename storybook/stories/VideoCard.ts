import moment from "moment";
export interface VideoCardProps {
  id: string;
  videosrc: string;
  title?: string;
  description?: string;
  time?: string;
  provider?: "youtube";
}

export const createVideoCard = ({
  id,
  videosrc,
  title,
  description,
  time,
  provider,
}: VideoCardProps) => {
  if (!document.getElementById("videocardbootstrapbootstrapcomponentjs")) {
    const script = document.createElement("script");
    script.id = "videocardbootstrapbootstrapcomponentjs";
    script.src = "http://localhost:6006/videocard/dist/videocardbootstrap.js";

    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("videocardbootstrap-component");
    c.id = id;
  }

  if (title) {
    c.setAttribute("title", title);
  } else {
    if (c.hasAttribute("title")) c.removeAttribute("title");
  }
  if (provider) {
    c.setAttribute("provider", provider);
  } else {
    if (c.hasAttribute("provider")) c.removeAttribute("provider");
  }
  if (description) {
    c.setAttribute("description", description);
  } else {
    if (c.hasAttribute("description")) c.removeAttribute("description");
  }

  if (time) {
    console.log(time, moment(time).isValid());
    c.setAttribute("time", moment(time).format());
  } else {
    if (c.hasAttribute("time")) c.removeAttribute("time");
  }
  if (videosrc) {
    c.setAttribute("videosrc", videosrc);
  } else {
    if (c.hasAttribute("videosrc")) c.removeAttribute("videosrc");
  }

  return c;
};
