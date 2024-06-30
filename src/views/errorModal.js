import React, { useRef } from "react";

function ErrorModal({ closeModal }) {
  const modalRef = useRef();
  const bgModal = (e) => {
    if (modalRef.current == e.target) {
      closeModal();
    }

  };
  return (
    <div ref={modalRef} onClick={bgModal}
      className="flex fixed justify-center w-screen h-screen left-0 top-0 p-5 text-white items-center backdrop-blur-lg z-[1000]"
      data-aos="zoom-in"
    >
      <div className="flex flex-col items-center gap-5 sm:gap-10 bg-gradient-to-r from-[#34104A] to-[#250939] p-10 rounded-3xl">
        <div className="items-end justify-end flex w-full">
          <button className="items-end justify-end flex ">
            <i className="ri-close-fill text-3xl" onClick={closeModal}></i>
          </button>
        </div>
        <i className="ri-close-circle-line text-7xl sm:text-8xl text-red-600"></i> 
        <p className="text-center text-[14px] sm:text-[18px]">There was an error. Please Try again.</p>
      </div>
    </div>
  );
}

export default ErrorModal;
