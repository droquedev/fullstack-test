import { Toaster } from "sonner";
import { VisitedContextProvider } from "./context/VisitedContextProvider";
import { Feeds } from "./pages/Feeds";

function App() {
  return (
    <VisitedContextProvider>
      <Toaster
        richColors
        position="top-center"
        duration={3000}
        toastOptions={{
          className: "app-toast",
        }}
      />
      <Feeds />
    </VisitedContextProvider>
  );
}

export default App;
