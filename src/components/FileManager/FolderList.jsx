import { useState } from "react";

export default function FolderList({
  folders,
  currentFolder,
  onFolderClick,
  onCreateFolder,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName("");
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">Folders</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="text-sm text-indigo-600 hover:text-indigo-800"
        >
          + New Folder
        </button>
      </div>

      {isCreating && (
        <form onSubmit={handleCreateFolder} className="flex gap-2">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Folder name"
            className="flex-1 p-2 border border-gray-300 rounded-md"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create
          </button>
        </form>
      )}

      <div className="space-y-2">
        <div
          onClick={() => onFolderClick(null)}
          className={`p-2 rounded cursor-pointer ${
            !currentFolder ? "bg-indigo-50" : "hover:bg-gray-50"
          }`}
        >
          📁 Root
        </div>
        {folders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => onFolderClick(folder)}
            className={`p-2 rounded cursor-pointer ${
              currentFolder?.id === folder.id
                ? "bg-indigo-50"
                : "hover:bg-gray-50"
            }`}
          >
            📁 {folder.name}
          </div>
        ))}
      </div>
    </div>
  );
}
