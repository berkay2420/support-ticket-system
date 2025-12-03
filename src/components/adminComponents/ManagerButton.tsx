'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Crown } from 'lucide-react';
import { makeAdmin, revokeAdmin } from '@/actions/admin.actions';

interface ManagerButtonProps {
  userId: string;
  isAdmin: boolean;
}

export default function ManagerButton({ userId, isAdmin: initialIsAdmin }: ManagerButtonProps) {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = isAdmin
        ? await revokeAdmin(userId)
        : await makeAdmin(userId);

      if (result.success) {
        toast.success(result.message);
        setIsAdmin(!isAdmin); // toggle admin state
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to update user role');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
        isAdmin
          ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
          : 'bg-linear-to-br from-amber-600 to-amber-700 text-white hover:shadow-md hover:-translate-y-0.5 active:translate-y-0'
      }`}
    >
      <Crown className='w-5 h-5' />
      <span>
        {isLoading
          ? 'Processing...'
          : isAdmin
          ? 'Revoke Admin'
          : 'Make Admin'}
      </span>
    </button>
  );
}
