import type { Intangible } from "../index.ts"

// Language interface - extends Intangible
// Natural languages such as Spanish, Tamil, Hindi, English, etc.
// Formal language code tags expressed in BCP 47 can be used via the alternateName property.
export interface Language extends Intangible {
	// Language has no specific properties beyond those inherited from Thing
	// It serves as a base type for representing natural languages
}
