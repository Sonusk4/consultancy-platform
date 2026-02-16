
import React, { useState, useRef } from 'react';
import { 
  User, 
  MailOpen, 
  PhoneCall, 
  MapPin, 
  Camera, 
  Briefcase, 
  Edit3
} from 'lucide-react';
import { currentUser } from '../data/mockData';

const ProfilePage: React.FC = () => {
  const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=300&h=300&fit=crop");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Profile Header Card */}
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col items-center md:flex-row gap-8">
        <div className="relative group">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover ring-4 ring-indigo-50 transition-transform group-hover:scale-[1.02]" 
          />
          <button 
            onClick={handleImageClick}
            className="absolute bottom-0 right-0 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all border-4 border-white"
            title="Change Profile Picture"
          >
            <Camera className="w-5 h-5" />
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
        
        <div className="text-center md:text-left space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{currentUser.name}</h1>
          <p className="text-indigo-600 font-bold uppercase tracking-widest text-sm flex items-center justify-center md:justify-start gap-2">
            <Briefcase className="w-4 h-4" /> {currentUser.occupation}
          </p>
          <p className="text-slate-400 text-sm font-medium">{currentUser.location}</p>
        </div>
      </div>

      {/* Basic Information Card */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 shadow-sm space-y-10">
        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
            <Edit3 className="w-5 h-5 text-indigo-600" /> Basic Details
          </h3>
          <button className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Edit</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info Rows */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <User className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-slate-700">{currentUser.name}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Role</label>
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <Briefcase className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-slate-700">{currentUser.occupation}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <MailOpen className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-slate-700">{currentUser.email}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <PhoneCall className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-slate-700">{currentUser.phone}</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
            <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <MapPin className="w-5 h-5 text-slate-400" />
              <span className="font-bold text-slate-700">{currentUser.location}</span>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="space-y-4 pt-4 border-t border-slate-50">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">About Me</label>
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl text-slate-600 font-medium leading-relaxed">
            I am currently focused on professional growth and seeking expert guidance in public administration and competitive exam strategies. Passionate about community impact and continuous learning.
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="px-10 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 shadow-lg active:scale-95 transition-all">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
