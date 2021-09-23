export interface PageBannerProps {
  logouri?: string;
  title?: string;
  description?: string;
  id: string;
}

export const createPageBanner = ({
  logouri,
  title,
  description,
  id,
}: PageBannerProps) => {
  if (!document.getElementById("pagebannerscript")) {
    const script = document.createElement("script");
    script.id = "pagebannerscript";
    script.src = "http://localhost:6006/pagebanner/dist/pagebanner.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("pagebanner-component");
    c.id = id;
  }

  if (logouri) {
    c.setAttribute("logouri", logouri);
  } else {
    if (c.hasAttribute("logouri")) c.removeAttribute("logouri");
  }
  if (title) {
    c.setAttribute("title", title);
  } else {
    if (c.hasAttribute("title")) c.removeAttribute("title");
  }
  if (description) {
    c.setAttribute("description", description);
  } else {
    if (c.hasAttribute("description")) c.removeAttribute("description");
  }
  return c;
};
