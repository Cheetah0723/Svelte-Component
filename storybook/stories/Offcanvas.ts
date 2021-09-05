interface INavLink {
  key: string;
  icon: string;
  group: string;
  label: string;
}

export interface OffcanvasProps {
  navlinks?: INavLink[];
  groups?: { key: string; label: string }[];
  id: string;
  enablefooter?: boolean;
  opened?: boolean;
  navpage?: string;
  pagechange?: (p) => void;
  offcanvasswitch?: (p) => void;
}

export const createOffcanvas = ({
  id,
  navlinks,
  opened,
  offcanvasswitch,
  pagechange,
  enablefooter,
  navpage,
  groups,
}: OffcanvasProps) => {
  if (!document.getElementById("offcanvasscript")) {
    const script = document.createElement("script");
    script.id = "offcanvasscript";
    script.src = "http://localhost:6006/offcanvas/dist/offcanvas.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("offcanvas-component");
    c.id = id;
    c.addEventListener("pagechange", (p: any) => pagechange(p.detail));
    c.addEventListener("offcanvasswitch", (p: any) =>
      offcanvasswitch(p.detail)
    );
    c.innerHTML = `<button slot="test" onclick="document.getElementsByTagName('offcanvas-component')[0].setAttribute('opened', 'yes')">test</button>`;
  }

  if (opened) {
    c.setAttribute("opened", "yes");
  } else {
    if (c.hasAttribute("opened")) c.removeAttribute("opened");
  }
  if (navlinks) {
    c.setAttribute("navlinks", JSON.stringify(navlinks));
  } else {
    if (c.hasAttribute("navlinks")) c.removeAttribute("navlinks");
  }
  if (navpage) {
    c.setAttribute("navpage", navpage);
  } else {
    if (c.hasAttribute("navpage")) c.removeAttribute("navpage");
  }
  if (groups) {
    c.setAttribute("groups", JSON.stringify(groups));
  } else {
    if (c.hasAttribute("groups")) c.removeAttribute("groups");
  }
  if (enablefooter) {
    c.setAttribute("enablefooter", "yes");
  } else {
    if (c.hasAttribute("enablefooter")) c.removeAttribute("enablefooter");
  }
  // if (!document.getElementById("openbutton")) {
  //   const b = document.createElement(`button`);
  //   b.onclick = function () {
  //     document
  //       .getElementsByTagName("offcanvas-component")[0]
  //       .setAttribute("opened", "yes");
  //   };
  //   b.id = "openbutton";
  //   b.innerHTML = `test`;
  //   document.body.appendChild(b);
  // }

  return c;
};
