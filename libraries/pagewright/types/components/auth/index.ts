/**
 * Session information for an authenticated user
 */
export type Session = {
	user: {
		id: string
		email: string
		appMetadata: Record<string, unknown>
		userMetadata: Record<string, unknown>
	}
	expiresAt: number
}

/**
 * Registration data for completing user signup
 */
export type RegistrationData = {
	id: string
	email: string
	name: string
	userId: string
}

/**
 * Status of an email address in the system
 */
export type EmailStatus = {
	existsInAccount: boolean
	existsInRegistrant: boolean
	registrantExpired: boolean
	registrantId: string | null
}
