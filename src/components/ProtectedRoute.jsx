import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

function ProtectedRoute({ children }) {
  const location = useLocation();

  const { isLoggedIn } = useContext(CurrentUserContext);

  if (isLoggedIn) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
}

export default ProtectedRoute;
