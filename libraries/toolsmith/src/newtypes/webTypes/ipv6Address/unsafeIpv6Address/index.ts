import type { Ipv6Address } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Ipv6Address without validation - use only when input is guaranteed valid
export default function unsafeIpv6Address(value: string): Ipv6Address {
	return value as Ipv6Address
}
