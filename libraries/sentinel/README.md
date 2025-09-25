# @sitebender/sentinel

> **Authentication and authorization as declarative data, not imperative code**

Sentinel brings authentication, authorization, and security policies into the @sitebender/studio ecosystem as JSX components that compile to data. No more auth libraries, no more middleware, no more confusion about who can do what.

## Revolutionary Philosophy

**Security is not a feature. It's a property of the data model.**

While traditional auth systems bolt security onto applications as an afterthought, Sentinel makes security policies first-class citizens in your triple store:

- **Authentication** as verifiable credentials
- **Authorization** as SHACL shapes
- **Policies** as declarative rules
- **Sessions** as cryptographic proofs
- **Mocking** as test scenarios

All achieved through one paradigm: **JSX components that compile to security data**.

## Core Beliefs

- **Security by default** - Not as an afterthought
- **Declarative over imperative** - Policies as data, not code
- **Cryptographically verifiable** - Not just "probably secure"
- **Privacy preserving** - Zero-knowledge where possible
- **Testable security** - Mock auth for development
- **No magic** - Everything auditable and provable

## The Paradigm Shift

Traditional auth requires:

- Authentication middleware
- Session management
- Role databases
- Permission checks scattered through code
- Complex OAuth flows
- Separate test auth systems

Sentinel requires:

- JSX components
- That's it

### Simple Example: Complete Auth System

**Traditional approach (hundreds of lines):**

```javascript
// OAuth setup
passport.use(new OAuthTwoStrategy({...}))
app.use(passport.initialize())
app.use(passport.session())

// Session management
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new RedisStore({...})
}))

// Role checks
function requireAdmin(req, res, next) {
  if (!req.user || !req.user.roles.includes('admin')) {
    return res.status(403).send('Forbidden')
  }
  next()
}

// Permission checks
app.get('/api/users', requireAdmin, async (req, res) => {
  // ... finally, your actual logic
})
```

**Sentinel approach (declarative JSX):**

```tsx
<Authentication>
  <Provider type="oauth2" config={{ clientId, redirectUri }} />
  <Provider type="webauthn" />
  <Provider type="did" />
</Authentication>

<Authorization>
  <Policy name="admin-only">
    <Role name="admin" />
    <Permission action="*" resource="*" />
  </Policy>

  <Policy name="user-read">
    <Role name="user" />
    <Permission action="read" resource="/api/users/:self" />
  </Policy>
</Authorization>

<SecureEndpoint path="/api/users" policy="admin-only">
  <YourActualLogic />
</SecureEndpoint>
```

## Component Architecture

### Authentication Components

```tsx
// Multiple auth providers
<Authentication>
  <OAuthTwo
    provider="github"
    clientId={clientId}
    scopes={["user", "repo"]}
  />

  <WebAuthn
    rpName="Sitebender App"
    requireResidentKey={true}
  />

  <DidAuth
    methods={["did:key", "did:web", "did:ion"]}
  />

  <Magic
    type="email"
    sender="noreply@app.com"
  />
</Authentication>

// Session management
<Session
  storage="triple-store"
  duration="PT24H"
  refresh="PT1H"
  secure={true}
  sameSite="strict"
/>
```

### Authorization Components

```tsx
// Role-based access control (Rbac)
<Rbac>
  <Role name="admin">
    <Permission action="*" resource="*" />
  </Role>

  <Role name="editor">
    <Permission action="read" resource="*" />
    <Permission action="write" resource="/content/*" />
  </Role>

  <Role name="viewer">
    <Permission action="read" resource="/content/*" />
  </Role>
</Rbac>

// Attribute-based access control (Abac)
<Abac>
  <Policy name="own-profile">
    <When>
      <IsEqualTo>
        <Referent><From.User path="id" /></Referent>
        <Comparand><From.Resource path="userId" /></Comparand>
      </IsEqualTo>
    </When>
    <Grant action="*" />
  </Policy>

  <Policy name="business-hours">
    <When>
      <And>
        <IsAfterTime time="09:00" />
        <IsBeforeTime time="17:00" />
        <IsWeekday />
      </And>
    </When>
    <Grant action="write" />
  </Policy>
</Abac>
```

### Security Policy Components

```tsx
// Rate limiting
<RateLimit>
  <Rule path="/api/*" limit={100} window="PT1M" />
  <Rule path="/auth/*" limit={5} window="PT15M" />
  <OnExceed status={429} retryAfter="PT1M" />
</RateLimit>

// Cors policies
<Cors>
  <AllowOrigin pattern="https://*.myapp.com" />
  <AllowMethod>GET</AllowMethod>
  <AllowMethod>POST</AllowMethod>
  <AllowHeader>Content-Type</AllowHeader>
  <MaxAge duration="PT24H" />
</Cors>

// Content Security Policy
<Csp>
  <Directive name="default-src" value="'self'" />
  <Directive name="script-src" value="'self' 'unsafe-inline'" />
  <Directive name="style-src" value="'self' https://fonts.googleapis.com" />
  <ReportTo uri="/csp-reports" />
</Csp>
```

### Cryptographic Components

