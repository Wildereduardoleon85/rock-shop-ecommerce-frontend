import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants'

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL, credentials: 'include' })

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Products', 'Product', 'Order', 'User', 'Users'],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (_builder) => ({}),
})
