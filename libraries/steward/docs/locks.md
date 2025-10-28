# Lock System: Authentication & Authorization

> 🟢 **CANONICAL SYNTAX** - Finalized 2025-10-02

**Status**: Production-ready, stable API\
**See Also**: [Syntax Status](../../../docs/syntax-status.md) for all canonical vs proposed syntax

---

## Philosophy

**Locks are doors. Keys open them.**

The Sitebender lock system uses an intuitive metaphor:

- **Locked content** requires keys to access
- **Keys** represent roles or permissions
- **Locks accept multiple keys** (like a building with master keys)
- **Auth is automatic** - if it's locked, authentication is required

**No separate Auth component needed.** If something is locked, auth is obviously required.

---

## Core Components

### `<Locked>`

Wraps routes or content that require authentication and specific keys.

**Children**:

- One or more `<Key>` components (wrapped in `<And>`/`<Or>` for multiple keys)
- Routes or content to protect

**Behavior**:

- Triggers authentication flow if user not authenticated
- Checks user's keys against lock requirements
- Nested locks accumulate requirements (AND behavior)

### `<Key>`

Specifies a required role or permission.

**Children**: Key name from KEYS constant

**Example**:

```tsx
<Key>{KEYS.admin}</Key>
```

### `<And>`

Logical AND - user must have ALL keys.

**Children**: Multiple `<Key>` components

**Example**:

```tsx
<And>
	<Key>{KEYS.admin}</Key>
	<Key>{KEYS.accounting}</Key>
</And>
```

### `<Or>`

Logical OR - user must have ANY key.

**Children**: Multiple `<Key>` components

**Example**:

```tsx
<Or>
	<Key>{KEYS.admin}</Key>
	<Key>{KEYS.editor}</Key>
</Or>
```

### `<Not>` (Future)

Logical NOT - user must NOT have the key.

**Status**: Reserved for future use if needed.

**Example** (when implemented):

```tsx
<Not>
	<Key>{KEYS.banned}</Key>
</Not>
```

---

## KEYS Constant

Keys are defined centrally in `.sitebender/auth/keys.ts`:

```typescript
// .sitebender/auth/keys.ts
export const KEYS = {
	user: "USER",
	admin: "ADMIN",
	accounting: "ACCOUNTING",
	editor: "EDITOR",
	verified: "VERIFIED",
	superuser: "SUPERUSER",
} as const
```

**Type Safety**:

```typescript
type KeyName = (typeof KEYS)[keyof typeof KEYS]
// "USER" | "ADMIN" | "ACCOUNTING" | ...
```

**Usage in Modules**:

```tsx
import { KEYS } from "../../.sitebender/auth/keys"

<Locked>
	<Key>{KEYS.admin}</Key>
	<Route path="/admin" page={<Admin />} />
</Locked>
```

**Integration with Steward**:

Steward can read the KEYS constant to generate:

- Role ontology (OWL2)
- Role constraints (SHACL)
- Auth provider configurations
- Permission mappings

Example Steward prompt:

> "Create role ontology for all keys defined in `.sitebender/auth/keys.ts`"

Steward generates (Turtle/RDF):

```turtle
@prefix auth: <https://sitebender.io/auth#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

auth:Role a owl:Class ;
  rdfs:label "User Role" ;
  rdfs:comment "Represents a user role/permission in the system" .

auth:USER a auth:Role ;
  rdfs:label "User" ;
  rdfs:comment "Basic authenticated user" .

auth:ADMIN a auth:Role ;
  rdfs:label "Administrator" ;
  rdfs:comment "System administrator with full access" .

auth:ACCOUNTING a auth:Role ;
  rdfs:label "Accounting" ;
  rdfs:comment "Access to financial data and reports" .

auth:EDITOR a auth:Role ;
  rdfs:label "Editor" ;
  rdfs:comment "Content creation and editing permissions" .

auth:VERIFIED a auth:Role ;
  rdfs:label "Verified User" ;
  rdfs:comment "User with verified identity" .

auth:SUPERUSER a auth:Role ;
  rdfs:label "Superuser" ;
  rdfs:comment "Elevated administrator privileges" .
```

