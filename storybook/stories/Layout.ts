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
export interface LayoutProps {
  id: string;
  company: ICompany;
  contacts: IContacts;
  socials: ISocials;
  navlinks: INavLink[];
  page: IPage;
  usermenu: IUserMenu;
  cookielaw: string;
}
export const createLayout = ({
  id,
  company,
  navlinks,
  contacts,
  socials,
  usermenu,
  page,
  cookielaw,
}: LayoutProps) => {
  if (!document.getElementById("bootstraplayoutscript")) {
    const script = document.createElement("script");
    script.id = "bootstraplayoutscript";
    script.src = "http://localhost:6006/layout/dist/bootstraplayout.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("bootstraplayout-component");
    c.id = id;
    if (id === "LayoutAWithPage") {
      console.log("LayoutAWithPage");
      const pageItem = document.createElement("div");
      pageItem.setAttribute("slot", "page");

      pageItem.innerText = "paddddddddddddddddddddddddddddddddddddddddddge";
      c.appendChild(pageItem);
    }
    if (id === "LayoutAWithoutNavSlotted") {
      console.log("LayoutAWithoutNavSlotted");
      const pageItem = document.createElement("div");
      pageItem.setAttribute("slot", "right-slot");

      pageItem.innerText = "right-";
      c.appendChild(pageItem);
    }
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
