export interface DownloaderProps {
  id: string;
  uri: string;
  headers: JSON;
}

export const createDownloader = ({ id, uri, headers }: DownloaderProps) => {
  if (!document.getElementById("bootstrapdownloadercomponentscript")) {
    const script = document.createElement("script");
    script.id = "bootstrapdownloadercomponentscript";
    script.src =
      "http://localhost:6006/bootstrapdownloader/dist/bootstrapdownloadercomponent.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("bootstrap-downloader-component");
    c.id = id;
  }
  if (uri) {
    c.setAttribute("uri", uri);
  } else {
    if (c.hasAttribute("uri")) c.removeAttribute("uri");
  }
  if (headers) {
    c.setAttribute("headers", JSON.stringify(headers));
  } else {
    if (c.hasAttribute("headers")) c.removeAttribute("headers");
  }

  return c;
};
