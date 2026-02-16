
import React, { useState } from 'react';
import { Star, MessageCircle, ThumbsUp, Send, Check } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useConsultantDashboard } from '../hooks/useConsultantDashboard';

const ReviewsPage: React.FC = () => {
  const { profile, replies, submitReviewReply } = useConsultantDashboard();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const mockReviews = [
    { id: 'rev-1', client: 'Sarah Jenkins', date: 'Nov 15, 2023', text: "Absolutely brilliant consultation. The insights provided were actionable and we could implement them the very next day. Highly recommend for any startup looking to scale.", stars: 5 },
    { id: 'rev-2', client: 'TechFlow Corp', date: 'Nov 12, 2023', text: "Very professional and deep domain knowledge. Helped us navigate a tricky compliance situation in record time.", stars: 5 },
    { id: 'rev-3', client: 'Michael Chen', date: 'Nov 10, 2023', text: "Good session, but ran over time slightly. Great value for money though.", stars: 4 }
  ];

  const handleReplySubmit = (reviewId: string) => {
    if (!replyText.trim()) return;
    submitReviewReply(reviewId, replyText);
    setReplyingTo(null);
    setReplyText('');
    alert('Your reply has been posted!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Client Reviews</h1>
        <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm">
          <Star className="text-amber-400 fill-amber-400" size={20} />
          <span className="text-lg font-bold text-slate-900">{profile.rating}</span>
          <span className="text-sm text-slate-500">({profile.totalReviews} reviews)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[5, 4, 3, 2, 1].map(star => (
          <div key={star} className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600 w-4">{star}★</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-400" 
                style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '5%' }}
              ></div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 w-8">{star === 5 ? '85%' : star === 4 ? '10%' : '2%'}</span>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {mockReviews.map((review) => (
          <Card key={review.id}>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0 overflow-hidden">
                <img src={`https://picsum.photos/seed/${review.client}/100/100`} alt={review.client} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{review.client}</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className={j < review.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200'} />
                      ))}
                      <span className="text-[10px] text-slate-400 ml-2 font-medium">{review.date}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert('Review marked as helpful')}
                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <ThumbsUp size={16} />
                  </button>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed italic">
                  "{review.text}"
                </p>

                {/* Existing Reply */}
                {replies[review.id] && (
                  <div className="mt-4 p-3 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg">
                    <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <Check size={10} /> Your Response
                    </p>
                    <p className="text-sm text-indigo-900">{replies[review.id]}</p>
                  </div>
                )}

                {/* Reply Form */}
                <div className="mt-4 pt-4 border-t border-slate-50">
                  {replyingTo === review.id ? (
                    <div className="space-y-3">
                      <textarea
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
                        placeholder="Type your response..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        autoFocus
                      ></textarea>
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setReplyingTo(null)}
                          className="px-3 py-1.5 text-xs font-bold text-slate-500 uppercase hover:bg-slate-100 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleReplySubmit(review.id)}
                          className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold uppercase rounded-lg shadow-sm hover:bg-indigo-700 flex items-center gap-2"
                        >
                          Post Response <Send size={12} />
                        </button>
                      </div>
                    </div>
                  ) : !replies[review.id] && (
                    <button 
                      onClick={() => setReplyingTo(review.id)}
                      className="text-xs font-bold text-indigo-600 flex items-center gap-1.5 uppercase tracking-wider hover:text-indigo-800"
                    >
                      <MessageCircle size={14} /> Reply to review
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