---

## Usage Examples

### Simple Lock (Single Key)

```tsx
<Locked>
	<Key>{KEYS.admin}</Key>
	<Route path="/admin" page={<Admin />} />
</Locked>
```

**Meaning**: User must have ADMIN key to access `/admin`.

---

### OR Logic (Any Key Works)

```tsx
<Locked>
	<Or>
		<Key>{KEYS.admin}</Key>
		<Key>{KEYS.editor}</Key>
	</Or>
	<Route path="/edit" page={<Editor />} />
</Locked>
```

**Meaning**: User must have ADMIN **or** EDITOR key to access `/edit`.

---

### AND Logic (All Keys Required)

```tsx
<Locked>
	<And>
		<Key>{KEYS.admin}</Key>
		<Key>{KEYS.accounting}</Key>
	</And>
	<Route path="/financials" page={<Financials />} />
</Locked>
```

**Meaning**: User must have **both** ADMIN **and** ACCOUNTING keys to access `/financials`.

---

### Complex Nested Logic

```tsx
<Locked>
	<Or>
		<Key>{KEYS.admin}</Key>
		<And>
			<Key>{KEYS.editor}</Key>
			<Key>{KEYS.verified}</Key>
		</And>
	</Or>
	<Route path="/publish" page={<Publish />} />
</Locked>
```

**Meaning**: User must have ADMIN **or** (EDITOR **and** VERIFIED) to access `/publish`.

**Logical Expression**: `ADMIN ∨ (EDITOR ∧ VERIFIED)`

---

### Nested Locks (Accumulation)

```tsx
<Locked>
	<Key>{KEYS.user}</Key>
	<Route path="/profile" page={<Profile />} />

	<Locked>
		<Key>{KEYS.admin}</Key>
		<Route path="/admin-profile" page={<AdminProfile />} />
	</Locked>
</Locked>
```

**Meaning**:

- `/profile` requires USER key
- `/admin-profile` requires **both** USER **and** ADMIN keys (locks accumulate)

**Rule**: Nested locks **add** requirements, they never reduce security.

---

## Default Behavior: Multiple Keys Without Wrapper

**Question**: What happens here?

```tsx
<Locked>
	<Key>{KEYS.admin}</Key>
	<Key>{KEYS.accounting}</Key>
	<Route path="/audit" page={<Audit />} />
</Locked>
```

**Answer**: Defaults to **AND** (most restrictive).

**Equivalent to**:

```tsx
<Locked>
	<And>
		<Key>{KEYS.admin}</Key>
		<Key>{KEYS.accounting}</Key>
	</And>
	<Route path="/audit" page={<Audit />} />
</Locked>
```

**Rationale**: Security-first. If you want OR, use `<Or>` explicitly.

---

## Role Hierarchy (Steward's Responsibility)

**Question**: If Admin includes User privileges, why require both keys?

**Answer**: Lock system doesn't know about role hierarchy. That's Steward's job.

### Lock System View

```tsx
<Locked>
	<Key>{KEYS.user}</Key>
	<Locked>
		<Key>{KEYS.admin}</Key>
		<Route path="/admin-settings" page={<AdminSettings />} />
	</Locked>
</Locked>
```

**Lock requirement**: USER **and** ADMIN keys

### Steward Role Definition

```typescript
// Steward defines role hierarchy
const roleHierarchy = {
	SUPERUSER: ["ADMIN", "EDITOR", "USER"],
	ADMIN: ["EDITOR", "USER"],
	EDITOR: ["USER"],
	USER: [],
}
```

**At authentication**:

- User has ADMIN role
- Steward grants: `["ADMIN", "USER"]` keys (via hierarchy)
- User passes lock requirement (has both keys)

**Separation of Concerns**:

- **Locks** check "does user have these keys?"
- **Steward** decides "which keys does this role grant?"

---

## Complete Module Example

