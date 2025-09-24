export type HexColorFormat =
	| "3-digit"
	| "4-digit"
	| "6-digit"
	| "8-digit"
	| "with-alpha"
	| "no-alpha"

export type HexColorOptions = {
	requireHash?: boolean
	format?: HexColorFormat
}
