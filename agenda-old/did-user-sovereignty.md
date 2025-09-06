# DID Integration for User Sovereignty in Sitebender

## Vision: Identity Without Intermediaries

Users should own their identity, not rent it from us. DIDs (Decentralized Identifiers) enable true user sovereignty while maintaining Sitebender's progressive enhancement philosophy.

## Why DIDs Matter

### Traditional Identity Problems

- **Platform lock-in**: Can't move your GitHub stars to GitLab
- **Account termination**: Lose access, lose everything
- **Password fatigue**: Different credentials everywhere
- **Data silos**: Your data trapped in walled gardens

### DID Solutions

- **Portable**: Same identity across all services
- **Self-sovereign**: You control the keys
- **Interoperable**: W3C standard, works everywhere
- **Privacy-preserving**: Selective disclosure of attributes

## DID Methods for Sitebender

### 1. DID:Key (Recommended Start)

**Perfect for progressive enhancement: no blockchain, no network, just cryptography**

```typescript
// libraries/distributed/src/identity/did-key/index.ts
import { generateKeyPair } from "@sitebender/toolkit/crypto/ed25519/index.ts"
import { encodeBase58 } from "@sitebender/toolkit/encoding/base58/index.ts"

export default function createDIDKey(): DIDKey {
	const keyPair = generateKeyPair()
	const publicKeyBytes = keyPair.publicKey

	// Multicodec prefix for Ed25519 public key
	const multicodec = new Uint8Array([0xed, 0x01])
	const multikey = new Uint8Array(multicodec.length + publicKeyBytes.length)
	multikey.set(multicodec)
	multikey.set(publicKeyBytes, multicodec.length)

	const did = `did:key:z${encodeBase58(multikey)}`

	return {
		did,
		keyPair,

		async sign(data: Uint8Array): Promise<Uint8Array> {
			return sign(keyPair.privateKey, data)
		},

		async verify(
			signature: Uint8Array,
			data: Uint8Array,
		): Promise<boolean> {
			return verify(keyPair.publicKey, signature, data)
		},

		toDIDDocument(): DIDDocument {
			return {
				"@context": ["https://www.w3.org/ns/did/v1"],
				id: did,
				verificationMethod: [{
					id: `${did}#keys-1`,
					type: "Ed25519VerificationKey2020",
					controller: did,
					publicKeyMultibase: `z${encodeBase58(multikey)}`,
				}],
				authentication: [`${did}#keys-1`],
				assertionMethod: [`${did}#keys-1`],
			}
		},
	}
}
```

**Advantages:**

- Works completely offline
- No external dependencies
- Self-certifying (public key IS the identifier)
- Instant creation, no fees

**Use Cases:**

- Temporary identities
- Testing and development
- Offline-first applications
- Privacy-focused users

### 2. DID:Web (For Organizations)

**Maps DIDs to existing web infrastructure**

```typescript
// libraries/distributed/src/identity/did-web/index.ts
export default function createDIDWeb(domain: string, path?: string): DIDWeb {
	const did = path
		? `did:web:${domain}:${path.replace(/\//g, ":")}`
		: `did:web:${domain}`

	return {
		did,

		async resolve(): Promise<DIDDocument> {
			const url = path
				? `https://${domain}/${path}/did.json`
				: `https://${domain}/.well-known/did.json`

			const response = await fetch(url)
			if (!response.ok) throw new Error(`Failed to resolve ${did}`)

			return response.json()
		},

		async publish(document: DIDDocument): Promise<void> {
			// Server-side: Save to .well-known/did.json
			// This would be handled by your server
			await fetch("/api/did/publish", {
				method: "POST",
				body: JSON.stringify(document),
			})
		},
	}
}
```

**Advantages:**

- Leverages existing DNS/HTTPS infrastructure
- Easy to understand and implement
- Good for organizations and verified entities

**Use Cases:**

- Company identities
- Verified creators
- Integration with existing systems

### 3. DID:PKH (Blockchain Accounts)

**For users with existing blockchain identities**

```typescript
// libraries/distributed/src/identity/did-pkh/index.ts
export default function createDIDPKH(
	blockchain: string,
	network: string,
	address: string,
): DIDPKH {
	const did = `did:pkh:${blockchain}:${network}:${address}`

	return {
		did,

		async signWithWallet(message: string): Promise<string> {
			// Request signature from wallet (MetaMask, etc.)
			if (!window.ethereum) throw new Error("No wallet found")

			const signature = await window.ethereum.request({
				method: "personal_sign",
				params: [message, address],
			})

			return signature
		},

		async verify(message: string, signature: string): Promise<boolean> {
			// Verify signature matches address
			const recoveredAddress = recoverAddress(message, signature)
			return recoveredAddress.toLowerCase() === address.toLowerCase()
		},
	}
}
```

**Advantages:**

- Reuses existing blockchain accounts
- No additional key management
- Built-in economic security

**Use Cases:**

- Web3 native users
- Token-gated features
- DAO participation

## Progressive Enhancement Strategy

### Level 0: Traditional Authentication

```typescript
// Works everywhere, no DIDs required
export default function traditionalAuth(
	email: string,
	password: string,
): Promise<Session> {
	return fetch("/api/auth/login", {
		method: "POST",
		body: JSON.stringify({ email, password }),
	}).then((r) => r.json())
}
```

### Level 1: WebAuthn Enhancement

```typescript
// Better UX, still centralized
export default function webAuthnAuth(): Promise<Session> {
	const credential = await navigator.credentials.create({
		publicKey: {
			challenge: randomChallenge(),
			rp: { name: "Sitebender" },
			user: {
				id: userId,
				name: userEmail,
				displayName: userName,
			},
			pubKeyCredParams: [{ alg: -7, type: "public-key" }],
		},
	})

	return verifyCredential(credential)
}
```

### Level 2: DID Enhancement

```typescript
// Full sovereignty, optional
export default function didAuth(did: string): Promise<Session> {
	// Create challenge
	const challenge = await getChallenge()

	// Sign with DID
	const signature = await didKey.sign(challenge)

	// Verify and create session
	return fetch("/api/auth/did", {
		method: "POST",
		body: JSON.stringify({ did, challenge, signature }),
	}).then((r) => r.json())
}
```

### Level 3: Hybrid Approach

```typescript
// Best of all worlds
export default function hybridAuth(
	method: AuthMethod,
	credentials: Credentials,
): Promise<Session> {
	switch (method) {
		case "email":
			return traditionalAuth(credentials.email, credentials.password)

		case "webauthn":
			return webAuthnAuth()

		case "did":
			return didAuth(credentials.did)

		case "wallet":
			return walletAuth(credentials.address)

		default:
			// Progressive enhancement: fallback to email
			return traditionalAuth(credentials.email, credentials.password)
	}
}
```

## Verifiable Credentials Integration

### Issuing Credentials

```typescript
// libraries/distributed/src/identity/vc/issuer/index.ts
export default function createCredentialIssuer(
	issuerDID: DIDKey,
): CredentialIssuer {
	return {
		async issue(
			subjectDID: string,
			claims: Claims,
		): Promise<VerifiableCredential> {
			const credential = {
				"@context": [
					"https://www.w3.org/2018/credentials/v1",
				],
				type: ["VerifiableCredential", claims.type],
				issuer: issuerDID.did,
				issuanceDate: new Date().toISOString(),
				credentialSubject: {
					id: subjectDID,
					...claims.data,
				},
			}

			const proof = await createProof(credential, issuerDID)

			return { ...credential, proof }
		},
	}
}
```

### Verifying Credentials

```typescript
// libraries/distributed/src/identity/vc/verifier/index.ts
export default function createCredentialVerifier(): CredentialVerifier {
	return {
		async verify(
			credential: VerifiableCredential,
		): Promise<VerificationResult> {
			// Check signature
			const signatureValid = await verifyProof(credential)

			// Check expiration
			const notExpired = !credential.expirationDate ||
				new Date(credential.expirationDate) > new Date()

			// Check revocation
			const notRevoked = await checkRevocation(credential)

			return {
				valid: signatureValid && notExpired && notRevoked,
				checks: {
					signature: signatureValid,
					expiration: notExpired,
					revocation: notRevoked,
				},
			}
		},
	}
}
```

### Selective Disclosure

```typescript
// Only reveal what's necessary
export default function createSelectiveDisclosure(
	credential: VerifiableCredential,
): SelectiveDisclosure {
	return {
		reveal(fields: Array<string>): PartialCredential {
			const disclosed = {
				"@context": credential["@context"],
				type: credential.type,
				issuer: credential.issuer,
				credentialSubject: {
					id: credential.credentialSubject.id,
				},
			}

			// Only include requested fields
			for (const field of fields) {
				if (credential.credentialSubject[field]) {
					disclosed.credentialSubject[field] =
						credential.credentialSubject[field]
				}
			}

			// Create proof of selective disclosure
			disclosed.proof = createDisclosureProof(credential, fields)

			return disclosed
		},
	}
}
```

## Key Management

### Secure Storage

```typescript
// libraries/distributed/src/identity/keystore/index.ts
export default function createKeyStore(): KeyStore {
	return {
		async store(did: string, keyPair: KeyPair): Promise<void> {
			// Encrypt private key with user's password
			const encrypted = await encryptKey(keyPair.privateKey)

			// Store in IndexedDB
			await storage.set(`key:${did}`, {
				publicKey: keyPair.publicKey,
				encryptedPrivateKey: encrypted,
			})
		},

		async retrieve(did: string, password: string): Promise<KeyPair> {
			const stored = await storage.get(`key:${did}`)
			if (!stored) throw new Error("Key not found")

			const privateKey = await decryptKey(
				stored.encryptedPrivateKey,
				password,
			)

			return {
				publicKey: stored.publicKey,
				privateKey,
			}
		},

		async rotate(did: string): Promise<DIDKey> {
			// Generate new key pair
			const newDID = createDIDKey()

			// Create rotation proof
			const proof = await createRotationProof(did, newDID.did)

			// Publish rotation event
			await publishRotation(proof)

			return newDID
		},
	}
}
```

### Recovery Mechanisms

```typescript
// Social recovery using Shamir's Secret Sharing
export default function createSocialRecovery(
	threshold: number,
	guardians: Array<string>,
): SocialRecovery {
	return {
		async createShares(secret: Uint8Array): Promise<Array<Share>> {
			const shares = splitSecret(secret, guardians.length, threshold)

			return shares.map((share, i) => ({
				guardian: guardians[i],
				share: share,
				index: i,
			}))
		},

		async recoverSecret(shares: Array<Share>): Promise<Uint8Array> {
			if (shares.length < threshold) {
				throw new Error(`Need ${threshold} shares`)
			}

			return combineShares(shares)
		},
	}
}
```

## Privacy Considerations

### Zero-Knowledge Proofs

```typescript
// Prove attributes without revealing values
export default function createZKProof(
	credential: VerifiableCredential,
): ZKProof {
	return {
		proveAge(minAge: number): Proof {
			// Prove age > minAge without revealing actual age
			const birthDate = credential.credentialSubject.birthDate
			const age = calculateAge(birthDate)

			return createRangeProof(age, minAge, Infinity)
		},

		proveMembership(group: string): Proof {
			// Prove membership without revealing identity
			const groups = credential.credentialSubject.groups || []

			return createMembershipProof(groups, group)
		},
	}
}
```

## Testing Strategy

### Unit Tests

```typescript
// tests/unit/identity/did-key/index.test.ts
Deno.test("DID:Key creation and verification", async () => {
	const did = createDIDKey()

	// Verify DID format
	assert(did.did.startsWith("did:key:z"))

	// Sign and verify
	const message = new TextEncoder().encode("test")
	const signature = await did.sign(message)
	const valid = await did.verify(signature, message)

	assert(valid)
})
```

### Integration Tests

```typescript
// tests/integration/identity/auth-flow/index.test.ts
Deno.test("Complete authentication flow", async () => {
	// Create DID
	const did = createDIDKey()

	// Store securely
	await keyStore.store(did.did, did.keyPair)

	// Authenticate
	const session = await didAuth(did.did)

	assert(session.authenticated)
	assertEquals(session.did, did.did)
})
```

### E2E Tests

```typescript
// tests/e2e/identity/progressive-auth/index.test.ts
test("Progressive authentication enhancement", async ({ page }) => {
	await page.goto("/login")

	// Level 0: Email works
	await page.fill("#email", "user@example.com")
	await page.fill("#password", "password")
	await page.click("#login-email")
	await expect(page).toHaveURL("/dashboard")

	await page.goto("/logout")

	// Level 1: WebAuthn works
	await page.click("#login-webauthn")
	// Mock WebAuthn ceremony
	await expect(page).toHaveURL("/dashboard")

	await page.goto("/logout")

	// Level 2: DID works
	await page.click("#login-did")
	await page.fill("#did", "did:key:z6Mk...")
	// Mock DID auth
	await expect(page).toHaveURL("/dashboard")
})
```

## Implementation Roadmap

### Phase 1: Foundation (Week 1)

- [ ] DID:Key implementation
- [ ] Basic key storage
- [ ] Signature creation/verification

### Phase 2: Authentication (Week 2)

- [ ] DID auth endpoint
- [ ] Session management
- [ ] Progressive enhancement

### Phase 3: Credentials (Week 3)

- [ ] VC issuance
- [ ] VC verification
- [ ] Selective disclosure

### Phase 4: Advanced (Week 4)

- [ ] Social recovery
- [ ] Key rotation
- [ ] Zero-knowledge proofs

## Conclusion

DIDs give users true ownership of their identity. By implementing them as a progressive enhancement, we maintain Sitebender's philosophy while enabling revolutionary user sovereignty.

Remember: **Identity is not authentication**. DIDs identify, credentials authenticate, and proofs authorize.

---

_"Your keys, your identity, your data, your choice."_
