import { getCurrentUser } from '@/lib/current-user';
import { notFound } from 'next/navigation';
import CreateUserForm from '@/components/adminComponents/CreateUserFormComponent';

const CreateUserPage = async () => {
  const user = await getCurrentUser();

  if (!user?.isAdmin) {
    notFound();
  }

  return <CreateUserForm />;
};

export default CreateUserPage;