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
    dropDownSwitch: { action: "dropDownSwitchEvent" },

    clickOnDropdownList: { action: "clickOnDropdownListEvent" },
  },
} as Meta;

const list1 = [
  {
    key: "list1",
    label: "list1",
  },
  {
    key: "list2",
    label: "list2",
  },
  {
    key: "list3",
    label: "list3",
    group: "list1",
    badge: "3",
  },
  {
    key: "list4",
    label: "list4",
    badge: "555",
  },
  {
    key: "list5",
    label: "list5",
    group: "list1",
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
