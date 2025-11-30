'use client';

import { useActionState, useEffect, useState } from "react";
import { createTrackingTikcet } from "@/actions/tracking.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Play, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const NewTicketForm = () => {
  const [description, setDescription] = useState('');
  const [state, formAction] = useActionState(createTrackingTikcet, { success: false, message: '' });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success('Time Tracking Started Successfully');
      router.push('/time-tracking-tickets');
    }
  }, [state.success, router]);

  return (
    <div className='bg-white border border-emerald-200 rounded-lg shadow-sm overflow-hidden'>
      <div className='flex flex-col lg:flex-row'>
        {/* Left Side - Professional Visual */}
        <div className='hidden lg:flex lg:w-2/5 bg-linear-to-b from-emerald-600 to-teal-600 p-12 items-center justify-center text-white'>
          <div className='text-center space-y-8'>
            
            <div className='space-y-4'>
              <h2 className='text-3xl font-bold'>Track Your Time</h2>
              <p className='text-emerald-50 text-lg leading-relaxed'>
                Describe what are you working on
              </p>
            </div>

            <div className='border-t border-white border-opacity-20 pt-8 space-y-4'>
              <div className='text-sm text-emerald-50'>
                <p className='font-semibold mb-2'></p>
                
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className='lg:w-3/5 p-8 lg:p-12'>
          {/* Header */}
          <div className='mb-10'>
            <div className='flex lg:hidden justify-center mb-6'>
              <div className='bg-linear-to-br from-emerald-600 to-teal-600 p-4 rounded-lg'>
                <Clock className='w-8 h-8 text-white' />
              </div>
            </div>
            <h1 className='text-4xl font-bold text-slate-900 text-center lg:text-left mb-3'>
              Begin Time Tracking
            </h1>
            <p className='text-slate-600 text-center lg:text-left text-lg'>
              Log the task you are currently working on
            </p>
          </div>

          {/* Error Message */}
          {state.message && !state.success && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3'>
              <AlertTriangle className='w-5 h-5 text-red-600 shrink-0 mt-0.5' />
              <p className='text-red-700'>{state.message}</p>
            </div>
          )}

          {/* Form */}
          <form action={formAction} className='space-y-8'>
            {/* Task Input */}
            <div>
              <label className='block text-sm font-bold text-slate-900 mb-3'>
                Task Description
              </label>
              <textarea
                name="description"
                placeholder="Enter the task name and relevant details"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className='w-full bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-500 px-4 py-3 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition resize-none font-medium'
                rows={5}
                required
              />
              <p className='text-xs text-slate-500 mt-2'>
                Example: Client meeting, Code review, Database optimization
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className='w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-3 text-base'
            >
              <Play className='w-5 h-5' />
              <span>Start Tracking</span>
            </button>
          </form>

          {/* Footer */}
          <div className='mt-10 pt-8 border-t border-slate-200 text-center'>
            <p className='text-slate-600 text-sm'>
              <Link href='/time-tracking-tickets' className='text-emerald-700 hover:text-emerald-900 font-semibold transition'>
                View active sessions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTicketForm;