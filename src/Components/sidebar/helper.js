import { useNavigate } from "react-router-dom";
import Svgs from "../../assets/svgs";

const useSidebar = (active) => {
    const navigate = useNavigate()

    const sidebarRoutes = [
        {
            url: '/',
            heading: 'Order Management',
            active: active == 'Order',
            icon: <Svgs.DashbaordIcon />
        },
        {
            url: '/task-management',
            heading: 'Task Management',
            active: active == 'Task',
            icon: <Svgs.BookingIcon />
        },
        {
            url: '/graph',
            heading: 'Graph',
            active: active == 'Graph',
            icon: <Svgs.DashbaordIcon />
        },
    ]

    return {
        navigate, sidebarRoutes
    }
}

export default useSidebar