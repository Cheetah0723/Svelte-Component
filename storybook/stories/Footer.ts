export interface FooterProps {
  id: string;
  smallrow?: {};
  columns?: {};
  brandandcontacts?: {};
  footerbottom?: {};
  footerclick?: (el) => void;
}

export const createFooter = ({
  id,
  smallrow,
  columns,
  brandandcontacts,
  footerbottom,
  footerclick,
}: FooterProps) => {
  if (!document.getElementById("footerscript")) {
    const script = document.createElement("script");
    script.id = "footerscript";
    script.src = "http://localhost:6006/footer/dist/footerbootstrap.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("footerbootstrap-component");
    c.id = id;
    c.addEventListener("footerClick", (e: any) => footerclick(e.detail));
  }
  if (smallrow) {
    c.setAttribute("smallrow", JSON.stringify(smallrow));
  } else {
    if (c.hasAttribute("smallrow")) c.removeAttribute("smallrow");
  }

  if (columns) {
    c.setAttribute("columns", JSON.stringify(columns));
  } else {
    if (c.hasAttribute("columns")) c.removeAttribute("columns");
  }
  if (brandandcontacts) {
    c.setAttribute("brandandcontacts", JSON.stringify(brandandcontacts));
  } else {
    if (c.hasAttribute("brandandcontacts"))
      c.removeAttribute("brandandcontacts");
  }
  if (footerbottom) {
    c.setAttribute("footerbottom", JSON.stringify(footerbottom));
  } else {
    if (c.hasAttribute("footerbottom")) c.removeAttribute("footerbottom");
  }
  return c;
};
