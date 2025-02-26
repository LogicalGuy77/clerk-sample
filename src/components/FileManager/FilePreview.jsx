export default function FilePreview({ file }) {
  if (!file) {
    return (
      <div className="h-full border border-gray-200 rounded-md p-6 flex items-center justify-center">
        <p className="text-gray-500 text-center">
          Select a file to preview its contents
        </p>
      </div>
    );
  }

  // For PDF files, show an iframe if we have a download URL
  const isPdf = file.type === "pdf" && file.downloadUrl;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-800">Preview</h2>

      <div className="border border-gray-200 rounded-md p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-900">{file.name}</h3>

          <a
            href={file.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 text-sm"
          >
            Download
          </a>
        </div>

        <div className="border-t border-gray-200 pt-4">
          {isPdf ? (
            <iframe
              src={file.downloadUrl}
              className="w-full h-96 border-0"
              title={file.name}
            />
          ) : (
            <div className="max-h-96 overflow-y-auto bg-gray-50 p-3 rounded text-sm">
              {file.text || "No preview available for this file type."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
