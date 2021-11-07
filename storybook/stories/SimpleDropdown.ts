import pkg from "../../lerna.json";

interface IUserMenuListItem {
  key: string;
  label: string;
  badge?: number;
  group?: string;
  linkHref?: string;
}

export interface SimpleDropdownProps {
  id: string;
  list: IUserMenuListItem;
  open: boolean;
  dropDownClick?: (details) => void;
  dropdownSwitch?: (details) => void;
}

export const createSimpleDropdown = ({
  id,
  list,
  open,
  dropDownClick,
  dropdownSwitch,
}: SimpleDropdownProps) => {
  if (!document.getElementById("simpledropdownscript")) {
    const script = document.createElement("script");
    script.id = "simpledropdownscript";
    if (window.location.href.includes("localhost")) {
      script.src =
        "http://localhost:6006/simpledropdown/dist/simpledropdown.js";
    } else {
      script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/simpledropdown-component@${pkg.version}/release/simpledropdown.js`;
    }
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  let prev: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("simpledropdown-component");
    c.id = id;

    if (c.id === "BasicSimpleDropdownRight") {
      prev = document.createElement("div");
      c.style.float = "right";

      prev.appendChild(c);
    }

    c.addEventListener("dropdownSwitch", (e: any) => dropdownSwitch(e.detail));
    c.addEventListener("dropDownClick", (e: any) => dropDownClick(e.detail));
  }
  if (list) {
    c.setAttribute("list", JSON.stringify(list));
  } else {
    if (c.hasAttribute("list")) c.removeAttribute("list");
  }

  if (open) {
    c.setAttribute("open", "");
  } else {
    if (c.hasAttribute("open")) c.removeAttribute("open");
  }

  return prev || c;
};
