import type { UserData } from "./types/index.ts"

import { MAX_NAME_LENGTH } from "./constants/index.ts"
import _validateUser from "./_validateUser/index.ts"

//++ Processes user data with validation
export default function processUser(data: UserData): UserData {
	_validateUser(data)

	const trimmedName = data.name.slice(0, MAX_NAME_LENGTH)

	return {
		...data,
		name: trimmedName,
	}
}
