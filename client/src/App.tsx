import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FeedDetail } from "./pages/FeedDetail";
import { Feeds } from "./pages/Feeds";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Feeds />,
  },
  {
    path: "/:id",
    element: <FeedDetail />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
