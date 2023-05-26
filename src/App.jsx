import { useEffect } from "react";
import RoutesWrapper from "./routes/routes";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => get(state, "auth"));

  useEffect(() => {
  if (isAuthenticated) {
    // navigate("/");
  } else {
    navigate("/auth/sign-in");
  }
  }, [isAuthenticated])

  return <RoutesWrapper />;
}

export default App;
