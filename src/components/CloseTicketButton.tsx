'use client';

import { useActionState, useEffect } from 'react';
import { closeTicket } from '@/actions/ticket.actions';
import { toast } from 'sonner';
import { X } from 'lucide-react';

const CloseTicketButton = ({
  ticketId,
  isClosed,
}: {
  ticketId: number;
  isClosed: boolean;
}) => {
  const initialState = {
    success: false,
    message: '',
  };

  const [state, formAction] = useActionState(closeTicket, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setTimeout(() => window.location.reload(), 300);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state.success, state.message]);

  if (isClosed) return null;

  return (
    <form action={formAction} className='w-full'>
      <input type='hidden' name='ticketId' value={ticketId} />
      <button
        type='submit'
        className='w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 group'
      >
        <X className='w-5 h-5' />
        <span>Close Ticket</span>
      </button>
    </form>
  );
};

export default CloseTicketButton;