
function SuccessModal() {
  return (
    <div
      className="flex fixed justify-center w-screen h-screen left-0 top-0 p-5 text-white items-center backdrop-blur-lg z-[1000]"
      data-aos="zoom-in"
    >
      <div className="flex flex-col items-center gap-5 bg-gradient-to-r from-[#34104A] to-[#250939] p-10 rounded-3xl">
        {/* <div className="items-end justify-end flex w-full">
          <button className="items-end justify-end flex ">
            <i className="ri-close-fill text-3xl"></i>
          </button>
        </div> */}
        <i className="ri-checkbox-circle-line text-7xl text-green-500"></i>
        <p className="text-center text-[14px] sm:text-[18px]">Email Sent Successfully.</p>
      </div>
    </div>
  );
}

export default SuccessModal;