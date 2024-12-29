'use client'
import {Button, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createIssueSchema } from '@/app/validateSchemas'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import {SendHorizonal } from 'lucide-react'

const NewIssuePage = () => {
    type issueForm = z.infer<typeof createIssueSchema>
    const { register, handleSubmit, formState: { errors } } = useForm<issueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter()
    const[isSubmitting, setIsSubmitting] = useState(false);
    const submit = handleSubmit(async (data) => {
        try {
            await axios.post('/api/issues', data);
            router.push('/issues');
            setIsSubmitting(true);
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
                placeholder='Issue' 
                {...register('title')} 
                className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors'
            />
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        
        <div className='flex flex-col'>
            <TextArea 
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
            {isSubmitting ? "Submitting..." : "Submit"} 
            {isSubmitting && <Spinner/>}
            <SendHorizonal size={18}/>
        </Button>
    </form>
    </div>

  )
}

export default NewIssuePage
