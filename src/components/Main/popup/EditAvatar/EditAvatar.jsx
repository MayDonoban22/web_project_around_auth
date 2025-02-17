import { useState, useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import Popup from "../Popup";

export default function EditAvatar(props) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");

  function handleSubmit() {
    props.handleEditAvatar({ avatar });
  }

  return (
    <Popup
      name="edit-avatar"
      title="Actualizar foto de perfil"
      onSubmit={handleSubmit}
      isOpen={props.isEditAvatarPopupOpen}
      onClose={props.onClose}
      buttonText="Actualizar"
    >
      <input
        type="url"
        name="avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
        id="input-card-link"
        placeholder="imagen  URL"
        className="popup__item"
      />
      <span className="popup__input-error input-card-link-error"></span>
    </Popup>
  );
}
