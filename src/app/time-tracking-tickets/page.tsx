import { getTrackingTickets } from '@/actions/tracking.actions';
import { getCurrentUser } from '@/lib/current-user';
import { redirect } from 'next/navigation';
import TimeTrackingTicketComponent from '@/components/TimeTrackingTicketComponent';

const TicketsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const tickets = await getTrackingTickets();

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <h1 className='text-3xl font-bold text-blue-600 mb-8 text-center'>
        TIME TRACKİNG TICKETS
      </h1>
      {tickets.length === 0 ? (
        <p className='text-center text-gray-600'>No Tickets Yet</p>
      ) : (
        <div className='space-y-4 max-w-3xl mx-auto'>
          {tickets.map((ticket) => (
            <TimeTrackingTicketComponent key={ticket.id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketsPage;