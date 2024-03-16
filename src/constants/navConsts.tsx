import { type SidebarLink } from "~/types";

export const NAV_CONSTS: SidebarLink[] = [
  {
    label: "Fam to Fam View",
    icon: "/assets/icons/NodeTreeIcon.svg",
    route: "/fam-to-fam/famId",
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
    label: "Feedback",
    icon: "/assets/icons/Feedback.svg",
    route: "/feedback",
  },
  {
    label: "Plans",
    icon: "/assets/icons/AwardIcon.svg",
    route: "/plans",
  },
];
