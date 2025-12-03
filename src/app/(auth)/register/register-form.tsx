'use client'

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { registerUser } from "@/actions/auth.actions";
import { UserPlus, User, Mail, Lock, Building2 } from 'lucide-react';
import Link from 'next/link';

const RegisterForm = () => {
  const router = useRouter();

  const initialState = {
    success: false,
    message: '',
    errors:[]
  };

  const [state, formAction] = useActionState(registerUser, initialState);
  
  useEffect(() => {
    if (state.success) {

      toast.success(state.message);
      router.push('/');

    } else if (state.errors && state.errors.length > 0) {

      state.errors.forEach(err => toast.error(err));

    } else if (state.message) {

      toast.error(state.message);

    }
    }, [state, router]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 via-white to-teal-50 px-4 py-8'>
      <div className='w-full max-w-md'>
        {/* Card */}
        <div className='bg-white border border-emerald-200 rounded-lg p-8 shadow-sm'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='flex justify-center mb-4'>
              <div className='bg-linear-to-br from-emerald-600 to-teal-600 p-3 rounded-lg shadow-md'>
                <UserPlus className='w-8 h-8 text-white' />
              </div>
            </div>
            <h1 className='text-3xl font-bold mb-2 text-emerald-900'>Create Account</h1>
            <p className='text-slate-600'>Join our team and get started</p>
          </div>

          {/* Form */}
          <form action={formAction} className='space-y-5'>
            {/* Name Input */}
            <div className='relative'>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Full Name</label>
              <div className='relative'>
                <User className='absolute left-3 top-3.5 w-5 h-5 text-slate-400' />
                <input
                  className='w-full bg-emerald-50 border border-emerald-200 text-slate-900 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition'
                  type='text'
                  name='name'
                  placeholder='John Doe'
                  autoComplete='name'
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
                  placeholder='your@email.com'
                  autoComplete='email'
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className='relative'>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Password</label>
              <div className='relative'>
                <Lock className='absolute left-3 top-3.5 w-5 h-5 text-slate-400' />
                <input
                  className='w-full bg-emerald-50 border border-emerald-200 text-slate-900 placeholder-slate-500 px-4 py-3 pl-10 rounded-lg focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition'
                  type='password'
                  name='password'
                  placeholder='Create a strong password'
                  autoComplete='new-password'
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
                  required
                >
                  <option value='' className='bg-white text-slate-500'>Select your department</option>
                  <option value='Sales' className='bg-white'>Sales</option>
                  <option value='IT' className='bg-white'>IT</option>
                  <option value='HR' className='bg-white'>HR</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className='w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 group mt-6'
              type='submit'
            >
              <UserPlus className='w-5 h-5 group-hover:scale-110 transition' />
              <span>Create Account</span>
            </button>
          </form>

          {/* Footer */}
          <div className='mt-6 text-center'>
            <p className='text-slate-600'>
              Already have an account?{' '}
              <Link href='/login' className='text-emerald-700 hover:text-emerald-900 font-semibold transition'>
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Info Notice */}
        <p className='text-center text-slate-500 text-sm mt-6'>
          Your data is protected with industry-standard encryption
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;