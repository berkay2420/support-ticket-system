'use client';

import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { updateUserAsAdmin } from '@/actions/admin.actions';
import { Edit3, User, Mail, Building2, ArrowLeft, Copy, Check } from 'lucide-react';
import Link from 'next/link';

interface UpdateUserFormProps {
  user: {
    id: string;
    name: string | null;
    email: string;
    department: string;
  };
}

const UpdateUserForm = ({ user }: UpdateUserFormProps) => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const initialState = {
    success: false,
    message: '',
    errors: []
  };

  const [state, formAction] = useActionState(updateUserAsAdmin, initialState);

  useEffect(() => {
    if (state.success) {
      if (state.message.includes('New Password:')) {
        const passwordMatch = state.message.match(/New Password: (.+)$/);
        if (passwordMatch) {
          const password = passwordMatch[1];
          navigator.clipboard.writeText(password);
          toast.success('Password copied to clipboard!');
        }
      } else {
        toast.success(state.message);
      }
      setTimeout(() => {
        router.push(`/users/${user.id}`);
      }, 1500);
    } else if (state.errors && state.errors.length > 0) {
      state.errors.forEach(err => toast.error(err));
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, router, user.id]);

  const handleCopyPassword = () => {
    if (state.success && state.message.includes('New Password:')) {
      const passwordMatch = state.message.match(/New Password: (.+)$/);
      if (passwordMatch) {
        navigator.clipboard.writeText(passwordMatch[1]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const getNewPassword = () => {
    if (state.success && state.message.includes('New Password:')) {
      const passwordMatch = state.message.match(/New Password: (.+)$/);
      return passwordMatch ? passwordMatch[1] : null;
    }
    return null;
  };

  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8'>
      <div className='max-w-md mx-auto'>
        {/* Back Button */}
        <Link
          href={`/users/${user.id}`}
          className='inline-flex items-center gap-2 text-slate-600 hover:text-emerald-700 mb-8 transition'
        >
          <ArrowLeft className='w-5 h-5' />
          Back to Employee
        </Link>

        {/* Card */}
        <div className='bg-white border border-emerald-200 rounded-lg p-8 shadow-sm'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='flex justify-center mb-4'>
              <div className='bg-linear-to-br from-emerald-600 to-teal-600 p-3 rounded-lg shadow-md'>
                <Edit3 className='w-8 h-8 text-white' />
              </div>
            </div>
            <h1 className='text-3xl font-bold mb-2 text-emerald-900'>Update Employee</h1>
            <p className='text-slate-600'>Edit employee information</p>
          </div>

          {/* Form */}
          <form action={formAction} className='space-y-5'>
            <input type='hidden' name='userId' value={user.id} />

            {/* Name Input */}
            <div className='relative'>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Full Name</label>
              <div className='relative'>
                <User className='absolute left-3 top-3.5 w-5 h-5 text-slate-400' />
                <input
                  className='w-full bg-emerald-50 border border-emerald-200 text-slate-900 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition'
                  type='text'
                  name='name'
                  defaultValue={user.name || ''}
                  placeholder='John Doe'
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className='relative'>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Email</label>
              <div className='relative'>
                <Mail className='absolute left-3 top-3.5 w-5 h-5 text-slate-400' />
                <input
                  className='w-full bg-emerald-50 border border-emerald-200 text-slate-900 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition'
                  type='email'
                  name='email'
                  defaultValue={user.email}
                  placeholder='your@email.com'
                  required
                />
              </div>
            </div>

            {/* Department Select */}
            <div className='relative'>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Department</label>
              <div className='relative'>
                <Building2 className='absolute left-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none z-10' />
                <select
                  className='w-full bg-emerald-50 border border-emerald-200 text-slate-900 px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition appearance-none cursor-pointer'
                  name='department'
                  defaultValue={user.department}
                  required
                >
                  <option value='Sales'>Sales</option>
                  <option value='IT'>IT</option>
                  <option value='HR'>HR</option>
                  <option value='Finance'>Finance</option>
                  <option value='Marketing'>Marketing</option>
                </select>
              </div>
            </div>

            {/* Reset Password Checkbox */}
            <div className='bg-amber-50 border border-amber-200 rounded-lg p-4'>
              <label className='flex items-center gap-3 cursor-pointer'>
                <input
                  type='checkbox'
                  name='resetPassword'
                  className='w-5 h-5 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500'
                />
                <div>
                  <p className='text-sm font-semibold text-slate-900'>Reset Password</p>
                  <p className='text-xs text-slate-600'>Generate new secure password</p>
                </div>
              </label>
            </div>

            {/* New Password Display */}
            {getNewPassword() && (
              <div className='bg-emerald-50 border border-emerald-200 rounded-lg p-4'>
                <p className='text-sm font-semibold text-emerald-900 mb-2'>New Password Generated</p>
                <div className='flex items-center gap-2'>
                  <code className='flex-1 bg-white border border-emerald-200 rounded px-3 py-2 text-sm font-mono text-emerald-900'>
                    {getNewPassword()}
                  </code>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              className='w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 group mt-6'
              type='submit'
            >
              <Edit3 className='w-5 h-5 group-hover:scale-110 transition' />
              <span>Update User</span>
            </button>
          </form>

          {/* Footer */}
          <div className='mt-6 text-center'>
            <p className='text-slate-600 text-sm'>
              Changes will be saved immediately
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserForm;