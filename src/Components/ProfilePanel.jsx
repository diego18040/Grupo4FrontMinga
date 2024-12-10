import React, { useState } from 'react';

const ProfileForm = () => {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [birthdate, setBirthdate] = useState('');

  
  const handleSave = () => {
    alert("Data saved");
  };

  const handleDelete = () => {
    alert("Data deleted");

    setName('');
    setSurname('');
    setAddress('');
    setImageUrl('');
    setBirthdate('');
  };

  return (
    <div className="absolute top-[10%] md:top-1/2 left-1/2 transform -translate-x-1/2 w-[95%] bg-white p-8 rounded-lg shadow-lg flex items-center justify-center opacity-100 sm:flex-row flex-col-reverse">
      
      <div className="w-full sm:w-4/4 md:w-[60%] lg:w-[50%] xl:w-[40%] p-10 pt-[6%] gap-6 opacity-100 sm:mr-24 sm:mb-0 mb-8">
        <form>

          <div className="relative w-full mb-6">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              placeholder="Enter your name"
            />
            <label
              htmlFor="name"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${name ? 'text-xs -translate-y-6' : 'text-base'}`}
            >
              Enter your name
            </label>
          </div>


          <div className="relative w-full mb-6">
            <input
              id="surname"
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              placeholder="Enter your surname"
            />
            <label
              htmlFor="surname"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${surname ? 'text-xs -translate-y-6' : 'text-base'}`}
            >
              Enter your surname
            </label>
          </div>


          <div className="relative w-full mb-6">
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              placeholder="Enter your address"
            />
            <label
              htmlFor="address"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${address ? 'text-xs -translate-y-6' : 'text-base'}`}
            >
              Enter your address
            </label>
          </div>


          <div className="relative w-full mb-6">
            <input
              id="birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 appearance-none text-base"
            />
            <label
              htmlFor="birthdate"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${birthdate ? 'text-xs -translate-y-6' : 'text-base'}`}
            />
          </div>


          <div className="relative w-full mb-6">
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-transparent focus:outline-none placeholder-transparent border-b-2 border-gray-300 focus:border-blue-500 text-base"
              placeholder="Enter the image URL"
            />
            <label
              htmlFor="imageUrl"
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 ${imageUrl ? 'text-xs -translate-y-6' : 'text-base'}`}
            >
              Enter the image URL
            </label>
          </div>


          <div className="flex flex-col space-y-6 justify-center">
            <button
              type="button"
              onClick={handleSave}
              className="w-full h-[65px] bg-[#34D399] text-white px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[15px] font-bold leading-[29.26px] text-center"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full h-[65px] bg-[#FBDDCC] text-[#EE837F] px-[55px] py-[20px] rounded-[50000px] opacity-100 font-montserrat text-[15px] font-bold leading-[29.26px] text-center"
            >
              Delete account
            </button>
          </div>
        </form>
      </div>


      <div className="w-full sm:w-1/3 flex justify-center sm:ml-24 sm:mb-0 mb-8 sm:mt-0 mt-[5vh]">
  <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4">
    <img
      src={imageUrl || "https://via.placeholder.com/150"}
      alt="Avatar"
      className="w-full h-full object-cover"
    />
  </div>
</div>

    </div>
  );
};

export default ProfileForm;


