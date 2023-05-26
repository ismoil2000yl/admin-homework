import { lazy } from "react";

const Home = lazy(() => import("pages/home"));
const Registration = lazy(() => import("pages/auth/registration"));
const Login = lazy(() => import("pages/auth/login"));
const SignIn = lazy(()=> import("pages/auth/signIn"))
const Banner = lazy(()=> import ("pages/banners"))
const Pages = lazy(()=> import("pages/pages"))
const Posts = lazy(()=> import("pages/posts"))
const Menus = lazy(()=> import("pages/menus"))
const Tags = lazy(()=> import("pages/tags"))
const Category = lazy(()=> import("pages/category"))
const CreatePage = lazy(()=> import("pages/pages/create"))
const UpdatePage = lazy(()=> import("pages/pages/update"))
const CreateMenu = lazy(()=> import("pages/menus/create-menu"))
const UpdateMenu = lazy(()=> import("pages/menus/update"))
const CreateMenuItems = lazy(()=> import("pages/menu-items/create-menu-items"))
const UpdateMenuItems = lazy(()=> import("pages/menu-items/update"))
const MenuItems = lazy(()=> import("pages/menu-items"))
const UpdatePost = lazy(()=> import("pages/posts/update"))
const PostsContent = lazy(()=> import("pages/posts/content"))
const UpdateBanner = lazy(()=> import("pages/banners/update"))
const StorePage = lazy(()=> import("pages/store"))
const CreateStore = lazy(()=> import("pages/store/create"))
const UpdateStore = lazy(()=> import("pages/store/update"))

const authRoutes = [
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/registration",
    element: <Registration />,
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
];

const privateRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [{}],
  },
  {
    path: "/banners",
    element: <Banner />
  },
  {
    path: "/posts",
    element: <Posts />
  },
  {
    path: "/pages",
    element: <Pages />
  },
  {
    path: "menus",
    element: <Menus/>
  },
  {
    path: "tags",
    element: <Tags/>
  },
  {
    path: "/pages/create-page",
    element: <CreatePage/>
  },
  {
    path: "/pages/update-page/:id",
    element: <UpdatePage/>
  },
  {
    path: "/menus/create-menu",
    element: <CreateMenu/>
  },
  {
    path: "/menus/update-menu/:id",
    element: <UpdateMenu/>
  },
  {
    path: "/menu-items/:id",
    element: <MenuItems/>
  },
  {
    path: "/menu-items/create-menu/:id",
    element: <CreateMenuItems/>
  },
  {
    path: "/menu-items/update-menu/:id",
    element: <UpdateMenuItems/>
  },
  {
    path: "/posts/update-post/:id",
    element: <UpdatePost/>
  },
  {
    path: "/posts/post-content/:id",
    element: <PostsContent/>
  },
  {
    path: "/banners/update-banner/:id",
    element: <UpdateBanner/>
  },
  {
    path: "/store-page",
    element: <StorePage/>
  },
  {
    path: "/store-page/create-store",
    element: <CreateStore/>
  },
  {
    path: "/store-page/update-store/:id",
    element: <UpdateStore/>
  },
  {
    path: "/categories",
    element: <Category/>
  }
];

export { authRoutes, privateRoutes };
