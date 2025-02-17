import Popup from "../Popup";

export default function RemoveCard(props) {
  return (
    <Popup
      name="delete-card"
      title="¿Estás seguro?"
      onSubmit={props.handleDeleteTrash}
      isOpen={props.isDeleteTrashOpen}
      onClose={props.onClose}
      buttonText="Sí"
    ></Popup>
  );
}
