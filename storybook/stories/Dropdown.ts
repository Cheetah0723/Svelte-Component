interface IListItem {
  key: string;
  label: string;
  badge?: number;
  group?: string;
}

export interface DropdownProps {
  id: string;
  show?: "yes" | "no";
  list?: IListItem[];
  groups: { key: string; label: string }[];
  clickOnDropdownList: (e) => void;
  dropDownSwitch: (e) => void;
}
export const createDropdown = ({
  id,
  show,
  list,
  groups,
  dropDownSwitch,
  clickOnDropdownList,
}: DropdownProps) => {
  if (!document.getElementById("bootstrapdropdownscript")) {
    const script = document.createElement("script");
    script.id = "bootstrapdropdownscript";
    script.src = "http://localhost:6006/dropdown/dist/bootstrapdropdown.js";
    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("bootstrapdropdown-component");
    c.id = id;
    c.addEventListener("clickOnDropdownList", (e: any) =>
      clickOnDropdownList(e.detail)
    );
    c.addEventListener("dropDownSwitch", (e: any) => dropDownSwitch(e.detail));
  }

  if (show) {
    c.setAttribute("show", show);
  } else {
    if (c.hasAttribute("show")) c.removeAttribute("show");
  }
  if (list) {
    c.setAttribute("list", JSON.stringify(list));
  } else {
    if (c.hasAttribute("list")) c.removeAttribute("list");
  }
  if (groups) {
    c.setAttribute("groups", JSON.stringify(groups));
  } else {
    if (c.hasAttribute("groups")) c.removeAttribute("groups");
  }
  return c;
};
