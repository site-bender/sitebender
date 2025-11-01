import type { P3Color } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that creates a P3Color without validation
//++ INTERNAL USE ONLY - caller must guarantee value is valid
export default function unsafeP3Color(value: string): P3Color {
	return value as P3Color
}
