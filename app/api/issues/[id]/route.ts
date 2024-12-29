import { Issue } from '@prisma/client';
import { IssueSchema } from "@/app/validateSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client';

export async function PATCH(
    request : NextRequest,
    { params }: { params: {id: string} }){
        const body = await request.json();
        const validation = IssueSchema.safeParse(body);

        if(!validation.success)
            return(NextResponse.json(validation.error.format(), {status: 401}))
        console.log(parseInt(params.id))
        const issue = await prisma.issue.findUnique({
            where: { id: parseInt(params.id) },
        })
        if(!issue)
            return NextResponse.json({error: "Issue not found"}, {status: 404})

        const updatedIssue = await prisma.issue.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description,
            }
        })
        return(NextResponse.json(updatedIssue))
    }