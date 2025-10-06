# Hash Functions

**Location**: `src/vanilla/hash/`
**Functions**: 1
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

Do we need any others? Should the folder by cryptographic instead of hash?

### hashHex
- **Current**: `(algorithm?: HashAlgorithm) => (input: ArrayBuffer | Uint8Array | string) => Promise<string>`
- **Returns**: Promise<string>
- **Description**: Produce a hex hash (lowercase) of input using selected algorithm (default sha256)
- **Target**: `(algorithm: Option<HashAlgorithm>) => (input: ArrayBuffer | Uint8Array | string) => AsyncResult<HashError, string>`

---

## Migration Notes

Hash functions will be converted to AsyncResult-returning functions that provide explicit error handling for cryptographic operations. The monadic versions will:

1. Return `asyncOk(hexString)` when hashing succeeds
2. Return `asyncError(HashError)` when hashing fails (invalid input, unsupported algorithm, etc.)
3. Maintain currying for algorithm selection
4. Use `Option<HashAlgorithm>` instead of optional parameter for algorithm
5. Preserve lowercase hex string output format
6. Support extensible algorithm registry for future hash algorithms

## Special Considerations

### Algorithm Support

#### Current Implementation
- **sha256**: Only supported algorithm currently
- Registry pattern allows future algorithm additions
- Default algorithm is sha256 when not specified
- Algorithm type: `HashAlgorithm = "sha256"`

#### Registry Pattern
```typescript
const registry: Record<
	HashAlgorithm,
	(x: ArrayBuffer | Uint8Array | string) => Promise<string>
> = {
	sha256: sha256HexInternal,
}
```

Future algorithms can be added to the registry (e.g., "sha512", "sha1", "md5", "blake2b").

### Input Types

#### Supported Input Formats
- **ArrayBuffer**: Binary data buffer
- **Uint8Array**: Typed array of 8-bit unsigned integers
- **string**: Text data (will be converted to bytes internally)

All three input types are handled by the underlying algorithm implementation.

### Return Value Pattern

#### Async String Return
- Returns `Promise<string>` containing lowercase hexadecimal hash
- No explicit error handling in current implementation (Promise rejection expected)
- Should migrate to `AsyncResult<HashError, string>` for explicit error cases

### Algorithm Implementation

#### SHA-256 Implementation
- Located at: `src/vanilla/hash/hashHex/algorithms/sha256/`
- Internal function: `sha256HexInternal`
- Components:
  - Constants (K values, initial hash values)
  - Byte conversion utilities (`bytesToHex`, `toUint8Array`)
  - Core hashing algorithm

#### Implementation Dependencies
- **bytesToHex**: Converts Uint8Array to lowercase hex string
- **toUint8Array**: Converts input (ArrayBuffer/Uint8Array/string) to Uint8Array
- **constants**: SHA-256 round constants and initial hash values

### Currying

#### Current Signature
```typescript
function hashHex(algorithm?: HashAlgorithm) {
	return (input: ArrayBuffer | Uint8Array | string): Promise<string> => {
		// implementation
	}
}
```

#### Target Signature
```typescript
function hashHex(algorithm: Option<HashAlgorithm>) {
	return function hashWithAlgorithm(
		input: ArrayBuffer | Uint8Array | string
	): AsyncResult<HashError, string> {
		// implementation
	}
}
```

### Error Cases

#### Potential Error Conditions
1. **Invalid input**: null, undefined, or unsupported type
2. **Unsupported algorithm**: algorithm not in registry
3. **Encoding errors**: string to bytes conversion fails
4. **Internal algorithm errors**: hash computation fails

Current implementation does not handle these explicitly (relies on Promise rejection). Migration should provide explicit error types.

### Hash Output Format

#### Lowercase Hexadecimal
- Output is always lowercase hex string
- SHA-256 produces 64-character hex string (256 bits / 4 bits per hex char)
- No delimiter or prefix (raw hex)
- Example: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" (empty string SHA-256)

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Algorithm Dependencies
- **sha256HexInternal** → bytesToHex, toUint8Array, constants
- Future algorithms will follow same pattern

### Type Dependencies
- **HashAlgorithm** type from `src/vanilla/hash/hashHex/types/`
- Currently only "sha256" literal type
- Should expand as more algorithms added

### Utility Dependencies
- **bytesToHex**: Converts hash bytes to hex string representation
- **toUint8Array**: Normalizes input to Uint8Array for processing

### Validation Dependencies
- Should validate input is not null/undefined
- Should validate algorithm is supported (exists in registry)
- Should validate string input is valid UTF-8 or specified encoding

---

## Notes

### Missing Hash Algorithms

Consider implementing these during migration:
- **SHA-512**: Stronger variant of SHA-2 family
- **SHA-384**: Truncated SHA-512
- **SHA-1**: Legacy algorithm (not recommended for security)
- **MD5**: Legacy algorithm (not recommended for security)
- **BLAKE2b**: Modern fast hash
- **BLAKE3**: Latest BLAKE variant
- **RIPEMD-160**: Used in Bitcoin
- **Keccak/SHA-3**: NIST standard

### Hash Output Variants

Consider additional output formats:
- **hashBase64**: Base64-encoded hash output
- **hashBytes**: Raw Uint8Array output
- **hashBase58**: Base58-encoded (blockchain applications)
- **hashHexUpper**: Uppercase hex variant

### HMAC Support

Consider implementing HMAC (keyed hash) variants:
- **hmacSha256**: HMAC with SHA-256
- **hmacSha512**: HMAC with SHA-512

### Web Crypto API

Current implementation appears to use custom SHA-256. Consider:
- Using Web Crypto API where available (`crypto.subtle.digest`)
- Fallback to custom implementation for environments without Web Crypto
- Performance comparison between implementations

### Testing Considerations

When migrating, ensure comprehensive tests for:
- Empty string input
- Short string inputs
- Long string inputs
- Binary data (ArrayBuffer, Uint8Array)
- Unicode strings (multi-byte characters)
- Invalid inputs (null, undefined, wrong types)
- Unsupported algorithms
- Known test vectors for SHA-256 (NIST test vectors)
- Consistency across input types (same content, different format)
- Performance benchmarks

### Security Considerations

Hash functions have cryptographic uses. Ensure:
- Constant-time implementations where possible (timing attack resistance)
- Proper handling of sensitive data (no logging of inputs/outputs)
- Clear documentation of security properties
- Warnings about deprecated algorithms (MD5, SHA-1)
- Guidance on appropriate use cases (checksums vs. passwords vs. signatures)

### Algorithm Registry Design

Current registry is simple Record type. Consider:
- Type-safe registry with branded algorithm types
- Runtime validation of algorithm implementations
- Plugin architecture for external algorithms
- Lazy loading of algorithm implementations
- Tree-shaking optimization for unused algorithms

---

## Error Type Design

### Recommended HashError Type

```typescript
type HashError =
	| { _tag: "InvalidInput"; message: string; input: unknown }
	| { _tag: "UnsupportedAlgorithm"; algorithm: string }
	| { _tag: "EncodingError"; message: string; cause: Error }
	| { _tag: "HashComputationError"; message: string; cause: Error }
```

This provides discriminated union for precise error handling in consuming code.
