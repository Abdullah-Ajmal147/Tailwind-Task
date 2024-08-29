import Graph from "../pages/Graph";
import OrderManagement from "../pages/OrderManagement";
import TaskManager from "../pages/TaskManagement";

const useRouteHelper = () => {

    const routes = [
        {
            path: "/",
            element: <OrderManagement />,
        },
        {
            path: "/task-management",
            element: <TaskManager />,
        },
        {
            path: "/graph",
            element: <Graph />,
        },
    ];
    return {
        routes
    }
}

export default useRouteHelper