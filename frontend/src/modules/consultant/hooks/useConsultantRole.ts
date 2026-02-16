
import { useContext } from 'react';
import { AppStateContext } from '../../../App';
import { ConsultantRole } from '../types/consultant.types';

export const useConsultantRole = () => {
  const { role, setRole, status, setStatus } = useContext(AppStateContext);

  const isIndividual = role === ConsultantRole.INDIVIDUAL;
  const isEnterpriseAdmin = role === ConsultantRole.ENTERPRISE_ADMIN;
  const isEnterpriseMember = role === ConsultantRole.ENTERPRISE_MEMBER;

  return {
    role,
    setRole,
    status,
    setStatus,
    isIndividual,
    isEnterpriseAdmin,
    isEnterpriseMember
  };
};
