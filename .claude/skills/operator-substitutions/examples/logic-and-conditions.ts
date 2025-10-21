import and from "@sitebender/toolsmith/logic/and/index.ts"
import isNotEmpty from "@sitebender/toolsmith/string/isNotEmpty/index.ts"

/*++
 + Example: Using `and` for combining boolean conditions
 + Demonstrates readable conjunction that returns guaranteed boolean
 */
export default function shouldProcessUser(
	username: string,
	email: string,
): boolean {
	/*++
	 + Using `and` to combine conditions
	 + Reads as: "username is not empty and email is not empty"
	 + Returns guaranteed boolean (not first truthy value like &&)
	 */
	const hasUsername = isNotEmpty(username)
	const hasEmail = isNotEmpty(email)

	return and(hasUsername)(hasEmail)
}
