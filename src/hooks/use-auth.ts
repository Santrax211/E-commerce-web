"use client"

import { useSession, signIn, signOut } from "next-auth/react"

export function useAuth() {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const isAuthenticated = status === "authenticated"
  const isAdmin = session?.user?.role === "admin"

  return {
    session,
    user: session?.user,
    isLoading,
    isAuthenticated,
    isAdmin,
    signIn,
    signOut,
  }
}