```tsx
// modules/Blog/index.tsx
import { KEYS } from "../../.sitebender/auth/keys"

export default (
	<Module>
		{/* Public routes - no lock */}
		<Route path="/" page={<Index />} />
		<Route path="/:slug" page={<Post />} />

		{/* User-only routes */}
		<Locked>
			<Key>{KEYS.user}</Key>
			<Route path="/profile" page={<Profile />} />
			<Route path="/drafts" page={<Drafts />} />
		</Locked>

		{/* Editor OR Admin can create/edit */}
		<Locked>
			<Or>
				<Key>{KEYS.admin}</Key>
				<Key>{KEYS.editor}</Key>
			</Or>
			<Route path="/new" page={<NewPost />} />
			<Route path="/edit/:id" page={<EditPost />} />
		</Locked>

		{/* Admin AND Accounting see financials */}
		<Locked>
			<And>
				<Key>{KEYS.admin}</Key>
				<Key>{KEYS.accounting}</Key>
			</And>
			<Route path="/revenue" page={<Revenue />} />
		</Locked>

		{/* Admin only - settings */}
		<Locked>
			<Key>{KEYS.admin}</Key>
			<Route path="/settings" page={<Settings />} />

			{/* Nested lock - requires Admin AND Superuser */}
			<Locked>
				<Key>{KEYS.superuser}</Key>
				<Route path="/danger-zone" page={<DangerZone />} />
			</Locked>
		</Locked>
	</Module>
)
```

---

## Internal Representation (IR)

When JSX → IR compilation happens, locks become boolean expression trees:

### Source JSX

```tsx
<Locked>
	<Or>
		<Key>{KEYS.admin}</Key>
		<And>
			<Key>{KEYS.editor}</Key>
			<Key>{KEYS.verified}</Key>
		</And>
	</Or>
	<Route path="/publish" page={<Publish />} />
</Locked>
```

### IR (JSON)

```json
{
	"type": "locked",
	"condition": {
		"type": "or",
		"children": [
			{ "type": "key", "value": "ADMIN" },
			{
				"type": "and",
				"children": [
					{ "type": "key", "value": "EDITOR" },
					{ "type": "key", "value": "VERIFIED" }
				]
			}
		]
	},
	"routes": [
		{
			"path": "/publish",
			"page": "Publish"
		}
	]
}
```

### Evaluation (Runtime)

```typescript
function evaluateCondition(condition, userKeys: Set<string>): boolean {
	switch (condition.type) {
		case "key":
			return userKeys.has(condition.value)

		case "and":
			return condition.children.every((c) => evaluateCondition(c, userKeys))

		case "or":
			return condition.children.some((c) => evaluateCondition(c, userKeys))

		case "not":
			return !evaluateCondition(condition.children[0], userKeys)
	}
}
```

**Simple and efficient** - just tree traversal and set membership checks.

---

## Comparison with Traditional Auth

### Old Way (Auth + Authz Split)

```tsx
<Auth required>
	<Gate roles={["ADMIN", "ACCOUNTING"]}>
		<Route path="/financials" page={<Financials />} />
	</Gate>
</Auth>
```

**Problems**:

- Two components doing related things
- `<Auth required>` is redundant (when would it not be required inside Auth?)
- Unclear if roles are AND or OR
- No composition for complex logic

### Sitebender Way (Locks)

```tsx
<Locked>
	<And>
		<Key>{KEYS.admin}</Key>
		<Key>{KEYS.accounting}</Key>
	</And>
	<Route path="/financials" page={<Financials />} />
</Locked>
```

**Advantages**:

