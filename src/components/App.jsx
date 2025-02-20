import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { useState } from "react";
import { api } from "../utils/Api";
import * as auth from "../utils/auth";
import { setToken, getToken, removeToken } from "../utils/token";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { getUserEmail } from "../utils/auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteTrashOpen, setIsDeleteTrashOpen] = useState(false);
  const [userName, setuserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentCard, setCurrentCard] = useState("");
  const [userData, setUserData] = useState({ email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = ({ email, password }) => {
    console.log(email, password);
    if (password) {
      auth
        .register(password, email)
        .then(() => {
          navigate("/login");
          setIsRegistrationSuccess(true);
          setIsInfoTooltipOpen(true);
        })
        .catch(() => {
          setIsRegistrationSuccess(false);
          setIsInfoTooltipOpen(true);
        });
    }
  };
  const fetchUserData = (token, shouldRedirect = false) => {
    return Promise.all([
      api.getUsers(token),
      getUserEmail(token),
      api.getCards(),
    ])
      .then(([userData, userEmailData, cardsData]) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        setUserData({ email: userEmailData.data.email });
        setuserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);

        if (shouldRedirect) {
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
        }
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;
    fetchUserData(jwt, true);
  }, []);

  const handleLogin = ({ email, password }) => {
    if (!email || !password) return;

    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          fetchUserData(data.token, true);
        }
      })
      .catch(() => {
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const onLogout = () => {
    setIsLoggedIn(false);

    setToken(null);
    setCurrentUser(null);
    setUserData({ email: "" });
    setuserName("");
    setUserDescription("");
    setUserAvatar("");

    setCards(null);
    removeToken();
    const redirectPath = location.state?.from?.pathname || "/login";
    navigate(redirectPath);
  };

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    console.log(isLiked);

    await api
      .changeLikeCardStatus(card._id, card.isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar la tarjeta:", error);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCreateCard(card) {
    api.createCard(card).then((newCard) => {
      setCards((state) => [newCard, ...state]);
      closeAllPopups();
    });
  }

  const handleUpdateUser = (name, about) => {
    (async () => {
      await api.editUser(name, about).then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      });
    })();
  };
  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.editAvatar(data).then((newData) => {
        setUserAvatar(newData);
        setCurrentUser({ ...currentUser, avatar: newData.avatar });
        closeAllPopups();
      });
    })();
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteTrashClick(card) {
    setIsDeleteTrashOpen(true);
    setCurrentCard(card);
  }

  function handleEditAvatar(data) {
    handleUpdateAvatar(data);
    setIsEditAvatarPopupOpen(false);
  }

  function handleEditProfile(data) {
    handleUpdateUser(data.name, data.about);
    setIsEditProfilePopupOpen(false);
  }

  function handleDeleteTrash() {
    setIsDeleteTrashOpen(false);
    handleCardDelete(currentCard);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteTrashOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipOpen(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          isLoggedIn,
        }}
      >
        <Header userEmail={userData?.email} onLogout={onLogout} />
        <Routes>
          <Route
            path="/login"
            element={
              <div className="loginContainer">
                <Login handleLogin={handleLogin} />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="registerContainer">
                <Register handleRegistration={handleRegistration} />
              </div>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Main
                  userData={userData}
                  onEditAvatarclick={handleEditAvatarClick}
                  onEditProfileclick={handleEditProfileClick}
                  onEditAddPlaceclick={handleAddPlaceClick}
                  onEditDeleteTrashclick={handleDeleteTrashClick}
                  profileName={userName}
                  profileAbout={userDescription}
                  profileAvatar={userAvatar}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onHandleCardLike={handleCardLike}
                  onHandleCardDelete={handleCardDelete}
                  selectedCard={selectedCard}
                  closeAllPopups={closeAllPopups}
                  handleEditAvatar={handleEditAvatar}
                  isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  handleEditProfile={handleEditProfile}
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                  handleCreateCard={handleCreateCard}
                  isAddPlacePopupOpen={isAddPlacePopupOpen}
                  handleDeleteTrash={handleDeleteTrash}
                  isDeleteTrashOpen={isDeleteTrashOpen}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isRegistrationSuccess}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
