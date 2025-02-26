import FileManagerComponent from "../components/FileManager/FileManagerComponent";
import Navbar from "../components/Navbar";

export default function FileManager() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <FileManagerComponent />
        </div>
      </main>
    </div>
  );
}