- Single concept (locks need keys)
- Explicit AND/OR logic
- Composable (nest `<And>`, `<Or>` arbitrarily)
- Auth is implied (it's locked!)

---

## Integration with Artificer Conditionals

`<And>`, `<Or>`, `<Not>` are **general-purpose** boolean components from Artificer.

They work in **multiple contexts**:

### 1. Validation (Artificer)

```tsx
<Validation>
	<And>
		<IsInteger>
			<From.Argument />
		</IsInteger>
		<IsGreaterThan value={0}>
			<From.Argument />
		</IsGreaterThan>
	</And>
</Validation>
```

### 2. Locks (Steward + Auth)

```tsx
<Locked>
	<And>
		<Key>{KEYS.admin}</Key>
		<Key>{KEYS.verified}</Key>
	</And>
	<Route path="/publish" page={<Publish />} />
</Locked>
```

### 3. Conditional Rendering (Future)

```tsx
<ShowIf>
	<Or>
		<IsDesktop />
		<IsTablet />
	</Or>
	<SidebarNavigation />
</ShowIf>
```

**Same primitives, different contexts.** The IR evaluation logic is reused.

---

## Security Considerations

### 1. Lock Accumulation (Nested Locks)

Nested locks **always add** requirements, never reduce them.

```tsx
<Locked>
  <Key>{KEYS.user}</Key>
  <Locked>
    <Key>{KEYS.admin}</Key>
    <!-- This requires BOTH user AND admin -->
  </Locked>
</Locked>
```

**Cannot weaken security by nesting**.

### 2. Default AND (Conservative)

Multiple unwrapped keys default to AND (most restrictive):

```tsx
<Locked>
  <Key>{KEYS.admin}</Key>
  <Key>{KEYS.accounting}</Key>
  <!-- Requires BOTH keys -->
</Locked>
```

**Security-first design**.

### 3. Client vs Server Enforcement

**Critical**: Locks must be enforced **server-side**.

- Client-side locks are **UI hints only** (show/hide routes)
- Server must **validate keys on every request**
- Never trust client-side auth state

**Best Practice**: Server generates locks during SSR, client respects them for UX.

### 4. Key Verification

Keys should be:

- **Short-lived** (expire via JWT/session timeout)
- **Cryptographically signed** (tamper-proof)
- **Revocable** (can be invalidated server-side)

**Steward integration** ensures keys come from verified authentication.

---

## Future Extensions

### 1. Time-Based Locks

```tsx
<Locked>
	<And>
		<Key>{KEYS.admin}</Key>
		<TimeWindow start="09:00" end="17:00" timezone="UTC" />
	</And>
	<Route path="/admin" page={<Admin />} />
</Locked>
```

**Meaning**: Admin access only during business hours.

### 2. Context-Based Locks

```tsx
<Locked>
	<And>
		<Key>{KEYS.editor}</Key>
		<IpWhitelist ranges={["10.0.0.0/8"]} />
	</And>
	<Route path="/edit" page={<Editor />} />
</Locked>
```

**Meaning**: Editors can only edit from internal network.

### 3. Multi-Factor Locks

```tsx
<Locked>
	<And>
		<Key>{KEYS.admin}</Key>
		<MfaRequired methods={["totp", "webauthn"]} />
	</And>
	<Route path="/danger-zone" page={<DangerZone />} />
</Locked>
```

**Meaning**: Admin key + recent MFA verification required.

---

## Testing Locks

### Unit Tests

```typescript
// tests/locks/evaluate.test.ts
import { assertEquals } from "@std/assert"
import evaluateCondition from "../src/evaluateCondition/index.ts"

Deno.test("Single key - user has it", () => {
	const condition = { type: "key", value: "ADMIN" }
	const userKeys = new Set(["ADMIN", "USER"])

	assertEquals(evaluateCondition(condition, userKeys), true)
})

Deno.test("Single key - user lacks it", () => {
	const condition = { type: "key", value: "ADMIN" }
	const userKeys = new Set(["USER"])

	assertEquals(evaluateCondition(condition, userKeys), false)
})

Deno.test("AND - user has both", () => {
	const condition = {
		type: "and",
		children: [
			{ type: "key", value: "ADMIN" },
			{ type: "key", value: "ACCOUNTING" },
		],
	}
	const userKeys = new Set(["ADMIN", "ACCOUNTING", "USER"])

	assertEquals(evaluateCondition(condition, userKeys), true)
})

Deno.test("AND - user lacks one", () => {
	const condition = {
		type: "and",
		children: [
			{ type: "key", value: "ADMIN" },
			{ type: "key", value: "ACCOUNTING" },
		],
	}
	const userKeys = new Set(["ADMIN", "USER"])

	assertEquals(evaluateCondition(condition, userKeys), false)
})

Deno.test("OR - user has one", () => {
	const condition = {
		type: "or",
		children: [
			{ type: "key", value: "ADMIN" },
			{ type: "key", value: "EDITOR" },
		],
	}
	const userKeys = new Set(["EDITOR", "USER"])

	assertEquals(evaluateCondition(condition, userKeys), true)
})

Deno.test("Complex nested - ADMIN or (EDITOR and VERIFIED)", () => {
	const condition = {
		type: "or",
		children: [
			{ type: "key", value: "ADMIN" },
			{
				type: "and",
				children: [
					{ type: "key", value: "EDITOR" },
					{ type: "key", value: "VERIFIED" },
				],
			},
		],
	}

	// User is verified editor
	assertEquals(
		evaluateCondition(condition, new Set(["EDITOR", "VERIFIED"])),
		true,
	)

	// User is unverified editor
	assertEquals(evaluateCondition(condition, new Set(["EDITOR"])), false)

	// User is admin
	assertEquals(evaluateCondition(condition, new Set(["ADMIN"])), true)
})
```

### Integration Tests

```typescript
// tests/locks/routing.test.ts
import { assertEquals } from "@std/assert"
import { render } from "../src/render/index.ts"

Deno.test("Locked route redirects unauthenticated user", async () => {
	const app = (
		<Locked>
			<Key>{KEYS.admin}</Key>
			<Route path="/admin" page={<Admin />} />
		</Locked>
	)

	const response = await render(app, {
		path: "/admin",
		userKeys: new Set(), // Not authenticated
	})

	assertEquals(response.status, 302)
	assertEquals(response.headers.get("Location"), "/login")
})

Deno.test("Locked route allows user with key", async () => {
	const app = (
		<Locked>
			<Key>{KEYS.admin}</Key>
			<Route path="/admin" page={<Admin />} />
		</Locked>
	)

	const response = await render(app, {
		path: "/admin",
		userKeys: new Set(["ADMIN", "USER"]),
	})

	assertEquals(response.status, 200)
})
```

---

## FAQ

### Q: Why `<Locked>` instead of `<Auth>` and `<Gate>`?

**A**: Simpler metaphor. Locks need keys. Authentication is implied.

### Q: Can I use `<Not>` to exclude banned users?

**A**: Future feature. For now, just don't grant the key to banned users.

### Q: What if I want role hierarchy (Admin includes User)?

**A**: Steward handles that. When user has ADMIN role, Steward grants `["ADMIN", "USER"]` keys via role hierarchy definition.

### Q: Can locks be used outside of routes?

**A**: Yes! Wrap any content:

```tsx
<Locked>
	<Key>{KEYS.admin}</Key>
	<AdminDashboard />
</Locked>
```

### Q: How do I know which keys a user has?

**A**: Steward provides authentication context. Access via:

```tsx
import { useAuth } from "@sitebender/steward/auth"

function MyComponent() {
	const { keys } = useAuth()
	// keys is Set<string>
}
```

### Q: Can I check keys in calculations (Artificer)?

**A**: Yes, via injector:

```tsx
<Calculation>
	<And>
		<From.Auth selector="keys" has="ADMIN" />
		<IsGreaterThan value={1000}>
			<From.Element selector="#amount" />
		</IsGreaterThan>
	</And>
</Calculation>
```

### Q: What about OAuth2, SAML, WebAuthn?

**A**: Steward handles auth providers. Locks only care about resulting keys.

---

## Related Documentation

- [Syntax Status](../../../docs/syntax-status.md) - All canonical vs proposed syntax
- [Artificer README](../../artificer/README.md) - `<And>`, `<Or>`, `<Not>` conditionals
- [Quartermaster Folder Hierarchy](../../quartermaster/docs/folder-hierarchy.md) - `auth/` folder structure
- [Steward README](../README.md) - Authentication provider integration

---

**Last Updated**: 2025-10-02\
**Status**: 🟢 CANONICAL - Production Ready
