'use server'
import {prisma} from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { logEvent } from '@/utils/sentry';
import { getCurrentUser } from '@/lib/current-user';

export async function createTicket(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {

    const user = await getCurrentUser();
    if(!user){
      return { success: false, message: 'You must be logged in to create ticket' };
    }
    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as string;

    if (!subject || !description || !priority) {
      return { success: false, message: 'All fields are required' };
    }
    

    const ticket = await prisma.ticket.create({
      data: {
        subject, 
        description, 
        priority,
        user: {
          connect: { id:user.id }
        },
        issuerDepartment: "sales"
      }
    });

    logEvent(`Ticket Created Successfuly`,
        'ticket', 
        {ticketId: ticket.id}, 
        'warning'
      );

    revalidatePath('/tickets');
    return { success: true, message: 'Ticket created successfully' };
  
  } catch (error) {
    
    logEvent('An Error Occured While Creating the Ticket',
      'ticket',
      {
        formData: Object.fromEntries(formData.entries())
      },
      'error',
      error
    )
    return {
      success: false,
      message: 'An error occured while creating the ticket',
    };
  }
}

export async function getTickets() {
  try {
    const user = await getCurrentUser();
    
    if(!user){
      return [];
    }

    const tickets = await prisma.ticket.findMany({
      where: {userId: user.id},
      orderBy: { createdAt: 'desc'}
    });

    return tickets;
  } catch (error) {
    return [];
  }
}

export async function getTicketById(id: string) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: {id: Number(id)}
    });

    return ticket;

  } catch (error) {
    return null;
  }
}

export async function closeTicket(
  prevState: {success:boolean, message:string}, 
  formData:FormData): Promise<{success:boolean, message:string}>{
    
    try {

      const ticketId = Number(formData.get('ticketId'));

      if(!ticketId){
        return {success:false, message:'Ticket ID is required'}
      }

      const user = await getCurrentUser();

      if (!user){
        return {success:false, message:'Unauthorized'}
      }

      const ticket = await prisma.ticket.findUnique({
        where: {id:ticketId}
      });

      if(!ticket || ticket.userId !== user.id) {
        return {success:false, message:'You are not authorized to close this ticket'}
      }

      await prisma.ticket.update({
        where: {id: ticketId},
        data: {status: 'Closed'}
      });

      revalidatePath('/tickets');
      revalidatePath(`/tickets/${ticket.id}`);

      logEvent('Ticket cloSED successfully', 'ticket', {}, 'warning');
      return {success:true, message:'Ticket is closed successfully'}
      
    } catch (error) {
      console.log(`failed to close ticket error:${error}`)
      return {success:false, message:'Failed to close ticet try again later'}
    }
}
