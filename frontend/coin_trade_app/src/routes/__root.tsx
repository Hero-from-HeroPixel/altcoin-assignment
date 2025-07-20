import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import NavBar from "../components/Navigation/NavBar";

export const Route = createRootRoute({
    component: () => (
        <>
            <NavBar />
            <Outlet />
            {import.meta.env.DEV && <TanStackRouterDevtools />}
        </>
    ),
});
