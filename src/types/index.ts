/// <reference path="./test.d.ts" />

/**
 * A URL string that matches the URL domain pattern
 */
export type URL = string

/**
 * An email address that matches the EmailAddress domain pattern
 */
export type EmailAddress = string

/**
 * The audience for a memoir
 */
export type Audience = "public" | "private"

/**
 * The content rating for an anecdote
 */
export type ContentRating = "general" | "adult"

/**
 * The status of a creative work
 */
export type CreativeWorkStatus =
	| "draft"
	| "pending"
	| "published"
	| "archived"
	| "obsolete"

/**
 * The type of media object
 */
export type MediaObjectType =
	| "AudioObject"
	| "ImageObject"
	| "MusicVideoObject"
	| "VideoObject"

/**
 * The type of action performed
 */
export type ActionType =
	| "AchieveAction"
	| "AssessAction"
	| "ConsumeAction"
	| "ControlAction"
	| "CreateAction"
	| "FindAction"
	| "InteractAction"
	| "MoveAction"
	| "OrganizeAction"
	| "PlayAction"
	| "SearchAction"
	| "SeekToAction"
	| "SolveMathAction"
	| "TradeAction"
	| "TransferAction"
	| "UpdateAction"

/**
 * Base type for all database records
 */
export type DatabaseRecord = {
	id: string
	dateCreated: string
	dateModified?: string
}

/**
 * Utility type to create a new record without system fields
 */
export type Create<T extends DatabaseRecord> = Omit<T, keyof DatabaseRecord>

/**
 * Utility type to update an existing record
 */
export type Update<T extends DatabaseRecord> = Partial<
	Omit<T, keyof DatabaseRecord>
>

/**
 * Utility type for a record with only the ID field
 */
export type Reference<T extends DatabaseRecord> = Pick<T, "id">

/**
 * A successful API response
 */
export type Success<T> = {
	status: "success"
	data: T
}

/**
 * An error API response
 */
export type Error = {
	status: "error"
	message: string
	code?: string
}

/**
 * A union of all possible API responses
 */
export type Response<T> = Success<T> | Error

/**
 * Pagination parameters for list requests
 */
export type PaginationParams = {
	limit?: number
	offset?: number
	cursor?: string
}

/**
 * Paginated response data
 */
export type Paginated<T> = {
	items: Array<T>
	total: number
	hasMore: boolean
	nextCursor?: string
}

/**
 * Common filter operators
 */
export type FilterOperator =
	| "eq"
	| "neq"
	| "gt"
	| "gte"
	| "lt"
	| "lte"
	| "like"
	| "ilike"
	| "in"
	| "nin"

/**
 * A filter condition
 */
export type Filter<T> = {
	field: keyof T
	operator: FilterOperator
	value: unknown
}

/**
 * Filter parameters for list requests
 */
export type FilterParams<T> = {
	filters?: Filter<T>[]
	sort?: {
		field: keyof T
		direction: "asc" | "desc"
	}
}

/**
 * A validation error
 */
export type ValidationError = {
	field: string
	message: string
	code?: string
}

/**
 * Validation result
 */
export type ValidationResult = {
	isValid: boolean
	errors: Array<ValidationError>
}

/**
 * Search parameters
 */
export type SearchParams = {
	query: string
	fields?: Array<string>
	fuzzy?: boolean
	highlight?: boolean
}

/**
 * Search result with highlights
 */
export type SearchResult<T> = {
	item: T
	highlights?: Record<string, Array<string>>
	score: number
}

/**
 * Base event type
 */
export type Event<T extends string, D = unknown> = {
	type: T
	data: D
	timestamp: string
	id: string
}

/**
 * Event handler type
 */
export type EventHandler<T extends Event<string>> = (
	event: T,
) => Promise<void> | void

/**
 * A function that takes one argument and returns one value.
 */
export type UnaryFunction<A, B> = (arg: A) => B
