import type { Intangible } from "../index.ts"

// StructuredValue interface - extends Intangible
// Structured values are used when the value of a property has a more complex structure
// than simply being a textual value or a reference to another thing.
export interface StructuredValue extends Intangible {
	// StructuredValue has no specific properties beyond those inherited from Thing
	// It serves as a base type for complex value types like PropertyValue, QuantitativeValue, etc.
}
