export interface BootstrapModalProps {
  id: string;
}

export const createBootstrapModal = ({ id }: BootstrapModalProps) => {
  if (!document.getElementById("bootstrapmodalcomponentscript")) {
    const script = document.createElement("script");
    script.id = "bootstrapmodalcomponentscript";
    script.src =
      "http://localhost:6006/bootstrapmodal/dist/bootstrapmodalcomponent.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("bootstrap-modal-component");
    c.id = id;
  }

  return c;
};
