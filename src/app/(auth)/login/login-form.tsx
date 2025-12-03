'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/actions/auth.actions';
import { LogIn, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { error } from 'console';

const LoginForm = () => {
  const router = useRouter();

  const initialState = {
    success: false,
    message: '',
    errors:[]
  };

  const [state, formAction] = useActionState(loginUser, initialState);

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
                <LogIn className='w-8 h-8 text-white' />
              </div>
            </div>
            <h1 className='text-3xl font-bold mb-2 text-emerald-900'>Welcome Back</h1>
            <p className='text-slate-600'>Sign in to your account</p>
          </div>

          {/* Form */}
          <form action={formAction} className='space-y-5'>
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
                  placeholder='Enter your password'
                  autoComplete='current-password'
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              className='w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-center gap-2 group'
              type='submit'
            >
              <LogIn className='w-5 h-5 group-hover:translate-x-0.5 transition' />
              <span>Sign In</span>
            </button>
          </form>

          {/* Footer */}
          <div className='mt-6 text-center'>
            <p className='text-slate-600'>
              Don't have an account?{' '}
              <Link href='/register' className='text-emerald-700 hover:text-emerald-900 font-semibold transition'>
                Create one
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <p className='text-center text-slate-500 text-sm mt-6'>
          Your login information is secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default LoginForm;