import React from 'react';
import { useParams } from 'react-router-dom';

const ShowBarcode = () => {
  const { id } = useParams();
  const qrCodeUrl = `http://localhost:3001/show_barcode/${id}`;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>Scan to join the room </h1>
        <img src={qrCodeUrl} alt="QR Code" className="img-fluid" />
      </div>
    </div>
  );
};

export default ShowBarcode;
