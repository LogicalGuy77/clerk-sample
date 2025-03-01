import { useState } from "react";

const API_BASE_URL =
  "http://ec2-51-20-235-102.eu-north-1.compute.amazonaws.com/cornelia/api";
const SHORT_ANALYSIS_ENDPOINT = `${API_BASE_URL}/analyses/short-summary/`;
const LONG_ANALYSIS_ENDPOINT = `${API_BASE_URL}/analyses/long-summary/`;
const RISK_ANALYSIS_ENDPOINNT = `${API_BASE_URL}/analyses/risk/`;
const CONFLICTS_ANALYSIS_ENDPOINT = `${API_BASE_URL}/analyses/conflicts/`;

export const useShortSummary = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const fetchShortSummary = async (fileId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(SHORT_ANALYSIS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_id: fileId }),
      });
      const data = await response.json();
      if (data.success && data.result.success) {
        setSummary(data.result.result);
      } else {
        setError("Failed to fetch summary.");
      }
    } catch (err) {
      setError("Error fetching summary.");
    } finally {
      setLoading(false);
    }
  };

  return { summary, loading, error, fetchShortSummary };
};

export const useLongSummary = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const fetchLongSummary = async (fileId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(LONG_ANALYSIS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_id: fileId }),
      });
      const data = await response.json();
      if (data.success && data.result.success) {
        setSummary(data.result.result);
      } else {
        setError("Failed to fetch long summary.");
      }
    } catch (err) {
      setError("Error fetching long summary.");
    } finally {
      setLoading(false);
    }
  };

  return { summary, loading, error, fetchLongSummary };
};

export const useRiskAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const fetchRiskAnalysis = async (fileId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(RISK_ANALYSIS_ENDPOINNT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_id: fileId }),
      });
      const data = await response.json();
      if (data.success && data.result.success) {
        setSummary(data.result.result);
      } else {
        setError("Failed to fetch risk analysis.");
      }
    } catch (err) {
      setError("Error fetching risk analysis.");
    } finally {
      setLoading(false);
    }
  };

  return { summary, loading, error, fetchRiskAnalysis };
};

export const useConflictsAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const fetchConflictsAnalysis = async (fileIds) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(CONFLICTS_ANALYSIS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file_ids: fileIds }),
      });
      const data = await response.json();
      if (data.status === "success" && data.results.success) {
        setResults(data.results);
      } else {
        setError("Failed to fetch conflicts analysis.");
      }
    } catch (err) {
      setError("Error fetching conflicts analysis.");
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, fetchConflictsAnalysis };
};
