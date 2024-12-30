import { useNavigate } from 'react-router-dom';

import React from 'react';



const ListingCard_A = ({ orid, title, host, status, price, location, seller }) => {
  

 

 

  return (
    <div
      
      className="border p-4 rounded-lg shadow-md hover:text-gray-800 transform transition-transform duration-200 hover:scale-110 cursor-pointer"
    >
      

      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500">ORID: {orid}</p>
      <p className="text-sm text-gray-500">Hosted by {host}</p>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="text-lg font-bold">${price} /day</p>
      <p className="text-lg font-bold">{status}</p>
      <div className="mb-6">
        <p className="text-xl font-semibold text-gray-800 mb-2">Seller Info:</p>
        <p className="text-lg text-gray-700">{seller || 'No seller information available'}</p>
      </div>
     
    </div>
  );
};

export default ListingCard_A;
