import type { Ipv4Address } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an Ipv4Address branded type back to its underlying string value
export default function unwrapIpv4Address(address: Ipv4Address): string {
	return address
}
