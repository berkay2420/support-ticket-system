import Link from 'next/link';
import { getCurrentUser } from '@/lib/current-user';
import LogoutButton from './LogoutButton'
import { Ticket, Clock } from 'lucide-react';

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <nav className='bg-white border-b border-emerald-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm'>
      {/* Logo */}
      <Link href='/' className='flex items-center gap-2 group'>
        <div className='bg-linear-to-br from-emerald-600 to-teal-600 p-2 rounded-lg group-hover:shadow-md transition'>
          <Ticket className='w-6 h-6 text-white' />
        </div>
        <span className='text-xl font-bold text-emerald-900'>
          Quick Ticket
        </span>
      </Link>

      {/* Navigation */}
      <div className='flex items-center gap-2 md:gap-4'>
        {user ? (
          <>
            {/* Desktop Navigation */}
            <div className='hidden md:flex items-center gap-4'>
              <Link
                href='/tickets'
                className='flex items-center gap-2 text-slate-600 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-50 transition'
              >
                <Ticket className='w-4 h-4' />
                <span>Support</span>
              </Link>
              
              <Link
                href='/time-tracking-tickets'
                className='flex items-center gap-2 text-slate-600 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-50 transition'
              >
                <Clock className='w-4 h-4' />
                <span>Time Track</span>
              </Link>

              <div className='w-px h-6 bg-emerald-200'></div>

              <Link
                href='/tickets/new'
                className='bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md text-sm font-semibold'
              >
                New Ticket
              </Link>
              
              <Link
                href='/time-tracking-tickets/new'
                className='bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md text-sm font-semibold'
              >
                Start Track
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className='md:hidden flex items-center gap-2'>
              <Link
                href='/tickets'
                className='text-slate-600 hover:text-emerald-700 p-2 rounded-lg hover:bg-emerald-50 transition'
              >
                <Ticket className='w-5 h-5' />
              </Link>
              <Link
                href='/time-tracking-tickets'
                className='text-slate-600 hover:text-emerald-700 p-2 rounded-lg hover:bg-emerald-50 transition'
              >
                <Clock className='w-5 h-5' />
              </Link>
            </div>

            {/* Logout */}
            <div className='flex items-center gap-2'>
              <span className='text-sm text-slate-600 hidden sm:inline'>
                {user.name}
              </span>
              <LogoutButton />
            </div>
          </>
        ) : (
          <>
            <Link
              href='/login'
              className='text-emerald-700 hover:text-emerald-900 px-4 py-2 rounded-lg hover:bg-emerald-50 transition font-medium'
            >
              Sign In
            </Link>
            <Link
              href='/register'
              className='bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md font-medium'
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;