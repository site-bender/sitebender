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
	//++ [EXCEPTION] .slice(), .map(), .toString(), .toLowerCase() permitted in Toolsmith for performance - provides IPv6 normalization wrapper
	// If IPv4 suffix provided, work with first 6 groups only
	const groupsToNormalize = ipv4Suffix ? groups.slice(0, 6) : groups

	// Convert to hex strings with leading zeros removed
	const hexGroups = groupsToNormalize.map(function (group) {
		return group.toString(16).toLowerCase()
	})

	// Find longest run of consecutive zeros to compress (minimum 2 zeros)
	const findLongestZeroRun = function (
		groups: ReadonlyArray<number>,
	): [number, number] {
		//++ [EXCEPTION] .reduce() and array destructuring permitted in Toolsmith for performance - provides zero run detection wrapper
		const result = groups.reduce(
			function (
				acc: readonly [number, number, number, number],
				group: number,
				index: number,
			) {
				const [longestStart, longestLength, currentStart, currentLength] = acc

				if (group === 0) {
					const newCurrentStart = currentStart === -1 ? index : currentStart
					const newCurrentLength = currentLength + 1
					return [
						longestStart,
						longestLength,
						newCurrentStart,
						newCurrentLength,
					] as const
				}

				const newLongestStart = currentLength > longestLength
					? currentStart
					: longestStart
				const newLongestLength = currentLength > longestLength
					? currentLength
					: longestLength
				return [newLongestStart, newLongestLength, -1, 0] as const
			},
			[-1, 0, -1, 0] as const,
		)

		// Check final run
		const [longestStart, longestLength, currentStart, currentLength] = result
		return currentLength > longestLength
			? [currentStart, currentLength]
			: [longestStart, longestLength]
	}

	const [longestStart, longestLength] = findLongestZeroRun(groupsToNormalize)

	// Only compress if run is 2 or more (compressing single 0 is not beneficial)
	if (longestLength < 2) {
		//++ [EXCEPTION] .join() permitted in Toolsmith for performance - provides IPv6 group joining wrapper
		// No compression - join all groups
		if (ipv4Suffix) {
			return `${hexGroups.join(":")}:${ipv4Suffix}`
		}
		return hexGroups.join(":")
	}

	//++ [EXCEPTION] .slice(), .concat(), .join() permitted in Toolsmith for performance - provides IPv6 compression wrapper
	// Build compressed form using functional constructs
	const buildParts = function (
		start: number,
		length: number,
	): ReadonlyArray<string> {
		if (start === 0) {
			// Compression at start
			if (start + length === hexGroups.length) {
				// All zeros compressed - special case for ::
				return ipv4Suffix ? [`::${ipv4Suffix}`] : ["::"]
			}
			const remaining = hexGroups.slice(start + length)
			const withCompression = ["", ""].concat(remaining)
			return ipv4Suffix ? withCompression.concat(ipv4Suffix) : withCompression
		}

		if (start + length === hexGroups.length) {
			// Compression at end (before IPv4 if present)
			const before = hexGroups.slice(0, start)
			if (ipv4Suffix) {
				// Compression ends right before IPv4 - need ::
				return before.concat("", ipv4Suffix)
			}
			return before.concat("", "")
		}

		// Compression in middle
		const before = hexGroups.slice(0, start)
		const after = hexGroups.slice(start + length)
		const middle = before.concat("").concat(after)
		return ipv4Suffix ? middle.concat(ipv4Suffix) : middle
	}

	return buildParts(longestStart, longestLength).join(":")
}
