'use client'

import { useActionState, useEffect } from "react";
import { createTicket } from "@/actions/ticket.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Send, AlertCircle, Type, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const NewTicketForm = () => {
  const [state, formAction] = useActionState(createTicket, {
    success: false,
    message: ''
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success('Ticket Created Successfully');
      router.push('/tickets');
    }
  }, [state.success, router]);

  return (
    <div className='bg-white border border-emerald-200 rounded-lg p-8 shadow-sm'>
      {/* Header */}
      <div className='text-center mb-8'>
        <div className='flex justify-center mb-4'>
          <div className='bg-linear-to-br from-emerald-600 to-teal-600 p-3 rounded-lg shadow-md'>
            <AlertCircle className='w-8 h-8 text-white' />
          </div>
        </div>
        <h1 className='text-3xl font-bold mb-2 text-emerald-900'>
          Submit a Support Ticket
        </h1>
        <p className='text-slate-600'>
          Describe your issue and we'll help you resolve it
        </p>
      </div>

      {/* Error Message */}
      {state.message && !state.success && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3'>
          <AlertTriangle className='w-5 h-5 text-red-600 shrink-0 mt-0.5' />
          <p className='text-red-700'>{state.message}</p>
        </div>
      )}

      {/* Form */}
      <form action={formAction} className='space-y-6'>
        {/* Subject Input */}
        <div>
          <label className='block text-sm font-semibold text-slate-700 mb-2'>
            Subject
          </label>
          <div className='relative'>
            <Type className='absolute left-3 top-3.5 w-5 h-5 text-slate-400' />
            <input
              className='w-full bg-emerald-50 border border-emerald-200 text-slate-900 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition'
              type='text'
              name='subject'
              placeholder='Brief description of your issue'
              required
            />
          </div>
        </div>

        {/* Description Textarea */}
        <div>
          <label className='block text-sm font-semibold text-slate-700 mb-2'>
            Description
          </label>
          <div className='relative'>
            <FileText className='absolute left-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none' />
            <textarea
              className='w-full bg-emerald-50 border border-emerald-200 text-slate-900 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition resize-none'
              name='description'
              placeholder='Provide detailed information about your issue...'
              rows={5}
              required
            />
          </div>
        </div>

        {/* Priority Select */}
        <div>
          <label className='block text-sm font-semibold text-slate-700 mb-2'>
            Priority Level
          </label>
          <div className='relative'>
            <AlertTriangle className='absolute left-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none z-10' />
            <select
              className='w-full bg-emerald-50 border border-emerald-200 text-slate-900 px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition appearance-none cursor-pointer'
              name='priority'
              defaultValue='Low'
              required
            >
              <option value='Low' className='bg-white'>🟢 Low Priority</option>
              <option value='Medium' className='bg-white'>🟡 Medium Priority</option>
              <option value='High' className='bg-white'>🔴 High Priority</option>
            </select>
          </div>
          <p className='text-xs text-slate-500 mt-2'>
            Choose based on the urgency and impact of your issue
          </p>
        </div>

        {/* Submit Button */}
        <button
          className='w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 group mt-8'
          type='submit'
        >
          <Send className='w-5 h-5 group-hover:translate-x-0.5 transition' />
          <span>Submit Ticket</span>
        </button>
      </form>

      {/* Footer */}
      <div className='mt-6 pt-6 border-t border-emerald-100 text-center'>
        <p className='text-slate-600 text-sm'>
          Need help?{' '}
          <Link href='/' className='text-emerald-700 hover:text-emerald-900 font-semibold transition'>
            Go back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NewTicketForm;