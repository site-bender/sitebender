# @sitebender

[![CI](https://github.com/site-bender/sitebender/actions/workflows/ci.yml/badge.svg?branch=phase-2)](https://github.com/site-bender/sitebender/actions/workflows/ci.yml)

![Header](./github-sitebender-banner.png)

## 🤖 Critical Instructions for AI Assistants

**MANDATORY**: Before working in ANY directory, you MUST:
1. Check for a `rules/index.json` file in the current working directory
2. Recursively check ALL parent directories up to the project root for `rules/index.json` files
3. Load and merge all discovered rules files (deeper rules override shallower ones)
4. Apply ALL collected rules to your work in that directory

Example: When working in `/libraries/toolkit/src/functions/`, you must load and obey:
- `/rules/index.json` (project-wide rules)
- `/libraries/rules/index.json` (if it exists - library-specific rules)
- `/libraries/toolkit/rules/index.json` (if it exists - toolkit-specific rules)
- And any other `rules/index.json` files in the path hierarchy

These rules are NOT suggestions. They are requirements. Violating them creates technical debt and breaks the project's architecture.

## Overview

A zero-dependency ecosystem of nine functional programming libraries that form a fully accessible, progressive enhancement-first web application framework where everything **on the client** works without JavaScript. Revolutionary tooling automatically generates 100% test coverage (Prover) and documentation from code (Envoy). Every line verified, tested, and documented. No assumptions, no shortcuts, no tech debt.

## Philosophy

Web 3.0 isn't about blockchains and tokens. It's about **user sovereignty**, **data ownership**, and **resilient systems** that work offline-first and sync globally. Every feature works without Web3 technology, then gets better with it.

## Core Principles

1. **Zero dependencies** - The ecosystem has NO external dependencies (except Deno std and TypeScript compiler)
2. **Progressive enhancement** - Everything works without JavaScript
3. **Functional programming** - No classes, immutable data, pure functions
4. **One function per file** - In its own folder, as index.ts
5. **100% test coverage** - No exceptions without documented reason
6. **Accessibility first** - WCAG 2.3 AAA or better
7. **Minimize cognitive load** - Code should read like English

## The Nine Libraries

### Foundation Layer (Zero Dependencies)
- **🧰 Toolkit** - Pure functional utilities, the atoms everything is built from
- **🎲 Foundry** - Property-based testing and arbitrary data generation _including triples_

### Infrastructure Layer
- **📜 Parser** - THE ONLY library that touches TypeScript compiler

### Services Layer
- **📚 Envoy** - Documentation generator _and much, much more_
- **🧪 Prover** - Test generator achieving 100% coverage automatically

### Runtime Layer
- **🎨 Components** - JSX component library that compiles to IR
- **⚙️ Engine** - Evaluates IR from Components and Maths
- **🔢 Maths** - Mathematical expression parser

### Distribution Layer
- **🌐 Mesh** - Distributed data with CRDTs, P2P, IPFS, Solid

## Documentation

- **[Project Overview](docs/project-overview.md)** - Architecture and library descriptions
- **[Library Data Flow](docs/library-data-flow.md)** - How data flows between libraries
- **[Rules & Standards](docs/rules.md)** - Coding standards and requirements
- **[Future Plans](docs/future-plans.md)** - Roadmap and upcoming features
- **[AI Assistant Guide](docs/ai-assistant-guide.md)** - For AI contributors

## Quick Start

```bash
# Clone the repository
git clone https://github.com/site-bender/sitebender.git
cd sitebender

# Development commands
deno task dev         # Start dev server
deno task test        # Run tests
deno task fmt         # Format code
deno task lint        # Lint code
deno task typecheck   # Type check

# Validate contracts
deno run --allow-read --allow-run scripts/validateContracts.ts
```

## Contract System

The project uses an enforceable contract system to maintain architectural boundaries:
- **Parser** is THE ONLY library that can import TypeScript
- **Envoy** CANNOT parse code, only interpret Parser output  
- All inter-library data is immutable via `ContractOutput<T>`
- Git hooks prevent commits that violate contracts
- See [Contract Enforcement](libraries/docs/contract-enforcement-implementation.md) for details

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
- If a fix is too big for now, leave an Envoy tech-debt comment and make it the next task—don’t let it drift.
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
