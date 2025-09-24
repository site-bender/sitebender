import type { TemplateData } from "../../../../../../types/schema.org/index.ts"

export default function getNestedValue(
	obj: TemplateData,
	path: string,
): string {
	return path.split(".").reduce<unknown>(
		(acc: unknown, key: string) => {
			if (acc && typeof acc === "object") {
				const rec = acc as Record<string, unknown>
				return rec[key as keyof typeof rec]
			}
			return undefined
		},
		obj as unknown,
	)?.toString() || ""
}
