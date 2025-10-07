import type { Hostname } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Hostname without validation - use only when input is guaranteed valid
export default function unsafeHostname(value: string): Hostname {
	return value as Hostname
}
