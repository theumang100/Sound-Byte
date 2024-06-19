import React, { useState, useEffect } from 'react';

const ShowBarcode = () => {
  const [uniqueId, setUniqueId] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    if (uniqueId) {
      setQrCodeUrl(`http://localhost:3001/show_barcode/${uniqueId}`);
    }
  }, [uniqueId]);

  const handleInputChange = (event) => {
    setUniqueId(event.target.value);
  };

  return (
    <div>
      <h1>QR Code Display</h1>
      <input 
        type="text" 
        value={uniqueId} 
        onChange={handleInputChange} 
        placeholder="Enter Unique ID" 
      />
      {uniqueId && <img src={qrCodeUrl} alt={`QR Code for ${uniqueId}`} />}
    </div>
  );
};

export default ShowBarcode;
