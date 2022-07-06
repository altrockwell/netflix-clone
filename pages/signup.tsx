import Head from 'next/head'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useAuth from '../hooks/useApiAuth'

interface Inputs {
	name: string
	email: string
	password: string
}

function Signup() {
	const { signUp } = useAuth()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()

	const onSubmit: SubmitHandler<Inputs> = async ({
		name,
		email,
		password,
	}) => {
		console.log('hey')
		await signUp(name, email, password)
	}

	// console.log('hello')

	return (
		<div>
			<Head>
				<title>Netflix</title>
				<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
			</Head>
			<h1 className="text-white">Sign Up</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
			>
				<label className="inline-block w-full">
					<input
						type="text"
						placeholder="Full Name"
						className="inputBox"
						{...register('name', { required: true })}
					/>
					{errors?.name && (
						<p className="p-1 text-[13px] font-light text-orange-500">
							Name is Required.
						</p>
					)}
				</label>
				<label className="inline-block w-full">
					<input
						type="email"
						placeholder="Email"
						className="inputBox"
						{...register('email', { required: true })}
					/>
					{errors?.email && (
						<p className="p-1 text-[13px] font-light text-orange-500">
							Please enter a valid email.
						</p>
					)}
				</label>
				<label className="inline-block w-full">
					<input
						type="password"
						placeholder="Password"
						className="inputBox"
						{...register('password', { required: true })}
					/>
					{errors?.password && (
						<p className="p-1 text-[13px] font-light text-orange-500">
							Your password must contain between 4 and 60 characters.
						</p>
					)}
				</label>
				<button
					type="submit"
					className="w-full rounded bg-[#e50914] py-3 font-semibold"
				>
					Sign Up
				</button>
			</form>
		</div>
	)
}

export default Signup
