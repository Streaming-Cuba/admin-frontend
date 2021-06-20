import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  PermMedia as PermMediaIcon,
  OpenInNew as OpenInNewIcon,
  Security as SecurityIcon,
} from "@material-ui/icons";
import {
  Calendar as CalendarIcon,
  ViewDashboard as DashboardIcon,
  ChartLine as ChartLineIcon
} from 'mdi-material-ui'
import Dot from "./components/Dot";
import {Paths} from '../../pages'

const structure = [
  { id: 0, label: "Dashboard", link: "/dashboard", icon: <DashboardIcon /> },
  {
    id: 1,
    label: "Eventos",
    link: "/events",
    icon: <CalendarIcon />,
  },
  {
    id: 1,
    label: "Media",
    link: "/media",
    icon: <PermMediaIcon />,
  },
  // { id: 2, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  // {
  //   id: 3,
  //   label: "Notifications",
  //   link: "/app/notifications",
  //   icon: <NotificationsIcon />,
  // },
  {
    id: 3,
    label: "Estadisticas",
    link: "/statistics",
    icon: <ChartLineIcon />,
    children: [
      { label: "Votos", link: Paths.StatisticsVotes },
      { label: "Métricas de Facebook", link: Paths.StatisticsMetrics}
    ],
  },
  {
    id: 4,
    label: "Seguridad",
    link: "/security",
    icon: <SecurityIcon />,
    children: [
      { label: "Cuentas de usuario", link: "/security/accounts" },
      { label: "Roles", link: Paths.Roles },
    ],
  },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "Otras apps" },
  {
    id: 7,
    label: "Eventos",
    link: "https://eventos.streamingcuba.com",
    target: "_blank",
    icon: <OpenInNewIcon />,
  },
  // {
  //   id: 8,
  //   label: "Support",
  //   link: "https://flatlogic.com/forum",
  //   icon: <SupportIcon />,
  // },
  // {
  //   id: 9,
  //   label: "FAQ",
  //   link: "https://flatlogic.com/forum",
  //   icon: <FAQIcon />,
  // },
  // { id: 10, type: "divider" },
  // { id: 11, type: "title", label: "PROJECTS" },
  // {
  //   id: 12,
  //   label: "My recent",
  //   link: "",
  //   icon: <Dot size="sm" color="warning" />,
  // },
  // {
  //   id: 13,
  //   label: "Starred",
  //   link: "",
  //   icon: <Dot size="sm" color="primary" />,
  // },
  // {
  //   id: 14,
  //   label: "Background",
  //   link: "",
  //   icon: <Dot size="sm" color="secondary" />,
  // },
];

export default structure;
