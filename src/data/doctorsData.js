// Import doctor images from assets
import bhoomi from '../../assets/images/bhoomi.jpeg'
import doctor1 from '../../assets/images/doctor1.jpg'
import doctor2 from '../../assets/images/doctor20.jpg';
import doctor3 from '../../assets/images/doctor30.jpg';
import doctor4 from '../../assets/images/doctor40.jpeg';
import doctor5 from '../../assets/images/doctor50.jpg';
import doctor6 from '../../assets/images/doctor60.jpg';
import doctor7 from '../../assets/images/doctor70.jpg';

export const doctorsData = [
  {
    id: 1,
    name: 'Dr. Bhoomi Singh',
    specialization: 'Ph.D. in Neuropsychiatry',
    college: 'Datta Meghe College',
    image: bhoomi,
    experience: '15+ Years',
    patients: 5200,
    reviews: 4800,
    isPopular: true
  },
  {
    id: 2,
    name: 'Dr. Sumaira Sumi',
    specialization: 'Psychiatrist',
    college: 'Johns Hopkins University',
    image: doctor1,
    experience: '6+ Years',
    patients: 3200,
    reviews: 2100,
    isPopular: true
  },
  {
    id: 3,
    name: 'Dr. Maruf Farhan',
    specialization: 'Child & Adolescent Psychiatrist',
    college: 'Stanford University',
    image: doctor2,
    experience: '8+ Years',
    patients: 4500,
    reviews: 3400,
    isPopular: true
  },
  {
    id: 4,
    name: 'Dr. Masir Rahman',
    specialization: 'Cognitive Behavioral Therapist',
    college: 'King’s College London',
    image: doctor3,
    experience: '4+ Years',
    patients: 1800,
    reviews: 1100,
    isPopular: true
  },
  {
    id: 5,
    name: 'Dr. Sonalika Sen',
    specialization: 'Neuropsychologist',
    college: 'University of Toronto',
    image: doctor4,
    experience: '7+ Years',
    patients: 3000,
    reviews: 2100,
    isPopular: false
  },
  {
    id: 6,
    name: 'Dr. Jakariya Soyib',
    specialization: 'Behavioral Therapist',
    college: 'Yale University',
    image: doctor5,
    experience: '5+ Years',
    patients: 2400,
    reviews: 1700,
    isPopular: false
  },
  {
    id: 7,
    name: 'Dr. Soumitra Deb',
    specialization: 'Trauma & PTSD Specialist',
    college: 'University of Melbourne',
    image: doctor6,
    experience: '9+ Years',
    patients: 5300,
    reviews: 4500,
    isPopular: false
  },
  {
    id: 8,
    name: 'Dr. Ahmed Khan',
    specialization: 'Addiction Psychiatrist',
    college: 'University of Oxford',
    image: doctor7,
    experience: '10+ Years',
    patients: 6200,
    reviews: 5400,
    isPopular: false
  }
];
