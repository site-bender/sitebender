# Sitebender Application Folder Hierarchy

> **Status**: Initial architectural specification
> **Purpose**: Define the standard folder structure for Sitebender applications
> **Philosophy**: Clear organization reduces cognitive load - developers should feel confident about where things belong

## Overview

Sitebender applications organize code through a semantic folder hierarchy that mirrors the separation of concerns in the JSX DSL. Each folder corresponds to a specific library's domain and contains JSX components that compile to data structures.

## Top-Level Structure

```
my-sitebender-app/
├── .sitebender/           # Configuration and library setup
├── pages/                 # Page components and routing (Pagewright)
├── data/                  # Data model and concepts (Agent/Custodian)
├── behaviors/             # Reusable reactive behaviors (Architect)  
├── events/                # Pub-sub event definitions (Operator)
├── memory/                # State management components (Custodian)
├── distributed/           # Distributed layer config (Agent)
├── proofs/               # Tests and mathematical proofs (Auditor)
├── contracts/            # Warden governance contracts
├── assets/               # Static files, styles, images
└── index.tsx             # Application entry point
```

## Detailed Folder Descriptions

### `.sitebender/` - Hidden Configuration
- Library configuration files
- Build settings and compilation options
- Development vs production settings
- Import maps and aliases
- **Not touched by end users** - managed by Quartermaster

### `pages/` - Pagewright Components
- All HTML-rendering components
- Page layouts and templates
- Navigation structures
- Static content components
- **Compiles to**: Semantic HTML with progressive enhancement hooks

**Structure:**
```
pages/
├── index.tsx              # Home page
├── About/
│   └── index.tsx
├── Contact/
│   └── index.tsx
├── ThankYou/
│   └── index.tsx
└── _layouts/
    ├── Main/
    │   └── index.tsx
    └── Minimal/
        └── index.tsx
```

### `data/` - Concept Definitions
- Domain data model as living ontology
- Concept definitions with embedded shapes (validation)
- Entity relationships and properties
- **Compiles to**: RDF triples, SHACL constraints, database schemas

**Structure:**
```
data/
├── index.tsx              # Top-level Data component
├── Person/
│   └── index.tsx          # Person concept with properties and relationships
├── Organization/
│   └── index.tsx
├── concepts/              # Primitive concept definitions
│   ├── EmailAddress/
│   │   └── index.tsx
│   ├── PhoneNumber/
│   │   └── index.tsx
│   └── PositiveInteger/
│       └── index.tsx
└── relationships/         # Reusable relationship patterns
    ├── Employment/
    │   └── index.tsx
    └── Membership/
        └── index.tsx
```

### `behaviors/` - Reactive Components
- Reusable calculation and validation logic
- Display control components (ShowIf, HideIf)
- Data transformation and formatting
- **Compiles to**: Composed pure functions with lazy evaluation

**Structure:**
```
behaviors/
├── validation/
│   ├── IntegerGreaterThanZero/
│   │   └── index.tsx
│   ├── ValidEmailFormat/
│   │   └── index.tsx
│   └── UniqueUsername/
│       └── index.tsx
├── calculations/
│   ├── TaxCalculation/
│   │   └── index.tsx
│   ├── ShippingCost/
│   │   └── index.tsx
│   └── DiscountAmount/
│       └── index.tsx
└── display/
    ├── ShowAdminOnly/
    │   └── index.tsx
    └── HideIfEmpty/
        └── index.tsx
```

### `events/` - Pub-Sub Configuration
- Event type definitions
- Cross-component communication patterns
- CQRS and event sourcing setup
- **Compiles to**: Event stream configuration and handlers

**Structure:**
```
events/
├── index.tsx              # Top-level Events component
├── user/
│   ├── Registration/
│   │   └── index.tsx
│   ├── Authentication/
│   │   └── index.tsx
│   └── ProfileUpdates/
│       └── index.tsx
└── system/
    ├── Notifications/
    │   └── index.tsx
    └── ErrorHandling/
        └── index.tsx
```

### `memory/` - State Management
- Application state structure
- State transitions and management
- Temporal state patterns
- **Compiles to**: State machines and management logic

**Alternative names considered**: `context/`, `storage/`, `state/`

