import pkg from "../../lerna.json";

interface ITableHeader {
  label: string;
  key: string;
  type?: string;
  format?: string;
  search?: boolean;
}

export interface TableProps {
  id: string;
  rows: any[];
  headers: ITableHeader[];
  size?: number;
  page?: number;
  primarycolor?: string;
  selectactions?: boolean;
  enableselect?: boolean;
  pagechange?: (d) => void;
  tableaction?: (d) => void;
  cellclick?: (d) => void;
  actiononselected?: (d) => void;
  clickonrow?: (d) => void;
  selectrow?: boolean;
  actions: {
    name: string;
    type: string;
    iconOrText: string;
  }[];
}

export const createTable = ({
  id,
  rows,
  headers,
  size,
  page,
  primarycolor,
  actions,
  enableselect,
  selectactions,
  selectrow,
  actiononselected,
  cellclick,
  tableaction,
  pagechange,
  clickonrow,
}: TableProps) => {
  if (!document.getElementById("streamingtablescript")) {
    const script = document.createElement("script");
    script.id = "streamingtablescript";
    if (window.location.href.includes("localhost")) {
      script.src =
        "http://localhost:6006/streamingtable/dist/streamingtablebootstrap.js";
    } else {
      script.src = `https://cdn.jsdelivr.net/npm/@htmlbricks/streamingtablebootstrap-webcomponent@${pkg.version}/release/streamingtablebootstrap.js`;
    }

    document.body.appendChild(script);
  }
  let c: HTMLElement;
  if (document.getElementById(id)) {
    c = document.getElementById(id);
  } else {
    c = document.createElement("streamingtablebootstrap-webcomponent");
    c.id = id;
    c.addEventListener("clickonrow", (i: any) => clickonrow(i.detail));

    c.addEventListener("pagechange", (i: any) => pagechange(i.detail));

    c.addEventListener("tableaction", (i: any) => tableaction(i.detail));

    c.addEventListener("cellclick", (i: any) => cellclick(i.detail));

    c.addEventListener("actiononselected", (i: any) =>
      actiononselected(i.detail)
    );
  }

  c.setAttribute("rows", JSON.stringify(rows));
  c.setAttribute("headers", JSON.stringify(headers));
  c.setAttribute("enableselect", enableselect ? "yes" : "");
  if (size) {
    c.setAttribute("size", size.toString());
  } else {
    if (c.hasAttribute("size")) c.removeAttribute("size");
  }
  if (page) {
    c.setAttribute("page", page.toString());
  } else {
    if (c.hasAttribute("page")) c.removeAttribute("page");
  }
  if (selectrow) {
    c.setAttribute("selectrow", "yes");
  } else {
    if (c.hasAttribute("selectrow")) c.removeAttribute("selectrow");
  }
  if (selectactions) {
    c.setAttribute("selectactions", JSON.stringify(selectactions));
  } else {
    if (c.hasAttribute("selectactions")) c.removeAttribute("selectactions");
  }
  if (primarycolor) {
    c.setAttribute("primarycolor", primarycolor);
  } else {
    if (c.hasAttribute("primarycolor")) c.removeAttribute("primarycolor");
  }
  if (actions) {
    c.setAttribute("actions", JSON.stringify(actions));
  } else {
    if (c.hasAttribute("actions")) c.removeAttribute("actions");
  }

  return c;
};
