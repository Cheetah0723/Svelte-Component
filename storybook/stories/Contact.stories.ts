import { Story, Meta } from "@storybook/html";
import { createContact, ContactProps } from "./Contact";

export default {
  title: "Components/Contact",
  argTypes: {
    id: { control: { disable: true } },

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
export const ContactAddress = Template.bind({});
ContactAddress.args = {
  id: "ContactAddress",
  address: { address: "egeg" },
};
