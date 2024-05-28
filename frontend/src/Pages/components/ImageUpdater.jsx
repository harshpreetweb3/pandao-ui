import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import PropTypes from "prop-types";

const ImageUpdater = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [signature, setSignature] = useState("");
  const [expire, setExpire] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);


  useEffect(() => {
    const fetchSignature = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/image-upload/signature`
        );
        if (response.status === 200) {
          setSignature(response.data.signature);
          setExpire(response.data.expire);
        } else {
          setUploadStatus("Failed to fetch upload signature.");
          setIsSuccess(false);
        }
      } catch (error) {
        setUploadStatus("Failed to fetch upload signature.");
        setIsSuccess(false);
      }
    };

    fetchSignature();
  }, []);

  const handleUpload = async (file) => {
    if (!file) {
      setUploadStatus("Please select a file first.");
      setIsSuccess(false);
      return;
    }

    if (!signature || !expire) {
      setUploadStatus("Failed to get upload signature. Please try again.");
      setIsSuccess(false);
      return;
    }

    const formData = new FormData();
    formData.append("UPLOADCARE_PUB_KEY", import.meta.env.VITE_UPLOAD_PUBLIC_KEY);
    formData.append("signature", signature);
    formData.append("expire", expire);
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://upload.uploadcare.com/base/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("File uploaded successfully.");
      setIsSuccess(true);
      if (onUploadSuccess) {
        onUploadSuccess(response.data.file);
      }
      console.log("Response:", response.data.file);
    } catch (error) {
      setUploadStatus("File upload failed.");
      setIsSuccess(false);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 mt-2">
      <Input type="file" onChange={handleFileChange} className="w-1/2 m-0" />
      {uploadStatus && (
        <p className={`text-sm ${isSuccess ? "text-green-500" : "text-red-500"}`}>
          {uploadStatus}
        </p>
      )}
      {loading && <p className="text-sm text-blue-500">Uploading...</p>}
    </div>
  );
};

ImageUpdater.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
};

export default ImageUpdater;
