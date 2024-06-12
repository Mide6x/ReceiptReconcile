import { useState } from "react";

const UploadReceiptsPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log("File submitted:", selectedFile);
  };

  return (
    <div className="container">
      <h2>Upload Receipts</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="receiptUpload">Upload Receipt</label>
          <input
            type="file"
            className="form-control-file"
            id="receiptUpload"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UploadReceiptsPage;
