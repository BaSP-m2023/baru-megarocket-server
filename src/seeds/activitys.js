/* eslint-disable eol-last */
import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6465286dad795d0bf31704f8'),
    name: 'Functional',
    description: 'A type of strength training that readies your body for daily activities',
    isActive: false,
    trainers: [
      new mongoose.Types.ObjectId('646f10810596acb1db833e30'),
      new mongoose.Types.ObjectId('646f10810596acb1db833e25'),
    ],
  },
  {
    _id: new mongoose.Types.ObjectId('6465286dad795d0bf31794f8'),
    name: 'Functional',
    description: 'A type of strength training that readies your body for daily activities',
    isActive: false,
    trainers: [
      new mongoose.Types.ObjectId('646f10810596acb1db833e30'),
      new mongoose.Types.ObjectId('646f10810596acb1db833e25'),
    ],
  },
];
