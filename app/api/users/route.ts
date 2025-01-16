import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '@/app/auth/authOptions';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const users = await prisma.user.findMany({ orderBy: { name: 'asc' } });
  if (!users) return NextResponse.json('No users found', { status: 404 });

  return NextResponse.json(users, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}

export const dynamic = 'force-dynamic';
