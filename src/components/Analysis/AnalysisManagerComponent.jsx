import { useState } from "react";
import ShortSummary from "./ShortSummary";
import LongSummary from "./LongSummary";
import RiskAnalysis from "./RiskAnalysis";
import ConflictsAnalysis from "./ConflictsAnalysis";

export default function AnalysisManagerComponent() {
  const [fileId, setFileId] = useState("");
  const [secondFileId, setSecondFileId] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisType, setAnalysisType] = useState("short"); // "short", "long", "risk", or "conflicts"

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
  };

  // Determine if the form should be enabled
  const isFormValid =
    analysisType === "conflicts" ? fileId && secondFileId : fileId;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Document Analysis
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label
              htmlFor="fileId"
              className="block text-sm font-medium text-gray-700"
            >
              File ID
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="fileId"
                id="fileId"
                value={fileId}
                onChange={(e) => setFileId(e.target.value)}
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter first file ID"
              />
            </div>
          </div>

          {analysisType === "conflicts" && (
            <div>
              <label
                htmlFor="secondFileId"
                className="block text-sm font-medium text-gray-700"
              >
                Second File ID
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="secondFileId"
                  id="secondFileId"
                  value={secondFileId}
                  onChange={(e) => setSecondFileId(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter second file ID"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4 flex-wrap">
            <div className="flex items-center">
              <input
                type="radio"
                id="shortAnalysis"
                name="analysisType"
                value="short"
                checked={analysisType === "short"}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label
                htmlFor="shortAnalysis"
                className="ml-2 block text-sm text-gray-700"
              >
                Short Summary
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="longAnalysis"
                name="analysisType"
                value="long"
                checked={analysisType === "long"}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label
                htmlFor="longAnalysis"
                className="ml-2 block text-sm text-gray-700"
              >
                Long Summary
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="riskAnalysis"
                name="analysisType"
                value="risk"
                checked={analysisType === "risk"}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label
                htmlFor="riskAnalysis"
                className="ml-2 block text-sm text-gray-700"
              >
                Risk Analysis
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="conflictsAnalysis"
                name="analysisType"
                value="conflicts"
                checked={analysisType === "conflicts"}
                onChange={(e) => setAnalysisType(e.target.value)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label
                htmlFor="conflictsAnalysis"
                className="ml-2 block text-sm text-gray-700"
              >
                Conflicts Analysis
              </label>
            </div>
            <button
              type="submit"
              className="ml-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={!isFormValid || isAnalyzing}
            >
              Analyze
            </button>
          </div>
        </form>

        {isAnalyzing && (
          <div className="mt-6">
            {analysisType === "short" ? (
              <ShortSummary fileId={fileId} />
            ) : analysisType === "long" ? (
              <LongSummary fileId={fileId} />
            ) : analysisType === "risk" ? (
              <RiskAnalysis fileId={fileId} />
            ) : (
              <ConflictsAnalysis fileIds={[fileId, secondFileId]} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
