import type { EmailAddress } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an EmailAddress branded type back to its underlying string value
export default function unwrapEmailAddress(value: EmailAddress): string {
	return value as string
}
