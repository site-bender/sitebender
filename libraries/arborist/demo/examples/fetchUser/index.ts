//++ Fetches user data from an API endpoint
//++ Demonstrates async function with Result monad error handling
//>> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

import type { Result } from "../types/index.ts"

type User = Readonly<{
	id: string
	name: string
	email: string
}>

type FetchError = Readonly<{
	_tag: "FetchError"
	status: number
	message: string
}>

//++ Fetches user by ID from API
//++ Returns Result monad with User or FetchError
export default async function fetchUser(userId: string) {
	return async function fetchUserById(): Promise<Result<User, FetchError>> {
		const response = await fetch(`https://api.example.com/users/${userId}`)

		if (!response.ok) {
			return {
				_tag: "failure",
				error: {
					_tag: "FetchError",
					status: response.status,
					message: `Failed to fetch user ${userId}`,
				},
			}
		}

		const data = await response.json()

		return {
			_tag: "success",
			value: data as User,
		}
	}
}
