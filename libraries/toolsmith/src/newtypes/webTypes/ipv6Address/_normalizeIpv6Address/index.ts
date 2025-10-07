//++ Normalizes IPv6 address to canonical form per RFC 5952
//++ - Lowercase hexadecimal
//++ - Leading zeros omitted
//++ - Longest run of consecutive zero groups compressed with ::
//++ - If multiple equal runs, compress leftmost
//++ - Preserves IPv4 dotted notation if present
export default function _normalizeIpv6Address(
	groups: ReadonlyArray<number>,
	ipv4Suffix?: string,
): string {
	// If IPv4 suffix provided, work with first 6 groups only
	const groupsToNormalize = ipv4Suffix ? groups.slice(0, 6) : groups

	// Convert to hex strings with leading zeros removed
	const hexGroups = groupsToNormalize.map(function (group) {
		return group.toString(16).toLowerCase()
	})

	// Find longest run of consecutive zeros to compress (minimum 2 zeros)
	let longestStart = -1
	let longestLength = 0
	let currentStart = -1
	let currentLength = 0

	for (let i = 0; i < groupsToNormalize.length; i++) {
		if (groupsToNormalize[i] === 0) {
			if (currentStart === -1) {
				currentStart = i
				currentLength = 1
			} else {
				currentLength++
			}
		} else {
			if (currentLength > longestLength) {
				longestStart = currentStart
				longestLength = currentLength
			}
			currentStart = -1
			currentLength = 0
		}
	}

	// Check final run
	if (currentLength > longestLength) {
		longestStart = currentStart
		longestLength = currentLength
	}

	// Only compress if run is 2 or more (compressing single 0 is not beneficial)
	if (longestLength < 2) {
		// No compression - join all groups
		if (ipv4Suffix) {
			return `${hexGroups.join(":")}:${ipv4Suffix}`
		}
		return hexGroups.join(":")
	}

	// Build compressed form
	const parts: Array<string> = []

	if (longestStart === 0) {
		// Compression at start
		if (longestStart + longestLength === hexGroups.length) {
			// All zeros compressed - special case for ::
			if (ipv4Suffix) {
				return `::${ipv4Suffix}`
			}
			return "::"
		}
		parts.push("")
		parts.push("")
		for (let i = longestStart + longestLength; i < hexGroups.length; i++) {
			parts.push(hexGroups[i])
		}
		if (ipv4Suffix) {
			parts.push(ipv4Suffix)
		}
	} else if (longestStart + longestLength === hexGroups.length) {
		// Compression at end (before IPv4 if present)
		for (let i = 0; i < longestStart; i++) {
			parts.push(hexGroups[i])
		}
		if (ipv4Suffix) {
			// Compression ends right before IPv4 - need ::
			parts.push("")
			parts.push(ipv4Suffix)
		} else {
			parts.push("")
			parts.push("")
		}
	} else {
		// Compression in middle
		for (let i = 0; i < longestStart; i++) {
			parts.push(hexGroups[i])
		}
		parts.push("")
		for (let i = longestStart + longestLength; i < hexGroups.length; i++) {
			parts.push(hexGroups[i])
		}
		if (ipv4Suffix) {
			parts.push(ipv4Suffix)
		}
	}

	return parts.join(":")
}
