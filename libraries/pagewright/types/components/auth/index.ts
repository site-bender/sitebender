//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Session = {
	user: {
		id: string
		email: string
		appMetadata: Record<string, unknown>
		userMetadata: Record<string, unknown>
	}
	expiresAt: number
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type RegistrationData = {
	id: string
	email: string
	name: string
	userId: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type EmailStatus = {
	existsInAccount: boolean
	existsInRegistrant: boolean
	registrantExpired: boolean
	registrantId: string | null
}
