# Algebraic Newtypes Design

## Overview

This document defines the architectural pattern for **algebraic newtypes** - object-based branded types validated against RDF/OWL ontologies with support for RDF serialization and automatic form generation.

## Core Principles

1. **Object-based branded types** - Not primitive strings/numbers, but structured objects
2. **Dual validation layers** - TypeScript validation + Ontology validation
3. **Ontology as source of truth** - When ontology exists, it drives validation and structure
4. **Graceful degradation** - TypeScript validation works without ontology
5. **Pure functions** - Except isolated I/O boundaries for ontology queries
6. **Immutable data** - All data structures are readonly

## Type Structure Pattern

### Basic Pattern

Every algebraic newtype follows this structure:

```typescript
type AlgebraicNewtype = {
	readonly field1: BrandedType1
	readonly field2: BrandedType2
	readonly optionalField: Option<BrandedType3>
	// ... more fields
} & { readonly __brand: 'AlgebraicNewtype' }
```

**Key Elements:**
- Readonly object with branded primitive fields
- Intersection with brand marker `{ readonly __brand: 'TypeName' }`
- Use `Option<T>` for optional fields (not `undefined` or `null`)
- All nested fields are also branded types

### Example: PhoneNumber

```typescript
type PhoneNumber = {
	readonly countryCode: CountryCode  // "+1", "+44", etc.
	readonly nationalNumber: NationalNumber  // "5551234567"
	readonly extension: Option<Extension>  // Some("123") or None
	readonly phoneType: PhoneType  // discriminated union
	readonly phoneUse: PhoneUse  // discriminated union
} & { readonly __brand: 'PhoneNumber' }

// Supporting branded primitives
type CountryCode = string & { readonly __brand: 'CountryCode' }
type NationalNumber = string & { readonly __brand: 'NationalNumber' }
type Extension = string & { readonly __brand: 'Extension' }

// Discriminated unions for enumerations
type PhoneType =
	| { readonly _tag: 'Mobile' }
	| { readonly _tag: 'Landline' }
	| { readonly _tag: 'Satellite' }
	| { readonly _tag: 'VoIP' }

type PhoneUse =
	| { readonly _tag: 'Voice' }
	| { readonly _tag: 'SMS' }
	| { readonly _tag: 'Fax' }
	| { readonly _tag: 'Data' }
```

## Validation Layers

### Layer 1: TypeScript Validation

Pure functions that validate structure, format, and TypeScript-level constraints.

**Location:** `libraries/toolsmith/src/newtypes/algebraic/`

**Pattern:**
```typescript
function validatePhoneNumberStructure(
	data: PhoneNumberData
): Result<ValidationError, PhoneNumber>
```

**Responsibilities:**
- Validate required fields present
- Validate field formats (regex, length, etc.)
- Construct branded types
- Return `Result<ValidationError, PhoneNumber>`

**Characteristics:**
- Pure function
- No I/O
- No ontology dependency
- Fast, synchronous validation

### Layer 2: Ontology Validation

Effectful functions that validate against RDF/OWL ontology in Oxigraph triple store.

**Location:** `libraries/toolsmith/src/newtypes/algebraic/_ontology/`

**Pattern:**
```typescript
// [IO] This function performs side effects
function validatePhoneNumberOntology(
	phone: PhoneNumber,
	store: OxigraphStore
): Promise<Result<OntologyError, PhoneNumber>>
```

**Responsibilities:**
- Query ontology for constraints
- Validate against SHACL shapes
- Validate against OWL axioms
- Enrich with ontology metadata
- Return `Promise<Result<OntologyError, PhoneNumber>>`

**Characteristics:**
- Effectful function (I/O)
- Queries Oxigraph
- Asynchronous
- Optional (degrades gracefully)

### Validation Composition

Users can choose validation level:

```typescript
// TypeScript only (fast, synchronous)
const result1 = phoneNumber(data)

// TypeScript + Ontology (comprehensive, async)
const result2 = await pipe(
	phoneNumber(data),
	chain(phone => validatePhoneNumberOntology(phone, store))
)
```

## Smart Constructor Pattern

Every algebraic newtype has a smart constructor:

```typescript
export default function phoneNumber(
	data: PhoneNumberData
): Result<ValidationError, PhoneNumber>
```

**Input Type:**
```typescript
type PhoneNumberData = {
	readonly countryCode: string
	readonly nationalNumber: string
	readonly extension?: string
	readonly phoneType: 'Mobile' | 'Landline' | 'Satellite' | 'VoIP'
	readonly phoneUse: 'Voice' | 'SMS' | 'Fax' | 'Data'
}
```

