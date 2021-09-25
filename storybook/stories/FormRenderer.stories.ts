import type { FormRendererProps } from "../../packages/formrenderer/app/types/webcomponent.type";

const createFormRenderer = ({ schema }: FormRendererProps) => {
  if (!document.getElementById("formrendererscript")) {
    const script = document.createElement("script");
    script.id = "formrendererscript";
    script.src = "http://localhost:6006/formrenderer/dist/formrenderer.js";
    document.body.appendChild(script);
  }

  let c = document.createElement("formrenderer-component");

  if (schema) {
    c.setAttribute("schema", JSON.stringify(schema));
  } else {
    if (c.hasAttribute("schema")) c.removeAttribute("schema");
  }

  return c;
};

import { Story, Meta } from "@storybook/html";

const schema: FormRendererProps["schema"] = [
  {
    id: "name-row",
    type: "row",
    params: {
      columns: [
        {
          type: "text",
          placeholder: "Insert your first name here...",
          id: "firstName",
          required: true,
          label: "First Name",
          validationTip: "This field cannot be empty.",
        },
        {
          type: "text",
          placeholder: "Insert your last name here...",
          id: "lastName",
          required: true,
          label: "Last Name",
          validationTip: "This field cannot be empty.",
        },
      ],
    },
  },
  {
    type: "number",
    id: "age",
    required: true,
    label: "Age",
    params: {
      min: 8,
      max: 120,
    },
    validationTip: "Min 8, Max 120",
  },
];

export default {
  title: "Components/FormRenderer",
  args: {
    schema,
  },
  argTypes: {
    schema: [],
  },
} as Meta;

const Template: Story<FormRendererProps> = (args) => createFormRenderer(args);

export const FormRenderer = Template.bind({});

FormRenderer.args = {
  schema,
};
