'use client';
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/app/components'
import axios from "axios";

const SelectAssignee = () => {
  const { data: users, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then(res => res.data),
    staleTime: 60 * 1000,
    retry: 2
  });

  if(error) return (<Select.Root><Select.Trigger placeholder={'No users found'}/></Select.Root>)
  if(isLoading) return <Skeleton/>
  return (
    <Select.Root>
        <Select.Trigger placeholder="Assign..."/>
        <Select.Content>
            <Select.Group>
                <Select.Label>Team</Select.Label>
                {users?.map((user) => (
                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                ))}
            </Select.Group>
        </Select.Content>
    </Select.Root>
  )
}

export default SelectAssignee