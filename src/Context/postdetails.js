import React from 'react'
import { createContext } from 'react'
import { useState } from 'react';

export const postContext = createContext(null)

export default function Postdetails({ children }) {
    const [post, setPost] = useState()
    return (
        <postContext.Provider value={{ post, setPost }}>
            {children}
        </postContext.Provider>
    )
}
