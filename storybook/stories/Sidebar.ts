export interface SidebarProps {
  opened: boolean;
  pageclick?: (p) => void;
  sidebarswitch?: (p) => void;
}

export const createSidebar = ({
  opened,
  pageclick,
  sidebarswitch,
}: SidebarProps) => {
  const script = document.createElement("script");
  script.src = "http://localhost:6006/sidebar/dist/sidebar.js";
  document.body.appendChild(script);

  const c = document.createElement("sidebar-component");

  if (opened) {
    c.setAttribute("opened", "yes");
  }
  c.addEventListener("pageclick", (p: any) => pageclick(p.detail));
  c.addEventListener("sidebarswitch", (p: any) => sidebarswitch(p.detail));

  return c;
};
