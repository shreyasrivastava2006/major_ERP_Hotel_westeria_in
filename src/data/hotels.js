const hotels = [
  {
    id: 'HOTEL-001',
    name: 'Wisteria Grand Lucknow',
    code: 'WGL-LKO',
    propertyType: 'Luxury Hotel',
    category: '5 Star',

    contact: {
      phone: '+91 9876543210',
      email: 'grandlucknow@wisteriain.com',
      website: 'www.wisteriain.com',
    },

    address: {
      addressLine: 'Gomti Nagar',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      country: 'India',
      pincode: '226010',
    },

    manager: {
      name: 'Rahul Sharma',
      email: 'rahul@wisteriain.com',
      phone: '+91 9876543211',
    },

    rooms: {
      total: 120,
      available: 78,
      occupied: 35,
      maintenance: 7,
    },

    status: 'Active',
    createdAt: '2026-09-01',
  },

  {
    id: 'HOTEL-002',
    name: 'Wisteria Palace Delhi',
    code: 'WPD-DEL',
    propertyType: 'Business Hotel',
    category: '4 Star',

    contact: {
      phone: '+91 9876543220',
      email: 'palacedelhi@wisteriain.com',
      website: 'www.wisteriain.com',
    },

    address: {
      addressLine: 'Aerocity',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      pincode: '110037',
    },

    manager: {
      name: 'Ankit Verma',
      email: 'ankit@wisteriain.com',
      phone: '+91 9876543221',
    },

    rooms: {
      total: 95,
      available: 52,
      occupied: 38,
      maintenance: 5,
    },

    status: 'Active',
    createdAt: '2026-09-05',
  },

  {
    id: 'HOTEL-003',
    name: 'Wisteria Beach Resort Goa',
    code: 'WBR-GOA',
    propertyType: 'Resort',
    category: '5 Star',

    contact: {
      phone: '+91 9876543230',
      email: 'resortgoa@wisteriain.com',
      website: 'www.wisteriain.com',
    },

    address: {
      addressLine: 'Candolim',
      city: 'Goa',
      state: 'Goa',
      country: 'India',
      pincode: '403515',
    },

    manager: {
      name: 'Priya Mehta',
      email: 'priya@wisteriain.com',
      phone: '+91 9876543231',
    },

    rooms: {
      total: 80,
      available: 25,
      occupied: 50,
      maintenance: 5,
    },

    status: 'Active',
    createdAt: '2026-09-10',
  },

  {
    id: 'HOTEL-004',
    name: 'Wisteria Residency Jaipur',
    code: 'WRJ-JPR',
    propertyType: 'Business Hotel',
    category: '3 Star',

    contact: {
      phone: '+91 9876543240',
      email: 'residencyjaipur@wisteriain.com',
      website: 'www.wisteriain.com',
    },

    address: {
      addressLine: 'MI Road',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      pincode: '302001',
    },

    manager: {
      name: 'Aman Singh',
      email: 'aman@wisteriain.com',
      phone: '+91 9876543241',
    },

    rooms: {
      total: 65,
      available: 40,
      occupied: 22,
      maintenance: 3,
    },

    status: 'Active',
    createdAt: '2026-09-12',
  },
]

export default hotels