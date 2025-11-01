import type { P3Color } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a P3Color to extract the raw string value
export default function unwrapP3Color(value: P3Color): string {
	return value as string
}
