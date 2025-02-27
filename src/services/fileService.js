const API_BASE_URL =
  "http://ec2-51-20-235-102.eu-north-1.compute.amazonaws.com/cornelia/api";

/**
 * Upload a file to the backend
 *
 * @param {FormData} formData - FormData containing the file and userId
 * @param {Function} onProgress - Callback for upload progress
 * @returns {Promise<Object>} - Response from the server
 */
export const uploadFile = (formData, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Handle progress
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentCompleted = Math.round((event.loaded * 100) / event.total);
        onProgress(percentCompleted);
      }
    });

    // Handle response
    xhr.addEventListener("load", () => {
      console.log("XHR status:", xhr.status);
      console.log("XHR response text:", xhr.responseText);

      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          console.log("Parsed response:", response);
          resolve(response);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(new Error("Invalid response format from server"));
        }
      } else {
        try {
          const errorText = xhr.responseText;
          console.error("Error response text:", errorText);

          let errorMessage = `Upload failed with status ${xhr.status}`;
          try {
            const errorResponse = JSON.parse(errorText);
            if (errorResponse.message) {
              errorMessage = errorResponse.message;
            }
          } catch (e) {
            // If we can't parse the error response, just use the status code
          }

          reject(new Error(errorMessage));
        } catch (e) {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    // Handle network errors
    xhr.addEventListener("error", (e) => {
      console.error("XHR error event:", e);
      reject(new Error("Network error occurred"));
    });

    xhr.addEventListener("abort", () => {
      reject(new Error("Upload cancelled"));
    });

    // Log the full URL for debugging
    const fullUrl = `${API_BASE_URL}/files/upload`;
    console.log("Sending request to:", fullUrl);

    // Send the request
    xhr.open("POST", fullUrl, true);
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

export const createFolder = async (folderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(folderData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};

export const updateFileLocation = async (fileId, folderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/files/${fileId}/move`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ folderId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error moving file:", error);
    throw error;
  }
};
