export interface BootstrapDialogProps {
  id: string;
}

export const createBootstrapDialog = ({ id }: BootstrapDialogProps) => {
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
    const b = document.createElement("div");

    b.innerHTML = `<button slot="test" onclick="document.getElementsByTagName('bootstrap-dialog-component')[0].setAttribute('open', 'yes')">test</button>`;
    document.body.appendChild(b);
  }

  return c;
};
