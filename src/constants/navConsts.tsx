import { CalendarIcon } from "@radix-ui/react-icons";
import { type SidebarLink } from "~/types";

export const NAV_CONSTS: SidebarLink[] = [
  {
    label: "Fam to Fam View",
    icon: "/assets/icons/NodeTreeIcon.svg",
    route: "/fam-to-fam/AAA",
  },
  {
    label: "World View",
    icon: "/assets/icons/GlobeIcon.svg",
    route: "/world-view/world-id",
  },
  {
    label: "Tree View",
    icon: "/assets/icons/TreeIcon.svg",
    route: "/tree-view/tree-id",
  },
  {
    label: "Calendar",
    icon: "/assets/icons/CalendarIcon.svg",
    route: "/calendar/calender-id",
  },
  {
    label: "Plans",
    icon: "/assets/icons/AwardIcon.svg",
    route: "/plans",
  },
];