**Validation Steps:**
1. Validate country code format
2. Validate national number format
3. Validate extension format (if present)
4. Construct branded primitive types
5. Construct discriminated unions
6. Assemble into branded object
7. Return `Result<ValidationError, PhoneNumber>`

**Implementation Pattern:**
```typescript
export default function phoneNumber(
	data: PhoneNumberData
): Result<ValidationError, PhoneNumber> {
	// Validate and construct country code
	const countryCodeResult = countryCode(data.countryCode)
	if (countryCodeResult._tag === 'Error') {
		return countryCodeResult
	}

	// Validate and construct national number
	const nationalNumberResult = nationalNumber(data.nationalNumber)
	if (nationalNumberResult._tag === 'Error') {
		return nationalNumberResult
	}

	// Validate and construct extension (optional)
	const extensionResult = data.extension
		? pipe(extension(data.extension), map(some))
		: ok(none())
	if (extensionResult._tag === 'Error') {
		return extensionResult
	}

	// Construct phone type
	const phoneTypeResult = phoneType(data.phoneType)
	if (phoneTypeResult._tag === 'Error') {
		return phoneTypeResult
	}

	// Construct phone use
	const phoneUseResult = phoneUse(data.phoneUse)
	if (phoneUseResult._tag === 'Error') {
		return phoneUseResult
	}

	// Assemble branded object
	return ok({
		countryCode: countryCodeResult.value,
		nationalNumber: nationalNumberResult.value,
		extension: extensionResult.value,
		phoneType: phoneTypeResult.value,
		phoneUse: phoneUseResult.value,
		__brand: 'PhoneNumber'
	} as PhoneNumber)
}
```

## Unsafe Constructor Pattern

For internal use when data is known to be valid:

```typescript
export default function unsafePhoneNumber(
	data: PhoneNumberData
): PhoneNumber {
	return {
		countryCode: data.countryCode as CountryCode,
		nationalNumber: data.nationalNumber as NationalNumber,
		extension: data.extension ? some(data.extension as Extension) : none(),
		phoneType: { _tag: data.phoneType } as PhoneType,
		phoneUse: { _tag: data.phoneUse } as PhoneUse,
		__brand: 'PhoneNumber'
	} as PhoneNumber
}
```

## Unwrap Pattern

Extract the underlying data:

```typescript
export default function unwrapPhoneNumber(
	phone: PhoneNumber
): Result<ValidationError, PhoneNumberData> {
	if (!isPhoneNumber(phone)) {
		return error({
			code: 'UNWRAP_PHONE_NUMBER_INVALID_TYPE',
			field: 'phoneNumber',
			messages: ['The system needs a PhoneNumber value.'],
			received: phone,
			expected: 'PhoneNumber branded type',
			suggestion: 'Ensure the value is a properly branded PhoneNumber type',
			severity: 'requirement',
		})
	}

	return ok({
		countryCode: phone.countryCode,
		nationalNumber: phone.nationalNumber,
		extension: isNone(phone.extension) ? undefined : phone.extension.value,
		phoneType: phone.phoneType._tag,
		phoneUse: phone.phoneUse._tag,
	})
}
```

## Predicate Pattern

Type guard for runtime checking:

```typescript
export default function isPhoneNumber(value: unknown): value is PhoneNumber {
	if (typeof value !== 'object' || value === null) {
		return false
	}

	const obj = value as Record<string, unknown>

	return (
		obj.__brand === 'PhoneNumber' &&
		isCountryCode(obj.countryCode) &&
		isNationalNumber(obj.nationalNumber) &&
		isOption(obj.extension) &&
		isPhoneType(obj.phoneType) &&
		isPhoneUse(obj.phoneUse)
	)
}
```

## RDF Serialization

### To RDF (Turtle format)

```typescript
// [IO] This function performs side effects
export default function serializePhoneNumberToRdf(
	phone: PhoneNumber
): Result<SerializationError, string> {
	// Generate unique IRI for this phone number instance
	const iri = generateIri('PhoneNumber')

	// Serialize to Turtle format
	const turtle = `
@prefix e164: <http://www.example.org/ontologies/e164#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

<${iri}> a e164:PhoneNumber ;
    e164:countryCode "${phone.countryCode}"^^xsd:string ;
    e164:nationalNumber "${phone.nationalNumber}"^^xsd:string ;
    ${isNone(phone.extension) ? '' : `e164:extension "${phone.extension.value}"^^xsd:string ;`}
    e164:phoneType e164:${phone.phoneType._tag} ;
    e164:phoneUse e164:${phone.phoneUse._tag} .
`

	return ok(turtle)
}
```

### From RDF (Turtle format)

