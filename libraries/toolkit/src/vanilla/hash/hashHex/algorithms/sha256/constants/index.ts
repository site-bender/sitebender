//++ Hex nibble lookup table for sha256 implementation (internal)
export const HEX_TABLE: Array<string> = Array.from(
	{ length: 16 },
	(_, i) => i.toString(16),
)
