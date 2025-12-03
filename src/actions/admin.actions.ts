'use server'
import {prisma} from '@/db/prisma';
import { getCurrentUser } from '@/lib/current-user';
import { generateSecurePassword } from '@/utils/auth.utils';
import bcrypt from 'bcryptjs';

type ResponseResult = {
  success: boolean,
  message: string,
  errors?: string[];
}


//Get employees by department
export async function getUsersByDepartment(
  departmentName: string)
  {
    try {
      const users = await prisma.user.findMany({
        where: {
          department: departmentName
        },
        select: {
          name: true,
          email: true,
        }
      });

      return users;
      
    } catch (error) {
      return null;
    }
}

//List open tickets by department
export async function getOpenTickets(departmentName:string) {
  try {
    const tickets = await prisma.ticket.findMany({
      where:{
        issuerDepartment: departmentName,
        status: 'Open'
      },
      select: {
        issuerDepartment: true,
        user: true,
        description: true,
        subject: true,
        createdAt: true,
        priority: true
      }
    });

    return tickets;
  } catch (error) {
    return null
  }
}

//List All employees
export async function getAllUsers(){
  try {
    const users = prisma.user.findMany({
      select:{
        id: true,
        name: true,
        email: true,
        department: true
      }
    });

    return users;
  } catch (error) {
    return null;
  }
}

//Get user by ID
export async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        tickets: {
          select: {
            id: true,
            subject: true,
            priority: true,
            status: true
          }
        },
        time_tracking_tickets: {
          select: {
            id: true,
            description: true,
            workedMinutes: true
          }
        }
      }
    });

    return user;
  } catch (error) {
    return null;
  }
}


//Give manager privileges to user
export async function makeAdmin(userId: string): Promise<ResponseResult> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId } 
    });

    if (!existingUser) {
      return { success: false, message: 'This user does not exist' };
    }

    if (existingUser.isAdmin) {
      return { success: false, message: 'This employee already has manager privileges' };
    }

    await prisma.user.update({
      where: { id: userId }, 
      data: { isAdmin: true }
    });

    return { success: true, message: 'This user now has admin privileges' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Failed to give privileges, please try again later' };
  }
}

//Revoke manager privilges from user
export async function revokeAdmin(userId: string): Promise<ResponseResult> {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { success: false, message: 'This user does not exist' };
    if (!user.isAdmin) return { success: false, message: 'This employee is not an admin' };

    await prisma.user.update({ where: { id: userId }, data: { isAdmin: false } });
    return { success: true, message: 'Admin privileges revoked' };
  } catch (error)  {
    return { success: false, message: 'Failed to revoke privileges, please try again later' };
  }
}

//Delete Employee 
export async function deleteUser(userId: string):Promise<ResponseResult>{
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return { success: false, message: 'This user does not exist' };

    await prisma.user.delete({
      where: {
        id: userId
      }
    });
    
    return { success: true, message: 'Employee Deleted Successfully' };

  } catch (error) {
    console.log(error)
    return { success: false, message: 'Failed to Delete Employee, Please try again later' };

  }
  
}

//Create new Employee
export async function createUserAsAdmin(
  prevState: ResponseResult,
  formData: FormData
): Promise<ResponseResult> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
      return { 
        success: false, 
        message: 'Unauthorized: Only admins can create users' 
      };
    }

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const department = formData.get('department') as string;

    if (!name || !email || !department) {
      return { 
        success: false, 
        message: 'Please fill all the fields' 
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { 
        success: false, 
        message: 'A user with this email already exists' 
      };
    }

    const generatedPassword = generateSecurePassword();
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        department
      }
    });

    return { 
      success: true, 
      message: `User created successfully. Password: ${generatedPassword}` 
    };

  } catch (error) {
    console.error('Failed to create user:', error);
    return { 
      success: false, 
      message: 'Failed to create user. Please try again later' 
    };
  }
}

export async function updateUserAsAdmin(
  prevState: ResponseResult,
  formData: FormData
): Promise<ResponseResult> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.isAdmin) {
      return { 
        success: false, 
        message: 'Unauthorized: Only admins can update users' 
      };
    }

    const userId = formData.get('userId') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const department = formData.get('department') as string;
    const resetPassword = formData.get('resetPassword') === 'on';

    if (!userId || !name || !email || !department) {
      return { 
        success: false, 
        message: 'Please fill all the fields' 
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return { 
        success: false, 
        message: 'This user does not exist' 
      };
    }

    const emailExists = await prisma.user.findUnique({
      where: { email }
    });

    if (emailExists && emailExists.id !== userId) {
      return { 
        success: false, 
        message: 'This email is already in use' 
      };
    }

    const updateData: any = {
      name,
      email,
      department
    };

    let newPassword = '';

    if (resetPassword) {
      newPassword = generateSecurePassword();
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateData.password = hashedPassword;
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

   
    const message = resetPassword 
      ? `User updated successfully. New Password: ${newPassword}`
      : 'User updated successfully';

    return { 
      success: true, 
      message
    };

  } catch (error) {
    console.error('Failed to update user:', error);
    return { 
      success: false, 
      message: 'Failed to update user. Please try again later' 
    };
  }
}