import type { OklchColor } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that creates an OklchColor without validation
//++ INTERNAL USE ONLY - caller must guarantee value is valid
export default function unsafeOklchColor(value: string): OklchColor {
	return value as OklchColor
}
