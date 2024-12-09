import frame from "../assets/Rectangle 14.png";
import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <div className="relative w-full h-auto bg-white overflow-hidden">
        {/* Imagen principal con curva */}
        <img
          src={frame}
          alt="Curved"
          className="w-full h-auto object-cover md:h-[200px]"
          style={{
            clipPath: "ellipse(60% 100% at 50% 0%)",
          }}
        />
      </div>
      <footer class="bg-white border-gray-200 mt-auto">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 md:py-2">
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} class="h-24 w-24 md:h-16 md:w-16" alt="Logo" />
            </a>
          </div>
          <div class="flex md:order-3 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className="flex flex-col items-start w-56 h-30">
              <div className="max-w-sm  bg-white  rounded-lg">
                <div className="flex space-x-8 mt-4 w-52 h-6 justify-center">
                  <svg width="24" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.8192 24H1.32462C0.592836 24 0 23.4068 0 22.6753V1.32461C0 0.592925 0.592929 0 1.32462 0H22.6755C23.407 0 24 0.592925 24 1.32461V22.6753C24 23.4069 23.4069 24 22.6755 24H16.5597V14.7059H19.6793L20.1464 11.0838H16.5597V8.77132C16.5597 7.72264 16.8509 7.00801 18.3546 7.00801L20.2727 7.00717V3.76755C19.9409 3.7234 18.8024 3.62478 17.4778 3.62478C14.7124 3.62478 12.8192 5.31276 12.8192 8.4126V11.0838H9.69156V14.7059H12.8192V24Z" fill="#222222" />
                  </svg>

                  <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 2.36764C23.1182 2.76923 22.1687 3.04081 21.1727 3.16215C22.1898 2.5381 22.9702 1.54857 23.3379 0.369808C22.3856 0.947635 21.3333 1.368 20.2092 1.59335C19.3133 0.612495 18.0328 0 16.6156 0C13.8982 0 11.6936 2.26074 11.6936 5.04875C11.6936 5.44457 11.7359 5.82882 11.8204 6.19863C7.72812 5.98772 4.10072 3.97978 1.67072 0.921633C1.2467 1.66992 1.0044 2.5381 1.0044 3.46262C1.0044 5.21343 1.87357 6.75912 3.19493 7.66486C2.38915 7.6403 1.62846 7.41062 0.96355 7.03503V7.09715C0.96355 9.54424 2.66103 11.5854 4.91495 12.0477C4.5022 12.1661 4.06691 12.2254 3.61754 12.2254C3.30058 12.2254 2.99067 12.195 2.69061 12.1358C3.31749 14.1408 5.13471 15.6013 7.29002 15.6403C5.60521 16.9953 3.48089 17.8028 1.17485 17.8028C0.777601 17.8028 0.384575 17.7797 0 17.7335C2.17926 19.1636 4.76845 20 7.54781 20C16.6057 20 21.5573 12.3077 21.5573 5.63525C21.5573 5.41567 21.5531 5.1961 21.5446 4.98086C22.5068 4.26869 23.3421 3.38028 24 2.36764Z" fill="#222222" />
                  </svg>

                  <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.9879 4.85527C23.8835 7.22196 22.2494 10.4572 19.0969 14.5624C15.8344 18.8551 13.07 21 10.8107 21C9.4137 21 8.22975 19.695 7.26312 17.0765C6.61541 14.674 5.97193 12.2716 5.32563 9.87626C4.60595 7.2563 3.83547 5.94703 3.01137 5.94703C2.83215 5.94703 2.20702 6.32908 1.12891 7.09461L0 5.61936C1.18253 4.56766 2.34813 3.51166 3.49821 2.45852C5.07304 1.07628 6.25698 0.350823 7.04722 0.274986C8.90992 0.0918324 10.0586 1.38393 10.4918 4.14698C10.9532 7.13038 11.2778 8.98482 11.457 9.71171C11.9961 12.1843 12.5859 13.4177 13.2322 13.4177C13.7332 13.4177 14.4867 12.6193 15.4915 11.021C16.4962 9.41981 17.031 8.20355 17.1044 7.36505C17.2483 5.98281 16.7107 5.29598 15.4915 5.29598C14.9171 5.29598 14.3245 5.41904 13.7163 5.6766C14.9016 1.78601 17.1594 -0.105631 20.4954 0.00454819C22.9663 0.0746616 24.1333 1.69443 23.9879 4.85527Z" fill="#222222" />
                  </svg>

                  <svg width="24" height="17" viewBox="0 0 24 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22.806 1.26818C23.5252 2.0016 23.76 3.66708 23.76 3.66708C23.76 3.66708 24 5.62336 24 7.57889V9.4128C24 11.3691 23.76 13.3246 23.76 13.3246C23.76 13.3246 23.5252 14.9901 22.806 15.7235C21.9837 16.5911 21.0719 16.6808 20.5565 16.7314C20.4998 16.737 20.4479 16.7421 20.4015 16.7477C17.043 16.9924 12 17 12 17C12 17 5.76 16.9426 3.84 16.7568C3.74903 16.7397 3.63876 16.7264 3.51388 16.7113C2.9057 16.6378 1.95113 16.5225 1.19325 15.7235C0.474 14.9901 0.24 13.3246 0.24 13.3246C0.24 13.3246 0 11.3691 0 9.4128V7.57889C0 5.62336 0.24 3.66708 0.24 3.66708C0.24 3.66708 0.474 2.0016 1.19325 1.26818C2.0174 0.399349 2.93006 0.310675 3.44548 0.260597C3.50136 0.255167 3.55258 0.250191 3.5985 0.244724C6.957 0 11.9948 0 11.9948 0H12.0052C12.0052 0 17.043 0 20.4015 0.244724C20.4474 0.250199 20.4987 0.255182 20.5546 0.260621C21.0696 0.310704 21.9827 0.39949 22.806 1.26818ZM9.52125 4.84387L9.522 11.635L16.0057 8.25112L9.52125 4.84387Z" fill="#222222" />
                  </svg>

                </div>
                <button type="button" class="px-6 py-3.5 w-56 h-11 mt-3.5 text-base font-medium text-white inline-flex items-center bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:py-2.5 md:mt-2">
                  <div className="font-poppins text-16px md:text-sm ml-2">Donate </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6  ml-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <NavLink
                  to="/"
                  class="block py-2 px-3 font-poppins text-16px md:p-0 text-black bg-blue-700 rounded md:bg-transparent"

                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/mangas"
                  class="block py-2 px-3 font-poppins text-16px md:p-0 text-black bg-blue-700 rounded md:bg-transparent"
                >
                  Mangas
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
