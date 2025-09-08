# @sitebender/mesh

[![CI](https://github.com/site-bender/sitebender/actions/workflows/ci.yml/badge.svg?branch=phase-2)](https://github.com/site-bender/sitebender/actions/workflows/ci.yml)

![Header](./github-sitebender-banner.png)

A functional, offline-first mesh networking library for the Sitebender ecosystem. Implements CRDTs, decentralized identity (DIDs), IPFS integration, and peer-to-peer synchronization with progressive enhancement principles.

## Philosophy

Web 3.0 isn't about blockchains and tokens. It's about **user sovereignty**, **data ownership**, and **resilient systems** that work offline-first and sync globally. Every feature works without Web3 technology, then gets better with it.

## Core Values

- Accessibility
- Inclusivity
- Transparency
- Collaboration
- Community
- Empowerment
- Security
- Usability
- Universal design
- Performance
- Privacy
- Data protection
- Offline access

## Features

### ✅ Implemented

- **CRDTs**: LWW-Register, OR-Set, G-Set, Counter, RGA
- **Storage**: IndexedDB adapter with versioning
- **Identity**: DID:Key with Ed25519 signatures
- **IPFS**: Gateway adapter with automatic fallbacks
- **Sync**: State-based, operation-based, and delta-based protocols

## Quick Start

```bash
# Clone and install
git clone https://github.com/site-bender/mesh.git
cd mesh

# Run tests
deno task test

# Type check
deno task typecheck
```

## Usage Examples

### CRDTs

```typescript
import { createLWWRegister, createORSet } from "@sitebender/mesh"

// Last-write-wins register
const register = createLWWRegister("initial", "node1")
const updated = register.set("new value")

// OR-Set for collections
const set = createORSet([], "node1")
	.add("item1")
	.add("item2")
```

### Decentralized Identity

```typescript
import { createDIDKey } from "@sitebender/mesh"

const didKey = await createDIDKey()
const signature = await didKey.sign(data)
const isValid = await didKey.verify(signature, data)
```

## Contributing

- Local fast loop:
  - Lint: `deno task lint`
  - Tests (non-strict): `deno task test:engine`, `deno task test:components`, `deno task test:toolkit`
- Pre-push / CI parity (strict):
  - Type-check: `deno task type-check`
  - Alias guard: `deno task lint:aliases`
  - Tests (strict): `deno task test:engine:strict`, `deno task test:components:strict`, `deno task test:toolkit:strict`

CI runs strict tasks and will block on lint, type-check, alias guard, and strict tests. Use fast tasks for quick local iteration, then verify with strict before PRs.

## Prime Command: Clean-as-you-go

- Fix small issues immediately while you’re in the file.
- Keep changes small; re-run fmt/lint/type-check and relevant strict tests after each meaningful edit.
- If a fix is too big for now, leave a visible note and make it the next task—don’t let it drift.
- Hold the line: no net-new errors, keep tests green.

## Authoring canon: Events and Actions

- Events: prefer `When.*` (aliases map to `On.*`).
  - `When.Clicked` ≡ `On.Click`
  - `When.Submitted` ≡ `On.Submit`
  - `When.ValueUpdated` ≡ `On.Input`
  - `When.ChangeComplete` ≡ `On.Change`
  - `When.GainedFocus` ≡ `On.Focus` (alias: `When.Focused`)
  - `When.LostFocus` ≡ `On.Blur` (alias: `When.Blurred`)
- Actions: author as bare verbs (no `Do.*` in docs/examples).

## Auth: policies and From.Authenticator

- Policies are registered under simple tags (e.g., `IsAuthenticated`, `HasRole`) and can be used via `When.Authorized`.
- Use `From.Authenticator` to inject values from the current auth context (e.g., `user`, `roles`, `claims`).

Example (authoring):

```tsx
import Authorized from "./libraries/components/src/transform/control/When/Authorized/index.tsx"
import On from "./libraries/components/src/transform/control/On/index.tsx"
import SetValue from "./libraries/components/src/transform/actions/SetValue/index.tsx"
import FromAuthenticator from "./libraries/components/src/constructors/injectors/From/Authenticator/index.tsx" // Render admin-only message on click
;[
	<div id="msg" />,
	On({
		event: "Click",
		children: Authorized({
			policyTag: "HasRole",
			policyArgs: { role: "admin" },
			children: SetValue({
				selector: "#msg",
				value: FromAuthenticator({
					path: "user.email",
				}) as unknown as JSX.Element,
			}) as unknown as JSX.Element,
			fallback: SetValue(
				{ selector: "#msg", value: { value: "Forbidden" } } as any,
			) as any,
		}) as unknown as JSX.Element,
	}) as unknown as JSX.Element,
]
```

- The compiler lowers `FromAuthentication({ path: "user.email" })` to an IR injector with `injector: "From.Authenticator"` and `args: { path: "user.email" }`.
- At runtime, `From.Authenticator` reads from `ComposeContext.localValues` by the provided dot-path. For example, with:

```ts
createComposeContext({
	env: "server",
	localValues: { user: { email: "a@b.com", roles: ["admin"] } },
})
```

the example above sets `#msg` to the user’s email when the policy passes, or to "Forbidden" otherwise.

```
## Thinking index

- [auth.md](notes/auth.md)
- [brainstorming.md](notes/brainstorming.md)
- [charter.md](notes/charter.md)
- [claude.md](notes/claude.md)
- [dependency_injection.md](notes/dependency_injection.md)
- [documenation.md](notes/documenation.md)
- [local.md](notes/local.md)
- [maths.md](notes/maths.md)
- [naming.md](notes/naming.md)
- [next_session_prompt.md](notes/next_session_prompt.md)
- [plan_of_attack.md](notes/plan_of_attack.md)
- [prompt.md](notes/prompt.md)
- [testing.md](notes/testing.md)
- [todo.md](notes/todo.md)
- [viz.md](notes/viz.md)
```
