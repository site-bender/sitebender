import type {
	Formatters,
	TemplateData,
} from "../../../../types/schema.org/index.ts"

import DEFAULT_FORMATTERS from "./defaultFormatters/index.tsx"
import parseTemplate from "./parseTemplate/index.tsx"

export default function createTemplate(
	template?: string,
	formatters: Formatters = DEFAULT_FORMATTERS,
) {
	if (!template || typeof template !== "string") {
		return () => <span>No template provided</span>
	}

	function templateRenderer(data: TemplateData): JSX.Element {
		return <>{parseTemplate(template as string, data, formatters)}</>
	}
	return templateRenderer
}
