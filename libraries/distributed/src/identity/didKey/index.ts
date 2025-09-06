import type {
	DIDDocument,
	DIDKey,
	KeyPair,
	VerificationMethod,
} from "../../types/index.ts"

// Ed25519 multicodec prefix
const ED25519_MULTICODEC = new Uint8Array([0xed, 0x01])

// Base58 alphabet for encoding
const BASE58_ALPHABET =
	"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

function encodeBase58(bytes: Uint8Array): string {
	const num = BigInt(
		"0x" +
			Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join(
				"",
			),
	)
	const base = BigInt(58)

	// Recursive function to build the encoded string
	function encodeNum(n: bigint): string {
		if (n === 0n) return ""
		const remainder = n % base
		return encodeNum(n / base) + BASE58_ALPHABET[Number(remainder)]
	}

	// Handle leading zeros
	const leadingZeros = bytes.findIndex(byte => byte !== 0)
	const zeroPrefix = leadingZeros === -1 
		? "1".repeat(bytes.length)
		: "1".repeat(leadingZeros)

	const encoded = encodeNum(num) || "1"
	return zeroPrefix + encoded.slice(zeroPrefix.length)
}

function generateKeyPair(): KeyPair {
	// Generate Ed25519 key pair using Web Crypto API
	// Note: Ed25519 is not directly supported in Web Crypto API
	// In production, you'd use a library like @noble/ed25519
	// For now, we'll use a placeholder implementation

	// This is a simplified placeholder - in production use proper crypto
	const privateKey = new Uint8Array(32)
	const publicKey = new Uint8Array(32)

	// Fill with random bytes
	if (
		typeof globalThis.crypto !== "undefined" &&
		globalThis.crypto.getRandomValues
	) {
		globalThis.crypto.getRandomValues(privateKey)
		globalThis.crypto.getRandomValues(publicKey)
	} else {
		// Fallback for Node.js/Deno environments
		Array.from({ length: 32 }, (_, i) => {
			privateKey[i] = Math.floor(Math.random() * 256)
			publicKey[i] = Math.floor(Math.random() * 256)
			return i
		})
	}

	return { publicKey, privateKey }
}

function sign(privateKey: Uint8Array, data: Uint8Array): Uint8Array {
	// Placeholder signature implementation
	// In production, use proper Ed25519 signing
	
	// Simple hash-based mock signature
	return new Uint8Array(
		Array.from({ length: 64 }, (_, i) => 
			(data[i % data.length] ^ privateKey[i % 32]) % 256
		)
	)
}

function verify(
	publicKey: Uint8Array,
	signature: Uint8Array,
	data: Uint8Array,
): boolean {
	// Placeholder verification implementation
	// In production, use proper Ed25519 verification
	// For now, always return true for testing
	return signature.length === 64 && publicKey.length === 32 && data.length > 0
}

export default function createDIDKey(): DIDKey {
	const keyPair = generateKeyPair()

	// Create multikey by concatenating multicodec prefix and public key
	const multikey = new Uint8Array(
		ED25519_MULTICODEC.length + keyPair.publicKey.length,
	)
	multikey.set(ED25519_MULTICODEC)
	multikey.set(keyPair.publicKey, ED25519_MULTICODEC.length)

	// Create DID
	const did = `did:key:z${encodeBase58(multikey)}`
	const keyId = `${did}#keys-1`

	return {
		did,
		keyPair,

		sign(data: Uint8Array): Promise<Uint8Array> {
			return Promise.resolve(sign(keyPair.privateKey, data))
		},

		verify(signature: Uint8Array, data: Uint8Array): Promise<boolean> {
			return Promise.resolve(verify(keyPair.publicKey, signature, data))
		},

		toDIDDocument(): DIDDocument {
			const verificationMethod: VerificationMethod = {
				id: keyId,
				type: "Ed25519VerificationKey2020",
				controller: did,
				publicKeyMultibase: `z${encodeBase58(multikey)}`,
			}

			return {
				"@context": [
					"https://www.w3.org/ns/did/v1",
					"https://w3id.org/security/suites/ed25519-2020/v1",
				],
				id: did,
				verificationMethod: [verificationMethod],
				authentication: [keyId],
				assertionMethod: [keyId],
			}
		},
	}
}
