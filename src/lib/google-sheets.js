import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Utility function to properly format private key
const formatPrivateKey = (key) => {
  if (!key) throw new Error('Google Private Key is missing');
  
  // Remove surrounding quotes if present
  key = key.replace(/^["']|["']$/g, '');
  
  // Convert escaped newlines to actual newlines
  key = key.replace(/\\n/g, '\n');
  
  // Ensure proper PEM format
  if (!key.startsWith('-----BEGIN PRIVATE KEY-----')) {
    key = `-----BEGIN PRIVATE KEY-----\n${key}`;
  }
  if (!key.endsWith('-----END PRIVATE KEY-----')) {
    key = `${key}\n-----END PRIVATE KEY-----`;
  }
  
  return key;
};

// Initialize and cache the sheets client
let sheetsClient = null;

const initializeSheets = async () => {
  try {
    if (!process.env.GOOGLE_CLIENT_EMAIL) {
      throw new Error('GOOGLE_CLIENT_EMAIL is not configured');
    }
    
    if (!process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('GOOGLE_PRIVATE_KEY is not configured');
    }

    const auth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: formatPrivateKey(process.env.GOOGLE_PRIVATE_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    await auth.authorize();
    return google.sheets({ version: 'v4', auth });
  } catch (error) {
    console.error('Initialization Error:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

export const appendToSheet = async (data) => {
  try {
    // Verify required environment variables
    if (!process.env.GOOGLE_SHEET_ID) {
      throw new Error('GOOGLE_SHEET_ID is not configured');
    }

    // Initialize or reuse sheets client
    if (!sheetsClient) {
      sheetsClient = await initializeSheets();
    }

    // Convert data object to 2D array
    const values = [Object.values(data)];

    const response = await sheetsClient.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${process.env.NEXT_PUBLIC_SHEET_NAME || 'Sheet1'}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values },
    });

    console.log('Successfully appended data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Append Operation Error:', {
      message: error.message,
      code: error.code,
      response: error.response?.data
    });

    // Handle specific error cases
    if (error.code === 401) {
      throw new Error('Authentication failed - check your service account credentials');
    }
    if (error.code === 403) {
      throw new Error('Permission denied - ensure service account has editor access');
    }
    if (error.code === 404) {
      throw new Error('Sheet not found - check your GOOGLE_SHEET_ID');
    }

    throw new Error(`Failed to update sheet: ${error.message}`);
  }
};