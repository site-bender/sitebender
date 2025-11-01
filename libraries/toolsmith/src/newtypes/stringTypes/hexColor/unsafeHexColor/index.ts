import type { HexColor } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that creates a HexColor without validation
//++ INTERNAL USE ONLY - caller must guarantee value is valid
export default function unsafeHexColor(value: string): HexColor {
	return value as HexColor
}
