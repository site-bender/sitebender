//++ Normalizes IRI to canonical form per RFC 3987
//++ Scheme: lowercase (ASCII only)
//++ All other components: NFC Unicode normalization, preserve case
//++ Does NOT convert to URI (Punycode, percent-encoding) - that's a separate operation
export default function _normalizeIri(iri: string): string {
	//++ [EXCEPTION] .normalize(), .indexOf(), .slice(), .toLocaleLowerCase() permitted in Toolsmith for performance - provides IRI normalization wrapper
	// Apply NFC Unicode normalization first
	const nfcNormalized = iri.normalize("NFC")

	// Find scheme separator
	const colonIndex = nfcNormalized.indexOf(":")
	if (colonIndex === -1) {
		return nfcNormalized // Shouldn't happen if validation passed
	}

	const scheme = nfcNormalized.slice(0, colonIndex).toLocaleLowerCase()
	const afterScheme = nfcNormalized.slice(colonIndex + 1)

	// Scheme is lowercase, everything else preserves case (but is NFC normalized)
	return scheme + ":" + afterScheme
}
