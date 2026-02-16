
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { RegistrationStatus } from '../types/consultant.types';
import { useConsultantRole } from '../hooks/useConsultantRole';

const ApprovalStatus: React.FC = () => {
  const navigate = useNavigate();
  const { status, setStatus } = useConsultantRole();

  const handleSimulateApproval = () => {
    setStatus(RegistrationStatus.APPROVED);
  };

  const handleSimulateRejection = () => {
    setStatus(RegistrationStatus.REJECTED);
  };

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        {status === RegistrationStatus.PENDING && (
          <>
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock size={40} className="animate-spin-slow" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Application Pending</h1>
            <p className="text-slate-500 mb-8">
              We're currently reviewing your application. This usually takes 24-48 hours. We'll notify you once it's verified.
            </p>
            <div className="space-y-3">
              <Button variant="outline" fullWidth onClick={handleSimulateApproval}>
                Simulate Admin Approval
              </Button>
              <Button variant="ghost" fullWidth onClick={handleSimulateRejection} className="text-rose-500">
                Simulate Rejection
              </Button>
            </div>
          </>
        )}

        {status === RegistrationStatus.APPROVED && (
          <>
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Account Verified!</h1>
            <p className="text-slate-500 mb-8">
              Congratulations! Your account has been approved. You can now access your consultant dashboard.
            </p>
            <Button fullWidth size="lg" onClick={handleGoToDashboard}>
              Go to Dashboard <ArrowRight className="ml-2" size={18} />
            </Button>
          </>
        )}

        {status === RegistrationStatus.REJECTED && (
          <>
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle size={40} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Application Rejected</h1>
            <p className="text-slate-500 mb-4">
              Unfortunately, your application was not approved at this time.
            </p>
            <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 text-left mb-8">
              <p className="text-xs font-bold text-rose-700 uppercase mb-1">Reason for rejection:</p>
              <p className="text-sm text-rose-600">The provided KYC documents were blurry and couldn't be verified. Please re-upload high-quality images.</p>
            </div>
            <Button fullWidth onClick={() => setStatus(RegistrationStatus.PENDING)}>
              Retry Application
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ApprovalStatus;
