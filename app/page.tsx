import React from 'react'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'

const page = async () => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  return (
  <>
  {/* <LatestIssues/> */}
  <IssueSummary open={open} closed={closed} inProgress={inProgress}/>
  </>
  )
}

export default page