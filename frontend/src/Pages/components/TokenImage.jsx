import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Paperclip } from "lucide-react";

const TokenImageURL = ({ onUploadComplete2 }) => {
  const [fileToUpload, setFileToUpload] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [uploadSignature, setUploadSignature] = useState("");
  const [signatureExpiry, setSignatureExpiry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);

  useEffect(() => {
    const getUploadSignature = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/image-upload/signature`
        );
        if (response.status === 200) {
          setUploadSignature(response.data.signature);
          setSignatureExpiry(response.data.expire);
        } else {
          setStatusMessage("Failed to fetch upload signature.");
          setUploadSuccess(false);
        }
      } catch (error) {
        setStatusMessage("Failed to fetch upload signature.");
        setUploadSuccess(false);
      }
    };

    getUploadSignature();
  }, []);

  const uploadFile = async (file) => {
    if (!file) {
      setStatusMessage("Please select a file first.");
      setUploadSuccess(false);
      return;
    }

    if (!uploadSignature || !signatureExpiry) {
      setStatusMessage("Failed to get upload signature. Please try again.");
      setUploadSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append(
      "UPLOADCARE_PUB_KEY",
      import.meta.env.VITE_UPLOAD_PUBLIC_KEY
    );
    formData.append("signature", uploadSignature);
    formData.append("expire", signatureExpiry);
    formData.append("file", file);

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://upload.uploadcare.com/base/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setStatusMessage("File uploaded successfully.");
      setUploadSuccess(true);
      if (onUploadComplete2) {
        onUploadComplete2(response.data.file);
      }
      console.log("Response:", response.data.file);
    } catch (error) {
      setStatusMessage("File upload failed.");
      setUploadSuccess(false);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelection = (event) => {
    const selectedFile = event.target.files[0];
    setFileToUpload(selectedFile);
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  return (
    <div className="flex rounded-none flex-col items-center justify-center gap-2">
      <div className="w-">
        <input
          type="file"
          id="fileUploader"
          onChange={handleFileSelection}
          className="hidden"
        />
        <label
          htmlFor="fileUploader"
          className="flex items-center pl-2 border-2 py-[6.5px] px-1  border-l-0"
        >
          <Paperclip className="h-"/>
        </label>
      </div>
      {/* {statusMessage && (
        <p className={`text-sm ${uploadSuccess ? "text-green-500" : "text-red-500"}`}>
          {statusMessage}
        </p>
      )}
      {isLoading && <p className="text-sm text-blue-500">Uploading...</p>} */}
    </div>
  );
};

TokenImageURL.propTypes = {
  onUploadComplete2: PropTypes.func.isRequired,
};

export default TokenImageURL;
