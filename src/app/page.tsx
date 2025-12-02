import { getTickets } from '@/actions/ticket.actions';
import { getCurrentUser } from '@/lib/current-user';
import { redirect } from 'next/navigation';
import TicketComponent from '@/components/TicketComponent';
import Link from 'next/link';
import { Ticket, Clock, ArrowRight } from 'lucide-react';

const HomePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const tickets = await getTickets();

  return (
    <main className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 px-4 py-16'>
      <div className='max-w-6xl mx-auto'>
        {/* Hero Section */}
        <div className='text-center mb-16'>
          <div className='flex justify-center mb-6'>
            <div className='bg-linear-to-br from-emerald-600 to-teal-600 p-4 rounded-xl shadow-md'>
              <Ticket className='w-12 h-12 text-white' />
            </div>
          </div>
          
          <h1 className='text-5xl md:text-6xl font-bold mb-4 text-emerald-900'>
            Quick Ticket
          </h1>
          
          <p className='text-xl text-slate-700 mb-2'>
            Professional ticket management made simple
          </p>
          <p className='text-slate-600'>
            Track issues and monitor your team's progress with confidence
          </p>
        </div>

        {/* Action Buttons */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16'>
          <Link
            href='/tickets/new'
            className='group relative overflow-hidden bg-linear-to-br from-emerald-600 to-emerald-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'
          >
            <div className='flex items-center justify-center gap-2'>
              <Ticket className='w-5 h-5' />
              <span>New Ticket</span>
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition' />
            </div>
          </Link>

          <Link
            href='/tickets'
            className='group bg-white border border-emerald-200 hover:border-emerald-400 text-slate-900 px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'
          >
            <div className='flex items-center justify-center gap-2'>
              <Ticket className='w-5 h-5 text-emerald-600' />
              <span>Support Tickets</span>
            </div>
          </Link>

          <Link
            href='/time-tracking-tickets'
            className='group bg-white border border-emerald-200 hover:border-emerald-400 text-slate-900 px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'
          >
            <div className='flex items-center justify-center gap-2'>
              <Clock className='w-5 h-5 text-teal-600' />
              <span>Time Tracking</span>
            </div>
          </Link>

          <Link
            href='/time-tracking-tickets/new'
            className='group relative overflow-hidden bg-linear-to-br from-teal-600 to-teal-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'
          >
            <div className='flex items-center justify-center gap-2'>
              <Clock className='w-5 h-5' />
              <span>Start Tracking</span>
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition' />
            </div>
          </Link>

          {user.isAdmin && (
            <Link
              href="/admin"
              className="group relative overflow-hidden bg-linear-to-br from-teal-600 to-teal-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Go to admin panel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          )}
        </div>

        {/* Tickets Section */}
        <div className='bg-white border border-emerald-200 rounded-lg p-8 shadow-sm'>
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-emerald-900 mb-2'>
              All Support Tickets
            </h2>
            <div className='h-1 w-12 bg-linear-to-r from-emerald-600 to-teal-600 rounded-full'></div>
          </div>

          {tickets.length === 0 ? (
            <div className='text-center py-12'>
              <div className='bg-emerald-50 rounded-lg p-8 border border-emerald-200'>
                <Ticket className='w-12 h-12 text-emerald-300 mx-auto mb-4' />
                <p className='text-slate-700 text-lg'>No tickets yet. Create your first one!</p>
              </div>
            </div>
          ) : (
            <div className='grid gap-4'>
              {tickets.map((ticket) => (
                <TicketComponent key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default HomePage;