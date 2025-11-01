import type { OklchColor } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an OklchColor to extract the raw string value
export default function unwrapOklchColor(value: OklchColor): string {
	return value as string
}
