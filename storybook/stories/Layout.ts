export interface LayoutProps {
  id: string;
}

export const createLayout = ({ id }: LayoutProps) => {
  if (!document.getElementById("bootstraplayoutscript")) {
    const script = document.createElement("script");
    script.id = "bootstraplayoutscript";
    script.src = "http://localhost:6006/layout/dist/bootstraplayout.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("bootstraplayout-component");
    c.id = id;
  }

  return c;
};
