import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const compilerApi=createApi({
    reducerPath:'compilerApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://online-code-compiler.p.rapidapi.com/v1',
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key',`${import.meta.env.VITE_COMPILER_API_KEY}`)
            headers.set('X-RapidAPI-Host','online-code-compiler.p.rapidapi.com')
            return headers
        }
    }),
    endpoints:(builder)=>({
        compileCode:builder.mutation({
            query:(data)=>({
                url:'/',
                method:'POST',
                body:data
            })
        })
    })

})
export const {
   useCompileCodeMutation
  } = compilerApi