**Structure:**
```
memory/
├── index.tsx              # Top-level State/Memory component
├── user/
│   ├── Authentication/
│   │   └── index.tsx
│   ├── Preferences/
│   │   └── index.tsx
│   └── Session/
│       └── index.tsx
└── application/
    ├── Navigation/
    │   └── index.tsx
    ├── Notifications/
    │   └── index.tsx
    └── Cache/
        └── index.tsx
```

### `distributed/` - Agent Configuration
- CRDT and distributed data setup
- P2P networking configuration
- Offline-first patterns
- **Compiles to**: Distributed system coordination

**Structure:**
```
distributed/
├── index.tsx              # Top-level Distributed component
├── sync/
│   ├── UserData/
│   │   └── index.tsx
│   ├── Content/
│   │   └── index.tsx
│   └── Preferences/
│       └── index.tsx
└── offline/
    ├── CacheStrategy/
    │   └── index.tsx
    └── ConflictResolution/
        └── index.tsx
```

### `proofs/` - Testing and Verification
- Mathematical proofs of correctness
- Property-based test definitions
- Contract verification
- **Compiles to**: Executable tests and formal proofs

**Structure:**
```
proofs/
├── index.tsx              # Top-level Proofs component
├── data-integrity/
│   ├── EmailFormat/
│   │   └── index.tsx
│   ├── RelationshipConsistency/
│   │   └── index.tsx
│   └── ConstraintSatisfaction/
│       └── index.tsx
└── behavior-correctness/
    ├── CalculationAccuracy/
    │   └── index.tsx
    └── ValidationCompleteness/
        └── index.tsx
```

### `contracts/` - Warden Governance
- Architectural contract definitions
- Privacy and security policies
- Import and dependency rules
- **Compiles to**: Cryptographic contracts and enforcement rules

### `assets/` - Static Resources
- CSS files and themes
- Images, fonts, icons
- Static data files
- Client-side scripts (minimal)

## File Naming Conventions

- **Folders**: PascalCase for components (`EmailAddress/`)
- **Index files**: Always `index.tsx` for main component export
- **Private helpers**: Prefix with underscore (`_utility/index.tsx`)

## Import Patterns

Components are imported using clear, descriptive paths with convenient aliases:

```tsx
// Data concepts
import Person from "~data/Person/index.tsx"
import EmailAddress from "~data/concepts/EmailAddress/index.tsx"

// Behaviors
import ValidateEmail from "~behaviors/validation/ValidEmailFormat/index.tsx"
import TaxCalculator from "~behaviors/calculations/TaxCalculation/index.tsx"

// Pages
import ContactForm from "~pages/Contact/index.tsx"
import MainLayout from "~pages/_layouts/Main/index.tsx"
```

## Import Patterns

**Application-level imports** (within Sitebender projects):
```tsx
import Person from "~data/Person/index.tsx"        // Uses import map aliases
import ShowAdminOnly from "~behaviors/display/ShowAdminOnly/index.tsx"
```

**Library imports** (from Sitebender libraries):
```tsx
import { EmailField } from "@sitebender/pagewright"  // Uses import map
import { Validation } from "@sitebender/architect"
```

**Note**: Both `~` aliases and `@sitebender/` imports are configured via import maps in `deno.jsonc` or `import_map.jsonc`. The `~` prefix maps to application folders:
- `~data` → `"./data/"`
- `~behaviors` → `"./behaviors/"`
- `~pages` → `"./pages/"`
- etc.

This avoids complex relative path calculations and makes imports consistent regardless of the importing file's location.

## Key Principles

1. **Semantic Organization** - Folders reflect business concepts, not technical patterns
2. **Single Responsibility** - Each folder has one clear purpose aligned with library boundaries
3. **Composability** - Components can be imported and nested across folder boundaries
4. **Discoverability** - Folder names immediately convey contents and purpose
5. **Scalability** - Structure works for small apps and large applications

## Benefits

- **Reduced Cognitive Load** - Developers know exactly where to find and place components
- **Clear Separation** - Each library's concerns have dedicated spaces
- **Automatic Organization** - Quartermaster can generate this structure
- **AI-Friendly** - Clear boundaries help AI assistants understand the codebase
- **Domain-Driven** - Structure reflects business concepts, not technical implementation

This hierarchy enables the "everything is JSX configuration" philosophy while maintaining clear architectural boundaries between Sitebender's libraries.
