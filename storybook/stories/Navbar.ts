export interface NavbarProps {
  id: string;
}

export const createNavbar = ({ id }: NavbarProps) => {
  if (!document.getElementById("navbarscript")) {
    const script = document.createElement("script");
    script.id = "navbarscript";
    script.src = "http://localhost:6006/navbar/dist/navbar.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("navbarbootstrap-component");
    c.id = id;
  }

  return c;
};
