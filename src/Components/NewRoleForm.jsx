import React from "react";
import { useNavigate } from "react-router-dom"; 
import logo from "../assets/logo.png"; 
import defaultImage from "../assets/changerole.jpg"; 

import person1 from "../assets/person1.jpg"; 
import person2 from "../assets/person2.jpg"; 
import person3 from "../assets/person3.jpg"; 
import persona from "../assets/person4.jpg"; 
import personb from "../assets/person5.jpg"; 
import personc from "../assets/person6.jpg"; 

const NewRole = () => {
  const navigate = useNavigate(); 

  const handleJoin = (selectedRole) => {
    console.log('Navegando a NewRoleForm con rol:', selectedRole);
    navigate('/NewRoleFormOne', { 
      state: { role: selectedRole } 
    });
  };
  const handleJoinDos = (selectedRole) => {
    console.log('Navegando a NewRoleForm con rol:', selectedRole);
    navigate('/NewRoleFormTwo', { 
      state: { role: selectedRole } 
    });
  };

  const peopleImages = [person1, person2, person3];
  const peopleImages1 = [persona, personb, personc];

  return (
    <div className="flex w-full h-screen mt-16 md:mt-0">
      
      <div className="flex justify-center items-center w-full md:w-2/3 p-6">
        <div className="w-full max-w-sm text-center">
          
          <div className="flex flex-col items-center mb-4">
            
            <p className="text-4xl p-8 text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 mb-2 whitespace-nowrap">
              Change role to
            </p>

            
            <img
              src={logo}
              alt="Logo"
              className="w-[17vh] h-[17vh] mb-6 mx-auto"
            />
          </div>

          
          <div className="flex flex-col items-center space-y-4">
            
            <button
              onClick={() => handleJoin("Author")}
              className="md:w-[40vw] md:h-[12vh] border border-pink-500 text-pink-500 rounded-2xl xl:text-3xl md:text-sm hover:bg-pink-400 transition-colors bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-transparent bg-clip-text relative flex justify-between items-center px-8"
            >
              
              <div className="relative flex items-center space-x-2">
                
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white absolute top-0 left-1/2 transform -translate-x-1/2 hidden xl:block">
                  <img src={peopleImages1[1]} alt="Person 1" className="w-full h-full object-cover" />
                </div>

                
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white hidden xl:block">
                  <img src={peopleImages1[2]} alt="Person 2" className="w-full h-full object-cover" />
                </div>

                
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white ml-8 hidden xl:block">
                  <img src={peopleImages1[0]} alt="Person 3" className="w-full h-full object-cover" />
                </div>
              </div>

              
              <div className="ml-8 xl:ml-0 text-left xl:mr-20">
                <p className="font-bold text-[clamp(1.25rem,5vw,2rem)] sm:text-xl lg:text-2xl xl:text-2xl">Join as an Author!</p>
                <p className="text-sm">I’m a company and I want to publish my comics</p>
              </div>
            </button>

            
            <button
              onClick={() => handleJoinDos("Company")}
              className="md:w-[40vw] md:h-[12vh] border border-pink-500 text-pink-500 rounded-2xl  hover:bg-pink-400 transition-colors bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 text-transparent bg-clip-text relative flex justify-between items-center px-8"
            >
              
              <div className="relative flex items-center space-x-2">
                
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white absolute top-0 left-1/2 transform -translate-x-1/2 hidden xl:block">
                  <img src={peopleImages[1]} alt="Person 1" className="w-full h-full object-cover" />
                </div>

                
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white hidden xl:block">
                  <img src={peopleImages[0]} alt="Person 2" className="w-full h-full object-cover" />
                </div>

                
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white ml-6 hidden xl:block">
                  <img src={peopleImages[2]} alt="Person 3" className="w-full h-full object-cover" />
                </div>
              </div>

              
              <div className="ml-8 xl:ml-0 text-left xl:mr-20">
                <p className="font-bold text-[clamp(1.25rem,5vw,2rem)] sm:text-xl lg:text-xl xl:text-2xl">Join as Company!</p>
                <p className="text-sm">I’m a company and I want to publish my comics</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      
      <div className="relative justify-center items-center w-2/3 h-full hidden md:block">
        
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

        <img
          src={defaultImage}
          alt="Default"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default NewRole;