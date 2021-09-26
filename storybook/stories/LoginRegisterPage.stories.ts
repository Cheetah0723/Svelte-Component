import { Story, Meta } from "@storybook/html";
import {
  createLoginRegisterPage,
  LoginRegisterPageProps,
} from "./LoginRegisterPage";

export default {
  title: "Pages/LoginRegisterPage",
  argTypes: {
    type: {
      options: ["login", "register"],
      control: { type: "select" }, // Automatically inferred when 'options' is defined
    },
    language: { type: "string" },
    logouri: { type: "string" },
    loginuri: { type: "string" },
    registeruri: { type: "string" },
    login: { action: "loginEvent" },
    register: { action: "registerEvent" },
    id: { control: { disable: true } },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const company1 = {
  logoUri:
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg",
  siteName: "testsite",
  companyName: "testcompany S.R.L.",
  registration: "copyright",
  description: `testo e descrizione di esempio dell'applicazione`,
  vatNumber: "aa - ffffff",
  fiscalCode: "f4f5f6fff",
};

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

const Template: Story<LoginRegisterPageProps> = (args) =>
  createLoginRegisterPage(args);

export const LoginPage = Template.bind({});
LoginPage.args = {
  type: "login",
  company: company1,
  id: "LoginPage",
};
export const RegisterPage = Template.bind({});
RegisterPage.args = {
  company: company1,
  id: "RegisterPage",
};
export const LoginEnPage = Template.bind({});
LoginEnPage.args = {
  type: "login",
  language: "en",
  id: "LoginEnPage",
};

export const LoginPageEnWithFetch = Template.bind({});
LoginPageEnWithFetch.args = {
  type: "login",
  language: "en",
  loginuri: "https://kernel.free.beeceptor.com/login",
  registeruri: "https://kernel.free.beeceptor.com/register",
  id: "LoginPageEnWithFetch",
};
export const LoginPageEnWithOauth = Template.bind({});
LoginPageEnWithOauth.args = {
  type: "login",
  language: "en",
  loginuri: "https://kernel.free.beeceptor.com/login",
  registeruri: "https://kernel.free.beeceptor.com/register",
  oauth2providers: [
    {
      provider: "google",
      uri:
        "https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=https%3A//oauth2.example.com/code&client_id=client_id",
    },
    { provider: "facebook" },
    { provider: "twitter" },
  ],
  id: "LoginPageEnWithOauth",
};
