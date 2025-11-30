'use client';

import { useActionState, useEffect, useState } from "react";
import { createTrackingTikcet } from "@/actions/tracking.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NewTicketForm = () => {
  const [description, setDescription] = useState('');
  const [state, formAction] = useActionState(createTrackingTikcet, { success: false, message: '' });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success('Ticket Created Successfully');
      router.push('/tickets');
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className='w-full max-w-md bg-white shadow-md rounded-lg p-8 border border-gray-200 space-y-4'>
      <h1 className='text-2xl font-bold text-center text-blue-600'>Start Time Tracking</h1>
      
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className='w-full p-2 border rounded'
        required
      />

      <button
        type="submit"
        className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
      >
        Start
      </button>

      {state.message && !state.success && (
        <p className='text-red-500 text-center'>{state.message}</p>
      )}
    </form>
  );
};

export default NewTicketForm;
