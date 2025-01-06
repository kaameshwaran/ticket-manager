import { PatchIssueSchema } from '@/app/validateSchemas';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const validation = PatchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: validation.error.format() },
      { status: 400 }
    );
  }

  const { assignedToUserId, title, description } = body;

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  }

  const { id } = await params;
  const issueId = parseInt(id);
  if (isNaN(issueId)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json({
    message: 'Issue updated successfully',
    issue: updatedIssue,
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const id = (await params).id;
  const issueId = parseInt(id);

  if (issueId === null) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  if (isNaN(issueId)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: issueId },
  });

  return NextResponse.json({ message: 'Issue deleted successfully' });
}
