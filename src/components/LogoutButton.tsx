'use client';

import { useActionState, useEffect } from 'react';
import { logoutUser } from '@/actions/auth.actions';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const initialState = {
    success: false,
    message: '',
  };

  const [state, formAction] = useActionState(logoutUser, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success('Logout successful');
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <button
        type='submit'
        className='bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:shadow-md flex items-center gap-2'
      >
        <LogOut className='w-4 h-4' />
        <span>Sign Out</span>
      </button>
    </form>
  );
};

export default LogoutButton;