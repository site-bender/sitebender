import type { Hostname } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Hostname branded type back to its underlying string value
export default function unwrapHostname(hostname: Hostname): string {
	return hostname
}
