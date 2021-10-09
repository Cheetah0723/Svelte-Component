export interface BootstrapDialogProps {
  id: string;
  show: boolean;
}

export const createBootstrapDialog = ({ id, show }: BootstrapDialogProps) => {
  if (!document.getElementById("bootstrapdialogcomponentscript")) {
    const script = document.createElement("script");
    script.id = "bootstrapdialogcomponentscript";
    script.src =
      "http://localhost:6006/bootstrapdialog/dist/bootstrapdialogcomponent.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("bootstrap-dialog-component");
    c.id = id;

    // b.innerHTML = `<button slot="test" onclick="document.getElementsByTagName('bootstrap-dialog-component')[0].setAttribute('open', 'yes')">test</button>`;
    // document.body.appendChild(b);
  }

  if (show) {
    c.setAttribute("show", "yes");
  } else {
    if (c.hasAttribute("show")) c.removeAttribute("show");
  }
  return c;
};
