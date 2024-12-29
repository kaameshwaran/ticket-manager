'use client'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { IssueSchema } from '@/app/validateSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Issue } from '@prisma/client'
import { Button, TextArea, TextField } from '@radix-ui/themes'
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
        resolver: zodResolver(IssueSchema)
    });
    const[isSubmitting, setIsSubmitting] = useState(false);
    const submit = handleSubmit(async (data) => {
        try {
            if(issue)
                await axios.patch('/api/issues/' + issue.id, data);
            else
                await axios.post('/api/issues', data);
            setIsSubmitting(true);
            router.push('/issues');
        } catch (error) {
            setIsSubmitting(false);
        }
    })
  return (
    <div className='max-w-xl p-6'>
    <form
        onSubmit={submit}
        className='space-y-6'>
        
        <div className='flex flex-col'>
            <TextField.Root 
                defaultValue={issue?.title}
                placeholder='Issue' 
                {...register('title')} 
                className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors'
            />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        
        <div className='flex flex-col'>
            <TextArea 
                defaultValue={issue?.description}
                placeholder='Description' 
                {...register('description')} 
                className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors'
            />
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>

        <Button 
        style={{cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
        disabled={isSubmitting}
        >
            {issue ? "Update" : isSubmitting ? "Submitting..." : "Submit"}{' '}
            {isSubmitting && <Spinner/>}
            <SendHorizonal size={18}/>
        </Button>
    </form>
    </div>

  )
}

export default IssueForm
