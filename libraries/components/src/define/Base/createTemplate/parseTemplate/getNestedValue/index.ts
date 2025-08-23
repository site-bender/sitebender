import type { TemplateData } from "../../../../../../types/schema.org/index.ts"

export default function getNestedValue(
	obj: TemplateData,
	path: string,
): string {
	return path.split(".").reduce<string | undefined>(
		(acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
		obj,
	)?.toString() || ""
}
