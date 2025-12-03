export const getPriorityClass = (priority: string) => {
  switch(priority) {
    case 'High':
      return 'text-red-600 font-bold';
    case 'Medium':
      return 'text-yellow-600 font-bold';
    case 'Low':
      return 'text-green-600 font-bold';
  }
}


export function getAvatarColor(name: string): string {
  const colors = [
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-rose-500',
  ];

  const charCode = name.charCodeAt(0);
  const index = charCode % colors.length;
  return colors[index];
}