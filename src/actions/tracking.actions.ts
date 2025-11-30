'use server'
import {prisma} from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { logEvent } from '@/utils/sentry';
import { getCurrentUser } from '@/lib/current-user';
import { emit } from 'process';


export async function createTrackingTikcet(
  prevState: { success: boolean; message: string },
  formData: FormData
):Promise<{success: boolean; message: string}>{
  try {

    const user = await getCurrentUser();
    if(!user){
      return { success: false, message: 'You must be logged in to start new tracking' };
    }

    const description = formData.get('description') as string;
    const startTime = new Date();

    if (!description) {
      return { success: false, message: 'Please add a description' };
    }
    
    const ticket = await prisma.timeTrackingTicket.create({
      data: {
        description,
        startTime, 
        user: {
          connect: { id:user.id }
        },
      }
    });

    logEvent(`Tracking Ticket Created Successfuly`,
        'ticket', 
        {ticketId: ticket.id}, 
        'warning'
      );

    revalidatePath('/time-tracking-tickets');
    return { success: true, message: 'Time tracking Started Successfully' };
  
  } catch (error) {
    
    return {
      success: false,
      message: 'An error occured while creating the ticket',
    };
  }
}

export async function finishTrackingTime(
  prevState: { success: boolean; message: string; endTime?: string },
  formData: FormData
): Promise<{ success: boolean; message: string; endTime?: string }> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, message: 'You must be logged in to start new tracking' };
    }

    const ticketId = formData.get('ticketId') as string;
    const endTime = new Date();

    const ticket = await prisma.timeTrackingTicket.update({
      where: { id: ticketId },
      data: {
        endTime: endTime
      }
    });

    return { 
      success: true, 
      message: 'Time tracking Finished Successfully',
    };

  } catch (error) {
    return {
      success: false,
      message: 'An error occured while finishing the ticket',
    };
  }
}


export async function getTrackingTickets() {
  try {
    const user = await getCurrentUser();
    
    if(!user){
      return [];
    }

    const tickets = await prisma.timeTrackingTicket.findMany({
      where: {userId: user.id},
      orderBy: { createdAt: 'desc'}
    });

    return tickets;
  } catch (error) {
    return [];
  }
}
