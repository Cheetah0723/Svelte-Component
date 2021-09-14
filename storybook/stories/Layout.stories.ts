import { Story, Meta } from "@storybook/html";
import { createLayout, LayoutProps } from "./Layout";

export default {
  title: "Layout/MainLayout",
  argTypes: {
    id: { control: { disable: true } },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;
const company1 = {
  logoUri: "https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg",
  siteName: "testsite",
  companyName: "testcompany S.R.L.",
  registration: "copyright",
  description: `testo e descrizione di esempio dell'applicazione`,
  vatNumber: "aa - ffffff",
  fiscalCode: "f4f5f6fff",
};

const navlinks2 = [
  {
    label: "Home",
    key: "home",
    icon: "house-door",
    badge: {
      text: "bbb",
    },
  },
  {
    label: "Dashboard",
    key: "dashboard",
    icon: "speedometer",
    badge: {
      text: "bbb",
    },
  },
  {
    label: "Settings",
    key: "settings",
    icon: "gear",
    group: "admin",
    badge: {
      text: "bbb",
    },
  },
  {
    label: "Users",
    key: "users",
    icon: "people-fill",
    group: "admin",
    badge: {
      text: "uuuuu",
    },
  },
  {
    label: "Stats",
    key: "stats",
    icon: "graph-up",
    group: "stats",
    badge: {
      text: "bbb",
    },
  },
];

const contacts1 = {
  sites: [
    {
      label: "dariocaruso.info",
      uri: "https://dariocaruso.info",
    },
  ],
  phones: [
    {
      number: "6666666666666",
    },
  ],
  addresses: [],
  emails: [],
};

const socials1 = {
  facebook: "fbbb",
  youtube: "yttttttt",
};
const Template: Story<LayoutProps> = (args) => createLayout(args);

export const LayoutA = Template.bind({});
LayoutA.args = {
  id: "LayoutA",
  company: company1,
  contacts: contacts1,
  socials: socials1,
  navlinks: navlinks2,
};
export const LayoutAWithPage = Template.bind({});
LayoutAWithPage.args = {
  id: "LayoutAWithPage",
  company: company1,
  contacts: contacts1,
  socials: socials1,
  navlinks: navlinks2,
};
