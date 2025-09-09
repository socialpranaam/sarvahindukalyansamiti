import React from "react";

const QRDonation = () => {
  return (
    <section className="bg-[#ffeed8] py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          QR कोड स्कैन करके दान करें
        </h2>
        <p className="text-gray-600">
          किसी भी UPI ऐप से QR कोड स्कैन करें और दान करें
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=dummy@upi"
            alt="Donate via QR"
            className="w-64 h-64"
          />
        </div>
      </div>
    </section>
  );
};

export default QRDonation;
