import * as admin from 'firebase-admin';

require('dotenv').config();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_url: process.env.FIREBASE_FIREBASE_AUTH_URI,
    token_url: process.env.FIREBASE_TOKEN_URI,
    auth_auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  }),
});

export default firebaseApp;
