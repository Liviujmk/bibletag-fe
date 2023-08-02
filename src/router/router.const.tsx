import { NotFound404 } from "../common/layouts/404.layout";
import { RouteWithPermissions } from "../features/auth/components/route-with-permission";
import { ArticlePage } from "../pages/article.page";
import { ArticlesPage } from "../pages/articles.page";
import { CreateArticlePage } from "../pages/create-article.page";
import { EditArticlePage } from "../pages/edit-article.page";
import { PageLayout } from "../common/layouts/page/page.layout";
import { RouteObject } from "react-router-dom";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";

interface NavLink {
    label: string;
    to: string;
}

export const NAVLINKS: NavLink[] = [
    {
        label: 'Home',
        to: '/',
    },
    {
        label: 'Articles',
        to: '/articles',
    },
    {
        label: 'Collections',
        to: '/collections',
    },
    {
        label: 'Profile',
        to: '/profile',
    }
];

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <PageLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/profile",
                element: <LoginPage />,
            },
            {
                path: "/articles",
                element: <ArticlesPage />,
            },
            {
                path: "/articles/:id",
                element: <ArticlePage />,
            },
            {
                element: <RouteWithPermissions />,
                children: [
                    {
                        path: "/articles/:id/edit",
                        element: <EditArticlePage />,
                    } ,  
                    {
                        path: "/articles/create",
                        element: <CreateArticlePage />,
                    },
                ]
            },
            {
                path: "/collections",
                element: <h1>TagsPage</h1>,
            },
            {
                path: "/collections/:id",
                element: <h1>TagPage</h1>,
            },
            {
                path: "*",
                element: <NotFound404 />
            },
        ]
    },
];