```tsx
// Zero-knowledge proofs
<ZeroKnowledge>
  <Prove statement="age >= 18" withoutRevealing="age" />
  <Verify proof={proof} publicInputs={publicInputs} />
</ZeroKnowledge>

// Verifiable credentials
<VerifiableCredential
  issuer="did:key:z6MkhaXgBZ..."
  subject="did:web:user.example.com"
  claims={{ role: "admin", department: "engineering" }}
  proof="Ed25519Signature2020"
/>

// Encryption
<Encryption algorithm="xchacha20poly1305">
  <Key derivation="argon2id" />
  <Nonce generation="random" />
  <Aad include={["userId", "timestamp"]} />
</Encryption>
```

## Testing Support

### Mock Authentication

```tsx
// Development mode with mock users
<MockAuthentication mode="development">
  <MockUser
    id="123"
    name="Test Admin"
    email="admin@test.com"
    roles={["admin"]}
    attributes={{ department: "QA" }}
  />

  <MockUser
    id="456"
    name="Test User"
    email="user@test.com"
    roles={["user"]}
  />

  <MockSession userId="123" expiresIn="PT24H" />
</MockAuthentication>

// Test scenarios
<AuthScenario name="expired-token">
  <MockToken expired={true} />
  <ExpectRedirect to="/login" />
  <ExpectStatus code={401} />
</AuthScenario>

<AuthScenario name="insufficient-permissions">
  <MockUser roles={["viewer"]} />
  <AttemptAction action="write" resource="/api/users" />
  <ExpectDenied reason="Insufficient permissions" />
</AuthScenario>
```

## Integration with Triple Store

All auth data lives in the triple store as RDF:

```turtle
@prefix auth: <https://sitebender.com/auth#> .
@prefix sec: <https://w3id.org/security#> .

# User authentication
<user:123> a auth:User ;
  auth:email "admin@example.com" ;
  auth:provider "oauth2:github" ;
  auth:hasRole <role:admin> ;
  sec:proof <proof:xyz> .

# Role definition
<role:admin> a auth:Role ;
  auth:hasPermission <permission:all> ;
  auth:inherits <role:user> .

# Permission
<permission:all> a auth:Permission ;
  auth:action "*" ;
  auth:resource "*" ;
  auth:condition <condition:business-hours> .

# Session
<session:abc> a auth:Session ;
  auth:user <user:123> ;
  auth:created "2024-01-15T10:00:00Z"^^xsd:dateTime ;
  auth:expires "2024-01-16T10:00:00Z"^^xsd:dateTime ;
  sec:nonce "random-nonce" ;
  sec:signature "..." .
```

## Progressive Enhancement

### Layer 1: No JavaScript

- Session cookies with httpOnly/secure flags
- Server-side session validation
- Form-based authentication
- Http Basic Auth fallback

### Layer 2: Enhanced Security

- WebAuthn for passwordless
- Encrypted local storage
- Biometric authentication
- Hardware security keys

### Layer 3: Advanced Features

- Zero-knowledge proofs
- Distributed identity
- Multi-party computation
- Homomorphic encryption

## Getting Started

```tsx
import Authentication from "@sitebender/sentinel/components/Authentication/index.tsx"
import Authorization from "@sitebender/sentinel/components/Authorization/index.tsx"
import SecureRoute from "@sitebender/sentinel/components/SecureRoute/index.tsx"

// Your entire auth system
<Application>
	<Authentication>
		<OAuthTwo provider="github" />
	</Authentication>

	<Authorization>
		<Rbac>
			<Role name="admin" permissions="*" />
		</Rbac>
	</Authorization>

	<SecureRoute path="/admin" requires="admin">
		<AdminPanel />
	</SecureRoute>
</Application>
```

## Why This Changes Everything

- **Security as data** - Policies in the triple store, not scattered through code
- **Formally verifiable** - Prove your auth logic correct with Auditor
- **Time-travel debugging** - See exactly what permissions existed at any point
- **Composable security** - Mix and match auth strategies like Lego blocks
- **Testable by design** - Mock auth is the same components with test data

## Architecture

```
sentinel/
├── src/
│   ├── authentication/     # Auth provider components
│   │   ├── OAuthTwo/
│   │   ├── WebAuthn/
│   │   ├── DidAuth/
│   │   └── Magic/
│   ├── authorization/      # Access control components
│   │   ├── Rbac/
│   │   ├── Abac/
│   │   └── Policies/
│   ├── cryptography/       # Crypto components
│   │   ├── ZeroKnowledge/
│   │   ├── Encryption/
│   │   └── Signatures/
│   ├── mocking/           # Test auth components
│   │   ├── MockUser/
│   │   ├── MockSession/
│   │   └── MockToken/
│   └── types/             # TypeScript definitions
└── docs/
    └── todos.md          # Implementation plan
```

## The Revolution

This isn't just better auth. It's **authentication and authorization as a property of your data model**, not bolted-on middleware. When security policies are data:

- They can be versioned
- They can be queried
- They can be proven correct
- They can be shared
- They can be traded in the computation marketplace

Welcome to security done right.

---

**Transform your auth from imperative spaghetti to declarative, verifiable, testable data.**
