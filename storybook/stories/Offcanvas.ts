export interface OffcanvasProps {
  opened: boolean;
  pageclick?: (p) => void;
  sidebarswitch?: (p) => void;
}

export const createOffcanvas = ({
  opened,
  pageclick,
  sidebarswitch,
}: OffcanvasProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/offcanvas/dist/offcanvas.js";
  document.body.appendChild(script);

  const c = document.createElement("offcanvas-component");

  if (opened) {
    c.setAttribute("opened", "yes");
  }
  c.addEventListener("pageclick", (p: any) => pageclick(p.detail));
  c.addEventListener("sidebarswitch", (p: any) => sidebarswitch(p.detail));

  const b = document.createElement(`button`);
  b.onclick = function () {
    document
      .getElementsByTagName("offcanvas-component")[0]
      .setAttribute("opened", "yes");
  };
  b.innerHTML = `test`;
  document.body.appendChild(b);

  return c;
};
