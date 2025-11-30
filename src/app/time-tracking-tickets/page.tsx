import { getTrackingTickets } from '@/actions/tracking.actions';
import { getCurrentUser } from '@/lib/current-user';
import { redirect } from 'next/navigation';
import TimeTrackingTicketComponent from '@/components/TimeTrackingTicketComponent';
import Link from 'next/link';
import { Clock, Plus, Hourglass } from 'lucide-react';

const TicketsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const tickets = await getTrackingTickets();

  return (
    <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <div className='flex items-center gap-3 mb-3'>
                <div className='bg-linear-to-br from-emerald-600 to-teal-600 p-2 rounded-lg shadow-md'>
                  <Clock className='w-6 h-6 text-white' />
                </div>
                <h1 className='text-4xl font-bold text-emerald-900'>
                  Time Tracking
                </h1>
              </div>
              <p className='text-slate-600'>Track and monitor your work time</p>
            </div>
            <Link
              href='/time-tracking-tickets/new'
              className='bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-md flex items-center gap-2'
            >
              <Plus className='w-5 h-5' />
              Start Tracking
            </Link>
          </div>

          {/* Stats Bar */}
          {tickets.length > 0 && (
            <div className='bg-white border border-emerald-200 rounded-lg p-4 shadow-sm'>
              <p className='text-slate-600'>
                Active sessions: <span className='text-emerald-900 font-semibold'>{tickets.filter(t => !t.endTime).length}</span>
              </p>
            </div>
          )}
        </div>

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div className='bg-white border border-emerald-200 rounded-lg p-12 text-center shadow-sm'>
            <div className='flex justify-center mb-4'>
              <Hourglass className='w-16 h-16 text-emerald-200' />
            </div>
            <h3 className='text-2xl font-bold text-emerald-900 mb-2'>No Time Tracking Yet</h3>
            <p className='text-slate-600 mb-6'>Start tracking your work time to monitor productivity and manage your schedule.</p>
            <Link
              href='/time-tracking-tickets/new'
              className='inline-flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-md'
            >
              <Plus className='w-5 h-5' />
              Start Your First Tracking
            </Link>
          </div>
        ) : (
          <div className='space-y-4'>
            {tickets.map((ticket) => (
              <TimeTrackingTicketComponent key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;