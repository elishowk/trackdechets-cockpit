import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { AuthPage, ErrorComponent, notificationProvider, RefineSnackbarProvider, ThemedLayoutV2 } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import dataProvider, { GraphQLClient } from "@refinedev/graphql";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CompanyList } from "./pages";

const API_URL = "http://api.trackdechets.local/";

const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        /**
         * For demo purposes, we're using `localStorage` to access the token.
         * You can use your own authentication logic here.
         * In real world applications, you'll need to handle it in sync with your `authProvider`.
         */
        Authorization: `Bearer CXRsgecQjXk7camU43sm7W2PHFd81ItS5VwM5Pyb`,
      },
    });
  },
});

const gqlDataProvider = dataProvider(client);

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={gqlDataProvider}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "angdT2-fnftFG-BB6t5e",
                }}
                resources={[
                  {
                      name: "companies",
                      list: "/companies",
                      show: "/companies/:id",
                      edit: "/companies/:id/edit",
                      create: "/companies/create",
                      meta: {
                          canDelete: true,
                      },
                  },
              ]}
              >
                <Routes>
                  {/* <Route element={<Authenticated fallback={<Navigate to="/login" />}><Outlet /></Authenticated>}> */}
                    <Route
                        element={
                            <ThemedLayoutV2>
                                <Outlet />
                            </ThemedLayoutV2>
                        }
                    >
                        <Route index element={<NavigateToResource resource="companies" />} />
                        <Route path="/companies" element={<Outlet />}>
                          <Route index element={<CompanyList />} />
                          {/* <Route path="create" element={<CompanyCreate />} />
                          <Route path=":id" element={<CompanyShow />} />
                          <Route path=":id/edit" element={<CompanyEdit />} /> */}
                        </Route>
                        <Route path="*" element={<ErrorComponent />} />
                    </Route>
                  {/* </Route> */}
                  {/* <Route element={<Authenticated fallback={<Outlet />}><NavigateToResource resource="companies" /></Authenticated>}>
                    <Route
                      path="/login"
                      element={(
                        <AuthPage
                          type="login"
                          formProps={{
                            defaultValues: {
                              email: "demo@refine.dev",
                              password: "demodemo",
                            },
                          }}
                        />
                      )}
                    />
                    <Route path="/register" element={<AuthPage type="register" />} />
                    <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
                    <Route path="/reset-password" element={<AuthPage type="resetPassword" />} />
                    <Route path="*" element={<ErrorComponent />} />
                  </Route> */}
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
