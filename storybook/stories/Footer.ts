interface IColumn {
  _id?: string;
  cells: { label: string; key: string }[];
  title: string;
}
interface IBrandAndContacts {
  companyName: string;
  companyLogoUri: string;
}
interface ISmallRow {}
interface IFooterBottom {}

interface IPolicies {
  label: string;
  uri: string;
}
interface ISocials {
  facebook: string;
  gmail: string;
  twitter: string;
  github: string;
  youtube: string;
  twitch: string;
}

interface IContacts {
  phones?: { label?: string; number: string }[];
  addresses?: {
    googleMapUri?: string;
    address: string;
    shortAddress?: string;
  }[];
  emails?: { label?: string; address: string }[];
}

export interface FooterProps {
  id: string;
  smallrow?: ISmallRow;
  companyname?: string;
  companylogouri?: string;
  columns?: IColumn[];
  brandandcontacts?: IBrandAndContacts;
  footerbottom?: IFooterBottom;
  contacts?: IContacts;
  socials?: ISocials;
  copyrighttext?: string;
  policies: IPolicies;
  footerclick?: (el) => void;
}

export const createFooter = ({
  id,
  smallrow,
  columns,
  brandandcontacts,
  footerbottom,
  companyname,
  companylogouri,
  policies,
  socials,
  contacts,
  copyrighttext,
  footerclick,
}: FooterProps) => {
  if (!document.getElementById("footerscript")) {
    const script = document.createElement("script");
    script.id = "footerscript";
    script.src = "http://localhost:6006/footer/dist/footerbootstrap.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("footerbootstrap-component");
    c.id = id;
    c.style.backgroundColor = "#202126";
    c.style.color = "#888";
    c.addEventListener("footerClick", (e: any) => footerclick(e.detail));
  }
  if (smallrow) {
    c.setAttribute("smallrow", JSON.stringify(smallrow));
  } else {
    if (c.hasAttribute("smallrow")) c.removeAttribute("smallrow");
  }
  if (columns) {
    c.setAttribute("columns", JSON.stringify(columns));
  } else {
    if (c.hasAttribute("columns")) c.removeAttribute("columns");
  }
  if (companylogouri) {
    c.setAttribute("companylogouri", companylogouri);
  } else {
    if (c.hasAttribute("companylogouri")) c.removeAttribute("companylogouri");
  }
  if (companyname) {
    c.setAttribute("companyname", companyname);
  } else {
    if (c.hasAttribute("companyname")) c.removeAttribute("companyname");
  }
  if (brandandcontacts) {
    c.setAttribute("brandandcontacts", JSON.stringify(brandandcontacts));
  } else {
    if (c.hasAttribute("brandandcontacts"))
      c.removeAttribute("brandandcontacts");
  }
  if (footerbottom) {
    c.setAttribute("footerbottom", JSON.stringify(footerbottom));
  } else {
    if (c.hasAttribute("footerbottom")) c.removeAttribute("footerbottom");
  }

  if (copyrighttext) {
    c.setAttribute("copyrighttext", JSON.stringify(copyrighttext));
  } else {
    if (c.hasAttribute("copyrighttext")) c.removeAttribute("copyrighttext");
  }

  if (socials) {
    c.setAttribute("socials", JSON.stringify(socials));
  } else {
    if (c.hasAttribute("socials")) c.removeAttribute("socials");
  }

  if (contacts) {
    c.setAttribute("contacts", JSON.stringify(contacts));
  } else {
    if (c.hasAttribute("contacts")) c.removeAttribute("contacts");
  }
  if (policies) {
    c.setAttribute("policies", JSON.stringify(policies));
  } else {
    if (c.hasAttribute("policies")) c.removeAttribute("policies");
  }

  return c;
};
