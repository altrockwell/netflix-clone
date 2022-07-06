import React, { createContext, useContext, useMemo, useState } from 'react'
import { apiBaseUrl } from '../constants/movie'

interface User {
	name: string
	email: string
	provider: string
	password: string
}

interface IAuth {
	user: User | null
	signUp: (name: string, email: string, password: string) => Promise<void>
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
		return await fetch(`${apiBaseUrl}/signup`, {
			method: 'POST',
			body: JSON.stringify({ name, email, password }),
		})
			.then((userCredential) => {
				console.log(userCredential)
				if (userCredential) {
					console.log(userCredential)
				} else {
					console.log('nothing return')
				}
			})
			.catch((err) => console.log(err))
	}
	const signIn = async (email: string, password: string) => {}
	const logOut = async () => {}

	const memoedValue = useMemo(
		() => ({ user, signUp, error, loading }),
		[user, loading, error]
	)

	return (
		<AuthContext.Provider value={memoedValue}>
			{!initialLoading && children}
		</AuthContext.Provider>
	)
}

export default function useAuth() {
	return useContext(AuthContext)
}
