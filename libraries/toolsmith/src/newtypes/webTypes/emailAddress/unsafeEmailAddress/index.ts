import type { EmailAddress } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as EmailAddress without validation - use only when input is guaranteed valid
export default function unsafeEmailAddress(email: string): EmailAddress {
	return email as EmailAddress
}
