export interface Navigation {
  main_nav?: NavigationItem[];
  footer_nav?: NavigationItem[];
}

export interface NavigationItem {
  label: string;
  href: string;
  items?: NavigationItem[];
}
