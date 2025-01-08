'use client';

import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('status') ?? "ALL";
  
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  const statuses: { label: string; value: string }[] = [
    { label: "All", value: "ALL" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const handleValueChange = (status: string) => {
    const params = new URLSearchParams();

    if (status) params.append('status', status);

    if (searchParams.get('orderBy'))
      params.append('orderBy', searchParams.get('orderBy')!)

    if (searchParams.get('sortState'))
      params.append('sortState', searchParams.get('sortState')!)

    const query = params.size ? '?' + params.toString() : '';

    router.push('/issues/list/' + query);

    setSelectedFilter(status);
  }

  useEffect(() => {
    setSelectedFilter(searchParams.get('status') ?? "ALL");
  }, [searchParams]);

  return (
    <>
      <Select.Root
        value={selectedFilter}
        onValueChange={handleValueChange}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            {statuses.map((status) => (
              <Select.Item key={status.value} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default IssueStatusFilter;
