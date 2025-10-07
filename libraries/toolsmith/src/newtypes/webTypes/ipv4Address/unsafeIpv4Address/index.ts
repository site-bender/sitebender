import type { Ipv4Address } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Ipv4Address without validation - use only when input is guaranteed valid
export default function unsafeIpv4Address(value: string): Ipv4Address {
	return value as Ipv4Address
}
