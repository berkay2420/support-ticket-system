'use server'
import {prisma} from '@/db/prisma';
import { getCurrentUser } from '@/lib/current-user';


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