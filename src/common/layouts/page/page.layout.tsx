import { ContainerLayout } from "./container.layout"
import { DefaultHeader } from "../header/default-header"
import { NAVLINKS } from "../../../router/router.const"
import { Outlet } from "react-router-dom"

export const PageLayout = () => {
    return (
        <div>
            <ContainerLayout>
                <DefaultHeader links={NAVLINKS} />
                <Outlet />
            </ContainerLayout>
        </div>
    )
}