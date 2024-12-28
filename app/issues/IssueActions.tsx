import { Button } from '@radix-ui/themes'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const IssueActions = () => {
  return (
    <div>
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Issue Tracker</h1>
            <Link href="/issues/new">
                <Button style={{cursor : 'pointer'}}>
                    <PlusCircle size={18} />
                    New Issue
                </Button>
            </Link>
        </div>
    </div>
  )
}

export default IssueActions