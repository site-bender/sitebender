# Authentication and Authorization (AuthN/AuthZ)

This document proposes a minimal, composable design for authentication and authorization that fits the Adaptive IR, SSR safety, and the When.* (authoring) / On.* (runtime) canons.

- Authoring: declarative wrappers (When.*) that describe auth requirements.
- Runtime: operations (On.*) that validate credentials, inject identity, and evaluate policies.
- Principles: SSR-first, fail-closed, precise types, no secrets in client code, pluggable adapters.

## Core Concepts

- IdentityClaims
  - Minimal shape for the authenticated principal (e.g., sub, email, roles, scopes, orgId, tenantId, custom claims).
  - Lives in LocalValues as `user` when authenticated; otherwise `user: undefined` or a typed Anonymous principal.

- TokenMeta
  - Metadata about the credential (provider, sessionId, exp, iat, method). Not exposed to client code beyond what is safe.

- AuthAdapter
  - Server-only validator/loader that turns request credentials (cookies/headers) into `{ user: IdentityClaims; token?: TokenMeta }`.
  - Adapters: JWT-cookie (default), session store, header/API key, OAuth/OpenID, custom enterprise SSO.

- Policy
  - A first-class operation: `OperationFunction<boolean>` with tag: "Authorize".
  - Composable with existing logical ops (And/Or/Not) and comparators.

- Guard
  - A small SSR helper that evaluates a policy to decide: allow, redirect, or 401/403.

## Contracts (proposed)

- On.FromRequestAuth(adapter)
  - Input: Request context (cookies, headers)
  - Output: Either<AdaptiveError[], { user: IdentityClaims; token?: TokenMeta }>
  - Effect: populates `LocalValues.user` for downstream operations and renderers.

- Policy primitives (runtime)
  - On.HasRole(role: string)
  - On.HasAnyRole(roles: string[])
  - On.HasAllScopes(scopes: string[])
  - On.InOrg({ userPath: "user.orgId", resourcePath: "resource.orgId" })
  - On.IsOwner({ by: "user.id", of: "resource.ownerId" })

- Guard (SSR)
  - guardRoute(policy, onFail): Promise<
    | { allow: true }
    | { redirect: string }
    | { status: 401 | 403 }
  >

- Error modes
  - Missing/invalid credentials → anonymous principal → policies evaluate to false.
  - Expired token → clear cookies (if applicable) and treat as anonymous; optional redirect to login.
  - Policy evaluation error → 500 (misconfiguration) or 403 (policy false), as configured.

## Security Defaults

- Cookies: HTTP-only, `SameSite=Lax` or `Strict` for access; short-lived access token + longer-lived refresh token (rotated).
- CSRF: double-submit cookie + header for state-changing requests; or `SameSite=Strict` for sensitive routes.
- Rotation: rotate refresh on ~70–80% of TTL; invalidate on logout.
- Principle of least privilege: claims limited to what policies need; sensitive data stays server-side.

## Authoring (JSX) — Proposed API

Note: These wrappers are proposed authoring components that compile to the Adaptive IR. Names follow the When.* canon.

### Authenticated guard for a section

```tsx
<When.Authenticated fallback={<Redirect to="/login" />}> 
  <Section.SecureDashboard />
</When.Authenticated>
```

- If `LocalValues.user` is absent, render `fallback` (or trigger redirect/status effect in SSR).

### Role/scopes-based authorization

```tsx
<When.Authorized policy={When.HasAnyRole(["Admin", "Manager"]) } fallback={<Notice.Forbidden />}> 
  <Admin.Tools />
</When.Authorized>
```

- Compose policies freely:

```tsx
<When.Authorized
  policy={When.And(
    When.HasRole("Manager"),
    When.InOrg({ userPath: "user.orgId", resourcePath: "org.id" })
  )}
  fallback={<Notice.Forbidden />}
>
  <Org.Settings />
</When.Authorized>
```

### Ownership checks (ABAC)

```tsx
<When.Authorized
  policy={When.IsOwner({ by: "user.id", of: "project.ownerId" })}
  fallback={<Notice.Forbidden />}
>
  <Project.Edit />
</When.Authorized>
```

### Login/Logout flows

```tsx
<When.Login provider="EmailPassword" onSuccess={<Redirect to="/dashboard" />} />
<When.Logout onSuccess={<Redirect to="/" />} />
```

- These map to effects like `On.Authenticate` and `On.Logout` which set/clear cookies via the adapter.

## Runtime Mapping (IR)

- When.Authenticated → uses policy On.IsAuthenticated
- When.Authorized(policy=…) → On.Authorize(policy)
- When.HasRole/HasAnyRole/HasAllScopes → policy ops returning boolean
- When.InOrg/IsOwner → policy ops using path-based value extraction and comparators
- When.Login/Logout → effect nodes that call the AuthAdapter

All of the above depend on an earlier injector (On.FromRequestAuth) that populates `LocalValues.user`.

## Route and SSR Guarding

- At the server boundary, evaluate guards before rendering to choose one of:
  - allow: render the page (SSR) and hydrate
  - redirect: send 302/303 to the target (e.g., /login)
  - status: send 401/403 with an error page

Example (pseudocode):

```ts
const { user } = await On.FromRequestAuth(adapter)(request)
const allow = await On.HasAnyRole(["Admin", "Manager"])(null, { user })
if (!allow) return redirect("/login")
return render(App, { user })
```

## Pluggable Adapters

- JWT Cookie Adapter (default)
  - Validates a signed JWT from an HTTP-only cookie, parses claims, and exposes minimal safe fields.
  - Handles refresh rotation and logout.
- Session Store Adapter
  - Validates a session ID cookie against a store (KV/Redis) and loads claims.
- OAuth/OpenID Adapter
  - Delegates login to provider; callback endpoint exchanges code for tokens and establishes session/cookies.

## Incremental Implementation Plan

1) Types (@adaptiveTypes)
   - IdentityClaims, TokenMeta, Policy (tag: "Authorize").
2) Injector
   - On.FromRequestAuth(adapter) → `LocalValues.user`.
3) Policy Ops
   - On.IsAuthenticated, On.HasRole, On.HasAnyRole, On.HasAllScopes, On.InOrg, On.IsOwner.
4) Authoring Wrappers
   - When.RequireAuth, When.Authorize, and basic When.HasRole/HasAnyRole wrappers for composition.
5) Guard + Effects
   - SSR guard helper and simple Redirect/Status effects.
6) Adapters
   - JWT-cookie adapter (baseline), stubs for session and OAuth.
7) Tests + Demo
   - Unit tests for policy evaluation, adapter validation, and guard; small protected-example route.

## Edge Cases

- Anonymous browsing vs protected pages.
- Token expiry (mid-request, mid-session) and refresh strategy.
- Multi-tenant checks (org/tenant mismatch).
- Impersonation (actor vs subject) and audit logging hooks.
- SSR vs client hydration consistency for gated trees.

## Notes

- This design stays aligned with explicit interfaces, Either-based error handling, SSR-friendly rendering, and precise DOM/ARIA typings.
- All wrappers/ops above are intentionally small and composable, matching existing comparator/logical patterns.
