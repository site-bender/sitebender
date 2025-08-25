import type { Formatters } from "../../../../../../types/schema.org/index.ts"

const DEFAULT_FORMATTERS: Formatters = {
	bold: (text, props = {}) => <strong {...props}>{text}</strong>,
	cite: (name, props = {}) => <cite {...props}>{name}</cite>,
	italic: (text, props = {}) => <em {...props}>{text}</em>,
	link: (text, props = {}) => <a {...props}>{text}</a>,
}

export default DEFAULT_FORMATTERS
