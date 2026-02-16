
import React from 'react';
import { UserPlus, MoreVertical, TrendingUp, Trash2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useConsultantDashboard } from '../hooks/useConsultantDashboard';
import { formatCurrency } from '../utils/calculations';

const TeamManagementPage: React.FC = () => {
  const { teamMembers, inviteTeamMember, removeTeamMember } = useConsultantDashboard();

  const handleInvite = () => {
    const name = prompt('Enter consultant name:');
    const email = prompt('Enter consultant email:');
    if (name && email) {
      inviteTeamMember(name, email);
    }
  };

  const handleRemove = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the team?`)) {
      removeTeamMember(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
          <p className="text-slate-500">Manage your consultants and their permissions.</p>
        </div>
        <Button variant="primary" onClick={handleInvite}>
          <UserPlus size={18} className="mr-2" /> Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <div className="overflow-x-auto -mx-5 -my-5">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Member</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Sessions</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Revenue</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full bg-slate-100" />
                          <div>
                            <p className="text-sm font-bold text-slate-900">{member.name}</p>
                            <p className="text-xs text-slate-400">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="info">{member.role.replace('ENTERPRISE_', '')}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{member.sessionsCount}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{formatCurrency(member.revenue)}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button 
                            onClick={() => handleRemove(member.id, member.name)}
                            className="p-2 text-slate-400 hover:text-rose-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Quick Stats">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Total Members</span>
                <span className="text-sm font-bold text-slate-900">{teamMembers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Pending Invites</span>
                <span className="text-sm font-bold text-amber-600">3</span>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-emerald-600 mb-1">
                  <TrendingUp size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Growth</span>
                </div>
                <p className="text-lg font-bold text-slate-900">+15% this month</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamManagementPage;
