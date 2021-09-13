export interface LayoutProps {
  id: string;
  company: ICompany;
}
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
export const createLayout = ({ id, company }: LayoutProps) => {
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
  }
  if (company) {
    c.setAttribute("company", JSON.stringify(company));
  } else {
    if (c.hasAttribute("company")) c.removeAttribute("company");
  }
  return c;
};
