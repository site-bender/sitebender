// @sitebender/arborist/demo/examples/fetchUser
//++ Example async function demonstrating proper error handling

import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

export type User = Readonly<{
	id: number
	name: string
	email: string
}>

export type FetchError = Readonly<{
	_tag: "FetchError"
	message: string
	code: string
}>

//++ Fetches a user by ID using Result monad for error handling
//++ No try/catch - uses Result type instead
export default function fetchUser(userId: number) {
	return async function fetchUserById(): Promise<Result<FetchError, User>> {
		const response = await fetch(`https://api.example.com/users/${userId}`)

		if (!response.ok) {
			return error({
				_tag: "FetchError" as const,
				message: `Failed to fetch user ${userId}`,
				code: response.status.toString(),
			})
		}

		const data = await response.json()

		return ok({
			id: data.id,
			name: data.name,
			email: data.email,
		})
	}
}
