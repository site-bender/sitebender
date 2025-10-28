/// <reference path="./test.d.ts" />

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type URL = string

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type EmailAddress = string

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Audience = "public" | "private"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ContentRating = "general" | "adult"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type CreativeWorkStatus =
	| "draft"
	| "pending"
	| "published"
	| "archived"
	| "obsolete"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type MediaObjectType =
	| "AudioObject"
	| "ImageObject"
	| "MusicVideoObject"
	| "VideoObject"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type DatabaseRecord = {
	id: string
	dateCreated: string
	dateModified?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Create<T extends DatabaseRecord> = Omit<T, keyof DatabaseRecord>

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Update<T extends DatabaseRecord> = Partial<
	Omit<T, keyof DatabaseRecord>
>

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Reference<T extends DatabaseRecord> = Pick<T, "id">

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Success<T> = {
	status: "success"
	data: T
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Error = {
	status: "error"
	message: string
	code?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Response<T> = Success<T> | Error

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type PaginationParams = {
	limit?: number
	offset?: number
	cursor?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Paginated<T> = {
	items: Array<T>
	total: number
	hasMore: boolean
	nextCursor?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Filter<T> = {
	field: keyof T
	operator: FilterOperator
	value: unknown
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type FilterParams<T> = {
	filters?: Filter<T>[]
	sort?: {
		field: keyof T
		direction: "asc" | "desc"
	}
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ValidationError = {
	field: string
	message: string
	code?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ValidationResult = {
	isValid: boolean
	errors: Array<ValidationError>
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type SearchParams = {
	query: string
	fields?: Array<string>
	fuzzy?: boolean
	highlight?: boolean
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type SearchResult<T> = {
	item: T
	highlights?: Record<string, Array<string>>
	score: number
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Event<T extends string, D = unknown> = {
	type: T
	data: D
	timestamp: string
	id: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type EventHandler<T extends Event<string>> = (
	event: T,
) => Promise<void> | void

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type UnaryFunction<A, B> = (arg: A) => B
