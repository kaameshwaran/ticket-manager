import { IssueSchema } from "@/app/validateSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await request.json();
  const validation = IssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation failed", details: validation.error.format() },
      { status: 400 }
    );
  }

  const { id } = await params;
  const issueId = parseInt(id);
  if (isNaN(issueId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issueId },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json({
    message: "Issue updated successfully",
    issue: updatedIssue,
  });
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  
  const id = (await params).id;
  const issueId = parseInt(id);

  if (issueId === null) {
  return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  if (isNaN(issueId)) {
    return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: issueId },
  });

  return NextResponse.json({ message: "Issue deleted successfully" });
}
