'use client';
import { Select } from "@radix-ui/themes";
import { Issue, Status } from "@prisma/client";
import axios from "axios";
import { Skeleton } from '@/app/components'
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";


const UpdateStatus = ({ issue }: { issue: Issue }) => {

  const [loading, setLoading] = useState(true);  

  const statuses: {label: String, value: Status}[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" }
  ]

  useEffect(() => {
    if (issue.status) {
      setLoading(false);
    }
  }, [issue.status]); 

    const updateStatus = (newStatus: string) => {
    try {
      axios.patch(`/api/issues/${issue.id}`, { status: newStatus });
      toast.success('Issue status updated successfully!');
    } catch {
      toast.error('Failed to update issue status.');
    }
  };


  if (loading) {
    return <Skeleton />;
  }

  return (
    <>
    <Select.Root defaultValue={issue.status} onValueChange={updateStatus}>
        <Select.Trigger/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Update Status</Select.Label>
                {statuses.map((status) => (
                    <Select.Item key={status.value} value={status.value}>{status.label}</Select.Item>
                ))}
            </Select.Group>
        </Select.Content>
    </Select.Root>
    <Toaster/>
    </>
  )
}

export default UpdateStatus