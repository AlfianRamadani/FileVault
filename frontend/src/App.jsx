import React, { useState, useEffect, createContext, useContext, useRef, useMemo } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { canisterId, createActor } from '../../src/declarations/backend';
import { Principal } from '@dfinity/principal';

const BadgeCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check-icon lucide-badge-check"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
)
const GraduationCap = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap-icon lucide-graduation-cap"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>)
 
 const Upload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload-icon lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
 )
const ArrowLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
)
const Trash2 = ()=> (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
)
 const Calendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-icon lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
);
 const Clock = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock-icon lucide-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>);

 const Shield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-icon lucide-shield"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
)
 const MessageSquare = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-icon lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
)
 const Heart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-icon lucide-heart  text-pink-500"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
)
 const CheckCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);
 const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-icon lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
)
 const Users = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
 const Stethoscope = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stethoscope-icon lucide-stethoscope"><path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/></svg>
);
 const UserProfile = () => (
  <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="user" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><path id="primary" d="M21,20a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2,6,6,0,0,1,6-6h6A6,6,0,0,1,21,20Zm-9-8A5,5,0,1,0,7,7,5,5,0,0,0,12,12Z" style="fill: rgb(0, 0, 0);"></path></svg>
)
 const UserCircle = () =>(
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-icon lucide-circle-user"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
)
 const Activity = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity-icon lucide-activity"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
)
 const FileText = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text-icon lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
)
 const Settings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-icon lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
)
 const LogOut =() => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
)

 const Camera = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera-icon lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
)
 const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
)
 const X = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
)
 const MapPin = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
)
 const Edit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
)
 const Building2 =  () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2-icon lucide-building-2"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
)
 const Phone = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-icon lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)
 const Mail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
)
 const User = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
)
 const AlertCircle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert-icon lucide-circle-alert"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
)
 const Pill = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pill-icon lucide-pill"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
)
 const Plus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
)
 const basicInfoFields = [
  {
    name: 'name',
    label: 'Patient Name',
    type: 'text',
    icon: User,
    placeholder: 'Enter patient name',
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    type: 'date',
    icon: Calendar,
  },
  {
    name: 'bloodType',
    label: 'Blood Type',
    type: 'select',
    icon: Heart,
    options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
];

 const listFields = [
  {
    name: 'allergies',
    label: 'Allergies',
    icon: AlertCircle,
    placeholder: 'Add allergy',
  },
  {
    name: 'currentMedications',
    label: 'Current Medications',
    icon: Pill,
    placeholder: 'Add medication',
  },
  {
    name: 'chronicConditions',
    label: 'Chronic Conditions',
    icon: Activity,
    placeholder: 'Add condition',
  },
];

 const vitalSignFields = [
  {
    name: 'bloodPressure',
    label: 'Blood Pressure',
    placeholder: '120/80',
    unit: 'mmHg',
  },
  {
    name: 'heartRate',
    label: 'Heart Rate',
    placeholder: '72',
    unit: 'bpm',
  },
  {
    name: 'temperature',
    label: 'Temperature',
    placeholder: '37.0',
    unit: '°C',
  },
  {
    name: 'weight',
    label: 'Weight',
    placeholder: '70',
    unit: 'kg',
  },
  {
    name: 'height',
    label: 'Height',
    placeholder: '170',
    unit: 'cm',
  },
];

const network = import.meta.env.VITE_DFX_NETWORK;
const identityProvider = network === 'ic' ? 'https://identity.ic0.app' : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/`;
const UserRole = Object.freeze({
  DOCTOR: 'doctor',
  PATIENT: 'patient',
});
function useActor() {
  const { user } = useAuth();
  const actor = createActor(canisterId, { agentOptions: { identity: user?.authClient?.getIdentity() } });
  return actor;
}

 function Loading() {
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen' role='status'>
      <svg aria-hidden='true' className='w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
        <path
          d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
          fill='currentFill'
        />
      </svg>
      <p>Loading...</p>
      <span className='sr-only'>Loading...</span>
    </div>
  );
}
 function DoctorList() {
  const [form, setForm] = useState({
    doctorId: '',
    timestamp: '',
    description: '',
  });
  const { user } = useAuth();
  const [doctorList, setDoctorList] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [loading, setLoading] = useState(true);
  const actor = useActor();

  useEffect(() => {
    actor.getAllDoctors().then(data => {
      const doctorDataArray = data.map(([principal, doctorData, userData]) => ({
        ...doctorData,
        id: principal.toString(),
        profilePicture: userData.profilePicture ? URL.createObjectURL(new Blob([new Uint8Array(userData.profilePicture[0] || [])])) : '',
      }));
      setDoctorList(doctorDataArray);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actor.addAppointment(Principal.fromText(form.doctorId), Principal.fromText(user?.principal?.toString() || ''), form.timestamp, form.description).then(() => {
      window.history.back();
    });
  };

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId);
    setForm(prev => ({
      ...prev,
      doctorId: doctorId,
    }));
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>Create New Appointment</h2>
      </div>

      <div className='glass-effect rounded-2xl p-8 h-[35rem] overflow-scroll'>
        <h3 className='text-xl font-semibold text-white mb-6'>Select a Doctor</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className='glass-effect rounded-xl p-6 animate-pulse'>
                  <div className='flex items-start space-x-4'>
                    <div className='flex-shrink-0'>
                      <div className='w-20 h-20 bg-gray-700 rounded-lg' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='h-4 bg-gray-700 rounded w-3/4 mb-2' />
                      <div className='h-3 bg-gray-700 rounded w-1/2' />
                      <div className='mt-4 space-y-2'>
                        <div className='h-3 bg-gray-700 rounded w-5/6' />
                        <div className='h-3 bg-gray-700 rounded w-4/6' />
                        <div className='h-3 bg-gray-700 rounded w-3/6' />
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 pt-4 border-t border-gray-700'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <div className='h-3 bg-gray-700 rounded w-5/6' />
                        <div className='h-3 bg-gray-700 rounded w-4/6' />
                      </div>
                      <div className='h-5 w-5 bg-gray-700 rounded-full' />
                    </div>
                  </div>
                </div>
              ))
            : doctorList.map((doctor, index) => (
                <div key={index} className={`glass-effect rounded-xl p-6 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl ${selectedDoctor === doctor.id ? 'ring-2 ring-indigo-500' : ''}`} onClick={() => handleDoctorSelect(doctor.id)}>
                  <div className='flex items-start space-x-4'>
                    <div className='flex-shrink-0'>
                      <img src={doctor.profilePicture} alt={doctor.name} className='w-20 h-20 rounded-lg object-cover ring-2 ring-indigo-500/30' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h4 className='text-lg font-semibold text-white truncate'>{doctor.name}</h4>
                      <p className='text-indigo-400 text-sm'>{doctor.specialization}</p>

                      <div className='mt-4 space-y-2'>
                        <div className='flex items-center text-gray-300 text-sm'>
                          <Building2 className='w-4 h-4 mr-2 text-indigo-400' />
                          <span className='truncate'>{doctor.hospitalAffiliation}</span>
                        </div>
                        <div className='flex items-center text-gray-300 text-sm'>
                          <MapPin className='w-4 h-4 mr-2 text-indigo-400' />
                          <span className='truncate'>{doctor.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-4 pt-4 border-t border-gray-700'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <div className='flex items-center text-gray-300 text-sm'>
                          <Mail className='w-4 h-4 mr-2 text-indigo-400' />
                          <span className='truncate'>{doctor.email}</span>
                        </div>
                        <div className='flex items-center text-gray-300 text-sm'>
                          <Phone className='w-4 h-4 mr-2 text-indigo-400' />
                          <span>{doctor.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {selectedDoctor && (
        <div className='glass-effect rounded-2xl p-8 space-y-6'>
          <h3 className='text-xl font-semibold text-white flex items-center'>
            <Calendar className='w-5 h-5 mr-2 text-indigo-400' />
            Schedule Appointment
          </h3>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-300'>Appointment Date & Time</label>
              <input type='datetime-local' name='timestamp' value={form.timestamp} onChange={handleChange} className='w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100' />
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-300'>Description / Reason for Visit</label>

              <textarea name='description' value={form.description} onChange={handleChange} rows={4} className='w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100' placeholder='Please describe your symptoms or reason for the appointment' />
            </div>

            <div className='flex justify-end'>
              <button type='submit' className='px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300'>
                Schedule Appointment
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
function AppointmentPage({navigate}) {
  const { user } = useAuth();
  const actor = useActor();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await actor.getAllAppointments();
      const formattedData = data.map(([id, appointment, doctorData, patientData]) => ({
        ...appointment,
        id: id.toString(),
        doctorData: doctorData && doctorData.length > 0 ? doctorData[0] : null,
        patientData: patientData && patientData.length > 0 ? patientData[0] : null,
      })) ;
      setAppointments(formattedData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = (action, appointmentId, patientId) => {
    switch (action) {
      case 'complete':
        actor.markAppointmentAsComplete(appointmentId).then(() => {
          alert('Appointment marked as completed');
          fetchAppointments();
        });
        break;
      case 'cancel':
        actor.markAppointmentAsCancelled(appointmentId).then(() => {
          alert('Appointment marked as cancelled');
          fetchAppointments();
        });
        break;
      case 'edit':
        navigate(`/dashboard/medical-history?patientId=${patientId}`);
        break;
      default:
        break;
    }
  };

  const PatientSkeleton = () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {[1, 2, 3].map(index => (
        <div key={index} className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='h-8 bg-gray-200 animate-pulse'></div>
          <div className='p-6 space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='h-5 w-32 bg-gray-200 rounded animate-pulse'></div>
            </div>
            <div className='space-y-2'>
              <div className='h-10 bg-gray-200 rounded animate-pulse'></div>
            </div>
            <div className='space-y-2 pt-2 border-t border-gray-100'>
              <div className='h-4 w-3/4 bg-gray-200 rounded animate-pulse'></div>
              <div className='h-4 w-1/2 bg-gray-200 rounded animate-pulse'></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const DoctorSkeleton = () => (
    <div className='bg-white rounded-lg shadow overflow-hidden'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th className='px-6 py-3 bg-gray-200 animate-pulse'></th>
            <th className='px-6 py-3 bg-gray-200 animate-pulse'></th>
            <th className='px-6 py-3 bg-gray-200 animate-pulse'></th>
            <th className='px-6 py-3 bg-gray-200 animate-pulse'></th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3].map(index => (
            <tr key={index}>
              <td className='px-6 py-4'>
                <div className='h-4 w-24 bg-gray-200 rounded animate-pulse'></div>
              </td>
              <td className='px-6 py-4'>
                <div className='h-4 w-32 bg-gray-200 rounded animate-pulse'></div>
              </td>
              <td className='px-6 py-4'>
                <div className='h-4 w-20 bg-gray-200 rounded animate-pulse'></div>
              </td>
              <td className='px-6 py-4'>
                <div className='h-4 w-16 bg-gray-200 rounded animate-pulse'></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      <h1 className='text-4xl mb-4 font-semibold'>Appointment Page</h1>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
        {user?.role === 'patient' && (
          <Link to={'/dashboard/appointments/doctor-list'} className='flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
            <Plus className='h-5 w-5 mr-2' />
            New Appointment
          </Link>
        )}
      </div>

      {loading ? (
        user?.role === 'patient' ? (
          <PatientSkeleton />
        ) : (
          <DoctorSkeleton />
        )
      ) : user?.role === 'patient' ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {appointments.length > 0 ? (
            appointments.map((appointment, index) => (
              <div key={index} className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300'>
                <div className={`px-4 py-2 text-sm font-semibold text-white ${appointment.appointmentStatus === 'upcoming' ? 'bg-blue-600' : appointment.appointmentStatus === 'completed' ? 'bg-green-600' : 'bg-red-600'}`}>{appointment.appointmentStatus.charAt(0).toUpperCase() + appointment.appointmentStatus.slice(1)}</div>
                <div className='p-6 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <Calendar className='h-5 w-5 text-blue-600' />
                      <span className='text-gray-700 font-medium'>{new Date(appointment.appointmentDate).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <Stethoscope className='h-5 w-5 text-blue-600' />
                      <div>
                        <p className='font-semibold text-gray-900'>{appointment?.doctorData?.name}</p>
                        <p className='text-sm text-gray-600'>{appointment?.doctorData?.specialization}</p>
                      </div>
                    </div>
                  </div>

                  <div className='space-y-2 pt-2 border-t border-gray-100'>
                    <div className='flex items-center space-x-2 text-sm text-gray-600'>
                      <MapPin className='h-4 w-4' />
                      <span>{appointment?.doctorData?.hospitalAffiliation}</span>
                    </div>
                    <div className='flex items-center space-x-2 text-sm text-gray-600'>
                      <Phone className='h-4 w-4' />
                      <span>{appointment?.doctorData?.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='bg-white rounded-lg text-center col-span-3 shadow overflow-hidden p-6'>
              <p className='text-gray-700'>No appointments found.</p>
            </div>
          )}
        </div>
      ) : (
        <div className='bg-white rounded-lg shadow overflow-hidden glass-effect'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Patient</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Date & Time</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Reason</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Status</th>
                <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm font-medium text-white'>{appointment?.patientData?.name}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-white'>{new Date(appointment?.appointmentDate).toLocaleString()}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='text-sm text-white'>{appointment?.appointmentReason}</div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${appointment.appointmentStatus === 'upcoming' ? 'bg-green-100 text-green-800' : appointment.appointmentStatus === 'completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>{appointment.appointmentStatus.charAt(0).toUpperCase() + appointment.appointmentStatus.slice(1)}</span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      <div className='flex items-center space-x-2'>
                        {appointment.appointmentStatus !== 'completed' && appointment.appointmentStatus !== 'cancelled' && (
                          <button onClick={() => handleActionClick('complete', appointment.appointmentId)} className='p-1 text-green-600 hover:bg-green-100 rounded' title='Mark as Complete'>
                            <Check className='h-5 w-5' />
                          </button>
                        )}
                        {appointment.appointmentStatus == 'pending' && (
                          <>
                            <button onClick={() => handleActionClick('edit', appointment.appointmentId, appointment.patientId)} className='p-1 text-yellow-600 hover:bg-yellow-100 rounded' title='Edit Details'>
                              <Edit className='h-5 w-5' />
                            </button>

                            <button onClick={() => handleActionClick('cancel', appointment.appointmentId)} className='p-1 text-red-600 hover:bg-red-100 rounded' title='Cancel Appointment'>
                              <X className='h-5 w-5' />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className='px-6 py-4 text-center text-gray-500'>
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
function MedicalHistory() {
  const [params] = useState(new URLSearchParams(window.location.search));
  const actor = useActor();
  const { user, updatePatient } = useAuth();
  const [listInputs, setListInputs] = useState({
    allergies: '',
    currentMedications: '',
    chronicConditions: '',
  });

  const [record, setRecord] = useState(null);
  useEffect(() => {
    if (params.get('patientId')) {
      const patientId = params.get('patientId');
      if (!patientId) return;
      actor
        .getPatient(Principal.fromText(patientId))
        .then(data => {
          setRecord({
            name: data[0]?.name ?? '',
            dateOfBirth: data[0]?.dateOfBirth ?? '',
            bloodType: data[0]?.bloodType ?? '',
            allergies: data[0]?.allergies ?? [],
            currentMedications: data[0]?.currentMedications ?? [],
            chronicConditions: data[0]?.chronicConditions ?? [],
            bloodPressure: data[0]?.bloodPressure ?? '',
            heartRate: data[0]?.heartRate ?? '',
            temperature: data[0]?.temperature ?? '',
            weight: data[0]?.weight ?? '',
            height: data[0]?.height ?? '',
            notes: data[0]?.notes ?? '',
            status: 'editable',
            updatedAt: user?.patient?.updatedAt
              ? (() => {
                  try {
                    const nanoTimestamp = typeof user.patient.updatedAt === 'bigint' ? user.patient.updatedAt : BigInt(0); // Ensure it's a bigint
                    const milliTimestamp = Number(nanoTimestamp / BigInt(1_000_000)); // Convert to milliseconds
                    return new Date(milliTimestamp); // Buat `Date`
                  } catch (error) {
                    console.error('Error converting timestamp:', error);
                    return undefined;
                  }
                })()
              : undefined,
          });
        })
        .catch(error => {
          console.error(error);
          alert('Error fetching patient data');
        });
    } else {
      setRecord({
        name: user?.patient?.name ?? '',
        dateOfBirth: user?.patient?.dateOfBirth ?? '',
        bloodType: user?.patient?.bloodType ?? '',
        allergies: user?.patient?.allergies ?? [],
        currentMedications: user?.patient?.currentMedications ?? [],
        chronicConditions: user?.patient?.chronicConditions ?? [],
        bloodPressure: user?.patient?.bloodPressure ?? '',
        heartRate: user?.patient?.heartRate ?? '',
        temperature: user?.patient?.temperature ?? '',
        weight: user?.patient?.weight ?? '',
        height: user?.patient?.height ?? '',
        notes: user?.patient?.notes ?? '',
        status: user?.patient?.status ?? '',
        updatedAt: user?.patient?.updatedAt
          ? (() => {
              try {
                const nanoTimestamp = typeof user.patient.updatedAt === 'bigint' ? user.patient.updatedAt : BigInt(0);
                const milliTimestamp = Number(nanoTimestamp / BigInt(1_000_000));
                return new Date(milliTimestamp);
              } catch (error) {
                console.error('Error converting timestamp:', error);
                return undefined;
              }
            })()
          : undefined,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecord(prev => {
      if (!prev) return prev; // Handle the case where prev is null
      return {
        ...prev,
        [name]: value || '', // Ensure no undefined values
      };
    });
  };

  const handleListInputChange = (name, value) => {
    setListInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const addItem = (type) => {
    const value = listInputs[type];
    if (!value.trim()) return;

    setRecord(prev => {
      if (!prev) return prev; // Handle the case where prev is null or undefined
      return {
        ...prev,
        [type]: [...prev[type], value],
      };
    });

    setListInputs(prev => ({
      ...prev,
      [type]: '',
    }));
  };

  const removeItem = (type, index) => {
    setRecord(prev => {
      if (!prev) return prev; // Handle the case where prev is null or undefined
      return {
        ...prev,
        [type]: prev[type].filter((_, i) => i !== index),
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = window.confirm('Are you sure you want to submit the medical records? This action cannot be undone.');
    if (!result) return;
    try {
      updatePatient(
        {
          ...record,
          status: 'non-editable',
        },
        params.get('patientId') ?? undefined
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>Medical Record</h1>
        {<h2>Last Updated at: {record?.updatedAt ? record?.updatedAt?.toLocaleString() : 'N/A'}</h2>}
      </div>

      <form onSubmit={handleSubmit} className='glass-effect rounded-2xl p-8 space-y-6'>
        {/* Basic Information */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {basicInfoFields.map((field, index) => (
            <div key={index} className='space-y-2'>
              <label className='flex items-center space-x-2 text-gray-300'>
                <field.icon className='w-4 h-4' />
                <span>{field.label}</span>
              </label>
              {field.type === 'select' ? (
                <select name={field.name} value={String(record?.[field.name] || '')} onChange={handleInputChange} className='w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100'>
                  <option value=''>Select blood type</option>
                  {field.options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <>
                  <input type={field.type} name={field.name} value={String(record?.[field.name] || '')} onChange={handleInputChange} placeholder={field.placeholder} className='w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100' />
                </>
              )}
            </div>
          ))}
        </div>

        {/* Lists Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listFields.map((field, index) => (
            <div key={index} className='space-y-2'>
              <label className='flex items-center space-x-2 text-gray-300'>
                <field.icon className='w-4 h-4' />
                <span>{field.label}</span>
              </label>
              <div className='flex space-x-2'>
                <input type='text' value={listInputs[field.name]} onChange={e => handleListInputChange(field.name, e.target.value)} className='flex-1 bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100' placeholder={field.placeholder} />
                <button type='button' onClick={() => addItem(field.name )} className='p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700'>
                  <Plus className='w-5 h-5' />
                </button>
              </div>
              <div className='space-y-2'>
                {Array.isArray(record?.[field.name ]) &&
                  (record[field.name]).map((item, index) => (
                    <div key={index} className='flex items-center justify-between bg-gray-800/50 rounded-lg px-4 py-2'>
                      <span className='text-gray-300'>{item}</span>
                      <button type='button' onClick={() => removeItem(field.name , index)} className='text-red-400 hover:text-red-300'>
                        <Trash2 className='w-4 h-4' />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Vital Signs */}
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-200'>Vital Signs</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {vitalSignFields.map((field, index) => (
              <div key={index} className='space-y-2'>
                <label className='text-gray-300'>
                  {field.label} ({field.unit})
                </label>
                <input type='text' name={field.name} value={String(record?.[field.name] || '')} onChange={handleInputChange} placeholder={field.placeholder} className='w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100' />
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className='space-y-2'>
          <label className='flex items-center space-x-2 text-gray-300'>
            <FileText className='w-4 h-4' />
            <span>Additional Notes</span>
          </label>
          <textarea name='notes' value={record?.notes} onChange={handleInputChange} rows={4} className='w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100' placeholder='Enter any additional notes or observations' />
        </div>

        {/* Submit Button */}
        <div className='flex justify-end pt-4'>
          {record?.status !== 'non-editable' && (
            <button type='submit' className='px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300'>
              Save Medical Record
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function PatientProfile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(user?.profilePicture);
  const fileInputRef = useRef(null);
  const handleImageChange = (e) => {
    const result = window.confirm('Are you sure you want to change your profile picture?');
    if (!result) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImagePreview(reader.result );
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        updateUser({ profilePicture: uint8Array });
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className='min-h-screen flex items-start justify-center p-4'>
      <div className='glass-effect rounded-2xl p-8 max-w-md w-full'>
        <div className='flex flex-col items-center space-y-6'>
          <div className='relative'>
            <div className='glow-effect rounded-full p-1'>
              <img src={imagePreview} alt='Patient Profile' className='w-48 h-48 rounded-full object-cover ring-2 ring-indigo-500/50' />
            </div>
            {isEditing ? (
              <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                <button onClick={() => fileInputRef.current?.click()} className='p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors'>
                  <Camera className='w-5 h-5' />
                </button>

                <button onClick={() => setIsEditing(false)} className='p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors'>
                  <X className='w-5 h-5' />
                </button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className='absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors'>
                <Edit className='w-4 h-4' />
              </button>
            )}
          </div>
          <input type='file' ref={fileInputRef} onChange={handleImageChange} accept='image/*' className='hidden' />
          <div className='text-center'>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>{user?.patient?.name}</h1>
            <p className='text-gray-400 mt-1'>Patient ID: {user?.principal?.toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
function DoctorProfile({ isEditable }) {
  const { user, updateDoctor, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doctorData, setDoctorData] = useState({});
  const [imagePreview, setImagePreview] = useState(user?.profilePicture);
  const fileInputRef = useRef(null);
  const actor = useActor();

  useEffect(() => {
    const getDoctorData = async () => {
      try {
        const data = await actor.getUserDoctorData();
        if (data[0]) {
          setDoctorData({
            name: data[0].name || '',
            specialization: data[0].specialization || '',
            email: data[0].email || '',
            phone: data[0].phone || '',
            address: data[0].address || '',
            hospitalAffiliation: data[0].hospitalAffiliation || '',
            description: data[0].description || '',
          });
        }
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      } finally {
        setLoading(false);
      }
    };
    getDoctorData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const result = window.confirm('Are you sure you want to change your profile picture?');
    if (!result) return;

    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImagePreview(reader.result);
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        updateUser({ profilePicture: uint8Array });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    updateDoctor(doctorData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className='space-y-8 animate-pulse'>
        {/* Header Section Skeleton */}
        <div className='glass-effect rounded-2xl p-8'>
          <div className='flex flex-col md:flex-row items-start md:items-center gap-8'>
            <div className='relative'>
              <div className='w-32 h-32 rounded-full bg-gray-700'></div>
            </div>

            <div className='flex-1 space-y-4'>
              <div className='h-8 bg-gray-700 rounded-lg w-64'></div>
              <div className='h-4 bg-gray-700 rounded-lg w-48'></div>
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left Column Skeleton */}
          <div className='lg:col-span-2 space-y-8'>
            <div className='glass-effect rounded-2xl p-8 space-y-6'>
              <div className='h-6 bg-gray-700 rounded-lg w-48'></div>
              <div className='space-y-3'>
                <div className='h-4 bg-gray-700 rounded-lg w-full'></div>
                <div className='h-4 bg-gray-700 rounded-lg w-5/6'></div>
                <div className='h-4 bg-gray-700 rounded-lg w-4/6'></div>
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className='space-y-8'>
            <div className='glass-effect rounded-2xl p-8 space-y-6'>
              <div className='h-6 bg-gray-700 rounded-lg w-48'></div>
              <div className='space-y-4'>
                {[1, 2, 3].map(index => (
                  <div key={index} className='flex items-center space-x-3'>
                    <div className='p-2 bg-gray-700 rounded-lg w-9 h-9'></div>
                    <div className='flex-1 space-y-2'>
                      <div className='h-3 bg-gray-700 rounded-lg w-20'></div>
                      <div className='h-4 bg-gray-700 rounded-lg w-full'></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {/* Header Section */}
      <div className='glass-effect rounded-2xl p-8'>
        <div className='flex flex-col md:flex-row items-start md:items-center gap-8'>
          <div className='relative'>
            <div className='glow-effect rounded-full p-1'>
              <img src={imagePreview} alt='Doctor Profile' className='w-32 h-32 rounded-full object-cover ring-2 ring-indigo-500/50' />
            </div>
            {isEditable &&
              (isEditing ? (
                <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2'>
                  <button onClick={() => fileInputRef.current?.click()} className='p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors'>
                    <Camera className='w-5 h-5' />
                  </button>
                  <button onClick={handleSave} className='p-2 bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors'>
                    <Check className='w-5 h-5' />
                  </button>
                  <button onClick={handleCancel} className='p-2 bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors'>
                    <X className='w-5 h-5' />
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className='absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors'>
                  <Edit className='w-4 h-4' />
                </button>
              ))}
            <input type='file' ref={fileInputRef} onChange={handleImageChange} accept='image/*' className='hidden' />
          </div>

          <div className='flex-1'>
            <div className='flex items-center justify-between'>
              <div>
                {isEditing ? (
                  <div className='space-y-2'>
                    <input type='text' name='name' placeholder='enter your name' value={doctorData?.name} onChange={handleInputChange} className='bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2 text-2xl font-bold text-white w-full' />
                    <input type='text' placeholder='Enter your specialization' name='specializations' value={doctorData?.specialization} onChange={handleInputChange} className='bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2 text-gray-300 w-full' />
                  </div>
                ) : (
                  <>
                    <h1 className='text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>{doctorData?.name}</h1>
                    <p className='text-gray-400 mt-1'>{doctorData?.specialization}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column */}
        <div className='lg:col-span-2 space-y-8'>
          <div className='glass-effect rounded-2xl p-8 space-y-6'>
            <h2 className='text-xl font-semibold text-white flex items-center'>
              <FileText className='w-5 h-5 mr-2 text-indigo-400' />
              About Me
            </h2>
            {isEditing ? <textarea name='description' placeholder='Fill your description' value={doctorData?.description} onChange={handleInputChange} rows={4} className='w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 text-gray-300' /> : <p className='text-gray-300 leading-relaxed'>{doctorData?.description}</p>}
          </div>
        </div>

        {/* Right Column */}
        <div className='space-y-8'>
          <div className='glass-effect rounded-2xl p-8 space-y-6'>
            <h2 className='text-xl font-semibold text-white'>Contact Information</h2>
            <div className='space-y-4'>
              {[
                { icon: Mail, label: 'Email', name: 'email', value: doctorData?.email },
                { icon: Phone, label: 'Phone', name: 'phone', value: doctorData?.phone },
                { icon: MapPin, label: 'Address', name: 'address', value: doctorData?.address },
              ].map((item, index) => (
                <div key={index} className='flex items-center space-x-3'>
                  <div className='p-2 bg-indigo-500/20 rounded-lg'>
                    <item.icon className='w-5 h-5 text-indigo-400' />
                  </div>
                  <div className='flex-1'>
                    <p className='text-sm text-gray-400'>{item.label}</p>
                    {isEditing ? <input type='text' name={item.name} value={item.value} onChange={handleInputChange} className='w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2 text-gray-200' /> : <p className='text-gray-200'>{item.value}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const DashboardCard = ({ title, children, className = '' }) => {
  return (
    <div className={`glow-effect glass-effect rounded-xl p-8 hover-glow transition-all duration-300 ${className}`}>
      <h2 className='text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6'>{title}</h2>
      {children}
    </div>
  );
};
function Landing({ navigate }) {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.scroll-reveal').forEach(element => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const features = [
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Book appointments with top doctors in just a few clicks',
    },
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Access your medical records and appointments anytime, anywhere',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is protected with enterprise-grade security',
    },
    {
      icon: MessageSquare,
      title: 'Direct Communication',
      description: 'Chat with your healthcare providers securely through our platform',
    },
  ];

  const benefits = ['Find and book appointments with qualified doctors', 'Access your complete medical history', 'Receive appointment reminders', 'Secure messaging with healthcare providers', 'Digital prescriptions and test results', "Manage family members' health records"];

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800'>
      <div className='relative overflow-hidden min-h-screen flex items-center'>
        <div className='absolute inset-0 space-gradient'></div>
        <div className='absolute inset-0 opacity-30'>
          <div className='absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full filter blur-3xl'></div>
          <div className='absolute top-40 right-20 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl'></div>
          <div className='absolute bottom-20 left-1/3 w-24 h-24 bg-pink-500 rounded-full filter blur-3xl'></div>
        </div>
        <div className='container mx-auto px-4 relative'>
          <div className='max-w-4xl mx-auto text-center'>
            <div className='flex items-center justify-center mb-6'>
              <div className='floating'>
                <Heart className='w-16 h-16 text-pink-500' />
              </div>
              <h1 className='text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ml-4'>Meddok</h1>
            </div>
            <p className='text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed'>Your trusted healthcare companion for seamless doctor appointments and medical record management</p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <button onClick={() => navigate('/login')} className='glow-effect px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 w-full sm:w-auto'>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-20'>
        <div className='text-center mb-16 scroll-reveal'>
          <h2 className='text-3xl font-bold text-white mb-4'>Why Choose Meddok?</h2>
          <p className='text-gray-400'>Experience healthcare management like never before</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div key={index} className='feature-card glass-effect rounded-xl p-6 text-center relative scroll-reveal' style={{ animationDelay: `${index * 100}ms` }}>
              <div className='w-16 h-16 mx-auto mb-4 p-3 bg-indigo-500/20 rounded-lg floating'>
                <feature.icon className='w-full h-full text-indigo-400' />
              </div>
              <h3 className='text-xl font-semibold text-white mb-2'>{feature.title}</h3>
              <p className='text-gray-400'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='container mx-auto px-4 py-20'>
        <div className='max-w-5xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='scroll-reveal'>
              <h2 className='text-3xl font-bold text-white mb-6'>Everything You Need for Better Healthcare Management</h2>
              <div className='space-y-4'>
                {benefits.map((benefit, index) => (
                  <div key={index} className='flex items-center space-x-3 transform hover:translate-x-2 transition-transform duration-300'>
                    <CheckCircle className='w-6 h-6 text-green-400 flex-shrink-0' />
                    <span className='text-gray-300'>{benefit}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/register')} className='mt-8 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 flex items-center group'>
                Join Now
                <ArrowRight className='w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform' />
              </button>
            </div>
            <div className='relative scroll-reveal'>
              <div className='aspect-square rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                <img src='https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' alt='Doctor using digital tablet' className='w-full h-full object-cover' />
                <div className='absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent'></div>
              </div>
              <div className='absolute -bottom-6 -right-6 bg-indigo-600/90 rounded-lg p-4 backdrop-blur-sm transform hover:scale-110 transition-transform duration-300'>
                <div className='flex items-center space-x-2'>
                  <Users className='w-6 h-6 text-white' />
                  <div className='text-white'>
                    <div className='text-2xl font-bold'>10,000+</div>
                    <div className='text-sm'>Active Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-20'>
        <div className='max-w-4xl mx-auto glass-effect rounded-2xl p-12 text-center relative overflow-hidden scroll-reveal'>
          <div className='absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm'></div>
          <div className='absolute inset-0'>
            <div className='absolute top-0 left-0 w-24 h-24 bg-indigo-500 rounded-full filter blur-3xl opacity-20'></div>
            <div className='absolute bottom-0 right-0 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20'></div>
          </div>
          <div className='relative'>
            <div className='flex justify-center mb-6'>
              <div className='floating'>
                <Stethoscope className='w-16 h-16 text-indigo-400' />
              </div>
            </div>
            <h2 className='text-3xl font-bold text-white mb-4'>Ready to Transform Your Healthcare Experience?</h2>
            <p className='text-gray-300 mb-8'>Join thousands of users who have already discovered the convenience of managing their healthcare with Meddok</p>
            <button onClick={() => navigate('/register')} className='glow-effect px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300'>
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const ButtonLogin = ({ user, logout, login, provider, logo }) => {
  return (
    <>
      <button onClick={user?.isAuthenticated ? logout : login} className='w-full flex items-center justify-center p-4 rounded-xl border border-blue-200 hover:border-blue-400 bg-white hover:bg-blue-50 transition-all'>
        {React.isValidElement(logo) ? logo : <img className='mr-4 w-8 h-8 aspect-square' src={String(logo)} alt='' />}
        <span className='font-medium text-gray-700'>
          {user?.isAuthenticated ? 'Logout from ' : 'Login with '} {provider}{' '}
        </span>
      </button>
    </>
  );
};
const Login = ({ navigate }) => {
  const { login, user, logout } = useAuth();
  useEffect(() => {
    if (user?.isAuthenticated && user?.role === '') {
      navigate('/welcome');
    }
    if (user?.isAuthenticated && (user?.role === 'doctor' || user?.role === 'patient')) {
      navigate('/dashboard');
    }
  }, [navigate, user?.isAuthenticated]);
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-white'>
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-bold text-blue-900 mb-4'>Welcome To MedDokAi</h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>Secure Health Platform Powered by Blockchain Technology</p>
        </div>
        <div className='max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8'>
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-gray-800 mb-6 text-center'>Secure Login Methods</h3>
            <ButtonLogin
              login={() => login()}
              logout={logout}
              logo={
                <svg xmlns='http://www.w3.org/2000/svg' width='33px' height='24px' viewBox='0 0 32 24' version='1.1'>
                    <g id='surface1'>
                      <path
                        style={{
                          stroke: 'none',
                          fillRule: 'nonzero',
                          fill: 'rgb(15.686275%,66.666669%,87.843138%)',
                          fillOpacity: 1,
                        }}
                        d='M 13.945312 8.386719 C 13.960938 8.398438 13.976562 8.410156 13.992188 8.421875 C 14.144531 8.546875 14.292969 8.679688 14.4375 8.816406 C 14.492188 8.867188 14.550781 8.917969 14.605469 8.96875 C 14.722656 9.074219 14.832031 9.179688 14.941406 9.285156 C 14.964844 9.304688 14.984375 9.324219 15.003906 9.34375 C 15.203125 9.539062 15.402344 9.738281 15.582031 9.953125 C 15.648438 10.03125 15.71875 10.101562 15.789062 10.175781 C 15.855469 10.242188 15.914062 10.316406 15.972656 10.390625 C 16.074219 10.316406 16.15625 10.226562 16.238281 10.128906 C 16.460938 9.863281 16.699219 9.613281 16.9375 9.367188 C 16.992188 9.3125 17.046875 9.257812 17.097656 9.203125 C 17.261719 9.035156 17.421875 8.867188 17.601562 8.714844 C 17.628906 8.691406 17.65625 8.664062 17.683594 8.640625 C 18.175781 8.207031 18.707031 7.820312 19.28125 7.503906 C 19.296875 7.496094 19.3125 7.484375 19.332031 7.476562 C 20.476562 6.84375 21.703125 6.761719 22.945312 7.136719 C 23.589844 7.339844 24.210938 7.671875 24.71875 8.136719 C 24.753906 8.167969 24.753906 8.167969 24.785156 8.195312 C 24.855469 8.257812 24.921875 8.320312 24.988281 8.386719 C 25.011719 8.410156 25.035156 8.433594 25.0625 8.457031 C 25.382812 8.773438 25.648438 9.140625 25.867188 9.539062 C 25.882812 9.566406 25.882812 9.566406 25.894531 9.59375 C 26.285156 10.292969 26.472656 11.070312 26.507812 11.875 C 26.507812 11.902344 26.507812 11.929688 26.511719 11.953125 C 26.539062 13.269531 26.039062 14.542969 25.160156 15.488281 C 25.148438 15.503906 25.132812 15.519531 25.121094 15.53125 C 25.105469 15.546875 25.09375 15.5625 25.078125 15.578125 C 24.195312 16.53125 22.921875 17.121094 21.644531 17.164062 C 21.285156 17.167969 20.933594 17.167969 20.585938 17.070312 C 20.566406 17.066406 20.542969 17.0625 20.523438 17.054688 C 19.875 16.878906 19.238281 16.570312 18.691406 16.164062 C 18.664062 16.144531 18.632812 16.121094 18.605469 16.101562 C 18.140625 15.765625 17.707031 15.390625 17.292969 14.992188 C 17.253906 14.953125 17.210938 14.914062 17.167969 14.875 C 16.898438 14.621094 16.625 14.359375 16.386719 14.066406 C 16.328125 14 16.265625 13.9375 16.203125 13.871094 C 16.148438 13.816406 16.101562 13.753906 16.054688 13.691406 C 15.945312 13.734375 15.882812 13.8125 15.808594 13.898438 C 15.785156 13.925781 15.761719 13.949219 15.738281 13.980469 C 15.691406 14.03125 15.648438 14.082031 15.605469 14.132812 C 15.433594 14.332031 15.257812 14.515625 15.078125 14.703125 C 15.023438 14.753906 14.972656 14.808594 14.921875 14.859375 C 14.761719 15.027344 14.601562 15.191406 14.425781 15.339844 C 14.402344 15.363281 14.375 15.386719 14.347656 15.410156 C 13.121094 16.5 11.730469 17.257812 10.078125 17.148438 C 8.753906 17.023438 7.503906 16.316406 6.644531 15.28125 C 5.914062 14.363281 5.515625 13.25 5.511719 12.0625 C 5.511719 12.042969 5.511719 12.023438 5.511719 12.003906 C 5.515625 10.71875 5.996094 9.507812 6.851562 8.578125 C 6.867188 8.5625 6.882812 8.546875 6.894531 8.53125 C 7.234375 8.164062 7.601562 7.867188 8.027344 7.613281 C 8.042969 7.605469 8.058594 7.597656 8.074219 7.585938 C 10.121094 6.367188 12.195312 6.957031 13.945312 8.386719 Z M 8.285156 10.074219 C 7.972656 10.441406 7.769531 10.886719 7.652344 11.355469 C 7.648438 11.378906 7.640625 11.402344 7.632812 11.425781 C 7.597656 11.574219 7.582031 11.722656 7.574219 11.875 C 7.570312 11.898438 7.570312 11.925781 7.570312 11.949219 C 7.546875 12.691406 7.816406 13.394531 8.265625 13.964844 C 8.28125 13.984375 8.296875 14.003906 8.3125 14.027344 C 8.4375 14.183594 8.589844 14.308594 8.746094 14.433594 C 8.765625 14.449219 8.789062 14.464844 8.808594 14.484375 C 9.117188 14.71875 9.472656 14.875 9.839844 14.984375 C 9.871094 14.992188 9.898438 15 9.929688 15.007812 C 10.679688 15.195312 11.359375 14.992188 12 14.59375 C 12.632812 14.1875 13.183594 13.660156 13.703125 13.121094 C 13.753906 13.066406 13.804688 13.015625 13.859375 12.960938 C 14.015625 12.796875 14.175781 12.632812 14.320312 12.453125 C 14.347656 12.421875 14.375 12.386719 14.402344 12.355469 C 14.425781 12.324219 14.453125 12.292969 14.476562 12.261719 C 14.492188 12.246094 14.503906 12.230469 14.519531 12.210938 C 14.550781 12.171875 14.582031 12.136719 14.613281 12.097656 C 14.519531 11.980469 14.421875 11.871094 14.316406 11.761719 C 14.269531 11.714844 14.226562 11.664062 14.183594 11.613281 C 14.070312 11.476562 13.945312 11.347656 13.824219 11.222656 C 13.800781 11.195312 13.777344 11.171875 13.75 11.144531 C 13.699219 11.09375 13.648438 11.039062 13.597656 10.988281 C 13.542969 10.933594 13.492188 10.878906 13.441406 10.824219 C 13.160156 10.535156 12.886719 10.246094 12.558594 10.007812 C 12.519531 9.976562 12.519531 9.976562 12.480469 9.949219 C 12.402344 9.890625 12.324219 9.839844 12.246094 9.785156 C 12.21875 9.765625 12.191406 9.746094 12.164062 9.726562 C 11.84375 9.511719 11.511719 9.324219 11.167969 9.15625 C 11.148438 9.144531 11.125 9.132812 11.105469 9.125 C 10.152344 8.664062 8.929688 9.351562 8.285156 10.074219 Z M 18.992188 10.28125 C 18.9375 10.332031 18.878906 10.386719 18.820312 10.4375 C 18.738281 10.511719 18.660156 10.59375 18.582031 10.675781 C 18.53125 10.722656 18.484375 10.765625 18.433594 10.808594 C 18.324219 10.90625 18.230469 11.011719 18.132812 11.121094 C 18.066406 11.199219 18 11.273438 17.925781 11.347656 C 17.738281 11.535156 17.578125 11.75 17.414062 11.957031 C 17.453125 12.054688 17.503906 12.113281 17.578125 12.1875 C 17.652344 12.257812 17.722656 12.332031 17.789062 12.414062 C 17.90625 12.554688 18.03125 12.683594 18.15625 12.816406 C 18.171875 12.828125 18.183594 12.839844 18.195312 12.855469 C 18.261719 12.925781 18.328125 12.992188 18.394531 13.0625 C 18.449219 13.117188 18.503906 13.171875 18.558594 13.230469 C 18.867188 13.554688 19.179688 13.867188 19.546875 14.128906 C 19.574219 14.148438 19.574219 14.148438 19.597656 14.167969 C 20.292969 14.671875 21.0625 15.191406 21.9375 15.035156 C 22.476562 14.925781 22.972656 14.699219 23.386719 14.324219 C 23.410156 14.300781 23.433594 14.28125 23.457031 14.261719 C 23.996094 13.78125 24.359375 13.074219 24.425781 12.34375 C 24.484375 11.539062 24.277344 10.757812 23.769531 10.132812 C 23.164062 9.441406 22.433594 9.054688 21.523438 8.980469 C 20.566406 8.957031 19.667969 9.640625 18.992188 10.28125 Z M 18.992188 10.28125 '
                      />
                      <path
                        style={{
                          stroke: 'none',
                          fillRule: 'nonzero',
                          fill: 'rgb(69.411767%,12.941177%,49.019608%)',
                          fillOpacity: 1,
                        }}
                        d='M 9.167969 8.648438 C 9.199219 8.648438 9.199219 8.648438 9.230469 8.648438 C 9.734375 8.648438 10.253906 8.722656 10.71875 8.933594 C 10.730469 8.953125 10.738281 8.972656 10.746094 8.988281 C 10.730469 8.992188 10.714844 8.992188 10.699219 8.992188 C 10.230469 9.027344 9.796875 9.09375 9.359375 9.292969 C 9.332031 9.304688 9.308594 9.316406 9.28125 9.328125 C 8.597656 9.660156 8.066406 10.253906 7.789062 10.976562 C 7.746094 11.101562 7.710938 11.226562 7.679688 11.355469 C 7.671875 11.378906 7.667969 11.402344 7.660156 11.425781 C 7.625 11.574219 7.609375 11.722656 7.601562 11.875 C 7.597656 11.898438 7.597656 11.925781 7.59375 11.949219 C 7.574219 12.695312 7.84375 13.394531 8.292969 13.964844 C 8.308594 13.984375 8.320312 14 8.332031 14.019531 C 8.449219 14.171875 8.597656 14.289062 8.746094 14.40625 C 8.765625 14.421875 8.789062 14.4375 8.808594 14.457031 C 9.117188 14.691406 9.472656 14.847656 9.839844 14.957031 C 9.871094 14.964844 9.898438 14.972656 9.929688 14.980469 C 10.679688 15.167969 11.359375 14.964844 12 14.566406 C 12.628906 14.164062 13.175781 13.640625 13.691406 13.105469 C 13.742188 13.054688 13.792969 13.003906 13.839844 12.953125 C 13.996094 12.789062 14.152344 12.628906 14.292969 12.453125 C 14.320312 12.421875 14.347656 12.386719 14.375 12.355469 C 14.402344 12.324219 14.425781 12.292969 14.453125 12.261719 C 14.464844 12.246094 14.476562 12.230469 14.492188 12.210938 C 14.523438 12.171875 14.554688 12.136719 14.585938 12.097656 C 14.710938 12.121094 14.769531 12.199219 14.847656 12.292969 C 14.875 12.324219 14.90625 12.359375 14.933594 12.390625 C 14.953125 12.414062 14.953125 12.414062 14.976562 12.4375 C 15.019531 12.488281 15.066406 12.539062 15.113281 12.585938 C 15.195312 12.667969 15.265625 12.753906 15.339844 12.839844 C 15.386719 12.890625 15.433594 12.941406 15.480469 12.988281 C 15.558594 13.070312 15.632812 13.15625 15.707031 13.242188 C 15.8125 13.367188 15.917969 13.488281 16.027344 13.609375 C 15.984375 13.722656 15.90625 13.800781 15.824219 13.886719 C 15.796875 13.914062 15.773438 13.945312 15.746094 13.972656 C 15.730469 13.992188 15.714844 14.007812 15.699219 14.023438 C 15.648438 14.082031 15.597656 14.140625 15.546875 14.199219 C 15.394531 14.371094 15.238281 14.535156 15.078125 14.703125 C 15.023438 14.753906 14.972656 14.808594 14.921875 14.859375 C 14.761719 15.027344 14.601562 15.191406 14.425781 15.339844 C 14.402344 15.363281 14.375 15.386719 14.347656 15.410156 C 13.121094 16.5 11.730469 17.257812 10.078125 17.148438 C 8.753906 17.023438 7.503906 16.316406 6.644531 15.28125 C 5.914062 14.363281 5.515625 13.25 5.511719 12.0625 C 5.511719 12.03125 5.511719 12.03125 5.511719 12.003906 C 5.511719 11.523438 5.542969 11.066406 5.761719 10.640625 C 5.777344 10.605469 5.777344 10.605469 5.792969 10.570312 C 6.023438 10.113281 6.460938 9.453125 6.957031 9.273438 C 7.003906 9.261719 7.046875 9.25 7.09375 9.238281 C 7.09375 9.21875 7.09375 9.199219 7.09375 9.183594 C 7.746094 8.824219 8.429688 8.648438 9.167969 8.648438 Z M 9.167969 8.648438 '
                      />
                      <path
                        style={{
                          stroke: 'none',
                          fillRule: 'nonzero',
                          fill: 'rgb(95.294118%,50.196081%,18.039216%)',
                          fillOpacity: 1,
                        }}
                        d='M 24.589844 8.019531 C 24.632812 8.058594 24.675781 8.097656 24.71875 8.136719 C 24.742188 8.15625 24.761719 8.175781 24.785156 8.195312 C 24.855469 8.257812 24.921875 8.320312 24.988281 8.386719 C 25.011719 8.410156 25.035156 8.433594 25.0625 8.457031 C 25.382812 8.773438 25.648438 9.140625 25.867188 9.539062 C 25.875 9.558594 25.886719 9.574219 25.894531 9.59375 C 26.285156 10.292969 26.472656 11.070312 26.507812 11.875 C 26.507812 11.914062 26.507812 11.914062 26.511719 11.953125 C 26.519531 12.378906 26.46875 12.808594 26.375 13.222656 C 26.355469 13.222656 26.339844 13.222656 26.320312 13.222656 C 26.316406 13.242188 26.316406 13.261719 26.3125 13.277344 C 26.285156 13.386719 26.238281 13.472656 26.1875 13.570312 C 26.175781 13.589844 26.164062 13.609375 26.152344 13.628906 C 26.054688 13.800781 25.941406 13.953125 25.8125 14.101562 C 25.792969 14.128906 25.773438 14.152344 25.753906 14.179688 C 25.394531 14.605469 24.917969 14.941406 24.398438 15.121094 C 24.367188 15.132812 24.332031 15.148438 24.296875 15.164062 C 23.652344 15.40625 22.996094 15.40625 22.320312 15.394531 C 22.320312 15.378906 22.320312 15.359375 22.320312 15.339844 C 22.304688 15.339844 22.289062 15.34375 22.273438 15.34375 C 21.90625 15.359375 21.558594 15.238281 21.226562 15.09375 C 21.226562 15.082031 21.226562 15.074219 21.226562 15.066406 C 21.257812 15.066406 21.289062 15.0625 21.320312 15.0625 C 22.082031 15.039062 22.804688 14.824219 23.386719 14.296875 C 23.417969 14.269531 23.417969 14.269531 23.453125 14.238281 C 23.984375 13.773438 24.332031 13.054688 24.398438 12.34375 C 24.457031 11.535156 24.25 10.753906 23.742188 10.132812 C 23.148438 9.453125 22.414062 9.078125 21.523438 9.007812 C 20.566406 8.984375 19.667969 9.667969 18.992188 10.308594 C 18.9375 10.359375 18.878906 10.414062 18.820312 10.464844 C 18.738281 10.539062 18.660156 10.621094 18.582031 10.703125 C 18.53125 10.75 18.480469 10.796875 18.429688 10.839844 C 18.324219 10.933594 18.230469 11.039062 18.140625 11.148438 C 18.085938 11.210938 18.027344 11.269531 17.96875 11.328125 C 17.769531 11.535156 17.59375 11.761719 17.414062 11.984375 C 17.335938 11.949219 17.285156 11.914062 17.230469 11.851562 C 17.214844 11.835938 17.199219 11.820312 17.183594 11.800781 C 17.167969 11.785156 17.152344 11.765625 17.136719 11.75 C 17.105469 11.710938 17.070312 11.675781 17.039062 11.636719 C 17.019531 11.617188 17.003906 11.597656 16.984375 11.578125 C 16.902344 11.484375 16.816406 11.390625 16.734375 11.300781 C 16.699219 11.261719 16.667969 11.226562 16.632812 11.1875 C 16.582031 11.132812 16.53125 11.078125 16.480469 11.023438 C 16.121094 10.628906 16.121094 10.628906 15.972656 10.445312 C 16.066406 10.308594 16.167969 10.183594 16.289062 10.070312 C 16.339844 10.015625 16.382812 9.960938 16.429688 9.90625 C 16.527344 9.792969 16.628906 9.6875 16.730469 9.578125 C 16.75 9.5625 16.765625 9.542969 16.785156 9.523438 C 16.824219 9.484375 16.863281 9.445312 16.898438 9.40625 C 16.957031 9.34375 17.015625 9.285156 17.074219 9.226562 C 17.109375 9.1875 17.148438 9.148438 17.1875 9.109375 C 17.203125 9.09375 17.21875 9.074219 17.238281 9.058594 C 17.355469 8.9375 17.476562 8.824219 17.601562 8.714844 C 17.621094 8.695312 17.621094 8.695312 17.640625 8.675781 C 18.144531 8.226562 18.691406 7.828125 19.28125 7.503906 C 19.304688 7.492188 19.304688 7.492188 19.332031 7.476562 C 21.007812 6.550781 23.105469 6.785156 24.589844 8.019531 Z M 24.589844 8.019531 '
                      />
                      <path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(19.215687%,50.588238%,74.901962%)", fillOpacity: 1 }} d="M 5.761719 10.445312 C 5.796875 10.445312 5.832031 10.445312 5.867188 10.445312 C 5.855469 10.46875 5.855469 10.46875 5.84375 10.492188 C 5.800781 10.582031 5.769531 10.679688 5.734375 10.773438 C 5.707031 10.832031 5.707031 10.832031 5.652344 10.859375 C 5.703125 10.570312 5.703125 10.570312 5.761719 10.445312 Z M 5.761719 10.445312 " />
                      <path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(22.352941%,64.705884%,79.607844%)", fillOpacity: 1 }} d="M 26.320312 13.222656 C 26.363281 13.359375 26.324219 13.480469 26.265625 13.609375 C 26.195312 13.652344 26.195312 13.652344 26.132812 13.664062 C 26.171875 13.5625 26.214844 13.464844 26.257812 13.367188 C 26.269531 13.339844 26.28125 13.3125 26.292969 13.285156 C 26.304688 13.253906 26.304688 13.253906 26.320312 13.222656 Z M 26.320312 13.222656 " />
                      <path
                        style={{
                          stroke: 'none',
                          fillRule: 'nonzero',
                          fill: 'rgb(85.882354%,72.156864%,34.901962%)',
                          fillOpacity: 1,
                        }}
                        d='M 21.28125 15.09375 C 21.429688 15.09375 21.578125 15.09375 21.734375 15.09375 C 21.734375 15.101562 21.734375 15.109375 21.734375 15.121094 C 21.664062 15.121094 21.59375 15.121094 21.519531 15.121094 C 21.519531 15.136719 21.519531 15.15625 21.519531 15.175781 C 21.597656 15.1875 21.597656 15.1875 21.679688 15.203125 C 21.578125 15.242188 21.519531 15.214844 21.421875 15.175781 C 21.378906 15.160156 21.378906 15.160156 21.339844 15.144531 C 21.320312 15.136719 21.300781 15.128906 21.28125 15.121094 C 21.28125 15.109375 21.28125 15.101562 21.28125 15.09375 Z M 21.28125 15.09375 '
                      />
                      <path
                        style={{
                          stroke: 'none',
                          fillRule: 'nonzero',
                          fill: 'rgb(35.686275%,14.509805%,42.352942%)',
                          fillOpacity: 1,
                        }}
                        d='M 10.507812 8.878906 C 10.597656 8.894531 10.667969 8.917969 10.746094 8.960938 C 10.746094 8.972656 10.746094 8.980469 10.746094 8.988281 C 10.640625 8.988281 10.535156 8.988281 10.425781 8.988281 C 10.425781 8.972656 10.425781 8.953125 10.425781 8.933594 C 10.453125 8.933594 10.480469 8.933594 10.507812 8.933594 C 10.507812 8.917969 10.507812 8.898438 10.507812 8.878906 Z M 10.507812 8.878906 '
                      />
                      <path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(18.039216%,58.431375%,81.960785%)", fillOpacity: 1 }} d="M 5.761719 10.445312 C 5.796875 10.445312 5.832031 10.445312 5.867188 10.445312 C 5.84375 10.5 5.84375 10.5 5.8125 10.558594 C 5.785156 10.566406 5.761719 10.574219 5.734375 10.585938 C 5.742188 10.539062 5.75 10.492188 5.761719 10.445312 Z M 5.761719 10.445312 " />
                    </g>
                  </svg>
              }
              provider='Internet Identity'
              user={user}
            />
          </div>
        </div>
        <div className='mt-12 text-center text-sm text-gray-500'>
          <p>© 2025 MedDokAi. All rights reserved.</p>
          <div className='mt-2 space-x-4'>
            <a href='#' className='hover:text-blue-600'>
              Privacy Policy
            </a>
            <a href='#' className='hover:text-blue-600'>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
function Link ({ to, children, className })  {
  const navigate = (event) => {
    event.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <a href={to} onClick={navigate} className={className}>
      {children}
    </a>
  );
};
function Welcome({navigate}) {
  const { updateUser } = useAuth();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center space-y-12 px-4 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900'>
      <div className='text-center space-y-4 max-w-2xl'>
        <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>Welcome to HealthCare Platform</h1>
        <p className='text-lg text-gray-300'>Thank you for joining us. Let&apos;s get started by selecting your role.</p>
      </div>

      <div className='grid md:grid-cols-2 gap-8 w-full max-w-4xl'>
        <button onClick={() => updateUser({ role: 'patient' })} className='group relative glass-effect rounded-2xl p-8 text-left space-y-4 hover:border-indigo-500/50 border-2 border-transparent transition-all duration-300'>
          <div className='absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
          <div className='p-3 bg-indigo-500/20 rounded-xl w-fit'>
            <UserCircle className='w-8 h-8 text-indigo-400' />
          </div>
          <div>
            <h2 className='text-xl font-semibold text-white'>I&apos;m a Patient</h2>
            <p className='text-gray-400 mt-2'>Access your medical records, book appointments, and manage your health journey</p>
          </div>
          <div className='flex items-center text-indigo-400 group-hover:text-indigo-300'>
            <span>Continue as Patient</span>
            <ArrowRight className='w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform' />
          </div>
        </button>

        <button onClick={() => navigate('/doctor-verification')} className='group relative glass-effect rounded-2xl p-8 text-left space-y-4 hover:border-indigo-500/50 border-2 border-transparent transition-all duration-300'>
          <div className='absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity'></div>
          <div className='p-3 bg-purple-500/20 rounded-xl w-fit'>
            <Stethoscope className='w-8 h-8 text-purple-400' />
          </div>
          <div>
            <h2 className='text-xl font-semibold text-white'>I&apos;m a Doctor</h2>
            <p className='text-gray-400 mt-2'>Join our medical community, manage patients, and provide healthcare services</p>
          </div>
          <div className='flex items-center text-purple-400 group-hover:text-purple-300'>
            <span>Apply as Doctor</span>
            <ArrowRight className='w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform' />
          </div>
        </button>
      </div>

      <p className='text-gray-400 text-center max-w-2xl'>By continuing, you agree to our Terms of Service and Privacy Policy. Your data will be handled with utmost security and confidentiality.</p>
    </div>
  );
}

 function DoctorVerification({navigate}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser, updateDoctor } = useAuth();
  const actor = useActor();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    graduationYear: '',
    institution: '',
    hospitalAffiliation: '',
    address: '',
    documents: null
  });

  const validateForm = () => {
    const newErrors= {};

    if (!form.fullName) newErrors.fullName = 'Full name is required';
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!form.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(form.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }
    if (!form.specialization) newErrors.specialization = 'Specialization is required';
    if (!form.licenseNumber) newErrors.licenseNumber = 'License number is required';
    if (!form.hospitalAffiliation) newErrors.hospitalAffiliation = 'Hospital affiliation is required';
    if (!form.address) newErrors.address = 'Address is required';
    if (!form.documents || form.documents.length === 0) {
      newErrors.documents = 'At least one document is required';
    } else {
      const invalidFiles = Array.from(form.documents).filter(file => {
        const isValidType = ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type);
        const isValidSize = file.size <= 3 * 1024 * 1024; // 3MB
        return !isValidType || !isValidSize;
      });

      if (invalidFiles.length > 0) {
        newErrors.documents = 'Invalid file(s). Only PDF, JPEG, and PNG files under 3MB are allowed';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setForm(prev => ({
        ...prev,
        documents: e.target.files
      }));
      if (errors.documents) {
        setErrors(prev => ({
          ...prev,
          documents: undefined
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (!form.documents) return;

      const files = Array.from(form.documents);
      await Promise.all(
        files.map(async file => {
          if (await actor.checkFileExists(file.name)) {
            alert(`File "${file.name}" already exists. Please choose a different file name.`);
            return;
          }

          const fileContent = await readFileAsArrayBuffer(file);
          if (!fileContent) {
            alert(`Failed to read file: ${file.name}`);
            return;
          }

          const content = new Uint8Array(fileContent);
          const chunkSize = 1024 * 1024; // 1MB chunks
          const totalChunks = Math.ceil(content.length / chunkSize);

          try {
            for (let i = 0; i < totalChunks; i++) {
              const start = i * chunkSize;
              const end = Math.min(start + chunkSize, content.length);
              const chunk = content.slice(start, end);
              await actor.uploadFileChunk(file.name, chunk, BigInt(i), file.type, content.length.toString());
            }
          } catch (error) {
            console.error(`Upload failed for ${file.name}:`, error);
            return;
          }
        })
      );

      await updateDoctor(form);
      updateUser({ role: 'doctor' });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during verification:', error);
      alert('An error occurred during verification. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result );
      reader.onerror = () => reject(null);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className='py-8 px-4 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900'>
          <div className='glass-effect max-w-4xl rounded-2xl p-8 mx-auto space-y-6'>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Doctor Verification
          </h1>
          <p className="text-gray-400 mt-2">
            Please provide your professional information for verification. All data will be kept confidential.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <BadgeCheck className="w-5 h-5 mr-2 text-indigo-400" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100"
                  placeholder="Dr. John Doe"
                />
                {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100"
                  placeholder="doctor@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100"
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Specialization</label>
                <input
                  type="text"
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100"
                  placeholder="e.g., Cardiology"
                />
                {errors.specialization && <p className="text-red-400 text-sm mt-1">{errors.specialization}</p>}
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <GraduationCap className="w-5 h-5 mr-2 text-purple-400" />
              Professional Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={form.licenseNumber}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100"
                  placeholder="Medical License Number"
                />
                {errors.licenseNumber && <p className="text-red-400 text-sm mt-1">{errors.licenseNumber}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Graduation Year
                </label>
                <input
                  type="number"
                  name="graduationYear"
                  value={form.graduationYear}
                  onChange={handleChange}
                  min="1950"
                  max={new Date().getFullYear()}
                  className="w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100"
                  placeholder="YYYY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  <Building2 className="w-4 h-4 inline mr-1" />
                  Medical Institution
                </label>
                <input
                  type="text"
                  name="institution"
                  value={form.institution}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100"
                  placeholder="University/Medical School"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Hospital Affiliation</label>
                <input
                  type="text"
                  name="hospitalAffiliation"
                  value={form.hospitalAffiliation}
                  onChange={handleChange}
                  className="w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100"
                  placeholder="Current Hospital/Clinic"
                />
                {errors.hospitalAffiliation && <p className="text-red-400 text-sm mt-1">{errors.hospitalAffiliation}</p>}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
              Practice Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full bg-gray-900/50 border border-indigo-500/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-gray-100"
              placeholder="Full address of your practice"
            />
            {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
          </div>

          {/* Document Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
              <FileText className="w-4 h-4 inline mr-1" />
              Supporting Documents
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                className="hidden"
                id="documents"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="documents"
                className="flex items-center justify-center w-full p-4 border-2 border-dashed border-indigo-500/30 rounded-lg cursor-pointer hover:border-indigo-500/50 transition-colors"
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-indigo-400 mb-2" />
                  <p className="text-sm text-gray-300">
                    Upload your medical license, certificates, and other relevant documents
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, or PNG files (Max 3MB each)
                  </p>
                </div>
              </label>
              {form.documents && (
                <p className="mt-2 text-sm text-gray-400">
                  {form.documents.length} file(s) selected
                </p>
              )}
              {errors.documents && <p className="text-red-400 text-sm mt-1">{errors.documents}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit for Verification'
              )}
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
const ErrorPage = () => <h1>404 - Not Found</h1>;
function Dashboard() {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const { user } = useAuth();
  const actor = useActor();
  useEffect(() => {
    actor.getUpcomingAppointments().then(data => {
      setUpcomingAppointments(data);
    });
  }, []);

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
        {user?.role === UserRole.PATIENT && (
          <>
            <DashboardCard className='col-span-full' title='Upcoming Appointments'>
              <div className='space-y-6'>
                {upcomingAppointments.map((appointment, index) => (
                  <div key={index} className='glass-effect p-6 rounded-xl hover-glow transition-all duration-300'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='font-medium text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent'>{appointment[3].name}</p>
                        <p className='text-sm text-gray-400 mt-1'>{appointment[3].specialization}</p>
                      </div>
                      <div className='text-right'>
                        <p className='font-medium text-gray-200'>{new Date(appointment[1].appointmentDate).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </>
        )}
        {user?.role === UserRole.DOCTOR && (
          <DashboardCard className='col-span-full' title='Your Patients'>
            <div className='space-y-6'>
              <div className='glass-effect p-6 rounded-xl hover-glow transition-all duration-300'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-lg bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent'>John Doe</p>
                    <p className='text-sm text-gray-400 mt-1'>General Checkup</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-gray-200'>Next Appointment: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        )}
      </div>
    </>
  );
}
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ actor: undefined, authClient: undefined, isAuthenticated: false, principal: undefined });
  const handleProfilePicture = (pic) => (pic?.length ? URL.createObjectURL(new Blob([new Uint8Array(pic[0] || [])])) : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg');
  const logout = async () => {
    if (user.authClient) {
      await user.authClient.logout();
      setUser({ actor: undefined, authClient: undefined, isAuthenticated: false, principal: 'Logged out' });
      window.history.replaceState({}, '', '/'); 
      window.dispatchEvent(new Event('popstate'));
      window.location.reload();
    }
  };

  const updateUser = async (data) => {
    try {
      setLoading(true);
      if (!user.isAuthenticated) return;
      const loggedUser = await user.actor?.updateUserField({ role: data.role ? [data.role] : [], profilePicture: data.profilePicture ? [data.profilePicture] : [] });
      if (loggedUser) setUser(prev => ({ ...prev, role: loggedUser[0]?.role, profilePicture: handleProfilePicture(loggedUser[0]?.profilePicture) }));
      if (data.role){
        window.history.replaceState({}, '', '/dashboard'); 
        window.dispatchEvent(new Event('popstate'));
      };
    } catch(error) {
      console.error(error);
      alert('Error updating user profile');
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (data, patientId) => {
    const updateData = {
      name: data.name ? [data.name] : [],
      dateOfBirth: data.dateOfBirth ? [data.dateOfBirth] : [],
      bloodType: data.bloodType ? [data.bloodType] : [],
      allergies: data.allergies ? [data.allergies] : [],
      currentMedications: data.currentMedications ? [data.currentMedications] : [],
      chronicConditions: data.chronicConditions ? [data.chronicConditions] : [],
      bloodPressure: data.bloodPressure ? [data.bloodPressure] : [],
      heartRate: data.heartRate ? [data.heartRate] : [],
      temperature: data.temperature ? [data.temperature] : [],
      weight: data.weight ? [data.weight] : [],
      height: data.height ? [data.height] : [],
      notes: data.notes ? [data.notes] : [],
      status: patientId ? ['non-editable'] : data.status ? [data.status] : [],
      updatedAt: [],
    };

    try {
      setLoading(true);
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      const actor = createActor(canisterId, { agentOptions: { identity } });
      const updatedPatient = patientId ? await actor.updatePatientField(updateData , [Principal.fromText(patientId)]) : await user.actor.updatePatientField(updateData , []);
      if (updatedPatient) setUser(prev => ({ ...prev, patient: updatedPatient[0] }));
    } finally {
      setLoading(false);
    }
  };

  const updateDoctor = async (data) => {
    const updateData = {
      name: data.name ? [data.name] : [],
      email: data.email ? [data.email] : [],
      phone: data.phone ? [data.phone] : [],
      specialization: data.specialization ? [data.specialization] : [],
      licenseNumber: data.licenseNumber ? [data.licenseNumber] : [],
      hospitalAffiliation: data.hospitalAffiliation ? [data.hospitalAffiliation] : [],
      address: data.address ? [data.address] : [],
      description: data.description ? [data.description] : [],
    };

    try {
      setLoading(true);
      if (!user.isAuthenticated) return;
      const updatedDoctor = await user.actor?.updateDoctorData(updateData);
      if (updatedDoctor) setUser(prev => ({ ...prev, doctor: updatedDoctor[0] }));
    } finally {
      setLoading(false);
    }
  };

  const updateActor = async () => {
    try {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      const actor = createActor(canisterId, { agentOptions: { identity } });
      const isAuthenticated = await authClient.isAuthenticated();
      const principal = isAuthenticated ? identity.getPrincipal().toText() : 'Not Connected';
      if (isAuthenticated) {
        setLoading(true);
        let loggedUser = await actor.getMyProfile();
        if (!loggedUser?.length) loggedUser = await actor.addUser('');
        setUser({ actor, authClient, isAuthenticated, principal, role: loggedUser[0]?.role, profilePicture: handleProfilePicture((loggedUser[0]?.profilePicture).map(item => (item instanceof Uint8Array ? item : new Uint8Array(item)))) });
        if (loggedUser[0]?.role === 'patient') {
          const patientProfile = await actor.getPatientProfile();
          setUser(prev => ({ ...prev, patient: patientProfile[0] }));
        }
        if (loggedUser[0]?.role === 'doctor') {
          const doctorProfile = await actor.getDoctorProfile();
          setUser(prev => ({ ...prev, doctor: doctorProfile[0] }));
        }
      } else {
        setUser({ actor, authClient, isAuthenticated, principal });
      }
    } catch(error) {
      console.error(error);
      indexedDB.deleteDatabase('auth-client-db');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateActor();
  }, []);

  const login = async () => {
    await user?.authClient?.login({ identityProvider, onSuccess: updateActor });
  };

  const contextValue = useMemo(() => ({ user, login, updatePatient, updateDoctor, logout, setLoading, updateUser }), [user]);

  return <AuthContext.Provider value={contextValue}>{loading ? <Loading /> : children}</AuthContext.Provider>;
};
const useAuth = () => useContext(AuthContext);

const AppRouter = () => {
  const [path, setPath] = useState(window.location.pathname);
  const { user } = useAuth();

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = newPath => {
    window.history.pushState({}, '', newPath);
    setPath(newPath);
  };

  const isDashboardPath = path.startsWith('/dashboard');
  const isAuthenticated = user?.isAuthenticated;

  if (isDashboardPath && !isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (isDashboardPath) {
    const dashboardPath = path.replace('/dashboard', '') || '/';
    const dashboardRoutes = {
      '/': Dashboard,
      '/appointments': AppointmentPage,
      '/appointments/doctor-list': DoctorList,
      '/medical-history': MedicalHistory,
      '/settings/patient': PatientProfile,
      '/settings/doctor': () => <DoctorProfile isEditable={true} />,
    };
    const ContentComponent = dashboardRoutes[dashboardPath] || ErrorPage;

    return (
      <Layout navigate={navigate} logout={useAuth().logout}>
        <ContentComponent navigate={navigate} />
      </Layout>
    );
  }

  // Rute publik
  const publicRoutes = {
    '/': Landing,
    '/login': Login,
    '/doctor-verification': DoctorVerification,
    '/welcome': Welcome,
    '/404': ErrorPage,
  };
  const PublicComponent = publicRoutes[path] || ErrorPage;

  return <PublicComponent navigate={navigate} />;
};
function Sidebar() {
  const { user, logout } = useAuth();
  return (
    <>
      <Link to={'/dashboard'}>
        <div className='glow-effect bg-gradient-to-br from-indigo-500 to-purple-500 p-4 rounded-xl mb-12 hover:scale-110 transition-transform duration-300'>
          {user?.role == UserRole.PATIENT && <Activity className='w-6 h-6 md:w-7 md:h-7' />}
          {user?.role == UserRole.DOCTOR && <Stethoscope className='w-6 h-6 md:w-7 md:h-7' />}
        </div>
      </Link>
      <div className='flex flex-col items-center space-y-10'>
        <Link to={'/dashboard/appointments'} className='nav-button p-4 rounded-xl text-gray-400'>
          <Calendar className='w-7 h-7' />
        </Link>
        {user?.role == UserRole.PATIENT && (
          <Link to={'/dashboard/medical-history'} className='nav-button p-4 rounded-xl text-gray-400'>
            <FileText className='w-7 h-7' />
          </Link>
        )}
      </div>
      <div className='mt-auto flex flex-col items-center space-y-6'>
        <Link to={user?.role == 'doctor' ? '/dashboard/settings/doctor' : '/dashboard/settings/patient'} className='nav-button p-4 rounded-xl text-gray-100'>
          <Settings className='w-7 h-7' />
        </Link>
        <button onClick={logout} className='nav-button p-4 rounded-xl text-gray-400'>
          <LogOut className='w-7 h-7' />
        </button>
      </div>
    </>
  );
}


function Layout({ children }) {
  const [name, setName] = useState('');
  const { user, updatePatient } = useAuth();
  return (
    <>
      {user && ((user.role === 'doctor' && (!user.doctor || !user.doctor.name)) || (user.role !== 'doctor' && (!user.patient || !user.patient.name))) && (
        <>
          <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative'>
              <h2 className='text-xl font-bold mb-4 text-center text-gray-800'>Please Enter Your Name</h2>
              <input type='text' value={name} onChange={e => setName(e.target.value)} className='w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Your Name' />
              <button
                onClick={() => {
                  if (name.trim()) {
                    updatePatient({ name, status: 'editable' });
                  } else {
                    alert('Name cannot be empty');
                  }
                }}
                className='bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-md w-full hover:from-indigo-600 hover:to-purple-600 transition-all duration-300'
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
      <div className='min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 text-gray-100'>
        {/* Background Decoration */}
        <div className='fixed inset-0 space-gradient opacity-50'></div>
        {/* Sidebar */}
        <nav className='fixed left-0 top-0 h-full w-24 glass-effect border-r border-indigo-500/20 flex flex-col items-center py-12 z-40'>
          <Sidebar />
        </nav>

        {/* Main Content */}
        <div className='ml-24'>
          {/* Header */}
          <header className='glass-effect border-b border-indigo-500/20 p-6 sticky top-0 z-40'>
            <div className='flex items-center justify-between max-w-7xl mx-auto'>
              <h1 className='text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>Health Dashboard</h1>
              <div className='flex items-center space-x-6 relative'>
                <div className='glow-effect rounded-full p-1 hover:scale-110 transition-transform duration-300'>
                  <img src={user?.profilePicture} alt='Profile' className='w-12 h-12 rounded-full ring-2 ring-indigo-500/50' />
                </div>
              </div>
            </div>
          </header>
          <main className='p-12 max-w-7xl mx-auto relative z-10'>{children}</main>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
