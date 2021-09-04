import { Story, Meta } from "@storybook/html";
import { createPagination, PaginationProps } from "./Pagination";

export default {
  title: "Components/Pagination",
  argTypes: {
    page: { control: { type: "number" } },
    pagechange: { action: "pagechangeEvent" },
    id: { control: { disable: true } },
  },
} as Meta;

const Template: Story<PaginationProps> = (args) => createPagination(args);

export const BasicPagination1 = Template.bind({});
BasicPagination1.args = {
  pages: 1,
  id: "BasicPagination1",
};
export const BasicPagination4 = Template.bind({});
BasicPagination4.args = {
  pages: 4,
  id: "BasicPagination4",
};
export const BasicPagination12 = Template.bind({});
BasicPagination12.args = {
  pages: 12,
  id: "BasicPagination12",
};
