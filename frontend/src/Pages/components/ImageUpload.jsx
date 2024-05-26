import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import PropTypes from "prop-types";

const ImageUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [signature, setSignature] = useState("");
  const [expire, setExpire] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

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
        }
      } catch (error) {
        setUploadStatus("Failed to fetch upload signature.");
      }
    };

    fetchSignature();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploaded(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    if (!signature || !expire) {
      setUploadStatus("Failed to get upload signature. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("UPLOADCARE_PUB_KEY", import.meta.env.VITE_UPLOAD_PUBLIC_KEY);
    formData.append("signature", signature);
    formData.append("expire", expire);
    formData.append("file", selectedFile);

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
      setUploaded(true);
      if (onUploadSuccess) {
        onUploadSuccess(response.data.file);
      }
      console.log("Response:", response.data.file);
    } catch (error) {
      setUploadStatus("File upload failed.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mt-2 aspect-square h-32 w-32 rounded-full object-cover"
        />
      )}
      <Input type="file" onChange={handleFileChange} />
      {uploaded && !loading ? (
        <Button className="flex items-center gap-2 mt-2 w-32">
          <Upload className="h-4 w-4" /> Uploaded
        </Button>
      ) : (
        <Button
          className="flex items-center gap-2 mt-2 w-32"
          onClick={handleUpload}
          disabled={!selectedFile || loading}
        >
          <Upload className="h-4 w-4" /> {loading ? "Uploading..." : "Upload"}
        </Button>
      )}
      <p>{uploadStatus}</p>
    </div>
  );
};
ImageUpload.propTypes = {
    onUploadSuccess: PropTypes.func.isRequired,
  };
  
export default ImageUpload;