```typescript
// [IO] This function performs side effects
export default function deserializePhoneNumberFromRdf(
	turtle: string,
	store: OxigraphStore
): Promise<Result<DeserializationError, PhoneNumber>> {
	// Parse RDF
	// Query for phone number properties
	// Construct PhoneNumberData
	// Call smart constructor
	// Return Result
}
```

## Form Schema Generation

Generate JSON Schema for automatic form generation:

```typescript
export default function generatePhoneNumberFormSchema(): FormSchema {
	return {
		type: 'object',
		title: 'Phone Number',
		properties: {
			countryCode: {
				type: 'string',
				title: 'Country Code',
				pattern: '^\\+[1-9]\\d{0,3}$',
				examples: ['+1', '+44', '+81'],
			},
			nationalNumber: {
				type: 'string',
				title: 'National Number',
				pattern: '^\\d{4,15}$',
			},
			extension: {
				type: 'string',
				title: 'Extension (Optional)',
				pattern: '^\\d{1,6}$',
			},
			phoneType: {
				type: 'string',
				title: 'Phone Type',
				enum: ['Mobile', 'Landline', 'Satellite', 'VoIP'],
			},
			phoneUse: {
				type: 'string',
				title: 'Phone Use',
				enum: ['Voice', 'SMS', 'Fax', 'Data'],
			},
		},
		required: ['countryCode', 'nationalNumber', 'phoneType', 'phoneUse'],
	}
}
```

## File Organization

```
libraries/toolsmith/src/newtypes/algebraic/
├── phoneNumber/
│   ├── index.ts                           # Smart constructor
│   ├── index.test.ts                      # Tests
│   ├── unsafePhoneNumber/
│   │   ├── index.ts                       # Unsafe constructor
│   │   └── index.test.ts
│   ├── unwrapPhoneNumber/
│   │   ├── index.ts                       # Unwrap function
│   │   └── index.test.ts
│   ├── isPhoneNumber/
│   │   ├── index.ts                       # Type predicate
│   │   └── index.test.ts
│   ├── serializeToRdf/
│   │   ├── index.ts                       # RDF serialization
│   │   └── index.test.ts
│   ├── deserializeFromRdf/
│   │   ├── index.ts                       # RDF deserialization
│   │   └── index.test.ts
│   ├── generateFormSchema/
│   │   ├── index.ts                       # Form schema generation
│   │   └── index.test.ts
│   ├── validateOntology/
│   │   ├── index.ts                       # Ontology validation
│   │   └── index.test.ts
│   └── _types/
│       └── index.ts                       # Type definitions
```

## IO Boundary Isolation

Pure functions (no I/O):
- Smart constructors
- Unsafe constructors
- Unwrap functions
- Predicates
- Form schema generation
- RDF serialization (string manipulation only)

Effectful functions (I/O):
- Ontology validation (queries Oxigraph)
- RDF deserialization (parses RDF, queries store)

**Marking I/O functions:**
```typescript
// [IO] This function performs side effects
function validateOntology(...): Promise<Result<...>>
```

## Error Types

### ValidationError

Used by TypeScript validation layer:

```typescript
type ValidationError = {
	readonly code: string
	readonly field: string
	readonly messages: ReadonlyArray<string>
	readonly received: unknown
	readonly expected: string
	readonly suggestion: string
	readonly severity: 'requirement' | 'recommendation'
	readonly constraints?: Readonly<Record<string, unknown>>
}
```

### OntologyError

Used by ontology validation layer:

```typescript
type OntologyError = {
	readonly _tag: 'OntologyError'
	readonly code: string
	readonly iri: string
	readonly violation: string
	readonly shapeIri?: string
	readonly message: string
}
```

### SerializationError

Used by RDF serialization:

```typescript
type SerializationError = {
	readonly _tag: 'SerializationError'
	readonly code: string
	readonly field: string
	readonly message: string
}
```

## Constitutional Compliance

✅ **No classes** - Pure functions and types only
✅ **No mutations** - All data readonly
✅ **No loops** - Use map/filter/reduce
✅ **No exceptions** - Use Result/Validation monads
✅ **No arrow functions** - Use function keyword
✅ **One function per file** - Modular architecture
✅ **All functions curried** - Single parameter functions
✅ **Branded types** - Type safety without runtime cost
✅ **IO boundaries isolated** - Pure core, effectful shell

## Next Steps

After design approval:

1. Implement PhoneNumber as first example
2. Create E.164+ ontology in Turtle format
3. Implement ontology integration utilities
4. Implement RDF serialization utilities
5. Test end-to-end workflow
6. Implement Address type using IContact ontology
7. Create generator scripts for new algebraic types

---

**Status:** Design Phase - Awaiting Approval
