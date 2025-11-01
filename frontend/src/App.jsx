import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

function App() {
  return(
    <>
   <Dashboard />;
  <Toaster position="bottom-right" reverseOrder={false} />
  </>
  );
}

export default App;

