import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/ticket.png"

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
                  <div className="artboard artboard-demo phone-1 bg-cover bg-no-repeat	"
                  style={{
                    backgroundImage:
                      "url(https://i.pinimg.com/236x/a7/d8/b5/a7d8b55277aa17c40fce3cfe9c13e3f5.jpg)",
                  }}
                  >
                    {/* <img src={Image} alt="ticket" className="w-full h-full" /> */}
                  
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

        <section className="pb-20 bg-blueGray-200 -mt-24">
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
        </section>
      </main>
      <Footer />
    </>
  );
}
