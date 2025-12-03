'use client';

import { getInitials } from '@/utils/getInitials';
import { getAvatarColor } from '@/utils/ui';

interface UserAvatarProps {
  name: string | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  profileImage?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-24 h-24 text-2xl',
};

export default function UserAvatar({ 
  name = 'User', 
  size = 'md', 
  profileImage 
}: UserAvatarProps) {
  const displayName = name || 'User';
  const initials = getInitials(displayName);
  const bgColor = getAvatarColor(displayName);

  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt={displayName}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-emerald-200`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-semibold border-2 border-emerald-200`}
    >
      {initials}
    </div>
  );
}