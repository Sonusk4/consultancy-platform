
import React, { useState, useRef } from 'react';
import { Shield, Award, Camera, Loader2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useConsultantDashboard } from '../hooks/useConsultantDashboard';

const ProfilePage: React.FC = () => {
  const { profile, updateProfile } = useConsultantDashboard();
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: profile.name,
    title: profile.expertise.join(', '),
    bio: profile.bio
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateProfile({
        name: formData.name,
        bio: formData.bio,
        expertise: formData.title.split(',').map(s => s.trim())
      });
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleAddSkill = () => {
    const skill = prompt('Enter new skill:');
    if (skill) {
      updateProfile({ expertise: [...profile.expertise, skill] });
    }
  };

  const handleCameraButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfile({ profileImage: base64String });
        alert('Profile image updated from device!');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Professional Profile</h1>
        <Button 
          variant="primary" 
          onClick={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
          Save Changes
        </Button>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative">
            <img 
              src={profile.profileImage} 
              alt={profile.name} 
              className="w-32 h-32 rounded-3xl object-cover bg-slate-100 border-4 border-white shadow-md"
            />
            <button 
              onClick={handleCameraButtonClick}
              className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-colors"
              title="Upload from device"
            >
              <Camera size={18} />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Professional Title</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bio</label>
              <textarea 
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]" 
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
              ></textarea>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Expertise & Skills">
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.expertise.map(skill => (
              <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full border border-indigo-100">{skill}</span>
            ))}
            <button 
              onClick={handleAddSkill}
              className="px-3 py-1 border border-slate-200 text-slate-500 text-sm font-semibold rounded-full hover:bg-slate-50"
            >
              + Add skill
            </button>
          </div>
        </Card>

        <Card title="Verification Status">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <Shield className="text-emerald-500" size={20} />
                <span className="text-sm font-semibold text-slate-700">Identity Verified</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase">Verified</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <Award className="text-amber-500" size={20} />
                <span className="text-sm font-semibold text-slate-700">Education Certificates</span>
              </div>
              <button 
                onClick={() => alert('Opening certificate verification portal...')}
                className="text-xs font-bold text-indigo-600 uppercase hover:underline"
              >
                Complete Now
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
