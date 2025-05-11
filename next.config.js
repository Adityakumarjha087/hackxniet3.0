// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   env: {
//     GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
//     GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
//     GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
//   },
//   // Enable CORS for development
//   async headers() {
//     return [
//       {
//         source: '/api/:path*',
//         headers: [
//           { key: 'Access-Control-Allow-Credentials', value: 'true' },
//           { key: 'Access-Control-Allow-Origin', value: '*' },
//           { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
//           { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
//         ],
//       },
//     ];
//   },
// }

// module.exports = nextConfig
