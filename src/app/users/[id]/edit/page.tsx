import { getCurrentUser } from '@/lib/current-user';
import { notFound } from 'next/navigation';
import { getUser } from '@/actions/admin.actions';
import UpdateUserForm from '@/components/adminComponents/UpdateUserFormComponent';

const UpdateUserPage = async (props: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await props.params;
  const currentUser = await getCurrentUser();

  if (!currentUser?.isAdmin) {
    notFound();
  }

  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return (
    <UpdateUserForm 
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department
      }}
    />
  );
};

export default UpdateUserPage;