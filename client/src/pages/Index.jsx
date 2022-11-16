import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/ticket.jpg";

// components

import Navbar from "../components/Navbars/AuthNavbar.js";
import Footer from "../components/Footers/Footer.js";

export default function Landing() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-screen">
          <div
            className="absolute top-0 w-full h-screen bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images2.alphacoders.com/671/thumb-1920-671500.jpg')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
            <div className=" flex justify-center items-center mt-32">
              <div className="mockup-phone ">
                <div className="camera"></div>
                <div className="display">
                  <div
                    className="artboard artboard-demo phone-1 bg-cover bg-no-repeat	"
                    // style={{
                    //   backgroundImage:
                    //     "url(https://i.pinimg.com/236x/a7/d8/b5/a7d8b55277aa17c40fce3cfe9c13e3f5.jpg)",
                    // }}
                  >
                    <img src={Image} alt="ticket" className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        {/* <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-current w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-red-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="48"
                        height="48"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8h4v2h-6V7h2v5z"
                          fill="rgba(255,255,255,1)"
                        />
                      </svg>
                    </div>
                    <h6 className="text-xl font-semibold text-white">
                      Awarded Agency
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500 text-white">
                      Divide details about your product or agency work into
                      parts. A paragraph describing a feature will be enough.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-current w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-blue-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="48"
                        height="48"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M17 20H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1H3v-8H2V8h1V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3h1v4h-1v8h-1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1zm2-8V5H5v7h14zm0 2H5v4h14v-4zM6 15h4v2H6v-2zm8 0h4v2h-4v-2z"
                          fill="rgba(255,255,255,1)"
                        />
                      </svg>
                    </div>
                    <h6 className="text-xl font-semibold text-white">
                      Free Revisions
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500 text-white">
                      Keep you user engaged by providing meaningful information.
                      Remember that by this time, the user is curious.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-current w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="48"
                        height="48"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M.69 6.997A17.925 17.925 0 0 1 12 3c4.285 0 8.22 1.497 11.31 3.997L21.425 9.33A14.937 14.937 0 0 0 12 6C8.43 6 5.15 7.248 2.575 9.33L.69 6.997zm3.141 3.89A12.946 12.946 0 0 1 12 8c3.094 0 5.936 1.081 8.169 2.886l-1.885 2.334A9.958 9.958 0 0 0 12 11c-2.38 0-4.566.832-6.284 2.22l-1.885-2.334zm3.142 3.89A7.967 7.967 0 0 1 12 13c1.904 0 3.653.665 5.027 1.776l-1.885 2.334A4.98 4.98 0 0 0 12 16a4.98 4.98 0 0 0-3.142 1.11l-1.885-2.334zm3.142 3.89A2.987 2.987 0 0 1 12 18c.714 0 1.37.25 1.885.666L12 21l-1.885-2.334z"
                          fill="rgba(255,255,255,1)"
                        />
                      </svg>
                    </div>
                    <h6 className="text-xl font-semibold text-white">
                      Verified Company
                    </h6>
                    <p className="mt-2 mb-4 text-blueGray-500 text-white">
                      Write a few lines about each one. A paragraph describing a
                      feature will be enough. Keep you user engaged!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      {/* component */}
      <div
        id="team"
        className="section relative pt-20 pb-8 md:pt-16 bg-white dark:bg-gray-800"
      >
        <div className="container xl:max-w-6xl mx-auto px-4">
          {/* section header */}
          <header className="text-center mx-auto mb-12">
            <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100">
              <span className="font-light">Creat</span> By
            </h2>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 60"
              style={{ margin: "0 auto", height: "35px" }}
              xmlSpace="preserve"
            >
              <circle
                cx="50.1"
                cy="30.4"
                r={5}
                className="stroke-primary"
                style={{
                  fill: "transparent",
                  strokeWidth: 2,
                  strokeMiterlimit: 10,
                }}
              />
              <line
                x1="55.1"
                y1="30.4"
                x2={100}
                y2="30.4"
                className="stroke-primary"
                style={{ strokeWidth: 2, strokeMiterlimit: 10 }}
              />
              <line
                x1="45.1"
                y1="30.4"
                x2={0}
                y2="30.4"
                className="stroke-primary"
                style={{ strokeWidth: 2, strokeMiterlimit: 10 }}
              />
            </svg>
          </header>
          {/* end section header */}
          {/* row */}
          <div className="flex flex-wrap flex-row -mx-4 justify-center">
            <div className="flex-shrink max-w-full px-4 w-2/3 sm:w-1/2 md:w-5/12 lg:w-1/4 xl:px-6">
              <div
                className="relative overflow-hidden bg-white dark:bg-gray-800 mb-12 hover-grayscale-0 wow fadeInUp"
                data-wow-duration="1s"
                style={{
                  visibility: "visible",
                  animationDuration: "1s",
                  animationName: "fadeInUp",
                }}
              >
                {/* team block */}
                <div className="relative overflow-hidden px-6">
                  <img
                    src="https://github.com/AmineElazzab.png"
                    className="max-w-full h-auto mx-auto rounded-full bg-gray-50 grayscale"
                    alt="title image"
                  />
                </div>
                <div className="pt-6 text-center">
                  <p className="text-lg leading-normal font-bold mb-1">
                    Mohammed Amine Elazzab
                  </p>
                  
                  {/* social icon */}
                  <div className="mt-2 mb-5 space-x-2">
                    
                    <a
                      className="hover:text-blue-700"
                      aria-label="Facebook link"
                      href="#"
                    >
                      {/* <i class="fab fa-facebook text-facebook"></i> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block"
                        width="1rem"
                        height="1rem"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z"
                        />
                      </svg>
                    </a>
                    <a
                      className="hover:text-blue-700"
                      aria-label="Instagram link"
                      href="#"
                    >
                      {/* <i class="fab fa-instagram text-instagram"></i> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block"
                        width="1rem"
                        height="1rem"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M349.33,69.33a93.62,93.62,0,0,1,93.34,93.34V349.33a93.62,93.62,0,0,1-93.34,93.34H162.67a93.62,93.62,0,0,1-93.34-93.34V162.67a93.62,93.62,0,0,1,93.34-93.34H349.33m0-37.33H162.67C90.8,32,32,90.8,32,162.67V349.33C32,421.2,90.8,480,162.67,480H349.33C421.2,480,480,421.2,480,349.33V162.67C480,90.8,421.2,32,349.33,32Z"
                        />
                        <path
                          fill="currentColor"
                          d="M377.33,162.67a28,28,0,1,1,28-28A27.94,27.94,0,0,1,377.33,162.67Z"
                        />
                        <path
                          fill="currentColor"
                          d="M256,181.33A74.67,74.67,0,1,1,181.33,256,74.75,74.75,0,0,1,256,181.33M256,144A112,112,0,1,0,368,256,112,112,0,0,0,256,144Z"
                        />
                      </svg>
                    </a>
                    <a
                      className="hover:text-blue-700"
                      aria-label="Linkedin link"
                      href="#"
                    >
                      {/* <i class="fab fa-linkedin text-linkedin"></i> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="inline-block"
                        width="1rem"
                        height="1rem"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              {/* end team block */}
            </div>
          </div>
          {/* end row */}
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
