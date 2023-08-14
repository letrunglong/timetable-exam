import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, PublicPage, SignUpPage } from "~/pages/auth";
import { MainPage } from "~/pages/module";
import { RouterGuard } from "./components";
import { useUser } from "~/hooks";
import { useMemo } from "react";

function App() {
  const { isAuth } = useUser();
  console.log(isAuth, "isAuth");
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/public",
          element: <PublicPage />,
          children: [
            { path: "/public/signin", element: <LoginPage /> },
            {
              path: "/public/signup",
              element: <SignUpPage />,
            },
          ],
        },
        {
          path: "/main",
          element: (
            <RouterGuard isAuth={isAuth}>
              <MainPage />
            </RouterGuard>
          ),
        },
      ]),
    [isAuth]
  );
  return <RouterProvider router={router} />;
}

export default App;
