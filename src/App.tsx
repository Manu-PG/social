import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import GlobalStyles from "./theme/GlobalStyles";
import ThemeModeContextProvider from "./providers/ThemeModeContext";
import CustomThemeProvider from "./providers/CustomTheme";
import ToastContextProvider from "./providers/ToastContext";
import PostContextProvider from "./providers/PostContext";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <ThemeModeContextProvider>
      <CustomThemeProvider>
        <PostContextProvider>
          <ToastContextProvider>
            <GlobalStyles />
            <RouterProvider router={router} />
          </ToastContextProvider>
        </PostContextProvider>
      </CustomThemeProvider>
    </ThemeModeContextProvider>
  );
}

export default App;
