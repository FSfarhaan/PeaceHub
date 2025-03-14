// Import doctor images from assets
import doctor1 from '../../assets/images/doctor1.jpg';
import doctor2 from '../../assets/images/doctor2.jpg';
import doctor3 from '../../assets/images/doctor3.jpg';
import doctor4 from '../../assets/images/doctor4.jpg';
import doctor5 from '../../assets/images/doctor5.jpg';
import doctor6 from '../../assets/images/doctor6.jpg';
import doctor7 from '../../assets/images/doctor7.jpg';
import doctor8 from '../../assets/images/doctor8.jpg';
import doctor9 from '../../assets/images/doctor9.jpg';

export const doctorsData = [
  {
    id: 1,
    name: 'Dr Sumaira Sumi',
    specialization: 'Medicine Specialist',
    college: 'Rangpur Medical College',
    image: require('../../assets/images/doctor1.jpg'),
    experience: '5+ Years',
    patients: 3080,
    reviews: 2000,
    isPopular: true
  },
  {
    id: 2,
    name: 'Dr Maruf Farhan',
    specialization: 'Cardiologist',
    college: 'Rangpur Medical College',
    image: doctor2,
    experience: '7+ Years',
    patients: 4200,
    reviews: 3100,
    isPopular: true
  },
  {
    id: 3,
    name: 'Dr Masir',
    specialization: 'Dentist',
    college: 'Rangpur Medical College',
    image: doctor3,
    experience: '3+ Years',
    patients: 1500,
    reviews: 900,
    isPopular: true
  },
  {
    id: 4,
    name: 'Dr Sonalika Sen',
    specialization: 'Medicine Specialist',
    college: 'Rangpur Medical College',
    image: doctor4,
    experience: '6+ Years',
    patients: 2800,
    reviews: 1900,
    isPopular: false
  },
  {
    id: 5,
    name: 'Dr Jakariya Soyib',
    specialization: 'Medicine Specialist',
    college: 'Rangpur Medical College',
    image: doctor5,
    experience: '4+ Years',
    patients: 2100,
    reviews: 1500,
    isPopular: false
  },
  {
    id: 6,
    name: 'Dr Soumitra Deb',
    specialization: 'Medicine Specialist',
    college: 'Rangpur Medical College',
    image: doctor6,
    experience: '8+ Years',
    patients: 5000,
    reviews: 4200,
    isPopular: false
  },
  {
    id: 7,
    name: 'Dr Ahmed Khan',
    specialization: 'Cardiologist',
    college: 'Rangpur Medical College',
    image: doctor7,
    experience: '9+ Years',
    patients: 6100,
    reviews: 5300,
    isPopular: false
  },
  {
    id: 8,
    name: 'Dr Sarah Johnson',
    specialization: 'Dentist',
    college: 'Rangpur Medical College',
    image: doctor8,
    experience: '5+ Years',
    patients: 2700,
    reviews: 2100,
    isPopular: false
  }
];

