import { getTickets } from '@/actions/ticket.actions';
import { getCurrentUser } from '@/lib/current-user';
import { redirect } from 'next/navigation';
import TicketComponent from '@/components/TicketComponent';
import Link from 'next/link';
import { Ticket, Clock, ArrowRight } from 'lucide-react';
import { getAuditLogs } from "@/actions/log.actions";
import ActivityPanel from "@/components/adminComponents/ActivityLogPanel";

const HomePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  const tickets = await getTickets();

  const auditLogs = await getAuditLogs(50);
  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 px-4 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-linear-to-br from-emerald-600 to-teal-600 p-4 rounded-xl shadow-md">
              <Ticket className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-emerald-900">
            Quick Ticket
          </h1>

          <p className="text-xl text-slate-700 mb-2">
            Efficient Ticket & Task Management
          </p>
          <p className="text-slate-600">
            Track issues, manage workflows, and monitor your team easily
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-16">

          <Link
            href="/tickets/new"
            className="group bg-linear-to-br from-emerald-600 to-emerald-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-center gap-2">
              <Ticket className="w-5 h-5" />
              <span>Create Ticket</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          <Link
            href="/tickets"
            className="group bg-white border border-emerald-200 hover:border-emerald-400 text-slate-900 px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-center gap-2">
              <Ticket className="w-5 h-5 text-emerald-600" />
              <span>My Tickets</span>
            </div>
          </Link>

          <Link
            href="/time-tracking-tickets"
            className="group bg-white border border-teal-200 hover:border-teal-400 text-slate-900 px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              <span>Time Tracking</span>
            </div>
          </Link>

          <Link
            href="/time-tracking-tickets/new"
            className="group bg-linear-to-br from-teal-600 to-teal-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>New Time Entry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </Link>

          {user.isAdmin && (
            <Link
              href="/admin"
              className="group bg-linear-to-br from-emerald-700 to-teal-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Admin Panel</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          )}
        </div>

        <ActivityPanel logs={auditLogs} isInterActive={user.isAdmin} />


        {/* Tickets Section */}
        <div className="bg-white border border-emerald-200 rounded-lg p-8 shadow-sm">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-2">
              All Tickets Across All Departments
            </h2>
            <div className="h-1 w-12 bg-linear-to-r from-emerald-600 to-teal-600 rounded-full" />
          </div>

          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-emerald-50 rounded-lg p-8 border border-emerald-200">
                <Ticket className="w-12 h-12 text-emerald-300 mx-auto mb-4" />
                <p className="text-slate-700 text-lg">No tickets available.</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
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
