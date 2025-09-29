# `<Sitebender>` overview

Everything is **data**.

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(220, 85%, 35%);stop-opacity:1" />
      <stop offset="100%" style="stop-color:hsl(240, 90%, 30%);stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="800" height="300" fill="url(#grad1)" rx="10"/>
  <!-- Data flow visualization -->
  <g transform="translate(400, 150)">
    <!-- Central node -->
    <circle cx="0" cy="0" r="40" fill="hsl(280, 85%, 35%)" stroke="snow" stroke-width="2"/>
    <text x="0" y="0" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="ghostwhite">Graph</text>
    <text x="0" y="12" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="ghostwhite">Database</text>
    <!-- Surrounding nodes -->
    <circle cx="-120" cy="-60" r="35" fill="hsl(200, 80%, 35%)" stroke="snow" stroke-width="1.5" opacity="0.9"/>
    <text x="-120" y="-55" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="ghostwhite">Components</text>
    <circle cx="120" cy="-60" r="35" fill="hsl(160, 85%, 30%)" stroke="snow" stroke-width="1.5" opacity="0.9"/>
    <text x="120" y="-55" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="ghostwhite">Styles</text>
    <circle cx="-120" cy="60" r="35" fill="hsl(20, 90%, 35%)" stroke="snow" stroke-width="1.5" opacity="0.9"/>
    <text x="-120" y="65" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="ghostwhite">State</text>
    <circle cx="120" cy="60" r="35" fill="hsl(340, 85%, 35%)" stroke="snow" stroke-width="1.5" opacity="0.9"/>
    <text x="120" y="65" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="ghostwhite">Behavior</text>
    <!-- Connections -->
    <line x1="-40" y1="-20" x2="-85" y2="-43" stroke="snow" stroke-width="1.5" opacity="0.7"/>
    <line x1="40" y1="-20" x2="85" y2="-43" stroke="snow" stroke-width="1.5" opacity="0.7"/>
    <line x1="-40" y1="20" x2="-85" y2="43" stroke="snow" stroke-width="1.5" opacity="0.7"/>
    <line x1="40" y1="20" x2="85" y2="43" stroke="snow" stroke-width="1.5" opacity="0.7"/>
  </g>
</svg>

## **TL;DR**

Sitebender transforms web development by treating everything - components, styles, state, and behavior - as semantic data stored in RDF triples. This enables mathematical verification, zero runtime dependencies, and distributed applications that work offline by default.

---

## What Is Sitebender?

Sitebender is a web development framework where applications exist as data rather than code. You write declarative JSX components that compile to RDF triples, which are then stored, queried, and rendered directly to the DOM.

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <!-- Architecture Flow Diagram -->
  <defs>
    <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:hsl(180, 85%, 30%);stop-opacity:1" />
      <stop offset="100%" style="stop-color:hsl(220, 90%, 35%);stop-opacity:1" />
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="800" height="300" fill="hsl(220, 90%, 20%)" />
  <!-- JSX Input -->
  <rect x="70" y="100" width="100" height="80" fill="hsl(180, 85%, 30%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="120" y="130" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">JSX</text>
  <text x="120" y="150" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">Components</text>
  <text x="120" y="168" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">you write</text>
  <!-- Arrow -->
  <path d="M 170 140 L 205 140" stroke="snow" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
  <polygon points="210,140 200,135 200,145" fill="snow"/>
  <!-- Internal Representation -->
  <rect x="215" y="100" width="100" height="80" fill="hsl(200, 85%, 32%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="265" y="130" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Internal</text>
  <text x="265" y="150" font-family="Arial, sans-serif" font-size="12" fill="ghostwhite" text-anchor="middle" font-weight="bold">Representation</text>
  <text x="265" y="168" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">(IR)</text>
  <!-- Arrow -->
  <path d="M 315 140 L 350 140" stroke="snow" stroke-width="2" fill="none"/>
  <polygon points="355,140 345,135 345,145" fill="snow"/>
  <!-- RDF Triples -->
  <rect x="360" y="100" width="100" height="80" fill="hsl(240, 85%, 35%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="410" y="130" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">RDF</text>
  <text x="410" y="150" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Triples</text>
  <text x="410" y="168" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">(Turtle)</text>
  <!-- Arrow -->
  <path d="M 460 140 L 495 140" stroke="snow" stroke-width="2" fill="none"/>
  <polygon points="500,140 490,135 490,145" fill="snow"/>
  <!-- Triple Store -->
  <rect x="505" y="100" width="100" height="80" fill="hsl(280, 85%, 35%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="555" y="130" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Triple</text>
  <text x="555" y="150" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Store</text>
  <text x="555" y="168" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">(Database)</text>
  <!-- Arrow -->
  <path d="M 605 140 L 640 140" stroke="snow" stroke-width="2" fill="none"/>
  <polygon points="645,140 635,135 635,145" fill="snow"/>
  <!-- DOM Output -->
  <rect x="650" y="100" width="100" height="80" fill="hsl(340, 85%, 32%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="700" y="130" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">DOM</text>
  <text x="700" y="150" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">Direct</text>
  <text x="700" y="168" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">rendering</text>
  <!-- Title -->
  <text x="400" y="50" font-family="Arial, sans-serif" font-size="24" fill="ghostwhite" text-anchor="middle" font-weight="500">Compilation Pipeline</text>
</svg>

Unlike traditional frameworks that bundle JavaScript code, Sitebender transforms your entire application into semantic data that can be:

- **Queried** like a database
- **Verified** mathematically
- **Distributed** across networks
- **Rendered** without a virtual DOM

---

## Core Concepts

### **Everything Is Data**

In Sitebender, there's no distinction between code and data. Components, styles, event handlers - everything becomes RDF triples. **But you don't write the triples. Sitebender does.** You just use JSX components.

```jsx
// Traditional JSX component
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// Sitebender writes something like this to the database:
// :Button a :Component .
// :Button :hasProperty :label .
// :Button :hasProperty :onClick .
// :Button :renders :button .
// :Button :bindsEvent [:type "click"; :handler :onClick] .
```

### **Semantic Triple Stores**

Your application lives in a triple store - a graph database optimized for semantic relationships. Each triple represents a fact about your application:

```
Subject    → Predicate → Object
:HomePage  → :hasTitle → "Welcome"
:NavBar    → :contains → :HomeLink
:HomeLink  → :navigates → :HomePage
```

### **Pure Functional Programming**

Every function in Sitebender is pure - no side effects, no hidden state:

```typescript
// Pure, curried functions only
function add (a: number) {
  return function addTo (b: number): number {
    return a + b
  }
} 

// Side effects become data
function fetchUser (id: string) {
  return {
    type: "EFFECT",
    action: "FETCH",
    resource: `/users/${id}`,
  }
}
```

### **Zero Runtime Dependencies**

Your compiled application contains **zero framework code**. The entire runtime compiles away, leaving only:

- Your application logic as triples
- Direct DOM manipulation code
- Pure functions for transformations

---

## How It Works

### **1. Write JSX Components**

```jsx
import { render } from '@sitebender/pagewright'

export const <Sitebender> = () => (
  <main>
    <h1>Hello, Semantic Web!</h1>
    <Counter initial={0} />
  </main>
)

export const Counter = ({ initial }) => {
  const [count, setCount] = useState(initial)

  return (
    <div>
      <span>Count: {count}</span>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

### **2. Compile to Triples**

The Sitebender compiler transforms your JSX into RDF triples:

```turtle
:Sitebender a :Component ;
    :renders :main ;
    :contains :heading, :Counter .

:heading a :Element ;
    :tag "h1" ;
    :textContent "Hello, Semantic Web!" .

:Counter a :Component ;
    :hasState :count ;
    :hasProperty :initial ;
    :renders :div .

:count a :State ;
    :initialValue "{{initial}}" ;
    :currentValue 0 .
```

### **3. Query and Transform**

Your application becomes queryable using SPARQL or Sitebender's built-in query language:

```javascript
// Find all buttons in the application
const buttons = query`
  SELECT ?button WHERE {
    ?button :tag "button" .
  }
`;

// Find all components using count state
const counters = query`
  SELECT ?component WHERE {
    ?component :hasState :count .
  }
`;
```

### **4. Render to DOM**

The triple store directly renders to the DOM without a virtual DOM:

```javascript
// No virtual DOM needed
// Triples map directly to DOM operations
:button :onClick :handler
  → element.addEventListener('click', handler)

:div :contains :span
  → parentDiv.appendChild(spanElement)
```

---

## Why Sitebender?

### **Mathematical Correctness**

Because everything is data and all functions are pure, Sitebender can mathematically verify your application:

- **Type safety** without TypeScript
- **Property verification** at compile time
- **Impossibility** of runtime errors from the framework

### **True Distribution**

Applications naturally distribute across networks because they're just data:

- **Offline-first** by default
- **CRDT synchronization** built-in
- **No API needed** - query remote stores directly

### **Cryptographic Governance**

The Warden library provides capability-based security at the data level:

- **Every operation** is cryptographically signed
- **Fine-grained permissions** on individual triples
- **Audit trail** of all data modifications

### **Zero Supply Chain Risk**

No runtime dependencies means:

- **No** npm vulnerabilities
- **No** dependency updates
- **No** breaking changes
- **Complete** control over your application

---

## The 15 Libraries

Sitebender provides 15 specialized libraries, each handling a specific aspect of web development:

<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
  <!-- Library visualization -->
  <rect width="800" height="400" fill="hsl(220, 90%, 15%)"/>
  
  <!-- Core Libraries -->
  <text x="400" y="30" font-family="Arial, sans-serif" font-size="18" fill="ghostwhite" text-anchor="middle" font-weight="bold">Core Libraries</text>
  
  <rect x="50" y="50" width="140" height="60" fill="hsl(280, 85%, 35%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="120" y="85" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Toolsmith</text>
  <text x="120" y="100" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">1000+ functions</text>
  
  <rect x="210" y="50" width="140" height="60" fill="hsl(200, 85%, 32%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="280" y="85" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Pagewright</text>
  <text x="280" y="100" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">HTML/SVG gen</text>
  
  <rect x="370" y="50" width="140" height="60" fill="hsl(160, 85%, 30%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="440" y="85" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Architect</text>
  <text x="440" y="100" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">App patterns</text>
  
  <!-- Data Libraries -->
  <text x="400" y="150" font-family="Arial, sans-serif" font-size="18" fill="ghostwhite" text-anchor="middle" font-weight="bold">Data Management</text>
  
  <rect x="50" y="170" width="140" height="60" fill="hsl(20, 90%, 35%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="120" y="205" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Lexivault</text>
  <text x="120" y="220" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">Vocabularies</text>
  
  <rect x="210" y="170" width="140" height="60" fill="hsl(340, 85%, 32%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="280" y="205" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Gatekeeper</text>
  <text x="280" y="220" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">Validation</text>
  
  <rect x="370" y="170" width="140" height="60" fill="hsl(60, 85%, 35%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="440" y="205" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Bridgewright</text>
  <text x="440" y="220" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">Integration</text>
  
  <!-- Security & Testing -->
  <text x="400" y="270" font-family="Arial, sans-serif" font-size="18" fill="ghostwhite" text-anchor="middle" font-weight="bold">Security & Testing</text>
  
  <rect x="150" y="290" width="140" height="60" fill="hsl(120, 85%, 30%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="220" y="325" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Warden</text>
  <text x="220" y="340" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">Crypto governance</text>
  
  <rect x="310" y="290" width="140" height="60" fill="hsl(300, 85%, 35%)" stroke="snow" stroke-width="2" rx="5"/>
  <text x="380" y="325" font-family="Arial, sans-serif" font-size="14" fill="ghostwhite" text-anchor="middle" font-weight="bold">Forgemaster</text>
  <text x="380" y="340" font-family="Arial, sans-serif" font-size="11" fill="snow" text-anchor="middle">Property testing</text>
</svg>

Each library is:

- **Focused** on a single responsibility
- **Pure functional** with no side effects
- **Independently usable** outside Sitebender
- **Zero dependency** at runtime

---

## **Recap: The Sitebender Difference**

**Traditional Frameworks:**

- Ship framework code to users
- Virtual DOM overhead
- Runtime dependencies
- Component-based architecture
- API-driven data fetching

**Sitebender:**

- Ship only your application logic
- Direct DOM manipulation
- Zero runtime dependencies
- Everything is semantic data
- Query-driven data access

Ready to think differently about web development? Continue to the [Architecture](./architecture.md) guide for a deep technical dive, or jump into [Getting Started](./getting-started.md) to build your first Sitebender application.
