import { BsFillImageFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";

export const DataDashboard = [
  {
    icon: <MdProductionQuantityLimits />,
    title: "Productos",
    link: "/backoffice/productos",
  },
  {
    icon: <BsFillImageFill />,
    title: "Banner",
    link: "/backoffice/banner",
  },
  {
    icon: <FaUsers />,
    title: "Usuarios",
    link: "/backoffice/usuarios",
  },
];
