import type { FormSchema } from "../../packages/formrenderer/app/types/webcomponent.type";

export interface FormTextInputProps {
  id: string;
}

export const createFormTextInput = ({ id }: FormTextInputProps) => {
  if (!document.getElementById("formrenderertextinputscript")) {
    const script = document.createElement("script");
    script.id = "formrenderertextinputscript";
    script.src =
      "http://localhost:6006/formtextinputrenderer/dist/formrenderertextinput.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("formrenderer-textinput");
    c.id = id;
  }

  return c;
};
