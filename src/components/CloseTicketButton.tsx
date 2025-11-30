'use client';

import { useActionState, useEffect } from 'react';
import { closeTicket } from '@/actions/ticket.actions';
import { toast } from 'sonner';

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
    <form action={formAction}>
      <input type='hidden' name='ticketId' value={ticketId} />
      <button
        type='submit'
        className='bg-red-500 text-white px-3 py-3 w-full rounded hover:bg-red-600 transition'
      >
        Close Ticket
      </button>
    </form>
  );
};

export default CloseTicketButton;