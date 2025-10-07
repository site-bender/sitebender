import type { Ipv6Address } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an Ipv6Address branded type back to its underlying string value
export default function unwrapIpv6Address(address: Ipv6Address): string {
	return address
}
