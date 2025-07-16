import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./AppRoutes.jsx";
import { AppContextProvider } from "./context/AppContextProvider.jsx";
import { Toaster } from "sonner";
import { Modals } from "./components/organisms/Modals/Modals.jsx";
import { BrowserRouter } from "react-router";

function App() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AppRoutes></AppRoutes>
          <Modals></Modals>
        </AppContextProvider>

        <Toaster
          position="top-center"
          closeButton={true}
          toastOptions={{
            duration: 6000,
            style: {},
            classNames: {
              toast: "border border-black bg-white text-black",
              title: "text-black",
              description: "text-teal-400",
              closeButton: "text-black",
            },
          }}
        />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
