'use client'

import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/navigation'
import { createIssueSchema } from '@/app/validateSchemas'
import { z } from 'zod'

const NewIssuePage = () => {
    type issueForm = z.infer<typeof createIssueSchema>
    const { register, handleSubmit, formState: { errors } } = useForm<issueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter()


  return (
    <div className='max-w-xl p-6'>
    <form
        onSubmit={handleSubmit(async (data) => {
            try {
                await axios.post('/api/issues', data);
                router.push('/issues');
            } catch (error) {
                console.log(error);
            }
        })}
        className='space-y-6'>
        
        <div className='flex flex-col'>
            <TextField.Root 
                placeholder='Issue' 
                {...register('title')} 
                className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors'
            />
            {errors.title && <Text className='text-red-600 text-sm mt-2'>{errors.title.message}</Text>}
        </div>
        
        <div className='flex flex-col'>
            <TextArea 
                placeholder='Description' 
                {...register('description')} 
                className='border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors'
            />
            {errors.description && <Text className='text-red-600 text-sm mt-2'>{errors.description.message}</Text>}
        </div>

        <Button className='bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors ease-in'>
            Submit New Issue
        </Button>
    </form>
    </div>

  )
}

export default NewIssuePage
