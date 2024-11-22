import React, { useState, useEffect, useRef } from 'react';

function Popup({ imageSrc }) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && popupRef.current && !imageRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, popupRef, imageRef]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="popup" ref={popupRef} onClick={handleClose}>
          <div className="popup-content">
            <img src={imageSrc} alt="Popup Image" ref={imageRef} />
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;
