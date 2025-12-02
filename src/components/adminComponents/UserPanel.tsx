"use client";
import { useState } from "react";
import UserComponent from "./UserComponent";
import { Users, ChevronDown } from "lucide-react";

type User = {
  name: string | null;
  email: string;
  department: string;
}

type UserPanelProps = {
  allUsers: User[];
  department?: string;
}

const UserPanel = ({ allUsers, department }: UserPanelProps) => {
  const [showUsers, setShowUsers] = useState(false);

  const filteredUsers = department 
    ? allUsers.filter(user => user.department?.toLowerCase() === department.toLowerCase())
    : allUsers;

  return (
    <div className="w-full">
      <button 
        onClick={() => setShowUsers(!showUsers)}
        className="group relative overflow-hidden bg-linear-to-br from-emerald-600 to-emerald-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full"
      >
        <Users className="w-5 h-5" />
        <span>Employees ({filteredUsers.length})</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${showUsers ? 'rotate-180' : ''}`} />
      </button>

      {showUsers && (
        <div className="mt-6 bg-white border border-emerald-200 rounded-lg p-6 shadow-sm">
          {filteredUsers.length === 0 ? (
            <p className="text-slate-600 text-center py-8">No employees found</p>
          ) : (
            <div className="space-y-3">
              {filteredUsers.map((user) => (
                <UserComponent key={user.email} user={user} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserPanel;