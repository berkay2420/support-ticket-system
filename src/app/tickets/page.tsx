import { getTickets } from '@/actions/ticket.actions';
import { getCurrentUser } from '@/lib/current-user';
import { redirect } from 'next/navigation';
import TicketComponent from '@/components/TicketComponent';
import Link from 'next/link';
import { Ticket, Plus, FileX } from 'lucide-react';

const TicketsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const tickets = await getTickets();

  return (
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <div className='flex items-center gap-3 mb-3'>
                <div className='bg-linear-to-br from-blue-500 to-purple-600 p-2 rounded-lg'>
                  <Ticket className='w-6 h-6 text-white' />
                </div>
                <h1 className='text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                  Support Tickets
                </h1>
              </div>
              <p className='text-gray-400'>Manage and track your support requests</p>
            </div>
            <Link
              href='/tickets/new'
              className='bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 flex items-center gap-2'
            >
              <Plus className='w-5 h-5' />
              New Ticket
            </Link>
          </div>

          {/* Stats Bar */}
          {tickets.length > 0 && (
            <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4'>
              <p className='text-gray-400'>
                Total tickets: <span className='text-white font-semibold'>{tickets.length}</span>
              </p>
            </div>
          )}
        </div>

        {/* Tickets List */}
        {tickets.length === 0 ? (
          <div className='bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 text-center'>
            <div className='flex justify-center mb-4'>
              <FileX className='w-16 h-16 text-gray-600' />
            </div>
            <h3 className='text-2xl font-bold text-white mb-2'>No Tickets Yet</h3>
            <p className='text-gray-400 mb-6'>You haven't created any support tickets. Create one to get started.</p>
            <Link
              href='/tickets/new'
              className='inline-flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50'
            >
              <Plus className='w-5 h-5' />
              Create Your First Ticket
            </Link>
          </div>
        ) : (
          <div className='space-y-4'>
            {tickets.map((ticket) => (
              <TicketComponent key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;