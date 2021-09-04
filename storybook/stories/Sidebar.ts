export interface SidebarProps {
  id: string;
  opened: boolean;
  pageclick?: (p) => void;
  sidebarswitch?: (p) => void;
}

export const createSidebar = ({
  id,
  opened,
  pageclick,
  sidebarswitch,
}: SidebarProps) => {
  if (!document.getElementById("sidebarcomponentscript")) {
    const script = document.createElement("script");
    script.id = "sidebarcomponentscript";
    script.src = "http://localhost:6006/sidebar/dist/sidebar.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("sidebar-component");
    c.id = id;
    c.addEventListener("pageclick", (p: any) => pageclick(p.detail));
    c.addEventListener("sidebarswitch", (p: any) => sidebarswitch(p.detail));
  }

  if (opened) {
    c.setAttribute("opened", "no");
  } else {
    if (c.hasAttribute("opened")) c.removeAttribute("opened");
  }

  return c;
};
