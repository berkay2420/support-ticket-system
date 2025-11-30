import type { Ticket } from "@/generated/prisma/client";
import Link from 'next/link';

type TicketComponentProps = {
  ticket: Ticket
}

const TicketComponent = ({ ticket }: TicketComponentProps) => {
  const isClosed = ticket.status === 'Closed';
  return (
    <div
      className={`flex justify-between items-center bg-white rounded-lg shadow border border-gray-200 p-6 ${
        isClosed ? 'opacity-50' : ''
      }`}
    >
      {/* Left Side */}
      <div>
        <h2 className='text-xl font-semibold text-blue-600'>
          {ticket.subject}
        </h2>
        <p className='text-sm text-gray-500'>
          Issuer Department: <span className='font-medium text-gray-700'>{ticket.issuerDepartment}</span>
        </p>
      </div>
      {/* Right Side */}
      <div>
        <Link
          href={`/tickets/${ticket.id}`}
          className={`inline-block px-3 py-2 rounded transition text-center ${
            isClosed
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none'
              : 'bg-blue-600 text-white hover:bg-blue-700 '
          }`}
        >
          View Ticket
        </Link>
      </div>
    </div>
  );
};

export default TicketComponent;