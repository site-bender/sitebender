export type ColumnType =
	| "UUID"
	| "TEXT"
	| "TIMESTAMPTZ"
	| "BOOLEAN"
	| "EmailAddress"
	| "PhoneType"
	| "[CommunicationChannel]"
	| "Audience"
	| "ContentRating"
	| "CreativeWorkStatus"
	| "Language"
	| "[VARCHAR]"
	| "URL"
	| "MediaObjectType"
	| "ActionType"
	| "VARCHAR(255)[]"
	| "CommunicationChannel[]"

export type Column = {
	name: string
	type: ColumnType
	isUnique?: boolean
	isNullable?: boolean
	isForeignKey?: boolean
}

export type Table = {
	name: string
	isBridge?: boolean
	columns: Array<Column>
}

export type Schema = {
	tables: Array<Table>
}

export type TableDimensions = {
	width: number
	height: number
	headerHeight: number
	x: number
	y: number
}

export type SchemaLayout = {
	width: number
	height: number
	tables: Map<string, TableDimensions>
}
