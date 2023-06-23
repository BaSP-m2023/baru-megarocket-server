import firebaseApp from '../helper/firebase';

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({
      message: 'Provide a Token',
      data: undefined,
      error: true,
    });
  }
  try {
    const response = await firebaseApp.auth().verifyIdToken(token);
    req.headers.firebaseApp = response.user_id;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export default verifyToken;
