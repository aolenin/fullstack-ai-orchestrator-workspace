import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface TokenPair {
  access: string
  refresh: string
}

export interface UserProfile {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  mfa_enabled: boolean
}

export interface RegisterResponse {
  user: UserProfile
  access: string
  refresh: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token')
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<UserProfile, void>({
      query: () => 'me/',
      providesTags: ['User'],
    }),
    login: builder.mutation<TokenPair, { username: string; password: string }>({
      query: (body) => ({ url: 'login/', method: 'POST', body }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation<
      RegisterResponse,
      {
        username: string
        email: string
        password: string
        password2: string
        first_name?: string
        last_name?: string
      }
    >({
      query: (body) => ({ url: 'register/', method: 'POST', body }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation<void, { refresh: string }>({
      query: (body) => ({ url: 'logout/', method: 'POST', body }),
      invalidatesTags: ['User'],
    }),
    refreshToken: builder.mutation<
      { access: string; refresh?: string },
      { refresh: string }
    >({
      query: (body) => ({ url: '../token/refresh/', method: 'POST', body }),
    }),
  }),
})

export const {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi
