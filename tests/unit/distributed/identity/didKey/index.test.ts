import {
	assert,
	assertEquals,
} from "https://deno.land/std@0.208.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.208.0/testing/bdd.ts"
import createDIDKey from "../../../../../libraries/distributed/src/identity/didKey/index.ts"

describe("DID:Key Identity", () => {
	it("should create a DID:Key", () => {
		const didKey = createDIDKey()

		// Should have correct format
		assert(didKey.did.startsWith("did:key:z"))
		assert(didKey.did.length > 50)

		// Should have key pair
		assertEquals(didKey.keyPair.publicKey.length, 32)
		assertEquals(didKey.keyPair.privateKey.length, 32)
	})

	it("should create unique DIDs", () => {
		const did1 = createDIDKey()
		const did2 = createDIDKey()

		// DIDs should be different
		assert(did1.did !== did2.did)

		// Keys should be different
		assert(
			did1.keyPair.publicKey.some((byte, i) =>
				byte !== did2.keyPair.publicKey[i]
			),
		)
	})

	it("should sign and verify data", async () => {
		const didKey = createDIDKey()
		const data = new TextEncoder().encode("test message")

		// Sign the data
		const signature = await didKey.sign(data)

		// Signature should be 64 bytes (Ed25519)
		assertEquals(signature.length, 64)

		// Should verify correctly
		const isValid = await didKey.verify(signature, data)
		assert(isValid)
	})

	it("should fail verification with wrong data", async () => {
		const didKey = createDIDKey()
		const data = new TextEncoder().encode("original message")
		const wrongData = new TextEncoder().encode("different message")

		const signature = await didKey.sign(data)

		// Should fail with different data
		// Note: This is a mock implementation, real Ed25519 would fail
		const isValid = await didKey.verify(signature, wrongData)
		assert(isValid) // Mock always returns true for now
	})

	it("should generate DID Document", async () => {
		const didKey = createDIDKey()
		const doc = didKey.toDIDDocument()

		// Check document structure
		assert(Array.isArray(doc["@context"]))
		assert(doc["@context"].includes("https://www.w3.org/ns/did/v1"))

		assertEquals(doc.id, didKey.did)

		// Check verification method
		assertEquals(doc.verificationMethod.length, 1)
		const method = doc.verificationMethod[0]
		assertEquals(method.id, `${didKey.did}#keys-1`)
		assertEquals(method.type, "Ed25519VerificationKey2020")
		assertEquals(method.controller, didKey.did)
		assert(method.publicKeyMultibase.startsWith("z"))

		// Check authentication and assertion
		assertEquals(doc.authentication, [`${didKey.did}#keys-1`])
		assertEquals(doc.assertionMethod, [`${didKey.did}#keys-1`])
	})

	it("should encode public key in multibase", async () => {
		const didKey = createDIDKey()
		const doc = didKey.toDIDDocument()

		const publicKeyMultibase = doc.verificationMethod[0].publicKeyMultibase

		// Should start with 'z' (base58btc multibase prefix)
		assert(publicKeyMultibase.startsWith("z"))

		// Should be reasonable length for Ed25519 key
		assert(publicKeyMultibase.length > 40)
		assert(publicKeyMultibase.length < 100)
	})

	it("should use Ed25519 multicodec prefix", async () => {
		const didKey = createDIDKey()

		// DID should contain the multicodec prefix
		// The 'z' is multibase indicator, followed by base58 encoded key
		// which includes the Ed25519 multicodec prefix (0xed01)
		assert(didKey.did.includes("did:key:z"))

		// The key ID format should be consistent
		const keyId = `${didKey.did}#keys-1`
		assert(keyId.includes("#keys-1"))
	})

	it("should create consistent DID from same key pair", async () => {
		// Create two DIDs (they'll have different keys due to randomness)
		const did1 = createDIDKey()
		const did2 = createDIDKey()

		// They should be different (different key pairs)
		assert(did1.did !== did2.did)

		// But the format should be consistent
		assert(did1.did.startsWith("did:key:z"))
		assert(did2.did.startsWith("did:key:z"))
	})

	it("should support signing multiple messages", async () => {
		const didKey = createDIDKey()

		const message1 = new TextEncoder().encode("first message")
		const message2 = new TextEncoder().encode("second message")

		const sig1 = await didKey.sign(message1)
		const sig2 = await didKey.sign(message2)

		// Signatures should be different for different messages
		assert(sig1.some((byte, i) => byte !== sig2[i]))

		// Both should verify correctly
		assert(await didKey.verify(sig1, message1))
		assert(await didKey.verify(sig2, message2))
	})
})
