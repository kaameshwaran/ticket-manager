'use client'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { IssueSchema } from '@/app/validateSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, Flex, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { SendHorizonal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type issueFormData = z.infer<typeof IssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<issueFormData>({
    resolver: zodResolver(IssueSchema),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      if (issue) await axios.patch('/api/issues/' + issue.id, data)
      else await axios.post('/api/issues', data)

      router.push('/issues/list')
      router.refresh()
    } catch (error) {
      setIsSubmitting(false)
    }
  })

  return (
    <Flex
      direction="column"
      gap="6"
      p="6"
      className='max-w-xl p-6'
    >
      <form onSubmit={submit}>
        <Flex direction="column" gap="2" mb="4">
          <TextField.Root
            placeholder="Title"
            defaultValue={issue?.title}
            {...register('title')}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </Flex>

        <Flex direction="column" gap="2" mb="4">
          <TextArea
            placeholder="Description"
            defaultValue={issue?.description}
            {...register('description')}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </Flex>

        <Flex justify="start">
          <Button
            type="submit"
            disabled={isSubmitting}
            style={{
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {isSubmitting ? 'Submitting...' : issue ? 'Update' : 'Submit'}
            <SendHorizonal size={18} />
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </Flex>
  )
}

export default IssueForm
