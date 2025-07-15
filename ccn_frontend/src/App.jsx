import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <AppRoutes></AppRoutes>
      <Modals></Modals>

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
      /> */}
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button className="bg-white text-black border-2 border-black">
          Click me
        </Button>
      </div>
    </QueryClientProvider>
  );
}

export default App;
