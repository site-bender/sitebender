/**
 * Session information for an authenticated user
 */
export type Session = {
	user: {
		id: string
		email: string
		app_metadata: Record<string, unknown>
		user_metadata: Record<string, unknown>
	}
	expires_at: number
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
	exists_in_account: boolean
	exists_in_registrant: boolean
	registrant_expired: boolean
	registrant_id: string | null
}
