export type FormatFunction = (
	value: unknown,
	params?: Record<string, unknown>,
) => string | JSX.Element

export interface FormatContext {
	props: Record<string, unknown>
	formatters: Record<string, FormatFunction>
}
