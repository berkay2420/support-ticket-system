import { getCurrentUser } from "@/lib/current-user";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Ticket, Clock, User, FileText } from "lucide-react";
import TicketPanel from "@/components/adminComponents/TicketPanel";
import UserPanel from "@/components/adminComponents/UserPanel";
import { getTickets } from "@/actions/ticket.actions";
import { getAllUsers } from "@/actions/admin.actions";

const AdminPage = async ({ searchParams }: { searchParams: Promise<{ department?: string }> }) => {
  const params = await searchParams;
  const user = await getCurrentUser();

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-8 flex items-center justify-center">
        <div className="bg-white border border-emerald-200 rounded-lg p-8 text-center max-w-md shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">Access Denied</h2>
          <p className="text-slate-600 mb-6">You don't have permission to view this page</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Admin actions
  const department = params.department || "IT";
  const departments = ["IT", "HR", "Finance", "Sales", "Marketing"];
  
  const supportTickets = await getTickets();
  const allUsers = await getAllUsers() || [];

  return (
    <main className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-emerald-900">Admin Panel</h1>
          <p className="text-xl text-slate-700 mb-2">Manage users, tickets, and time tracking efficiently</p>
        </div>

        {/* Department Selector */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white border border-emerald-200 rounded-lg p-6 shadow-sm">
            <label className="block text-sm font-semibold text-emerald-900 mb-3">Select Department</label>
            <div className="flex gap-2 flex-wrap justify-center">
              {departments.map((dept) => (
                <Link
                  key={dept}
                  href={`?department=${dept}`}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    department === dept
                      ? "bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-md"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  {dept}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="mb-16 flex flex-col items-center gap-4">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-center">
              <UserPanel allUsers={allUsers} department={department} />
            </div>

            <div className="flex justify-center">
              <TicketPanel supportTickets={supportTickets} department={department} />
            </div>
          </div>
        </div>


      </div>
    </main>
  );
};

export default AdminPage;