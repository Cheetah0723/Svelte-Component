export interface OffcanvasProps {
  id: string;
  opened: boolean;
  pageclick?: (p) => void;
  sidebarswitch?: (p) => void;
}

export const createOffcanvas = ({
  id,
  opened,
  pageclick,
  sidebarswitch,
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
    c.addEventListener("pageclick", (p: any) => pageclick(p.detail));
    c.addEventListener("sidebarswitch", (p: any) => sidebarswitch(p.detail));
    c.innerHTML = `<button slot="test" onclick="document.getElementsByTagName('offcanvas-component')[0].setAttribute('opened', 'yes')">test</button>`;
  }

  if (opened) {
    c.setAttribute("opened", "yes");
  } else {
    if (c.hasAttribute("opened")) c.removeAttribute("opened");
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
