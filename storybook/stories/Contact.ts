export interface ContactProps {
  id: string;
  phone?: { type?: string; number: string; _id?: string };
  address?: {
    googleMapUri?: string;
    address: string;
    shortAddress?: string;
    _id?: string;
  };
  email?: { label?: string; address: string; _id?: string };

  contactclick?: (el) => void;
}

export const createContact = ({
  id,
  phone,
  address,
  email,
  contactclick,
}: ContactProps) => {
  if (!document.getElementById("contactscript")) {
    const script = document.createElement("script");
    script.id = "contactscript";
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
  return c;
};
