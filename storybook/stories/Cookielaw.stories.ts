import { Story, Meta } from "@storybook/html";
import { createCookielaw, CookielawProps } from "./Cookielaw";

export default {
  title: "Components/Cookielaw",
  argTypes: {
    id: { control: { disable: true } },

    acceptCookieLaw: { action: "acceptCookieLawEvent" },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const Template: Story<CookielawProps> = (args) => createCookielaw(args);

export const Cookielaw = Template.bind({});
Cookielaw.args = {
  id: "Cookielaw",
};
