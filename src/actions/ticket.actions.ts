'use server'
import {prisma} from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { logEvent } from '@/utils/sentry';

export async function createTicket(
  prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {

    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as string;

    if (!subject || !description || !priority) {
      logEvent('Validation Error Missing Data Fields',
        'ticket', 
        {}, 
        'warning'
      );
      
      return { success: false, message: 'All fields are required' };
    }
    

    const ticket = await prisma.ticket.create({
      data: {subject, description, priority}
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
    const tickets = await prisma.ticket.findMany({
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