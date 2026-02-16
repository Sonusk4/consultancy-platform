
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Clock, Globe, ChevronRight, SlidersHorizontal, IndianRupee, Calendar } from 'lucide-react';
import { consultants } from '../data/mockData';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const navigate = useNavigate();

  const categories = ['UPSC Prep', 'IT Career Coach', 'Startup Advisor', 'CA & Tax Consultant', 'Vedic Astrology Expert'];
  const languages = ['Hindi', 'English', 'Tamil', 'Telugu', 'Marathi', 'Punjabi'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const filteredConsultants = consultants.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.expertise.some(e => e.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory.length === 0 || selectedCategory.includes(c.domain);
    const matchesPrice = c.pricePerSession <= maxPrice;
    const matchesRating = c.rating >= minRating;
    const matchesLanguage = selectedLanguages.length === 0 || c.languages.some(l => selectedLanguages.includes(l));
    const matchesDay = selectedDays.length === 0 || c.availability.some(d => selectedDays.includes(d)) || c.availability.includes('Daily');

    return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesLanguage && matchesDay;
  });

  const toggleFilter = (list: string[], item: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Expert Directory</h1>
          <p className="text-slate-500 text-lg font-medium">Browse verified Indian consultants across specialized domains</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Filters Panel */}
        <aside className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-10 sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-indigo-600" /> Filters
              </h3>
              <button 
                onClick={() => {
                  setSelectedCategory([]);
                  setMaxPrice(5000);
                  setMinRating(0);
                  setSelectedLanguages([]);
                  setSelectedDays([]);
                }}
                className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Expertise</label>
              <div className="space-y-3">
                {categories.map(domain => (
                  <label key={domain} className="flex items-center gap-3 text-sm font-bold text-slate-600 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedCategory.includes(domain)}
                      onChange={() => toggleFilter(selectedCategory, domain, setSelectedCategory)}
                      className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500" 
                    />
                    <span className={`group-hover:text-indigo-600 transition-colors ${selectedCategory.includes(domain) ? 'text-indigo-600' : ''}`}>{domain}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Max Session Fee (₹)</label>
              <div className="px-2">
                <input 
                  type="range" min="500" max="5000" step="100" value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-3" 
                />
                <div className="flex justify-between text-[10px] font-black text-slate-900 uppercase tracking-tighter">
                  <span>₹500</span>
                  <span className="text-indigo-600 text-sm">Up to ₹{maxPrice}</span>
                </div>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Available Days</label>
              <div className="grid grid-cols-4 gap-2">
                {days.map(day => (
                  <button 
                    key={day}
                    onClick={() => toggleFilter(selectedDays, day, setSelectedDays)}
                    className={`py-2 rounded-xl border font-bold text-[10px] transition-all
                      ${selectedDays.includes(day) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-indigo-200'}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">Minimum Rating</label>
              <div className="flex gap-2">
                {[4.5, 4.0, 3.5, 0].map(rating => (
                  <button 
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`flex-1 py-2 rounded-xl border-2 transition-all font-bold text-xs flex items-center justify-center gap-1
                      ${minRating === rating ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-100 hover:border-indigo-200'}`}
                  >
                    {rating === 0 ? 'Any' : <><Star className={`w-3 h-3 ${minRating === rating ? 'fill-white' : 'fill-amber-400 text-amber-400'}`} /> {rating}+</>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Search & Listing */}
        <main className="lg:col-span-3 space-y-8">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-7 h-7 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name, expertise, or keyword..." 
              className="w-full pl-16 pr-8 py-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all text-xl font-bold placeholder:font-medium placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredConsultants.length > 0 ? filteredConsultants.map((con) => (
              <div key={con.id} className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                  <div className="shrink-0 cursor-pointer" onClick={() => navigate(`/user/consultant/${con.id}`)}>
                    <img 
                      src={con.image} 
                      alt={con.name} 
                      className="w-32 h-32 md:w-44 md:h-44 rounded-[2rem] object-cover shadow-2xl border-4 border-white group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <h3 
                          className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer"
                          onClick={() => navigate(`/user/consultant/${con.id}`)}
                        >
                          {con.name}
                        </h3>
                        <p className="text-indigo-600 font-black uppercase text-xs tracking-[0.2em] mt-1">{con.domain}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl text-amber-700 font-black text-sm border border-amber-100">
                        <Star className="w-5 h-5 fill-current" />
                        {con.rating} <span className="text-amber-500 font-bold ml-1 text-xs">({con.reviewsCount})</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-2 max-w-2xl">{con.bio}</p>
                    
                    <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400 uppercase tracking-tighter">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-indigo-400" />
                        {con.languages.join(', ')}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        Avail. {con.availability.join(', ')}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4">
                      {con.expertise.slice(0, 3).map(exp => (
                        <span key={exp} className="px-4 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                          {exp}
                        </span>
                      ))}
                      {con.expertise.length > 3 && <span className="text-[10px] font-black text-slate-400 flex items-center">+{con.expertise.length - 3} more</span>}
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Fee</p>
                      <p className="text-3xl font-black text-slate-900 tabular-nums flex items-center">
                        <IndianRupee className="w-6 h-6" /> {con.pricePerSession.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="space-y-3 w-full">
                      <button 
                        onClick={() => navigate(`/user/booking/${con.id}`)}
                        className="w-full px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100"
                      >
                        Book Now
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => navigate(`/user/consultant/${con.id}`)}
                        className="w-full px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-50/40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            )) : (
              <div className="bg-white rounded-[3rem] p-32 text-center space-y-6 border border-slate-100 shadow-sm">
                <Search className="w-16 h-16 text-slate-200 mx-auto" />
                <h3 className="text-2xl font-black text-slate-900">No experts found</h3>
                <p className="text-slate-500 font-medium">Try broadening your filters or search keywords.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory([]); setMaxPrice(5000); setMinRating(0); setSelectedLanguages([]); setSelectedDays([]); setSearchTerm('');
                  }}
                  className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
