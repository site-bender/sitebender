import type { Thing } from "../index.ts"

// Intangible interface - extends Thing
export interface Intangible extends Thing {
	// Intangible is an abstract type representing things that are not physical objects
	// It serves as a base for many Schema.org types like Brand, Offer, Rating, etc.
	// No additional properties beyond Thing are defined at this level
}
