import { Story, Meta } from "@storybook/html";
import { createDropdown, DropdownProps } from "./Dropdown";

export default {
  title: "Components/Dropdown",
  argTypes: {
    id: { control: { disable: true } },
    list: { control: { type: "array" } },
    groups: { control: { type: "array" } },
    show: {
      control: {
        type: "radio",
        labels: {
          yes: "yes",
          no: "no",
        },
      },
      options: ["yes", "no"],
    },
    clickOnDropdownList: { action: "clickOnDropdownListEvent" },
  },
} as Meta;

const list1 = [
  {
    key: "list1",
    label: "list1",
  },
];

const groups1 = [
  {
    key: "list1",
    label: "list1",
  },
];

const Template: Story<DropdownProps> = (args) => createDropdown(args);

export const BasicDropdown = Template.bind({});
BasicDropdown.args = {
  id: "BasicDropdown",
  list: list1,
  groups: groups1,
};
