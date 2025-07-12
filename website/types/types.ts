

export type BreadcrumbItem = {
  title: string;
  to: string;
  href: string;
};

export type MenuItem = {
  text?: string;
  title?: string;
  to: string;
  submenu?: MenuItem[];
};

