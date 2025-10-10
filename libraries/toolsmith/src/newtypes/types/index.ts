//++ Result of parsing IPv6 address - groups as 8 numbers plus optional IPv4 suffix to preserve
export type ParsedIpv6 = {
	readonly groups: ReadonlyArray<number>
	readonly ipv4Suffix?: string
}
