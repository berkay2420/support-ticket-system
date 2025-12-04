'use server'
import {prisma} from '@/db/prisma';

//Get audit logs
export async function getAuditLogs(limit: number = 50) {
  try {
    const logs = await prisma.auditLog.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    return logs;
  } catch (error) {
    console.error('Failed to get audit logs:', error);
    return [];
  }
}

//Create audit log
export async function createAuditLog(
  userId: string,
  action: string,
  entity: string,
  entityId: string,
  entityName: string,
  description: string,
  metadata?: any
) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        entityName,
        description,
        metadata: metadata || {}
      }
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}
