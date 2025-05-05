import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse the incoming form data
    const form = new formidable.IncomingForm();
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file;
    const fileName = fields.name || file.originalFilename;

    // Initialize Google Drive API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: SCOPES,
    });

    const drive = google.drive({ version: 'v3', auth });

    // Upload file to Google Drive
    const fileMetadata = {
      name: fileName,
      parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
    };

    const media = {
      mimeType: file.mimetype,
      body: fs.createReadStream(file.filepath),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    // Clean up the temporary file
    fs.unlinkSync(file.filepath);

    return res.status(200).json({
      fileId: response.data.id,
      fileUrl: response.data.webViewLink,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ message: 'Failed to upload file' });
  }
} 