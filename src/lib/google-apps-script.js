/**
 * Google Apps Script integration for form submissions
 */

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxsj0s1_xxV3O0cbO4neEx7rsyK9TjAuehu6ScYVsNu6gXuwLNow00Th9IatLJmgf9t-A/exec";
const MAX_RETRIES = 2; // Reduced from 3 to 2
const RETRY_DELAY = 500; // Reduced from 1000ms to 500ms
const REQUEST_TIMEOUT = 5000; // 5 seconds timeout

/**
 * Wait for a specified time
 * @param {number} ms - Time to wait in milliseconds
 * @returns {Promise<void>}
 */
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Create a timeout promise
 * @param {number} ms - Timeout in milliseconds
 * @returns {Promise<never>}
 */
const timeout = (ms) => new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Request timeout')), ms)
);

/**
 * Submit data to Google Apps Script with retry logic
 * @param {Object} data - The data to submit
 * @returns {Promise<Object>} Response from Apps Script
 */
export const submitToAppsScript = async (data) => {
  if (!APPS_SCRIPT_URL) {
    throw new Error('Google Apps Script URL is not configured.');
  }

  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempting to submit data (attempt ${attempt}/${MAX_RETRIES})`);

      // Race between the fetch request and timeout
      const response = await Promise.race([
        fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'appendData',
            data: data
          }),
        }),
        timeout(REQUEST_TIMEOUT)
      ]);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.warn('Received non-JSON response:', text);
        throw new Error('Invalid response format from server');
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit data');
      }

      console.log('Successfully submitted data:', result);
      return result;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      lastError = error;

      // Don't retry on timeout or invalid response format
      if (error.message === 'Request timeout' || error.message === 'Invalid response format from server') {
        throw error;
      }

      if (attempt < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY}ms...`);
        await wait(RETRY_DELAY);
      }
    }
  }

  throw new Error(`Failed to submit data after ${MAX_RETRIES} attempts: ${lastError.message}`);
};
