import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ userEmail, onLogout }) {
  const location = useLocation();
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;

  const isLogin = location.pathname === "/login";

  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__logo">
          Around <span className="header__logo-vector">COL</span>
        </h1>

        {currentUser?._id ? (
          <div className="header__user-info">
            <span className="header__user-email"> {userEmail}</span>
            <button className="header__logout-button" onClick={onLogout}>
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="header__auth-buttons">
            {isLogin ? (
              <Link to="/register" className="header__register-button">
                Registrarse
              </Link>
            ) : (
              <Link to="/login" className="header__register-button">
                Iniciar Sesión
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="header__line"></div>
    </header>
  );
}

export default Header;
