import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({children} : PropsWithChildren) => {
    if (!children) return(null)
    return (
        <Text className='text-red-600 text-sm mt-2'>{children}</Text>
    )
}

export default ErrorMessage