import type { HexColor } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a HexColor to extract the raw string value
export default function unwrapHexColor(value: HexColor): string {
	return value as string
}
