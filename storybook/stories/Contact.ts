interface IPhone {
  number: string;
  callOnClick?: boolean;
}
interface IAddress {
  mapUri?: string;
  latLang?: number[];
  address: string;
  shortAddress?: string;
}
interface IEmail {
  mailLink?: boolean;
  address: string;
}

interface IConfig {
  icon?: { fill?: boolean };
  text?: boolean;
  dispatcher?: boolean;
}

interface ISite {
  label?: string;
  uri?: string;
  open?: boolean;
}

export interface ContactProps {
  id: string;
  phone?: IPhone;
  address?: IAddress;
  email?: IEmail;
  site?: ISite;
  config?: IConfig;
  contactclick?: (el) => void;
}

export const createContact = ({
  id,
  phone,
  address,
  email,
  site,
  config,
  contactclick,
}: ContactProps) => {
  if (!document.getElementById("contactcomponentscript")) {
    const script = document.createElement("script");
    script.id = "contactcomponentscript";
    script.src = "http://localhost:6006/contact/dist/contact.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("contact-component");
    c.id = id;

    c.addEventListener("contactClick", (e: any) => contactclick(e.detail));
  }

  if (phone) {
    c.setAttribute("phone", JSON.stringify(phone));
  } else {
    if (c.hasAttribute("phone")) c.removeAttribute("phone");
  }
  if (address) {
    c.setAttribute("address", JSON.stringify(address));
  } else {
    if (c.hasAttribute("address")) c.removeAttribute("address");
  }
  if (email) {
    c.setAttribute("email", JSON.stringify(email));
  } else {
    if (c.hasAttribute("email")) c.removeAttribute("email");
  }
  if (site) {
    c.setAttribute("site", JSON.stringify(site));
  } else {
    if (c.hasAttribute("site")) c.removeAttribute("site");
  }
  if (config) {
    c.setAttribute("config", JSON.stringify(config));
  } else {
    if (c.hasAttribute("config")) c.removeAttribute("config");
  }
  return c;
};
