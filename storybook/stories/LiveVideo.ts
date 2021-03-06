export interface LiveVideoPlayerProps {
  mediauri?: string;
  replacewithtext?: {};
  width?: number;
  height?: number;
  id: string;
  liveStatus: (e) => void;
}

export const createLiveVideoPlayer = ({
  mediauri,
  width,
  height,
  id,
  replacewithtext,
  liveStatus,
}: LiveVideoPlayerProps) => {
  if (!document.getElementById("liveplayerscript")) {
    const script = document.createElement("script");
    script.id = "liveplayerscript";
    script.src = "http://localhost:6006/liveplayer/dist/liveplayer.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("liveplayer-component");
    c.id = id;
    c.addEventListener("liveStatus", (e: any) => liveStatus(e.detail));
  }

  if (replacewithtext) {
    c.setAttribute("replacewithtext", JSON.stringify(replacewithtext));
  } else {
    if (c.hasAttribute("replacewithtext")) c.removeAttribute("replacewithtext");
  }
  if (mediauri) {
    c.setAttribute("mediauri", mediauri.toString());
  } else {
    if (c.hasAttribute("mediauri")) c.removeAttribute("mediauri");
  }
  let block = false;
  if (width) {
    block = true;
    c.style.maxWidth = `${width}px`;
    c.style.width = `${width}px`;
  } else {
    c.style.maxWidth = "";
    c.style.width = "";
  }
  if (height) {
    block = true;

    c.style.maxHeight = `${height}px`;
    c.style.height = `${height}px`;
  } else {
    c.style.maxHeight = "";
    c.style.height = "";
  }

  if (block) {
    c.style.display = "block";
  } else {
    c.style.display = "";
  }

  return c;
};
