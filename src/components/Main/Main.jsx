import { useContext } from "react";
import Card from "./Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfile from "./popup/EditProfile/EditProfile";
import NewCard from "./popup/NewCard/NewCard";
import EditAvatar from "./popup/EditAvatar/EditAvatar";
import RemoveCard from "./popup/RemoveCard/RemoveCard";
import ImagePopup from "./popup/ImagePopup/ImagePopup";

function Main(props) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;

  if (!currentUser) return null;

  return (
    <main className="content">
      <section className="content__profile">
        <div className="content__pencil">
          <img
            className="content__image"
            src={currentUser.avatar}
            alt="avatar de usuario"
          />
          <button
            onClick={props.onEditAvatarclick}
            className="content__image-overlay"
          ></button>
        </div>

        <div className="content__info">
          <span className="content__name">{currentUser.name}</span>
          <p className="content__profession">{currentUser.about}</p>
        </div>
        <button
          onClick={props.onEditProfileclick}
          className="content__edit-button"
        ></button>
        <div className="content__profile-button">
          <button
            onClick={props.onEditAddPlaceclick}
            className="content__plus-button"
          ></button>
        </div>
      </section>

      <section className="content__elements">
        {props.cards?.map((element, index) => {
          return (
            <Card
              key={index}
              card={element}
              onCardClick={props.onCardClick}
              onEditDeleteTrashclick={props.onEditDeleteTrashclick}
              onLikeClick={props.onHandleCardLike}
              onDeleteClick={props.onHandleCardDelete}
            />
          );
        })}
      </section>
      <ImagePopup
        name="popup-image"
        selectedCard={props.selectedCard}
        onClose={props.closeAllPopups}
      />
      <EditAvatar
        handleEditAvatar={props.handleEditAvatar}
        isEditAvatarPopupOpen={props.isEditAvatarPopupOpen}
        onClose={props.closeAllPopups}
      />
      <EditProfile
        handleEditProfile={props.handleEditProfile}
        isEditProfilePopupOpen={props.isEditProfilePopupOpen}
        onClose={props.closeAllPopups}
      />
      <NewCard
        handleAddPlace={props.handleCreateCard}
        isAddPlacePopupOpen={props.isAddPlacePopupOpen}
        onClose={props.closeAllPopups}
      />
      <RemoveCard
        handleDeleteTrash={props.handleDeleteTrash}
        isDeleteTrashOpen={props.isDeleteTrashOpen}
        onClose={props.closeAllPopups}
      />
    </main>
  );
}

export default Main;
