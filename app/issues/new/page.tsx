'use client'

import { Button, Callout, TextArea, TextField } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { any } from 'zod'

const NewIssuePage = () => {
    interface issueForm {
        title: string,
        description: string
    }
    const { register, handleSubmit } = useForm<issueForm>();
    const router = useRouter()
    const [titleErr, setTitleErr] = useState<string | null>(null);
    const [descErr, setDescErr] = useState<string | null>(null);


  return (
    <div className='max-w-xl'>
        {titleErr && 
        <Callout.Root className='mb-3' color='red'>
            <Callout.Text>{titleErr}</Callout.Text>
        </Callout.Root>
        }
        {descErr && 
        <Callout.Root className='mb-3' color='red'>
            <Callout.Text>{descErr}</Callout.Text>
        </Callout.Root>
        }
        <form 
        onSubmit={handleSubmit(async (data) => {
            try {
                await axios.post('/api/issues', data)
                router.push('/issues')
            } catch (error: any) {
                console.log(error);

                const titleErr = error.response?.data?.title?._errors?.[0];
                const descErr = error.response?.data?.description?._errors?.[0];
          
                setTitleErr(titleErr || null);
                setDescErr(descErr || null);
            }
        })}
        className='space-y-3'>
            <TextField.Root placeholder='Issue' {...register('title')}/>
            <TextArea placeholder='Description' {...register('description')}/>
            <Button>Submit New Issue</Button>
        </form >
    </div>
  )
}

export default NewIssuePage
