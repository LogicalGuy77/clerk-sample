const API_BASE_URL = "http://localhost:8000/api";

/**
 * Upload a file to the backend
 *
 * @param {FormData} formData - FormData containing the file and userId
 * @param {Function} onProgress - Callback for upload progress
 * @returns {Promise<Object>} - Response from the server
 */
export const uploadFile = async (formData, onProgress) => {
  console.log(formData);
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Handle progress events
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded * 100) / event.total);
        if (onProgress) onProgress(progress);
      }
    });

    // Handle completion
    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } catch (error) {
          reject(new Error("Invalid response format"));
        }
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    // Handle errors
    xhr.addEventListener("error", () => {
      reject(new Error("Network error occurred"));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Upload cancelled"));
    });

    // Open and send the request
    xhr.open("POST", `${API_BASE_URL}/files/upload`, true);
    xhr.send(formData);
  });
};

/**
 * Fetch all files for a specific user
 *
 * @param {string} userId - The Clerk user ID
 * @returns {Promise<Array>} - Array of file objects
 */
export const fetchUserFiles = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/files?userId=${userId}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching files:", error);
    throw error;
  }
};

/**
 * Delete a file
 *
 * @param {string} fileId - ID of the file to delete
 * @param {string} userId - The Clerk user ID
 * @returns {Promise<Object>} - Response from the server
 */
export const deleteFile = async (fileId, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/files/${fileId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};
