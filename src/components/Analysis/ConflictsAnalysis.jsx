import { useConflictsAnalysis } from "../../services/analysisService";
import { useEffect } from "react";

export default function ConflictsAnalysis({ fileIds }) {
  const {
    results,
    loading,
    error,
    fetchConflictsAnalysis,
  } = useConflictsAnalysis();

  useEffect(() => {
    if (fileIds && fileIds.length > 0) {
      fetchConflictsAnalysis(fileIds);
    }
  }, [fileIds]);

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

  if (!results) {
    return (
      <div className="p-4 border rounded-md">
        <p className="text-gray-500">
          No conflicts analysis available. Select files to analyze.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-md space-y-4">
      <h3 className="text-lg font-medium">Conflicts Analysis</h3>
      <div className="prose prose-sm max-w-none">
        <p className="whitespace-pre-wrap">{results.result}</p>
      </div>
    </div>
  );
}
