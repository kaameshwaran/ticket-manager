import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
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
