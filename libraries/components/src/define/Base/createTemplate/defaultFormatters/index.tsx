import type { Formatters } from "../../../../../types/schema.org/index.ts"

const DEFAULT_FORMATTERS: Formatters = {
	bold: (text: string, props: Record<string, unknown> = {}) => (
		<strong {...props}>{text}</strong>
	),
	cite: (name: string, props: Record<string, unknown> = {}) => (
		<cite {...props}>{name}</cite>
	),
	italic: (text: string, props: Record<string, unknown> = {}) => (
		<em {...props}>{text}</em>
	),
	link: (text: string, props: Record<string, unknown> = {}) => (
		<a {...props}>{text}</a>
	),
}

export default DEFAULT_FORMATTERS
