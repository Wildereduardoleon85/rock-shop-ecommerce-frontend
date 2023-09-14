import { apiSlice } from '.'
import { USERS_URL } from '../constants'
import {
  LoginCredentials,
  UserInfo,
  RegisterCredentials,
  UpdateProfileCredentials,
} from '../types'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserInfo, LoginCredentials>({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation<UserInfo, RegisterCredentials>({
      query: (data) => ({
        url: USERS_URL,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    updateProfile: builder.mutation<UserInfo, UpdateProfileCredentials>({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query<UserInfo[], void>({
      query: () => ({
        url: `${USERS_URL}/admin`,
        method: 'GET',
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation<string, string>({
      query: (userId) => ({
        url: `${USERS_URL}/admin/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = usersApiSlice
