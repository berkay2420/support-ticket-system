import { getTickets } from '@/actions/ticket.actions';
import { getCurrentUser } from '@/lib/current-user';
import { redirect } from 'next/navigation';
import TicketComponent from '@/components/TicketComponent';
import Link from 'next/link';
import { FaTicketAlt } from 'react-icons/fa';

const HomePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const tickets = await getTickets();

  return (
    <main className='flex flex-col text-center items-center justify-center min-h-screen px-4'>
      <FaTicketAlt className='mx-auto mb-4 text-red-600' size={60} />
      <h1 className='text-4xl md:text-5xl font-bold mb-4 text-blue-600'>
        Welcome to Quick Ticket
      </h1>
      <p className='text-lg text-gray-600 mb-8'>
        Fast and simple support ticket management system.
      </p>

      <div className='flex flex-col md:flex-row gap-4 justify-center animate-slide opacity-0 mb-12'>
        <Link
          href='/tickets/new'
          className='bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition'
        >
          Submit a Ticket
        </Link>
        <Link
          href='/tickets'
          className='bg-blue-100 text-gray-700 px-6 py-3 rounded shadow hover:bg-blue-200 transition'
        >
          View Tickets
        </Link>
        <Link
          href='/time-tracking-tickets'
          className='bg-blue-100 text-gray-700 px-6 py-3 rounded shadow hover:bg-blue-200 transition'
        >
          View Tracking Tickets
        </Link>
        <Link
          href='/time-tracking-tickets/new'
          className='bg-blue-100 text-gray-700 px-6 py-3 rounded shadow hover:bg-blue-200 transition'
        >
          Start Time Tracking
        </Link>
      </div>

      <div className='w-full max-w-3xl'>
        <h2 className='text-2xl font-bold text-blue-600 mb-6 text-center'>
          All Support Tickets
        </h2>
        {tickets.length === 0 ? (
          <p className='text-center text-gray-600'>No Tickets Yet</p>
        ) : (
          <div className='space-y-4'>
            {tickets.map((ticket) => (
              <TicketComponent key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;