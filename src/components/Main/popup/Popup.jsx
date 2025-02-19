import { useEffect } from "react";

function Popup({
  onClose,
  name,
  title,
  isOpen,
  onSubmit,
  children,
  buttonText = "Guardar",
  showButton = true,
  showText = true,
}) {
  function handleClick(e) {
    e.preventDefault();
    onSubmit();
  }

  function handleClickClose() {
    onClose();
  }
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);
  return (
    <>
      <div className={`popup ${isOpen ? "popup_show" : ""}`} id={name}>
        <form
          className={`popup__form popup_type_${name} popup__edit-profile`}
          id="form-profile"
        >
          <button
            type="button"
            onClick={handleClickClose}
            className="popup__close"
          ></button>
          {showText && <h2 className="popup__title">{title}</h2>}
          {children}
          {showButton && (
            <button
              onClick={handleClick}
              className="popup__update"
              type="submit"
              id="btn"
            >
              {buttonText}
            </button>
          )}
        </form>
        <div className="popup__overlay"></div>
      </div>
    </>
  );
}

export default Popup;
