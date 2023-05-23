import mongoose from 'mongoose';

export default [
  {
    _id: new mongoose.Types.ObjectId('6462ea9abb5168b3bbbc8bc0'),
    activity: {
      _id: new mongoose.Types.ObjectId('6465286dad795d0bf31704f1'),
      name: 'Boxing',
      description: 'activity',
      isActive: false,
    },
    trainer: [
      {
        _id: new mongoose.Types.ObjectId('6460763768fd665d7bf97f13'),
        firstName: 'marta',
        lastName: 'Poter',
        dni: '06266798',
        phone: '1221221122',
        email: 'ppoter3@imgur.com',
        password: 'tvqTPiNMMMMMBb1',
        salar: '$170000',
        isActive: false,
      },
    ],
    day: 'Monday',
    time: '19:10',
    capacity: 100000000000000,
    deleted: false,
  },
  {
    _id: new mongoose.Types.ObjectId('6467e8127cc74fd425191d2f'),
    activity: {
      _id: '6465286dad795d0bf31704f1',
      name: 'Boxing',
      description: 'activity',
      isActive: false,
    },
    trainer: [
      {
        _id: new mongoose.Types.ObjectId('6460763768fd665d7bf97f13'),
        firstName: 'marta',
        lastName: 'Poter',
        dni: '06266798',
        phone: '1221221122',
        email: 'ppoter3@imgur.com',
        password: 'tvqTPiNMMMMMBb1',
        salary: '$153390.16',
        isActive: false,
      },
      {
        _id: new mongoose.Types.ObjectId('646076aa68fd665d7bf97f1b'),
        firstName: 'juju',
        lastName: 'Regardsoe',
        dni: '88807777777777777777777777777777777777777777777777777777777777777777777777777777777657',
        phone: '465506666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666645606',
        email: 'cregardsoe9@wsj.com',
        password: '9DLy37dw',
        salary: '$160000',
        isActive: true,
      },
    ],
    day: 'Monday',
    time: '10:00',
    capacity: 15,
    deleted: false,
  },
];
