'use client';
import { Skeleton } from '@/app/components';
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

const SelectAssignee = ({ issue }: { issue: Issue }) => {
  const { users, error, isLoading } = useUsers();

  const assignIssue = (value: String) => {
    const userId = value === "unassigned" ? null : value;
    axios
      .patch('/api/issues/' + issue.id, {
        assignedToUserId: userId || null,
      })
      .then(() => {
        userId ? 
          toast.success('Issue assigned to user') :
          toast(
            "Issue unassigned!",
            { icon: "⚠️", duration: 5000 }
          );
      })
      .catch(() => {
        toast.error("Changes could not be saved!");
      });
  }

  if (error) {
    return (
      <Select.Root>
        <Select.Trigger aria-label="Users not found" disabled />
      </Select.Root>
    );
  }

  if (isLoading) return <Skeleton />

  return (
    <>
      <Select.Root defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={assignIssue}
      >
        <Select.Trigger aria-label="Assign user" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Team</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  )
}

const useUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        setUsers(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, error, isLoading };
};

export default SelectAssignee;