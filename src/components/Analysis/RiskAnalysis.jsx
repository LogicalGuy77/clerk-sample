import { useRiskAnalysis } from "../../services/analysisService";
import { useEffect } from "react";

export default function RiskAnalysis({ fileId }) {
  const { summary, loading, error, fetchRiskAnalysis } = useRiskAnalysis();

  useEffect(() => {
    if (fileId) {
      fetchRiskAnalysis(fileId);
    }
  }, [fileId]);

  if (loading) {
    return (
      <div className="p-4 border rounded-md">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-md bg-red-50 text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="p-4 border rounded-md">
        <p className="text-gray-500">
          No risk analysis available. Select a file to analyze.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md space-y-4">
      <h3 className="text-lg font-medium">Risk Analysis</h3>
      <div className="prose prose-sm max-w-none">
        <p className="whitespace-pre-wrap">{summary}</p>
      </div>
    </div>
  );
}
