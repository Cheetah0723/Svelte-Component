import { Story, Meta } from "@storybook/html";
import { createContact, ContactProps } from "./Contact";

export default {
  title: "Components/Contact",
  argTypes: {
    id: { control: { disable: true } },
    phone: { control: { type: "text" } },
    address: { control: { type: "text" } },
    email: { control: { type: "text" } },
    site: { control: { type: "text" } },
    config: { control: { type: "object" } },
    contactclick: { action: "contactClickEvent" },
  },
} as Meta;

const Template: Story<ContactProps> = (args) => createContact(args);

export const ContactPhone = Template.bind({});
ContactPhone.args = {
  id: "ContactPhone",
  phone: { number: 465564 },
};
export const ContactEmail = Template.bind({});
ContactEmail.args = {
  id: "ContactEmail",
  email: { address: "dev@dariocaruso.info" },
};
export const ContactSite = Template.bind({});
ContactSite.args = {
  id: "ContactSite",
  site: {
    uri: "https://dariocaruso.info",
    label: "dariocaruso.info",
    open: true,
  },
};
export const ContactAddress = Template.bind({});
ContactAddress.args = {
  id: "ContactAddress",
  address: { address: "egeg" },
};
