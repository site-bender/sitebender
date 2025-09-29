# <Sitebender> Design Principles

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="principles-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(280, 85%, 35%);stop-opacity:1" />
      <stop offset="100%" style="stop-color:hsl(320, 90%, 30%);stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="300" fill="url(#principles-gradient)"/>
  
  <!-- Interconnected principles visualization -->
  <g transform="translate(400, 150)">
    <!-- Central principle -->
    <circle cx="0" cy="0" r="50" fill="hsl(20, 90%, 35%)" stroke="snow" stroke-width="2"/>
    <text x="0" y="0" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="ghostwhite" font-weight="bold">Everything</text>
    <text x="0" y="15" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="ghostwhite" font-weight="bold">Is Data</text>
    
    <!-- Surrounding principles -->
    <circle cx="-150" cy="-80" r="35" fill="hsl(200, 85%, 32%)" stroke="snow" stroke-width="1.5"/>
    <text x="-150" y="-80" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">Pure</text>
    <text x="-150" y="-70" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">Functions</text>
    
    <circle cx="150" cy="-80" r="35" fill="hsl(160, 85%, 30%)" stroke="snow" stroke-width="1.5"/>
    <text x="150" y="-80" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">Zero</text>
    <text x="150" y="-70" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">Runtime</text>
    
    <circle cx="-150" cy="80" r="35" fill="hsl(60, 85%, 35%)" stroke="snow" stroke-width="1.5"/>
    <text x="-150" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="ghostwhite">Semantic</text>
    <text x="-150" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="ghostwhite">Web</text>
    
    <circle cx="150" cy="80" r="35" fill="hsl(120, 85%, 30%)" stroke="snow" stroke-width="1.5"/>
    <text x="150" y="80" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">Crypto</text>
    <text x="150" y="90" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">Secure</text>
    
    <circle cx="0" cy="-100" r="35" fill="hsl(240, 85%, 33%)" stroke="snow" stroke-width="1.5"/>
    <text x="0" y="-100" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">Distributed</text>
    <text x="0" y="-90" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">First</text>
    
    <circle cx="0" cy="100" r="35" fill="hsl(300, 85%, 35%)" stroke="snow" stroke-width="1.5"/>
    <text x="0" y="100" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">Verifiable</text>
    <text x="0" y="110" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">Correct</text>
    
    <!-- Connections -->
    <line x1="-45" y1="-20" x2="-120" y2="-55" stroke="snow" stroke-width="1" opacity="0.5"/>
    <line x1="45" y1="-20" x2="120" y2="-55" stroke="snow" stroke-width="1" opacity="0.5"/>
    <line x1="-45" y1="20" x2="-120" y2="55" stroke="snow" stroke-width="1" opacity="0.5"/>
    <line x1="45" y1="20" x2="120" y2="55" stroke="snow" stroke-width="1" opacity="0.5"/>
    <line x1="0" y1="-50" x2="0" y2="-65" stroke="snow" stroke-width="1" opacity="0.5"/>
    <line x1="0" y1="50" x2="0" y2="65" stroke="snow" stroke-width="1" opacity="0.5"/>
  </g>
  
  <!-- Title -->
  <text x="400" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="ghostwhite">Core Philosophy</text>
</svg>

## **TL;DR**

Sitebender is built on seven core principles that work together to create a radically different web framework. Everything is data, functions are pure, there's zero runtime overhead, we embrace the semantic web, security is cryptographic, distribution is fundamental, and correctness is mathematically verifiable.

---

## 1. Everything Is Data

### **The Principle**

In Sitebender, there is no distinction between code and data. Components, styles, behaviors, state - everything becomes semantic triples in an RDF graph.

### **Why It Matters**

When everything is data:

- **Query anything**: Find all buttons, all API calls, all state changes
- **Transform anything**: Modify your app with data transformations
- **Distribute anything**: Send components over the network like JSON
- **Persist anything**: Save entire application state to disk

### **In Practice**

```jsx
// This component...
const Button = ({ label, onClick }) => (
  <button className="primary" onClick={onClick}>
    {label}
  </button>
)

// Becomes this data...
:Button a :Component ;
    :hasParameter :label, :onClick ;
    :renders :button ;
    :hasClass "primary" ;
    :bindsEvent [:type "click"; :handler :onClick] .

// Which you can query...
SELECT ?component WHERE {
  ?component :bindsEvent ?event .
  ?event :type "click" .
}
```

---

## 2. Pure Functional Programming

### **The Principle**

Every function in Sitebender must be pure - same inputs always produce same outputs, no side effects.

### **Why It Matters**

Pure functions enable:

- **Predictability**: Know what functions do without running them
- **Testability**: Test with inputs and outputs, no mocking needed
- **Caching**: Memoize expensive computations perfectly
- **Parallelization**: Run functions concurrently without fear

### **In Practice**

```typescript
// ❌ Impure - side effects
function saveUser(user) {
  database.save(user); // Side effect!
  console.log("Saved"); // Side effect!
  return user.id;
}

// ✅ Pure - returns effect description
function saveUser(user) {
  return {
    type: "EFFECT",
    action: "DATABASE_SAVE",
    payload: user,
    log: "User saved",
  };
}

// Effects handled separately by runtime
const result = handleEffect(saveUser(user));
```

---

## 3. Zero Dependencies

### **The Principle**

Sitebender applications have zero runtime dependencies. No framework code ships to production.

### **Why It Matters**

Zero dependencies means:

- **No supply chain attacks**: Can't be compromised by dependencies
- **No version conflicts**: Your code is the only code
- **Smaller bundles**: Ship only what you write
- **Perfect control**: Every line of code is yours

### **In Practice**

```javascript
// Traditional React app bundle
app.js     423KB  (Your code: 12KB, React: 411KB)

// Sitebender app bundle
app.js      12KB  (Your code: 12KB, Framework: 0KB)
triples.ttl  8KB  (Your app as data)
```

---

## 4. Semantic Web Native

### **The Principle**

Sitebender embraces RDF and the semantic web as its foundational data model.

### **Why It Matters**

The semantic web provides:

- **Universal interoperability**: Any system can understand RDF
- **Self-describing data**: Schemas embedded in the data
- **Reasoning capabilities**: Infer new facts from existing ones
- **Linked data**: Connect to the global knowledge graph

### **In Practice**

```turtle
# Your app participates in the global semantic web
:UserProfile a schema:ProfilePage ;
    schema:about :CurrentUser ;
    schema:mainEntity :CurrentUser .

:CurrentUser a schema:Person ;
    schema:name "Alice" ;
    schema:email "alice@example.com" ;
    owl:sameAs <https://alice.example.com/#me> .

# Query across datasets
SELECT ?name ?knows WHERE {
  :CurrentUser schema:name ?name ;
               foaf:knows ?friend .
  SERVICE <https://api.example.com/sparql> {
    ?friend schema:name ?knows .
  }
}
```

---

## 5. Cryptographic Governance

### **The Principle**

All operations in Sitebender can be cryptographically verified and controlled through capabilities.

### **Why It Matters**

Cryptographic governance provides:

- **Unforgeable permissions**: Can't fake access rights
- **Auditable operations**: Every change has a signature
- **Distributed trust**: No central authority needed
- **Time-bound access**: Capabilities can expire

### **In Practice**

```typescript
// Every operation requires a capability
const capability = {
  operation: 'UPDATE',
  resource: ':UserProfile',
  subject: publicKey,
  expires: Date.now() + 3600000,
  signature: sign(privateKey, data)
}

// Verify before allowing
function updateProfile(data, capability) {
  if (!verify(capability)) {
    throw new UnauthorizedError()
  }

  return store.update(':UserProfile', data, {
    author: capability.subject,
    signature: capability.signature,
    timestamp: Date.now()
  })
}

// Creates an immutable audit trail
:change123 a :Change ;
    :author :publicKey789 ;
    :timestamp 1696329600 ;
    :signature "3045022100..." ;
    :modifies :UserProfile .
```

---

## 6. Distributed by Design

### **The Principle**

Sitebender applications are inherently distributed, working across devices and networks without central coordination.

### **Why It Matters**

Distribution enables:

- **Offline-first**: Apps work without connectivity
- **P2P collaboration**: Direct user-to-user communication
- **Edge computing**: Run anywhere, not just servers
- **Resilience**: No single point of failure

### **In Practice**

```typescript
// Local-first with sync
const [todos, setTodos] = useState([], {
  storage: "local", // Works offline
  sync: "crdt", // Conflict-free sync
  peers: ["wss://..."], // Optional coordination
});

// Automatic conflict resolution
// User A adds todo: "Buy milk"
// User B adds todo: "Buy bread"
// Both changes merge automatically

// Query across peers
const allTodos = query`
  SELECT ?todo WHERE {
    { ?todo a :Todo }  # Local todos
    UNION
    { SERVICE ?peer { ?todo a :Todo } }  # Peer todos
  }
`;
```

---

## 7. Verifiable Correctness

### **The Principle**

Sitebender applications can be mathematically verified for correctness at compile time.

### **Why It Matters**

Verification provides:

- **No runtime errors**: Catch all issues at compile time
- **Property guarantees**: Ensure invariants always hold
- **Formal proofs**: Mathematical certainty, not just tests
- **Fearless refactoring**: Changes can't break invariants

### **In Practice**

```typescript
// Define invariants
invariant(
  "Todos have unique IDs",
  forAll(todos, (t1, t2) => t1 === t2 || t1.id !== t2.id),
);

invariant(
  "Completed count is accurate",
  (app) => app.completedCount === app.todos.filter((t) => t.completed).length,
);

invariant("No orphaned references", (store) =>
  forAll(
    store.triples,
    (triple) => triple.object.type !== "IRI" || store.exists(triple.object),
  ),
);

// Compiler verifies these ALWAYS hold
// Compile error if invariant can be violated
```

---

## How Principles Reinforce Each Other

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="800" height="400" fill="hsl(240, 90%, 15%)"/>
  
  <!-- Title -->
  <text x="400" y="30" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="ghostwhite" font-weight="bold">Synergistic Principles</text>
  
  <!-- Principle combinations -->
  <g transform="translate(150, 100)">
    <rect width="200" height="60" fill="hsl(280, 85%, 35%)" stroke="snow" stroke-width="2" rx="5"/>
    <text x="100" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="ghostwhite" font-weight="bold">Data + Pure Functions</text>
    <text x="100" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">= Perfect Caching</text>
  </g>
  
  <g transform="translate(450, 100)">
    <rect width="200" height="60" fill="hsl(200, 85%, 32%)" stroke="snow" stroke-width="2" rx="5"/>
    <text x="100" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="ghostwhite" font-weight="bold">Zero Deps + Crypto</text>
    <text x="100" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">= Trustless Security</text>
  </g>
  
  <g transform="translate(150, 200)">
    <rect width="200" height="60" fill="hsl(160, 85%, 30%)" stroke="snow" stroke-width="2" rx="5"/>
    <text x="100" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="ghostwhite" font-weight="bold">Semantic + Distributed</text>
    <text x="100" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">= Global Knowledge Graph</text>
  </g>
  
  <g transform="translate(450, 200)">
    <rect width="200" height="60" fill="hsl(20, 90%, 35%)" stroke="snow" stroke-width="2" rx="5"/>
    <text x="100" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="ghostwhite" font-weight="bold">Pure + Verifiable</text>
    <text x="100" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">= Provable Correctness</text>
  </g>
  
  <g transform="translate(300, 300)">
    <rect width="200" height="60" fill="hsl(320, 85%, 32%)" stroke="snow" stroke-width="2" rx="5"/>
    <text x="100" y="25" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="ghostwhite" font-weight="bold">All Seven Together</text>
    <text x="100" y="45" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="snow">= Revolutionary Framework</text>
  </g>
</svg>

### **Data + Pure = Reproducibility**

When everything is data and functions are pure, any application state can be perfectly reproduced.

### **Zero Dependencies + Crypto = Ultimate Security**

No supply chain vulnerabilities plus cryptographic verification equals unprecedented security.

### **Semantic + Distributed = Universal Apps**

RDF's interoperability plus distribution creates applications that work everywhere with everything.

### **Pure + Verifiable = Mathematical Certainty**

Pure functions enable formal verification, providing mathematical proofs of correctness.

---

## Breaking Traditional Boundaries

### **What Sitebender Is NOT**

- **Not MVC**: No separation of models, views, controllers
- **Not Component-Based**: Components are data, not classes
- **Not Client-Server**: Every node is equal
- **Not REST**: Query semantics, don't fetch resources
- **Not Object-Oriented**: Pure functional all the way

### **New Mental Models**

Instead of thinking in:

- **Components** → Think in **triples**
- **State management** → Think in **graph queries**
- **API calls** → Think in **semantic links**
- **Deployment** → Think in **data distribution**
- **Testing** → Think in **property verification**

---

## Living The Principles

### **In Development**

```typescript
// Start with data model
const schema = `
  :Todo a rdfs:Class ;
    rdfs:property :title, :completed, :createdAt .
`;

// Write pure transformations
const toggleTodo = (todo) => ({
  ...todo,
  completed: !todo.completed,
  toggledAt: Date.now(),
});

// Verify properties
invariant(
  "Toggle is involution",
  (todo) => toggleTodo(toggleTodo(todo)).completed === todo.completed,
);

// Distribute naturally
sync(todos, "p2p://todos");
```

### **In Architecture**

- Design data schemas first
- Compose pure functions
- Eliminate dependencies
- Think globally, act locally
- Verify don't test
- Sign everything
- Assume distribution

---

## **Recap: The Sitebender Way**

These seven principles create a framework that is:

**More secure** than traditional frameworks (crypto + zero deps)  
**More reliable** than traditional frameworks (verification + pure functions)  
**More powerful** than traditional frameworks (semantic web + distribution)  
**Simpler** than traditional frameworks (everything is just data)

When you build with Sitebender, you're not just using a framework - you're embracing a philosophy that fundamentally reimagines what web applications can be.
