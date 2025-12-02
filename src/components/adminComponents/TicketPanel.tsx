"use client";
import { useState } from "react";
import TicketComponent from "../TicketComponent";
import type { Ticket } from "@/generated/prisma/client";
import { Ticket as TicketIcon, ChevronDown } from "lucide-react";

type TicketPanelProps = {
  supportTickets: Ticket[];
  department?: string;
}

const TicketPanel = ({ supportTickets, department }: TicketPanelProps) => {
  const [showTickets, setShowTickets] = useState(false);

  const filteredTickets = department
    ? supportTickets.filter(ticket => ticket.issuerDepartment?.toLowerCase() === department.toLowerCase())
    : supportTickets;

  return (
    <div className="w-full">
      <button 
        onClick={() => setShowTickets(!showTickets)}
        className="group relative overflow-hidden bg-linear-to-br from-emerald-600 to-emerald-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full"
      >
        <TicketIcon className="w-5 h-5" />
        <span>Support Tickets ({filteredTickets.length})</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showTickets ? 'rotate-180' : ''}`} />
      </button>

      {showTickets && (
        <div className="mt-6 bg-white border border-emerald-200 rounded-lg p-6 shadow-sm">
          {filteredTickets.length === 0 ? (
            <p className="text-slate-600 text-center py-8">No support tickets found</p>
          ) : (
            <div className="space-y-3">
              {filteredTickets.map((t) => (
                <TicketComponent key={t.id} ticket={t} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketPanel;