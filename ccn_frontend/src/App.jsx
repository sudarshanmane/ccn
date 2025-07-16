import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./AppRoutes.jsx";
import { AppContextProvider } from "./context/AppContextProvider.jsx";
import { Toaster } from "sonner";
import { Modals } from "./components/organisms/Modals/Modals.jsx";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <AppRoutes></AppRoutes>
      </AppContextProvider>

      {/* <Modals></Modals> */}

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
  );
}

export default App;
