/**
 * Google Apps Script integration for form submissions
 */

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

/**
 * Wait for a specified time
 * @param {number} ms - Time to wait in milliseconds
 * @returns {Promise<void>}
 */
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Submit data to Google Apps Script with retry logic
 * @param {Object} data - The data to submit
 * @returns {Promise<Object>} Response from Apps Script
 */
export const submitToAppsScript = async (data) => {
  if (!APPS_SCRIPT_URL) {
    throw new Error('Google Apps Script URL is not configured. Set NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL environment variable.');
  }

  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempting to submit data (attempt ${attempt}/${MAX_RETRIES})`);
      
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'appendData',
          data: data
        }),
      });

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
      
      if (attempt < MAX_RETRIES) {
        console.log(`Retrying in ${RETRY_DELAY}ms...`);
        await wait(RETRY_DELAY);
      }
    }
  }

  throw new Error(`Failed to submit data after ${MAX_RETRIES} attempts: ${lastError.message}`);
};