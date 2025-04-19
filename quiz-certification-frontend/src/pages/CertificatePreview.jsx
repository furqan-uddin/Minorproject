import React, { useRef } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { Button } from "../components/ui/button";

const CertificatePreview = () => {
  const certificateRef = useRef();
  const { state } = useLocation();
  const navigate = useNavigate();

  
  if (!state) return <p className="text-center mt-20 text-red-600">Invalid certificate data</p>;

  const { name, category, score, date } = state || {};

  const handleDownloadPDF = () => {
    const element = certificateRef.current;
    const opt = {
      margin: 1,
      filename: `${name || "user"}_certificate.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-center mb-6 gap-5">
        <Button onClick={handleDownloadPDF}>Download as PDF</Button>
        <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
        </Button>
      </div>

      <div
        ref={certificateRef}
        className="bg-white max-w-5xl mx-auto px-10 py-16 rounded-xl border-[10px] border-double border-yellow-500 shadow-2xl relative"
      >
        {/* Title */}
        <h1 className="text-4xl font-serif font-bold text-yellow-700 text-center mb-4">
          Certificate of Achievement
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-600 text-lg mb-2">
          This certificate is proudly presented to
        </p>

        {/* Recipient Name */}
        <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-4">
          {name}
        </h2>

        {/* Achievement */}
        <p className="text-center text-gray-600 text-lg mb-4">
          for successfully completing the <strong>{category}</strong> quiz with a score of
        </p>

        {/* Score */}
        <p className="text-2xl text-center text-green-600 font-semibold mb-6">
          {score}
        </p>

        {/* Date & Signature */}
        <div className="flex justify-between items-center mt-12">
          <div className="text-left">
            <p className="text-gray-500 text-sm">Date</p>
            <p className="font-medium text-gray-800">{date}</p>
          </div>
          <div className="text-center">
            <div className="bg-yellow-500 text-gray-800 font-bold py-1 px-3 rounded-full shadow-md">
              ✔ Verified
            </div>
            <p className="text-sm text-gray-600 mt-2">Quizify Certification</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm">Signature</p>
            <p className="font-medium text-gray-800">Quizify Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;