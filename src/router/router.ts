import { useRoutes } from "react-router-dom";

import { routes } from "./router.const";

export const Router = () => {
    return useRoutes(routes);
}