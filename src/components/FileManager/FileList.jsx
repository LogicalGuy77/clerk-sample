import { useState } from "react";

export default function FileList({ files, onSelectFile, selectedFileId }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📝";
      case "txt":
        return "📃";
      default:
        return "📄";
    }
  };

  const handleDragStart = (e, file) => {
    e.dataTransfer.setData("fileId", file.id);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const fileId = e.dataTransfer.getData("fileId");
    const targetFolderId = currentFolder?.id || null;

    try {
      await updateFileLocation(fileId, targetFolderId);
      // Refresh files list after moving
      const updatedFiles = await fetchUserFiles(userId);
      setFiles(updatedFiles);
    } catch (error) {
      setError("Failed to move file");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800">Your Files</h2>

      <div className="relative">
        <input
          type="text"
          placeholder="Search files..."
          className="w-full p-2 pl-8 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 absolute left-2.5 top-3 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="overflow-y-auto max-h-96 border border-gray-200 rounded-md">
        {filteredFiles.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            {files.length === 0
              ? "No files uploaded yet"
              : "No files match your search"}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredFiles.map((file) => (
              <li
                key={file.id}
                draggable
                onDrag={(e) => handleDragStart(e, file)}
                onClick={() => onSelectFile(file)}
                className={`p-3 hover:bg-gray-50 cursor-pointer ${
                  selectedFileId === file.id
                    ? "bg-indigo-50 border-l-4 border-indigo-500"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getFileIcon(file.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(file.uploadedAt)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
