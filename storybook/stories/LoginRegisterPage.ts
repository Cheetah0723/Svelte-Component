export interface ICompany {
  logoUri: string;
  siteName: string;
  companyName: string;
  registration?: { since?: number; text?: string };
  description: string;
  vatNumber?: string;
  fiscalCode?: string;
  since?: number;
}
interface INavLink {
  key: string;
  icon?: string;
  group?: string;
  label: string;
  badge?: {
    text: string;
    class?: string;
    classcolor?: string;
  };
}
interface ISocials {
  facebook: string;
  gmail: string;
  twitter: string;
  github: string;
  youtube: string;
  twitch: string;
  discord: string;
}
interface IContacts {
  phones?: { label?: string; number: string; _id?: string }[];
  addresses?: {
    googleMapUri?: string;
    address: string;
    shortAddress?: string;
    _id?: string;
  }[];
  emails?: { label?: string; address: string; _id?: string }[];
  sites?: { label?: string; uri: string; open?: boolean; _id?: string }[];
}
interface IPage {
  href: string;
  pageName: string;
}
interface IUserMenuListItem {
  key: string;
  label: string;
  badge?: number;
  group?: string;
}
interface IUserMenu {
  imgUri: string;
  list?: IUserMenuListItem[];
}

export interface LoginRegisterPageProps {
  id: string;

  type?: "login" | "register";
  logouri?: string;
  language?: string;
  registeruri?: string;
  loginuri?: string;
  oauth2providers: any[];
  company: ICompany;
  contacts: IContacts;
  socials: ISocials;
  navlinks: INavLink[];
  page: IPage;
  usermenu: IUserMenu;
  cookielaw: string;
  login?: (d) => void;
  register?: (d) => void;
}

export const createLoginRegisterPage = ({
  id,
  type,
  logouri,
  login,
  register,
  language,
  loginuri,
  registeruri,
  company,
  navlinks,
  contacts,
  socials,
  usermenu,
  page,
  cookielaw,
  oauth2providers,
}: LoginRegisterPageProps) => {
  if (!document.getElementById("apploginregisterscript")) {
    const script = document.createElement("script");
    script.id = "apploginregisterscript";
    script.src =
      "http://localhost:6006/apploginregister/dist/apploginregister.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("apploginregister-component");
    c.id = id;
    c.addEventListener("login", (c: any) => login(c.detail));
    c.addEventListener("register", (c: any) => register(c.detail));
  }

  if (logouri) {
    c.setAttribute("logouri", logouri);
  } else {
    if (c.hasAttribute("logouri")) c.removeAttribute("logouri");
  }
  if (type) {
    c.setAttribute("type", type);
  } else {
    if (c.hasAttribute("type")) c.removeAttribute("type");
  }
  if (oauth2providers) {
    c.setAttribute("oauth2providers", JSON.stringify(oauth2providers));
  } else {
    if (c.hasAttribute("oauth2providers")) c.removeAttribute("oauth2providers");
  }
  if (registeruri) {
    c.setAttribute("registeruri", registeruri);
  } else {
    if (c.hasAttribute("registeruri")) c.removeAttribute("registeruri");
  }

  if (loginuri) {
    c.setAttribute("loginuri", loginuri);
  } else {
    if (c.hasAttribute("loginuri")) c.removeAttribute("loginuri");
  }

  if (language) {
    c.setAttribute("language", language);
  } else {
    if (c.hasAttribute("language")) c.removeAttribute("language");
  }
  if (company) {
    c.setAttribute("company", JSON.stringify(company));
  } else {
    if (c.hasAttribute("company")) c.removeAttribute("company");
  }
  if (navlinks) {
    c.setAttribute("navlinks", JSON.stringify(navlinks));
  } else {
    if (c.hasAttribute("navlinks")) c.removeAttribute("navlinks");
  }
  if (contacts) {
    c.setAttribute("contacts", JSON.stringify(contacts));
  } else {
    if (c.hasAttribute("contacts")) c.removeAttribute("contacts");
  }
  if (socials) {
    c.setAttribute("socials", JSON.stringify(socials));
  } else {
    if (c.hasAttribute("socials")) c.removeAttribute("socials");
  }
  if (page) {
    c.setAttribute("page", JSON.stringify(page));
  } else {
    if (c.hasAttribute("page")) c.removeAttribute("page");
  }
  if (usermenu) {
    c.setAttribute("usermenu", JSON.stringify(usermenu));
  } else {
    if (c.hasAttribute("usermenu")) c.removeAttribute("usermenu");
  }
  if (cookielaw) {
    c.setAttribute("cookielaw", cookielaw);
  } else {
    if (c.hasAttribute("cookielaw")) c.removeAttribute("cookielaw");
  }
  return c;
};
