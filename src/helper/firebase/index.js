import * as admin from 'firebase-admin';

require('dotenv').config();

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCO0STAfFd8H0cN\nfKHfO6Z+BFx5iQluAoPYmyZCTpBML9SdEn++3cvAiep7txeOPM8MuNs6RL35T4CM\nc3GgQTobdogv39DG8OM6dkQhtHufu0guRIcKi6bMoVi3Okf9/cas//63NUWUk7p8\n7ORO7V3wIcbru+wvNuxIa1mz6HiKdWmN3Nlt7jg1eBFEWeID9DodRtNiruAhkX02\ng8pz1euW2iCBNJHyM7Q6fHw/cPWoj5eGsQZwYqsDTEYGQWA4zI71FoTbRGVDll6h\n8oTITFVEEPud55YdaJtfpkbUwPArobQCNfGYBq6+8vK2nTWHn6nB0SVFCdYUeDgq\nt3ddpPe9AgMBAAECggEAFY67SfTa7cj43C/ObVhfMtFstgm56ymlBjqxJTwfquhj\nYwxKTSDEoz0OMHt8KkPCiyySJvL+bBYUlN7OLX77Cu8y8msJ5CWzXv1AHohUStGl\nvRop+i0HUgce0ZWSDWRTq4R+yd/YL2u3MCk/8ywATIGEuculhKD5PJs7sJzsKRYD\nSJWkrXyNVPtac1wn3IMkwNQdIRJ6+EQdSg5/WUpfduAXxb708uDLDSQMYl4cuBTR\nYIpWlUMAu9lwp4nkwhOxoE/wUh3QAHJmWFKHpkulotIrnPeDlAVRps62z2E2AaUx\n3JkCAfEzJ+JBXtCLv2JQ23PlAA1W+ptjwzKCUVOrgQKBgQDETt+MYvMpIofjDPNb\nEi4qTA8pPOYlIZXu0KnxaKk8C41Tph0RCUYXP384VyTGlpbh46n1TLITxQtuvW2b\nXcHf8VzYNNhB5485ibk8odNPp11FkzDfVxGa7vEbYNQKQXbOP3Un9hOEPsAGLFE1\n9y1s+tfQUJPHa5/RSkQPAo8gQQKBgQC6PmIaR4rrogbgoMljlyk7qydwqtWAEaRv\nld+bsSN6u7d0Dxndyn053mDeqUInYR53hRgKM5Oouku/npLH+YcJOcvMc/Tcy78h\nm7bOAn6Pxs+SF+8nM6BIx4uh19ctIp2aNvm0OD66URBoqcRUjM8HxZHsf73hogRS\nDjWY4bQ4fQKBgCKgZv40Vf/jf2SlXCesRUhgsivr+gyCqBe/5roWZAObZgpjOq1O\nnXZsVNxzQqFk3qhpqAkExkSGdUXLVBIbr574zA+3Ao5dcf4MNQhk4wkh1Gn5VJ2Q\nliJmE1Fo+v30HiizOM8bsMWa6/QqzQhf2Ttn47ly/R4n9cDNAMRFB0oBAoGAO3zT\njvtNByiQs80HpnTQ6csoZNdcLHT2JeIkMzGoWHp/BWYRaANWblZ2cIh1pehid+Ce\nJhwFTP58VW9MCO3N0QeR7fMXwjKeERkQkcrALCJfiJV2gPn/d1+tXPt5MmR9HJX0\nujjA6HgeGqAnIq57LktP6c9/kgNTB/ab7gIhs20CgYA6TsXQ/Z2A6LnJX4GdMK6+\nomqFXovrGFjCW1n5ITPTnSeF2ZxIMtPcICxhOHbeBVIcx+Nmw/wr37kPrrGaw3qB\nSx3d1y6Ud7b+gIz+kvbuUa1FGvmQU5yjmGd6gEVlYjq2ZPLWI3Y7jeKaeziHw0W2\nNvVbKBKI+imyBZJ0pkAvHQ==\n-----END PRIVATE KEY-----\n'.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
  }),
});

export default firebaseApp;
