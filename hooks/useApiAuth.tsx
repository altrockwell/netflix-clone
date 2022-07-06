import React, { createContext, useContext, useMemo, useState } from 'react'
import { apiBaseUrl } from '../constants/movie'
import axios from 'axios'

interface User {
	name: string
	email: string
	provider: string
	password: string
}

interface IAuth {
	user: User | null
	signUp: (name: string, email: string, password: string) => void
	// signIn: (email: string, password: string) => Promise<void>
	// logOut: () => Promise<void>
	error: string | null
	loading: boolean
}

const AuthContext = createContext<IAuth>({
	user: null,
	signUp: async () => {},
	// signIn: async () => {},
	// logOut: async () => {},
	error: null,
	loading: false,
})

interface AuthProviderProps {
	children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [initialLoading, setInitialLoading] = useState(true)
	const [user, setUser] = useState<User | null>(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)

	const signUp = async (name: string, email: string, password: string) => {
		setLoading(true)

		try {
			const res = await axios.post(`${apiBaseUrl}/signup`, {
				name,
				email,
				password,
			})
			console.log(res)
		} catch (error) {
			console.log(error)
		}
		setLoading(false)
	}
	const signIn = async (email: string, password: string) => {}
	const logOut = async () => {}

	const memoedValue = useMemo(
		() => ({ user, signUp, error, loading }),
		[user, loading, error]
	)

	return (
		<AuthContext.Provider value={memoedValue}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

export default function useAuth() {
	return useContext(AuthContext)
}
