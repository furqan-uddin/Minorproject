// quiz-certification-frontend/src/pages/CertificatePreview.jsx
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { Button } from "../components/ui/button";

const CertificatePreview = () => {
  const certificateRef = useRef();
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p className="text-center mt-20 text-red-600">Invalid certificate data</p>;

  const { name, category, score, date } = state;

  const handleDownloadPDF = () => {
    const opt = {
      margin: 0.5,
      filename: `${name}_certificate.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
    };
    html2pdf().set(opt).from(certificateRef.current).save();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <Button onClick={handleDownloadPDF}>Download PDF</Button>
        <Button onClick={() => navigate("/dashboard")} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      <div
        ref={certificateRef}
        className="bg-white max-w-5xl mx-auto px-6 sm:px-10 py-10 sm:py-16 border-8 border-yellow-400 border-double rounded-2xl shadow-lg text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-yellow-700 mb-4">Certificate of Achievement</h1>
        <p className="text-lg text-gray-600">Presented to</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-700 my-2">{name}</h2>
        <p className="text-gray-700 text-lg">
          for successfully completing the <strong>{category}</strong> quiz with a score of
        </p>
        <p className="text-2xl text-green-600 font-bold my-4">{score}</p>

        <div className="flex justify-between items-center mt-10 text-sm sm:text-base">
          <div className="text-left">
            <p className="text-gray-500">Date</p>
            <p className="text-gray-800 font-medium">{date}</p>
          </div>
          <div>
            <span className="bg-yellow-400 px-4 py-1 rounded-full font-semibold text-gray-800 shadow">
              ✔ Verified
            </span>
            <p className="mt-2 text-gray-600">Quizify Certification</p>
          </div>
          <div className="text-right">
            <p className="text-gray-500">Signature</p>
            <p className="text-gray-800 font-medium">Quizify Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;
