// src/components/FileManager/FileManager.jsx
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import FileUploader from "./FileUploader";
import FileList from "./FileList";
import FilePreview from "./FilePreview";
import FolderList from "./FolderList";
import {
  uploadFile,
  fetchUserFiles,
  deleteFile,
} from "../../services/fileService";

export default function FileManager() {
  const { userId } = useAuth();
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [folders, setFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);

  // Load user's files when component mounts
  useEffect(() => {
    const loadFiles = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const userFiles = await fetchUserFiles(userId);
        setFiles(userFiles);
      } catch (err) {
        setError("Failed to load files. Please try again later.");
        console.error("Error loading files:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFiles();
  }, [userId]);

  const handleFileUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {
      // Create FormData with only the file
      const formData = new FormData();
      formData.append("file", file);

      // Add more detailed logging
      console.log("Starting upload for file:", file.name);

      const response = await uploadFile(formData, (progress) => {
        setUploadProgress(progress);
        console.log(`Upload progress: ${progress}%`);
      });

      // Log the response for debugging
      console.log("Upload response:", response);

      // More flexible response handling
      if (response) {
        const newFile = {
          id: response.file_id || `temp-${Date.now()}`,
          name: file.name,
          type: response.document_type || file.type,
          downloadUrl: response.download_url || "",
          text: response.text || "",
          uploadedAt: new Date().toISOString(),
        };

        setFiles((prev) => [newFile, ...prev]);
      } else {
        throw new Error("Empty response from server");
      }
    } catch (err) {
      setError(err.message || "An error occurred during upload");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSelectFile = (file) => {
    setSelectedFile(file);
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) {
      return;
    }

    try {
      await deleteFile(fileId, userId);
      setFiles(files.filter((file) => file.id !== fileId));
      if (selectedFile?.id === fileId) {
        setSelectedFile(null);
      }
    } catch (err) {
      console.error("Error deleting file:", err);
      setError("Failed to delete file. Please try again later.");
    }
  };

  const handleCreateFolder = async (folderName) => {
    try {
      const newFolder = await createFolder({
        name: folderName,
        userId,
        parentId: currentFolder?.id || null,
      });
      setFolders([...folders, newFolder]);
    } catch (error) {
      setError("Failed to create folder");
      console.error("Error creating folder:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          File Manager
        </h1>

        {isLoading ? (
          <div className="text-center py-10">
            <svg
              className="animate-spin h-10 w-10 text-indigo-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-3 text-gray-600">Loading your files...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Folder Section */}
            <div className="lg:col-span-1">
              <FolderList
                folders={folders}
                currentFolder={currentFolder}
                onFolderClick={setCurrentFolder}
                onCreateFolder={handleCreateFolder}
              />
            </div>

            {/* Upload Section */}
            <div className="lg:col-span-1">
              <FileUploader
                onUpload={handleFileUpload}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                error={error}
              />
            </div>

            {/* Files List Section */}
            <div className="lg:col-span-1">
              <FileList
                files={files.filter(
                  (file) => file.folderId === currentFolder?.id
                )}
                onSelectFile={handleSelectFile}
                onDeleteFile={handleDeleteFile}
                selectedFileId={selectedFile?.id}
              />
            </div>

            {/* Preview Section */}
            <div className="lg:col-span-1">
              <FilePreview file={selectedFile} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
