import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { getProfile } from "./api/user.api";
import { useDispatch } from "react-redux";
import { setUser } from "./features/authSlice";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import MyJobs from "./pages/MyJobs";

const appRouter = createBrowserRouter([
  {
    path: "/",
    // element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/create-job",
    element: <CreateJob />,
  },
  {
    path: "/my-jobs",
    element: <MyJobs />,
  },
]);

function App() {
  const dispatch = useDispatch();

  //getting authenticate user
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();

        dispatch(setUser(data.user)); //user data/info coming from getProfile controller is now storing in redux "user" state

        console.log("Logged in user:", data.user);
      } catch (error) {
        console.log("Profile error:", error.response?.data?.message);
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
