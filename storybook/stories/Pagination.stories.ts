import { Story, Meta } from "@storybook/html";
import { createPagination, PaginationProps } from "./Pagination";

export default {
  title: "Components/Pagination",
  argTypes: {
    page: { control: { type: "number" } },
    pagechange: { action: "pagechangeEvent" },
  },
} as Meta;

const Template: Story<PaginationProps> = (args) => createPagination(args);

export const BasicPagination = Template.bind({});
BasicPagination.args = {
  pages: 9,
};
