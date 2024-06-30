import React, { useState } from "react";
import axios from "axios";
import './comingSoon.css'

import InvalidEmail from "./invalidEmail";
import ErrorModal from "./errorModal";
import SuccessModal from "./successModal";
import ExistingUser from "./existingUserModal";

import adroxLogo from "./assets/adrox-logo2.png";
import adroxLogo2 from "./assets/adrox-logo.png";
import planetBg from "./assets/planetBg.png";
import instaLogo from "./assets/instaLogo.png";

import heading from "./assets/heading.png";

function ComingSoon(props) {
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [existingUser, setExistingUser] = useState(false); // represents existing user validation.

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setInvalidEmail(true);
      setIsLoading(false);
      return;
    }

    console.log("Email: ", email);

    try {
      const response = await axios.post(
        "https://adrox-89b6c88377f5.herokuapp.com/api/subscribe/",
        { email }
      );
      console.log("Response: ", response.data.email);
      setEmailSent(true); // Clear the error message if the request is successful
      handleSuccessModal();

      // if (
      //   Array.isArray(response.data.email) &&
      //   response.data.email[0] ===
      //     "subscription with this email already exists."
      // ) {
      //   setExistingUser(true);
      // } else {
      //   setEmailSent(true);
      //   handleSuccessModal();
      // }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response.data);
        setShowError(true);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        setShowError(true);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setShowError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  function handleSuccessModal() {
    // if (emailSent) {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);
    // }
  }

  return (
    <div
      className="bg-[#0F011A] relative w-screen max-h-screen text-white overflow-hidden max-sm:bg-center-left-40 bg-small bg-default"
      // style={{
      //   backgroundImage: `url(${planetBg})`,
      //   // backgroundSize: "cover",
      //   // backgroundPosition: "center",
      // }}
    >
      <div className="flex justify-center items-center w-full h-screen">
        <div>
          <img
            src={adroxLogo2}
            className="absolute top-5 sm:top-10 left-5 sm:left-10 w-36 sm:w-44"
          ></img>
          <a 
            href="https://www.instagram.com/adxorg?igsh=eHBvazZkZThmZ2dj"
            target="blank"
          >
            <img
              src={instaLogo}
              className="absolute bottom-20 sm:bottom-10 left-[45vw] sm:left-10 w-10 sm:w-14 cursor-pointer"
              target="blank"
            ></img>
          </a>
        </div>
        <div className="flex flex-col gap-7 font-nunito w-full items-center z-50  max-sm:-mt-20">
          <img src={adroxLogo} className="w-28 sm:w-44" alt="Adrox Logo" />
          <img
            src={heading}
            className="w-[20rem] sm:w-[25rem] md:w-[35rem] lg:w-[40rem]"
          ></img>

          <p className="text-[14px] sm:text-[24px] md:text-[32px] font-300 w-[35rem] max-sm:w-[90vw] text-center">
            We'll let you know when we are Launching
          </p>
          {!emailSent ? (
            <div className="flex justify-center text-[14px] sm:text-[28px] font-300 h-[2rem] sm:h-[3rem] md:h-[4rem] w-full sm:w-[80vw] md:w-full object-contain">
              <input
                className="px-3 md:p-8 rounded-l-md font-poppins outline-none text-black max-md:w-3/5 "
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
              <button
                disabled={isLoading}
                className="px-3 sm:px-5 md:px-12 h-full rounded-r-md bg-gradient-to-r from-[#ffffffc1] to-[#6254BD]"
                onClick={handleSubmit}
              >
                {isLoading ? "Loading..." : "Notify Me"}
              </button>
            </div>
          ) : (
            <div>
              <div
                className="flex gap-5 items-center max-sm:ps-[12vw] justify-center"
                data-aos="fade-in"
              >
                <i className="ri-checkbox-circle-line text-6xl text-[#AA00FE]"></i>
                <p className="text-[24px] sm:text-[32px] text-green-500 font-bold">
                  Email Sent Successfully.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        {invalidEmail && (
          <InvalidEmail
            closeModal={() => setInvalidEmail(false)}
          ></InvalidEmail>
        )}
        {showError && (
          <ErrorModal closeModal={() => setShowError(false)}></ErrorModal>
        )}
        {existingUser && (
          <ExistingUser
            closeModal={() => setExistingUser(false)}
          ></ExistingUser>
        )}
        {showSuccessModal && <SuccessModal></SuccessModal>}
      </div>
    </div>
  );
}

export default ComingSoon;
