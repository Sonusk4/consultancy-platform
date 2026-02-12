const admin = require('firebase-admin');

const verifyFirebaseToken = async (req, res, next) => {
  // Skip Firebase verification if disabled
  if (!global.is_firebase_enabled) {
    // For development, allow requests with or without token
    // Set a mock user if no token provided
    if (!req.user) {
      req.user = {
        firebase_uid: 'test-uid-' + Date.now(),
        email: req.body?.email || 'test@example.com'
      };
    }
    return next();
  }

  // 1. Extract Bearer token 
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' }); // [cite: 7]
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify ID token using Firebase Admin 
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // 3. Extract firebase_uid and email and attach to request [cite: 7]
    req.user = {
      firebase_uid: decodedToken.uid,
      email: decodedToken.email
    };
    next();
  } catch (error) {
    // 4. Reject invalid tokens with 401 [cite: 7]
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyFirebaseToken;