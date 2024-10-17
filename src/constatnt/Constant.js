export const documentName = [
  {
    documentName: 'Caste Certificate',
    Status: true,
  },
  {
    documentName: 'Income Certificate',
    Status: true,
  },
  {
    documentName: 'Domecile Certificate',
    Status: true,
  },
  {
    documentName: 'Marksheet (10th)',
    Status: true,
  },
  {
    documentName: 'Birth Certificate',
    Status: true,
  },
  {
    documentName: 'Disablitity Certificate',
    Status: true,
  },
];

export const TrackApplicationList = [
  {
    Approved: [
      {id: 1, applicationNo: 'Application1234', status: 'Disbursal Complete'},
    ],
  },
  {
    Rejected: [
      {id: 2, applicationNo: 'Application1235'},
      {id: 3, applicationNo: 'Application1236'},
    ],
  },
];
export const EducationLevel = [
  {id: 1, label: '10th standard', value: '10th standard'},
  {id: 2, label: '12th standard', value: '12th standard'},
  {id: 3, label: 'Graduate', value: 'graduate'},
  {id: 3, label: 'Post graduate', value: 'Post graduate'},
];
export const Gender = [
  {id: 1, label: 'Male', value: 'male'},
  {id: 2, label: 'Female', value: 'female'},
  {id: 3, label: 'Both', value: 'both'},
];
export const IncomeRange = [
  {id: 1, label: 'Below 1,00,000', value: '1,00,000'},
  {id: 2, label: 'Below 2,50,000', value: '2,50,000'},
  {id: 3, label: 'Below 5,00,000', value: '5,00,000'},
  {id: 4, label: 'Below 7,50,000', value: '7,50,000'},
  {id: 4, label: 'Other', value: 'other'},
];
export const Castes = [
  {id: 1, label: 'SC', value: 'sc'},
  {id: 2, label: 'ST', value: 'st'},
  {id: 3, label: 'OBC', value: 'obc'},
  {id: 4, label: 'General', value: 'general'},
];
export const BenefitAmount = [
  {id: 1, label: '12,000', value: '12,000'},
  {id: 2, label: '35,000', value: '35,000'},
];
export const Subjet = [
  {id: 1, label: 'English', value: 'english'},
  {id: 2, label: 'Science', value: 'science'},
];
export const Data = [
  {
    id: '1',
    date: '12 September 2024',
    title: 'Pre-Matric Scholarship-SC',
    subTitle: 'Ministry of Social Justice',
    benefitAmount: '3500 INR - 7700 INR',
    eligible: ['SC', 'Madhya Pradesh', 'All Genders'],
    description:
      'The Pre-matric Scholarship-SC is provided by the Ministry of Social Justice and the Tribal Welfare Department of Madhya Pradesh. It supports Class 9 and 10 students from low-income families with an annual income below ₹2,50,000. Both genders are eligible.',
    address: 'Madhya Pradesh',
    imageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: '2',
    date: '12 September 2024',
    title: 'Pre-Matric Scholarship-ST',
    subTitle: 'Ministry of Social Justice',
    benefitAmount: '3500 INR - 7700 INR',

    eligible: ['ST', 'Madhya Pradesh', 'All Genders'],
    description:
      'The Pre-matric Scholarship-ST is provided by the Ministry of Tribal Welfare and the Tribal Welfare Department of Madhya Pradesh. It supports Class 9 and 10 students from low-income families with an annual income below ₹2,50,000. Both male and female students are eligible.',
    address: 'Madhya Pradesh',
    imageUrl: 'https://via.placeholder.com/50',
  },
  {
    id: '3',
    date: '12 September 2024',
    title: 'SC Scholarship 1',
    description: '12,000 INR',
    address: 'Madhya Pradesh',
    imageUrl: 'https://via.placeholder.com/50',
  },
];

export const details = [
  {
    id: 1,
    title: 'Benefit',
    amount: '3500 INR - 7700 INR',
    desc: 'The Pre-matric Scholarship-ST, offered by the Ministry of Tribal Welfare and the Tribal Welfare Department of Madhya Pradesh, supports Scheduled Tribe (ST) students in Classes 9 and 10. The scholarship is available to both boys and girls, as well as students with disabilities, from families with an annual income below ₹2,50,000.',
    desc1:
      'Day scholars receive ₹3500 (₹3850 for disabled students), and hostellers receive ₹7000 (₹7700 for disabled students). The scholarship is available to students domiciled in Madhya Pradesh and is auto-renewed. Students can avail this scholarship even if they are benefiting from another government scholarship, and it is available for one year if the student fails.',
    objective: [
      'Provide financial assistance to ST students in Classes 9 and 10 to encourage continued education.',
      'Support low-income families by reducing the financial burden of schooling.',
      'Promote equal educational opportunities for students with disabilities through higher financial aid.',
      'Reduce dropout rates among ST students by offering incentives to complete secondary education.',
      'Ensure educational support for ST students in both urban and rural areas, particularly in Madhya Pradesh.',
    ],
    keyPoints: [
      'Available to ST students in Madhya Pradesh.',
      'Supports day scholars and hostellers.',
      'Annual family income must be below ₹2,50,000.',
      'Application deadline: 31st July, valid till 31st October.',
    ],
    document: ['Marksheet', 'Income Certificate', 'Caste Certificate'],
  },
];

export const myApplicationData = [
  {id: 1, label: 'Full Name', value: 'Aanya Gupta'},
  {id: 2, label: 'Gender', value: 'Female'},
  {id: 3, label: 'Age', value: '14'},
  {id: 4, label: 'Class', value: '9th grade'},
  {id: 5, label: 'Marks', value: '--'},
  {id: 6, label: 'Disability', value: 'No'},
  {id: 7, label: 'Annual Income', value: 'Below 1,00,000'},
  {
    id: 8,
    label: 'Parent Occupation',
    value: 'Cleanliness worker (Safai Karamchari)',
  },
];
