import type { Uuid } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Uuid branded type back to its underlying string value
export default function unwrapUuid(uuid: Uuid): string {
	return uuid
}
