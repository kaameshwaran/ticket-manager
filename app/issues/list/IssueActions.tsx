import { Button, Flex, Link } from '@radix-ui/themes'
import { PlusCircle } from 'lucide-react'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = ({ currentStatus }: { currentStatus: string }) => {
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Issue Tracker</h1>
      <Flex gap={'3'} mt={'3'} mb={'3'} justify={'between'}>
         <Flex align={'center'} direction={'row'}>
            <p className='font-medium mr-2'>Filter:</p>
            <IssueStatusFilter currentStatus={currentStatus} />
         </Flex>
         <Link href="/issues/new">
          <Button style={{cursor: 'pointer'}}>
            <PlusCircle size={18} />
            New Issue
          </Button>
        </Link>
      </Flex>
    </div>
  )
}

export default IssueActions