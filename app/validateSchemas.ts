import { z } from "zod";

export const IssueSchema = z.object({
    title: z.string().min(1, 'Required field').max(255),
    description: z.string().min(1, 'Required field').max(65535)
});

export const PatchIssueSchema = z.object({
    title: z.string().min(1, 'Required field').max(255).optional(),
    description: z.string().min(1, 'Required field').max(65535).optional(),
    assignedToUserId: z.string().min(1, "Select user").max(255).optional().nullable()
});
