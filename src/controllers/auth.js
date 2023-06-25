import Member from '../models/Member';

const getAuth = async (req, res) => {
  try {
    const member = await Member.findOne({ firebaseUid: req.headers.firebaseUid });
    if (member) {
      return res.status(201).json({
        message: 'Member found',
        data: member,
        error: false,
      });
    }
    return res.status(404).json({
      message: 'User not found',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export default { getAuth };
