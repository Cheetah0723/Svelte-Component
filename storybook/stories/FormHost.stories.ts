import { Story, Meta } from "@storybook/html";
import { createFormHost, FormHostProps } from "./FormHost";
import type { FormSchema } from "../../packages/formrenderer/app/types/webcomponent.type";

export default {
  title: "Form/Host",
  argTypes: {
    id: { control: { disable: true } },
    schema: { control: { type: "object" } },
  },
} as Meta;

const Template: Story<FormHostProps> = (args) => createFormHost(args);

const schema1: FormSchema = [
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
  {
    type: "text",
    placeholder: "Insert your last name here...",
    id: "lastName2",
    required: true,
    label: "Last Name",
    validationTip: "This field cannot be empty.",
  },
];
export const FormHostTemplate = Template.bind({});
FormHostTemplate.args = {
  id: "BasicFormHost",
  schema: schema1,
};
