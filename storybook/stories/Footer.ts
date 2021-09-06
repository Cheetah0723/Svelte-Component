export interface FooterProps {
  id: string;
  pagetitle?: string;
  companybrandname?: string;
  companylogouri?: string;
  switchopen?: boolean;
  navmenuswitch?: (isOpen) => void;
}

export const createFooter = ({
  id,
  companylogouri,
  companybrandname,
  pagetitle,
  switchopen,
  navmenuswitch,
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
    c.addEventListener("navmenuswitch", (e: any) => navmenuswitch(e.detail));
  }
  if (companylogouri) {
    c.setAttribute("companylogouri", companylogouri);
  } else {
    if (c.hasAttribute("companylogouri")) c.removeAttribute("companylogouri");
  }

  if (companybrandname) {
    c.setAttribute("companybrandname", companybrandname);
  } else {
    if (c.hasAttribute("companybrandname"))
      c.removeAttribute("companybrandname");
  }
  if (pagetitle) {
    c.setAttribute("pagetitle", pagetitle);
  } else {
    if (c.hasAttribute("pagetitle")) c.removeAttribute("pagetitle");
  }
  if (switchopen) {
    c.setAttribute("switchopen", "yes");
  } else {
    if (c.hasAttribute("switchopen")) c.removeAttribute("switchopen");
  }

  if (id === "NavbarSlotted") {
    const slot_right_bar = document.createElement("div");
    slot_right_bar.setAttribute("slot", "right-bar");
    slot_right_bar.innerText = "slot right";
    c.appendChild(slot_right_bar);
  }
  return c;
};
