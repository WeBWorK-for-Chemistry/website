import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InexactValue from "./routes/InexactValue.tsx";
import Home from "./routes/Home.tsx";
import UncertaintyPropagation from "./routes/UncertaintyPropagation.tsx";
import SignficantFigures from "./routes/SignficantFigures.tsx";
import InexactValueWithUnits from "./routes/InexactValueWithUnits.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
              path: "significantFigures",
              element: <SignficantFigures />,
          },
          {
            path: "uncertaintyPropagation",
            element: <UncertaintyPropagation />,
        },
        {
          path: "inexactValue",
          element: <InexactValue />,
      },
            {
                path: "inexactValueWithUnits",
                element: <InexactValueWithUnits />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <>
        <StrictMode>
            <FluentProvider theme={webLightTheme}>
                <RouterProvider router={router} />
            </FluentProvider>
        </StrictMode>
    </>
);
