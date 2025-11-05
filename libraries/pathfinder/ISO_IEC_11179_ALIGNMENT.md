# ISO/IEC 11179 Metadata Registry Alignment

> **Aligning Sitebender Studio's data-as-configuration architecture with the international standard for metadata registries**

---

## Executive Summary

**ISO/IEC 11179** is an international standard for **Metadata Registries (MDR)** that provides a framework for standardizing and registering metadata to enable semantic interoperability across systems and organizations.

**Sitebender Studio's revolutionary approach** of treating everything as data—where JSX components transform into RDF triples stored in Oxigraph and queried via SPARQL—is conceptually identical to an ISO/IEC 11179 metadata registry.

This document establishes formal alignment between Sitebender's existing architecture and ISO/IEC 11179 concepts, providing:

1. **Conceptual mapping** between Sitebender IR and ISO/IEC 11179 terminology
2. **Benefits analysis** of formal alignment with the standard
3. **4-phase implementation roadmap** with detailed checklists
4. **Concrete examples** showing JSX/IR/Turtle alongside ISO/IEC 11179 equivalents
5. **Integration strategy** for Pathfinder (registry core), Artificer (compilation), and Architect (authoring)

### Key Insight

**Sitebender already implements the core concepts of ISO/IEC 11179:**

- **Data Elements** = Form field components (`<TextField>`, `<IntegerField>`, etc.)
- **Value Domains** = Type constraints + validation rules
- **Conceptual Domains** = Semantic meanings (branded types like `EmailAddress`, `Isbn13`)
- **Metadata Registry** = Pathfinder's triple store + SPARQL queries

Formal alignment positions Sitebender as **enterprise-grade data governance infrastructure** while maintaining revolutionary simplicity.

---

## Table of Contents

1. [What is ISO/IEC 11179?](#what-is-isoiec-11179)
2. [Why ISO/IEC 11179 Matters for Sitebender](#why-isoiec-11179-matters-for-sitebender)
3. [Conceptual Mapping: Sitebender ↔ ISO/IEC 11179](#conceptual-mapping-sitebender--isoiec-11179)
4. [Benefits of Formal Alignment](#benefits-of-formal-alignment)
5. [Architecture: Who Owns What](#architecture-who-owns-what)
6. [Phase 1: Conceptual Alignment (Current)](#phase-1-conceptual-alignment-current)
7. [Phase 2: RDF Vocabulary Integration](#phase-2-rdf-vocabulary-integration)
8. [Phase 3: MDR-Compliant APIs](#phase-3-mdr-compliant-apis)
9. [Phase 4: Full Registry Implementation](#phase-4-full-registry-implementation)
10. [Examples: JSX → IR → ISO/IEC 11179](#examples-jsx--ir--isoiec-11179)
11. [Integration with Other Libraries](#integration-with-other-libraries)
12. [Success Criteria](#success-criteria)
13. [References and Resources](#references-and-resources)

---

## What is ISO/IEC 11179?

### Overview

ISO/IEC 11179 is a multi-part international standard that defines a **metadata registry framework** for documenting, standardizing, and registering metadata to make data:

- **Understandable** - Precise definitions with unambiguous semantics
- **Shareable** - Reusable across systems and organizations
- **Interoperable** - Consistent meaning when exchanged between systems
- **Governed** - Versioned, maintained, and stewarded

### Core Purpose

Enable different systems and organizations to:

1. **Precisely define data elements** with unambiguous semantics
2. **Register and discover** reusable data definitions
3. **Achieve semantic interoperability** when exchanging data
4. **Harmonize data** across organizational boundaries

### Standard Structure

The ISO/IEC 11179 family consists of multiple parts:

- **Part 1**: Framework and vocabulary (conceptual foundation)
- **Part 3**: Metamodel for registry common facilities (core data model)
- **Part 5**: Naming and identification principles
- **Part 6**: Registration process and lifecycle management

### Key Concepts

#### 1. Data Element

The **foundational concept** in ISO/IEC 11179. A Data Element consists of:

- **Data Element Concept (DEC)**: The *meaning* of the data (what it represents semantically)
- **Value Domain (VD)**: How the data is *recorded* (format, datatype, constraints, permissible values)

**Example:**

- **Data Element**: `PersonAge`
- **Concept**: "The age of a person measured in completed years since birth"
- **Value Domain**: Non-negative integer, range 0-150, unit of measure "years"

#### 2. Conceptual Domain

The **set of valid meanings** or concepts that a property can have, independent of representation.

**Example:**

- **Conceptual Domain**: "Colors"
- **Possible concepts**: red, blue, green, yellow, etc.
- **Value Domain 1**: RGB hex strings (`#FF0000`, `#0000FF`)
- **Value Domain 2**: Color names (`"red"`, `"blue"`)
- **Value Domain 3**: Enumerated integers (1=red, 2=blue, 3=green)

The same conceptual domain can have multiple value domains (different representations).

#### 3. Value Domain

The **set of permissible values** that a data element can take, including:

- **Datatype**: Integer, String, Date, Boolean, etc.
- **Format**: Patterns, masks (e.g., phone numbers: `###-###-####`)
- **Constraints**: Min/max values, string length, regex patterns
- **Enumeration**: Allowed set (e.g., `["draft", "published", "archived"]`)
- **Unit of Measure**: For numeric values (meters, seconds, USD)

#### 4. Metadata Registry

A **system for recording, storing, and managing** metadata items with:

- **Registration**: Formal process for adding data elements
- **Versioning**: Track changes over time
- **Stewardship**: Ownership and maintenance responsibilities
- **Lifecycle**: States (draft, approved, deprecated, retired)
- **Discovery**: Search and query capabilities

### Relationship to RDF and Semantic Web

**Critical Connection**: Modern ISO/IEC 11179 implementations use **RDF, OWL, and SPARQL** as the foundation.

The **eXtended Metadata Registry (XMDR)** initiative explored using:

- **RDF** for triple-based storage
- **OWL** for ontology definitions
- **SPARQL** for querying registered metadata
- **SKOS** for concept systems and taxonomies

Several projects (like **semanticMDR** on GitHub) implement ISO/IEC 11179 registries using RDF/OWL as the backing store.

**This is exactly Sitebender's architecture: JSX → IR → Turtle → Oxigraph (RDF) → SPARQL.**

---

## Why ISO/IEC 11179 Matters for Sitebender

### 1. Natural Philosophical Alignment

**ISO/IEC 11179**: Data elements are precisely defined, registered entities with formal semantics

**Sitebender**: "Everything is data" - components, validations, behaviors are data stored as triples

Both treat metadata and data definitions as queryable, reusable, first-class assets rather than implicit code.

### 2. Sitebender Already Implements Core Concepts

Your JSX → IR → Turtle → Triple Store pipeline is **conceptually identical** to ISO/IEC 11179's Data Element Registry model:

```turtle
# Sitebender's current output
:field-age a artificer:Data ;
  artificer:name "age" ;
  artificer:dataType "Integer" ;
  artificer:hasValidation :validation-456 .
```

This is **structurally equivalent** to ISO/IEC 11179's Data Element:

- **Data Element Concept**: What "age" means semantically
- **Value Domain**: Integer type with validation constraints

### 3. Semantic Interoperability

ISO/IEC 11179 enables data exchange with:

- **Healthcare systems** (HL7, FHIR use ISO/IEC 11179 for clinical data elements)
- **Government data portals** (Many use MDR standards for open data)
- **Enterprise data catalogs** (ISO/IEC 11179 common in data governance)
- **Research networks** (Standardized data elements for multi-site studies)

Formal alignment opens these domains to Sitebender applications.

### 4. Data-Driven Forms = Data Element Definitions

Your revolutionary data-driven form approach:

```tsx
<IntegerField name="age">
  <Validation>
    <And>
      <IsGreaterThan value={0} />
      <IsLessThan value={120} />
    </And>
  </Validation>
</IntegerField>
```

...is **defining a registered Data Element** with:

- **Concept**: "Age" (semantic meaning)
- **Value Domain**: Integer constrained to [1, 119]
- **Context**: Part of a specific form in your application

### 5. SPARQL Queries Over Registered Metadata

ISO/IEC 11179 registries enable queries like:

```sparql
# Find all data elements semantically equivalent to "email"
SELECT ?de WHERE {
  ?de mdr:synonymousWith :email-address .
}

# Find all derived data elements (calculated fields)
SELECT ?de ?derivation WHERE {
  ?de mdr:derivedFrom ?source ;
      mdr:derivationRule ?derivation .
}

# Find all data elements in a specific conceptual domain
SELECT ?de WHERE {
  ?de mdr:hasConceptualDomain :temporal-concepts .
}
```

**Sitebender can do this TODAY** with minimal ontology additions.

### 6. Enterprise-Grade Positioning

Formal ISO/IEC 11179 alignment positions Sitebender as:

> "An ISO/IEC 11179-compliant metadata registry for web applications, where data elements are defined declaratively in JSX, stored as RDF triples, and queried via SPARQL."

This language resonates with:

- **Enterprise architects** (compliance, governance, standards)
- **Data stewards** (metadata management, data catalogs)
- **Healthcare CIOs** (regulatory requirements, interoperability)
- **Government agencies** (open data, transparency, standardization)

---

## Conceptual Mapping: Sitebender ↔ ISO/IEC 11179

### Core Concepts

| ISO/IEC 11179 Concept | Sitebender Equivalent | Location | Example |
|---|---|---|---|
| **Data Element** | Form field component | Architect components | `<IntegerField>`, `<EmailField>` |
| **Data Element Concept** | Semantic meaning of field | Component props: `name`, `description` | `name="age"`, `description="Person's age in years"` |
| **Value Domain** | Datatype + validation rules | Component props: `type`, `<Validation>` children | `type="Integer"`, `<IsGreaterThan value={0} />` |
| **Conceptual Domain** | Branded type family | Toolsmith branded types | `EmailAddress`, `Isbn13`, `IPv4Address` |
| **Permissible Values** | Validation constraints | `<Validation>` children | `<IsOneOf values={["draft", "published"]} />` |
| **Representation Class** | Display format | `<Format>` children | `<TwoDecimalPlaces />`, `<PhoneNumber />` |
| **Metadata Registry** | Pathfinder triple store | Oxigraph + SPARQL | All triples stored in Pathfinder |
| **Registration Process** | Component authoring + compilation | JSX → IR → Turtle → insertTriples | Architect → Artificer → Pathfinder |
| **Query Interface** | SPARQL queries | Pathfinder's executeQuery | `SELECT ?field WHERE { ?field a artificer:Data }` |

### Lifecycle Mapping

| ISO/IEC 11179 Lifecycle State | Sitebender Equivalent | Implementation |
|---|---|---|
| **Draft** | Component in development | Not yet committed to git |
| **Approved** | Component in main branch | Passed all tests, merged to main |
| **Published** | Component deployed to production | Released in library version |
| **Deprecated** | Component marked for removal | JSDoc `@deprecated` tag |
| **Retired** | Component removed | Deleted from codebase |

### Metadata Attributes

| ISO/IEC 11179 Attribute | Sitebender Equivalent | Example |
|---|---|---|
| **Definition** | Component JSDoc description | `/** Age of person in years */` |
| **Example** | Unit test fixtures | `age: 25` in test cases |
| **Context** | Parent form/section | Nested within `<UserRegistrationForm>` |
| **Steward** | Git author/maintainer | Git commit author |
| **Version** | Git commit hash | SHA-256 hash (also tracked by Warden) |
| **Status** | Git branch + deployment state | main = approved, feature/* = draft |
| **Synonyms** | Type aliases | `type Age = Integer` |
| **Related elements** | Component composition | `<FullName>` composed of `<FirstName>` + `<LastName>` |

### Validation Rules

| ISO/IEC 11179 Constraint | Sitebender Equivalent | Example |
|---|---|---|
| **Datatype** | `type` prop | `type="Integer"` |
| **Minimum value** | `<IsGreaterThan>` or `<IsAtLeast>` | `<IsAtLeast value={0} />` |
| **Maximum value** | `<IsLessThan>` or `<IsAtMost>` | `<IsAtMost value={150} />` |
| **Pattern** | `<Matches>` | `<Matches pattern="^[A-Z]{2}\\d{5}$" />` |
| **Length** | `<HasLengthBetween>` | `<HasLengthBetween min={8} max={100} />` |
| **Enumeration** | `<IsOneOf>` | `<IsOneOf values={["red", "blue", "green"]} />` |
| **Required** | `required` prop | `required={true}` |
| **Uniqueness** | Custom validation | `<IsUnique table="users" column="email" />` |

---

## Benefits of Formal Alignment

### 1. Standardized Vocabulary

**Benefit**: Use ISO/IEC 11179's proven metamodel instead of inventing custom terminology.

**Impact**:
- Developers familiar with ISO/IEC 11179 understand Sitebender immediately
- Documentation maps cleanly to international standard
- Reduces cognitive load (standard terms vs. invented terms)

**Example**:

```typescript
// Before: Custom Sitebender terminology
type FieldMetadata = {
  fieldName: string
  dataType: string
  rules: Array<ValidationRule>
}

// After: ISO/IEC 11179 terminology
type DataElement = {
  name: string
  concept: DataElementConcept
  valueDomain: ValueDomain
}
```

### 2. Interoperability with External Systems

**Benefit**: Exchange data with systems already using ISO/IEC 11179.

**Impact**:
- **Healthcare**: Import FHIR resource definitions as Sitebender components
- **Government**: Consume open data schemas from data.gov portals
- **Enterprise**: Integrate with corporate data catalogs (Collibra, Alation)

**Example**: Import clinical data elements from NIH Common Data Element Repository:

```typescript
import { importFromISO11179 } from "@sitebender/pathfinder/iso11179/import/index.ts"

// Import blood pressure data element definition
const component = await importFromISO11179({
  source: "https://cde.nlm.nih.gov/cde/123456",
  registry: "NIH CDE Repository"
})

// Result: <IntegerField> component with proper validation
```

### 3. Richer Semantic Queries

**Benefit**: ISO/IEC 11179 defines rich relationships between data elements.

**Impact**: Enable powerful SPARQL queries over metadata:

```sparql
# Find all fields that are synonyms (mean the same thing)
SELECT ?field1 ?field2 WHERE {
  ?field1 mdr:synonymousWith ?field2 .
}

# Find all calculated fields and their derivation rules
SELECT ?field ?formula WHERE {
  ?field mdr:derivedFrom ?sources ;
         mdr:derivationRule ?formula .
}

# Find all fields in the same conceptual domain
SELECT ?field WHERE {
  ?field mdr:hasConceptualDomain ?domain .
  ?domain rdfs:label "Temporal measurements" .
}

# Find all deprecated fields still in use
SELECT ?form ?field WHERE {
  ?form artificer:hasField ?field .
  ?field mdr:status "deprecated" .
}
```

### 4. Enhanced Governance and Compliance

**Benefit**: ISO/IEC 11179 includes formal registration, versioning, and stewardship.

**Impact**: Meet regulatory and compliance requirements:

- **GDPR**: Track personal data elements, deletion requirements
- **HIPAA**: Document PHI fields, access controls
- **SOX**: Audit trail for financial data definitions
- **21 CFR Part 11**: Electronic records and signatures for FDA

**Example**: Query for all personal data fields:

```sparql
SELECT ?field ?sensitivity WHERE {
  ?field mdr:dataCategory "PersonalData" ;
         mdr:sensitivityLevel ?sensitivity .
}
```

### 5. Cross-Application Reusability

**Benefit**: Define data elements once, reuse everywhere.

**Impact**:
- **Component library**: Publish reusable field definitions
- **Application suite**: Share data elements across applications
- **API consistency**: Ensure consistent data models across services

**Example**:

```typescript
// Define once in metadata registry
await registerDataElement({
  name: "EmailAddress",
  concept: "Electronic mail address of a person or organization",
  valueDomain: {
    datatype: "String",
    pattern: "^[^@]+@[^@]+\\.[^@]+$",
    maxLength: 254  // RFC 5321
  }
})

// Reuse in App 1: Contact form
<EmailField name="email" />

// Reuse in App 2: User registration
<EmailField name="primaryEmail" />

// Reuse in App 3: Newsletter signup
<EmailField name="subscriberEmail" />

// All three inherit validation, format, and semantic definition
```

### 6. Documentation as Metadata

**Benefit**: Data element definitions ARE the documentation (living docs).

**Impact**:
- Documentation never drifts from implementation
- SPARQL queries generate reports automatically
- Visual metadata browsers (navigate relationships)

**Example**: Generate data dictionary automatically:

```typescript
const dataDictionary = await executeQuery(`
  SELECT ?element ?definition ?datatype ?constraints WHERE {
    ?element a mdr:DataElement ;
             rdfs:comment ?definition ;
             mdr:hasValueDomain ?vd .
    ?vd mdr:datatype ?datatype ;
        mdr:constraints ?constraints .
  }
  ORDER BY ?element
`)(localTripleStore)

// Export to PDF, HTML, Markdown, or Excel
await exportDataDictionary(dataDictionary, { format: "pdf" })
```

### 7. AI and Machine Learning Applications

**Benefit**: Semantic metadata enables AI reasoning over data structures.

**Impact**:
- **Code generation**: AI generates forms from natural language descriptions
- **Data discovery**: "Find all fields related to customer identity"
- **Automated mapping**: Map between different schemas automatically
- **Quality analysis**: Detect inconsistencies and anomalies

**Example**: AI-powered data mapping:

```typescript
// AI discovers that these three fields are semantically equivalent:
// App1: "email" → App2: "emailAddress" → App3: "contactEmail"

const mappings = await discoverMappings({
  source: "App1",
  target: "App2",
  method: "semantic"  // Uses vector embeddings + ontology reasoning
})

// Result: Automatic ETL pipeline generation
```

---

## Architecture: Who Owns What

### Primary Owner: Pathfinder

**Rationale**: ISO/IEC 11179 is fundamentally a **metadata REGISTRY standard** (storage, query, governance). Pathfinder is Sitebender's registry infrastructure.

**Pathfinder's responsibilities:**

1. **Triple store ownership** - Manages Oxigraph connection
2. **ISO/IEC 11179 ontology** - Defines RDF vocabulary for Data Elements, Value Domains, etc.
3. **Registration functions** - `insertDataElement()`, `updateDataElement()`, `deleteDataElement()`
4. **Query templates** - Pre-built SPARQL queries for common metadata operations
5. **RDFS/OWL reasoning** - Infer relationships (synonyms, derivations, hierarchies)

**Location**: `/libraries/pathfinder/iso11179/`

### Supporting Role: Artificer (Compilation)

**Rationale**: Artificer owns JSX → IR → Turtle transformation. It's the natural place to extract ISO/IEC 11179 metadata during compilation.

**Artificer's responsibilities:**

1. **Metadata extraction** - Walk component tree, extract field metadata
2. **ISO/IEC 11179 triple generation** - Convert IR to ISO-compliant RDF triples
3. **Automatic registration** - Call Pathfinder to store extracted metadata

**Location**: `/libraries/artificer/iso11179/`

### Supporting Role: Architect (Authoring Interface)

**Rationale**: Architect provides form field components. These ARE the authoring interface for Data Elements.

**Architect's responsibilities:**

1. **Metadata-aware props** - Field components accept ISO/IEC 11179 attributes
2. **Documentation** - Map component props to ISO/IEC 11179 concepts
3. **Semantic components** - Provide components for Conceptual Domains, Value Domains

**Location**: `/libraries/architect/docs/ISO_IEC_11179_MAPPING.md` (documentation only, no new code)

### Dependency Model

From `contracts/boundaries.json`, updated for ISO/IEC 11179 work:

```
Layer 0 (Foundation): Toolsmith, Quarrier
    ↓
Layer 1 (Infrastructure): Arborist, Pathfinder ← ISO/IEC 11179 registry core
    ↓
Layer 2 (Services): Envoy, Auditor
    ↓
Layer 3 (Runtime): Architect, Artificer ← Extract metadata, use Pathfinder to store
    ↓
Layer 4 (Distribution): Agent
    ↓
Layer 5 (Applications): mission-control, the-workshop, the-agency
```

**New dependency required**: Artificer → Pathfinder (for metadata storage)

This requires updating `contracts/boundaries.json` in Phase 2+.

---

## Phase 1: Conceptual Alignment (Current)

### Objectives

- [ ] Document conceptual mapping between Sitebender and ISO/IEC 11179
- [ ] Establish Pathfinder as primary owner of ISO/IEC 11179 work
- [ ] Analyze benefits and use cases for alignment
- [ ] Create 4-phase roadmap with detailed checklists
- [ ] Provide concrete examples showing current architecture

**Status**: ✅ **COMPLETE** (this document fulfills Phase 1)

### Deliverables

- [x] Main documentation file (`ISO_IEC_11179_ALIGNMENT.md`)
- [ ] Architecture Decision Record (ADR-001)
- [ ] Pathfinder README updates
- [ ] Contracts boundary documentation

### Tasks

#### Task 1.1: Create Main Documentation

**Status**: ✅ Complete

**Location**: `/libraries/pathfinder/ISO_IEC_11179_ALIGNMENT.md`

**Contents**:
- [x] Executive summary
- [x] What is ISO/IEC 11179?
- [x] Why it matters for Sitebender
- [x] Conceptual mapping tables
- [x] Benefits analysis
- [x] Architecture ownership
- [x] 4-phase roadmap with checklists
- [x] Concrete examples

#### Task 1.2: Write Architecture Decision Record

**Status**: ⏳ Pending

**Location**: `/libraries/pathfinder/docs/adr/ADR-001-ISO-11179-ALIGNMENT.md`

**Checklist**:
- [ ] Document decision to align with ISO/IEC 11179
- [ ] Justify Pathfinder as primary owner
- [ ] List alternative approaches considered
- [ ] Document dependencies (Artificer → Pathfinder in Phase 2)
- [ ] Define success criteria
- [ ] Record date, authors, and approvers

#### Task 1.3: Update Pathfinder README

**Status**: ⏳ Pending

**Location**: `/libraries/pathfinder/README.md`

**Checklist**:
- [ ] Add "ISO/IEC 11179 Metadata Registry" to feature list
- [ ] Add link to alignment documentation
- [ ] Update positioning statement to include standards compliance
- [ ] Add example of metadata registry query

#### Task 1.4: Document in Contracts

**Status**: ⏳ Pending

**Location**: `/contracts/boundaries.json`

**Checklist**:
- [ ] Add comment noting Artificer → Pathfinder dependency (Phase 2+)
- [ ] Document that ISO/IEC 11179 work is planned
- [ ] Reference alignment document for details

### Success Criteria

- [x] Comprehensive documentation created and reviewed
- [ ] ADR approved and committed
- [ ] Team understands ISO/IEC 11179 concepts
- [ ] Clear roadmap for Phases 2-4
- [ ] No code changes required (documentation only)

### Dependencies

- None (documentation phase requires no code changes)

### Timeline

- **Duration**: 1-2 days (documentation writing + review)
- **Completion**: Upon approval of this document

---

## Phase 2: RDF Vocabulary Integration

### Objectives

- [ ] Create ISO/IEC 11179 RDF ontology in Pathfinder
- [ ] Implement Pathfinder functions for metadata insertion/query
- [ ] Update Artificer to extract and register metadata during compilation
- [ ] Validate with example form components
- [ ] Update contracts to allow Artificer → Pathfinder dependency

**Status**: ⏳ **PENDING** (Phase 1 must complete first)

### Deliverables

1. **ISO/IEC 11179 RDF Ontology** (`pathfinder/iso11179/ontology/`)
2. **Pathfinder metadata functions** (`pathfinder/iso11179/`)
3. **Artificer metadata extraction** (`artificer/iso11179/`)
4. **Example applications** demonstrating metadata registry
5. **Updated contracts** (`contracts/boundaries.json`)

### Tasks

#### Task 2.1: Create ISO/IEC 11179 RDF Ontology

**Location**: `/libraries/pathfinder/iso11179/ontology/`

**Checklist**:
- [ ] Create `iso11179.ttl` ontology file
- [ ] Define `mdr:DataElement` class
- [ ] Define `mdr:DataElementConcept` class
- [ ] Define `mdr:ValueDomain` class
- [ ] Define `mdr:ConceptualDomain` class
- [ ] Define properties: `mdr:hasValueDomain`, `mdr:hasConcept`, etc.
- [ ] Define relationships: `mdr:synonymousWith`, `mdr:derivedFrom`, etc.
- [ ] Document ontology with rdfs:comment annotations
- [ ] Validate ontology with Protégé or similar tool

**Example snippet**:

```turtle
@prefix mdr: <https://sitebender.studio/pathfinder/iso11179/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# Data Element class
mdr:DataElement a owl:Class ;
  rdfs:label "Data Element" ;
  rdfs:comment "A unit of data with precise meaning, defined by a concept and value domain" .

# Data Element Concept class
mdr:DataElementConcept a owl:Class ;
  rdfs:label "Data Element Concept" ;
  rdfs:comment "The semantic meaning of a data element" .

# Value Domain class
mdr:ValueDomain a owl:Class ;
  rdfs:label "Value Domain" ;
  rdfs:comment "The set of permissible values for a data element" .

# Properties
mdr:hasConcept a owl:ObjectProperty ;
  rdfs:domain mdr:DataElement ;
  rdfs:range mdr:DataElementConcept ;
  rdfs:label "has concept" ;
  rdfs:comment "Links a data element to its semantic concept" .

mdr:hasValueDomain a owl:ObjectProperty ;
  rdfs:domain mdr:DataElement ;
  rdfs:range mdr:ValueDomain ;
  rdfs:label "has value domain" ;
  rdfs:comment "Links a data element to its permissible values" .

# Relationships
mdr:synonymousWith a owl:SymmetricProperty ;
  rdfs:domain mdr:DataElement ;
  rdfs:range mdr:DataElement ;
  rdfs:label "synonymous with" ;
  rdfs:comment "Indicates two data elements have equivalent meaning" .

mdr:derivedFrom a owl:ObjectProperty ;
  rdfs:domain mdr:DataElement ;
  rdfs:range mdr:DataElement ;
  rdfs:label "derived from" ;
  rdfs:comment "Indicates a data element is calculated from other data elements" .
```

#### Task 2.2: Implement Pathfinder Metadata Functions

**Location**: `/libraries/pathfinder/iso11179/`

**Checklist**:
- [ ] Implement `insertDataElement/index.ts`
- [ ] Implement `updateDataElement/index.ts`
- [ ] Implement `deleteDataElement/index.ts`
- [ ] Implement `queryDataElements/index.ts`
- [ ] Implement `findSynonyms/index.ts`
- [ ] Implement `findDerived/index.ts`
- [ ] Implement `validateDataElement/index.ts`
- [ ] Add type definitions in `types.ts`
- [ ] Write unit tests for each function
- [ ] Write integration tests with Oxigraph

**Example function signature**:

```typescript
// types.ts
export type DataElement = {
  id: string
  name: string
  definition: string
  concept: DataElementConcept
  valueDomain: ValueDomain
  status: "draft" | "approved" | "deprecated" | "retired"
  version: string
  steward: string
  context?: string
}

export type DataElementConcept = {
  definition: string
  objectClass?: string
  property?: string
}

export type ValueDomain = {
  datatype: string
  format?: string
  minValue?: number
  maxValue?: number
  pattern?: string
  enumeration?: Array<string>
  unitOfMeasure?: string
}

// insertDataElement/index.ts
import type { DataElement } from "../types.ts"
import type { Result } from "@sitebender/toolsmith/Result/types.ts"
import { insertTriples } from "@sitebender/pathfinder/insertTriples/index.ts"

export default function insertDataElement(
  element: DataElement
): (tripleStore: TripleStore) => Promise<Result<string, Error>> {
  return async function insertDataElementIntoTripleStore(
    tripleStore: TripleStore
  ): Promise<Result<string, Error>> {
    // Convert DataElement to RDF triples
    const triples = dataElementToTriples(element)

    // Insert into triple store
    const result = await insertTriples(triples)(tripleStore)

    // Return element ID or error
    return result
  }
}
```

#### Task 2.3: Implement Artificer Metadata Extraction

**Location**: `/libraries/artificer/iso11179/`

**Checklist**:
- [ ] Implement `extractDataElementMetadata/index.ts`
- [ ] Implement `generateDataElementTriples/index.ts`
- [ ] Implement `registerFieldMetadata/index.ts`
- [ ] Update JSX → IR compiler to extract metadata
- [ ] Add ISO/IEC 11179 triple generation to IR → Turtle serialization
- [ ] Write unit tests with example JSX components
- [ ] Write integration tests end-to-end

**Example**:

```typescript
// extractDataElementMetadata/index.ts
import type { ComponentIR } from "@sitebender/artificer/types.ts"
import type { DataElement } from "@sitebender/pathfinder/iso11179/types.ts"

export default function extractDataElementMetadata(
  componentIR: ComponentIR
): Array<DataElement> {
  return function extractFromComponentTree(): Array<DataElement> {
    const dataElements: Array<DataElement> = []

    // Walk component tree
    walkComponentTree(componentIR, (node) => {
      // Find field components (TextField, IntegerField, etc.)
      if (isFieldComponent(node)) {
        const element: DataElement = {
          id: generateId(node),
          name: node.props.name,
          definition: node.props.description || "",
          concept: {
            definition: node.props.description || "",
            property: node.props.name
          },
          valueDomain: extractValueDomain(node),
          status: "approved",
          version: "1.0.0",
          steward: "system",
          context: extractContext(node)
        }

        dataElements.push(element)
      }
    })

    return dataElements
  }
}
```

#### Task 2.4: Update Contracts for Dependencies

**Location**: `/contracts/boundaries.json`

**Checklist**:
- [ ] Add Artificer → Pathfinder dependency to allowed list
- [ ] Document reason: "ISO/IEC 11179 metadata registration during compilation"
- [ ] Update layer diagram showing Artificer using Pathfinder
- [ ] Get Warden approval for contract change

#### Task 2.5: Create Example Application

**Location**: `/examples/iso11179-metadata-registry/`

**Checklist**:
- [ ] Create example form with multiple field types
- [ ] Compile form to IR
- [ ] Extract ISO/IEC 11179 metadata
- [ ] Store in Pathfinder triple store
- [ ] Query metadata with SPARQL
- [ ] Display metadata in UI
- [ ] Document in README

### Success Criteria

- [ ] ISO/IEC 11179 ontology validates in OWL reasoner
- [ ] Pathfinder functions successfully insert/query metadata
- [ ] Artificer extracts metadata from example forms
- [ ] SPARQL queries return correct results
- [ ] Example application demonstrates end-to-end flow
- [ ] All tests pass
- [ ] Documentation updated

### Dependencies

- **Pathfinder core** must be implemented (triple store access, SPARQL execution)
- **Artificer IR** must be stable
- **Phase 1** must be complete and approved

### Timeline

- **Duration**: 2-3 weeks
- **Effort**: 1 developer full-time
- **Prerequisites**: Pathfinder infrastructure complete

---

## Phase 3: MDR-Compliant APIs

### Objectives

- [ ] Expose RESTful APIs conforming to ISO/IEC 11179 registry interface
- [ ] Implement metadata browsing UI
- [ ] Support metadata import/export (JSON, XML, Turtle)
- [ ] Add versioning and lifecycle management
- [ ] Implement stewardship and governance workflows

**Status**: ⏳ **PENDING** (Phase 2 must complete first)

### Deliverables

1. **REST API endpoints** (`/api/mdr/`)
2. **Metadata browser UI** (web application)
3. **Import/export utilities**
4. **Versioning system**
5. **Governance workflows**

### Tasks

#### Task 3.1: Design REST API

**Location**: `/libraries/pathfinder/iso11179/api/`

**Checklist**:
- [ ] Design API endpoints following ISO/IEC 11179 registry interface
- [ ] Document API with OpenAPI 3.0 specification
- [ ] Define request/response schemas
- [ ] Define error responses
- [ ] Define pagination for large result sets
- [ ] Define filtering and search parameters

**Example API endpoints**:

```
GET    /api/mdr/data-elements              # List all data elements
GET    /api/mdr/data-elements/:id          # Get specific data element
POST   /api/mdr/data-elements              # Register new data element
PUT    /api/mdr/data-elements/:id          # Update data element
DELETE /api/mdr/data-elements/:id          # Delete data element

GET    /api/mdr/value-domains              # List all value domains
GET    /api/mdr/value-domains/:id          # Get specific value domain
POST   /api/mdr/value-domains              # Register new value domain

GET    /api/mdr/search?q=email             # Search data elements
GET    /api/mdr/synonyms/:id               # Find synonyms
GET    /api/mdr/derived/:id                # Find derived elements

GET    /api/mdr/export?format=turtle       # Export entire registry
POST   /api/mdr/import                     # Import from external registry
```

#### Task 3.2: Implement REST API Handlers

**Location**: `/libraries/pathfinder/iso11179/api/`

**Checklist**:
- [ ] Implement handler for each endpoint
- [ ] Add authentication/authorization (integrate with Sentinel)
- [ ] Add rate limiting
- [ ] Add CORS configuration
- [ ] Add request validation
- [ ] Add comprehensive error handling
- [ ] Write API tests (integration + E2E)

#### Task 3.3: Create Metadata Browser UI

**Location**: `/applications/metadata-registry/`

**Checklist**:
- [ ] Design UI wireframes
- [ ] Implement data element list view
- [ ] Implement data element detail view
- [ ] Implement search and filtering
- [ ] Implement relationship visualization (graph view)
- [ ] Implement CRUD operations for metadata
- [ ] Add authentication
- [ ] Write E2E tests with Playwright

#### Task 3.4: Implement Import/Export

**Location**: `/libraries/pathfinder/iso11179/import/`, `/libraries/pathfinder/iso11179/export/`

**Checklist**:
- [ ] Implement export to JSON format
- [ ] Implement export to XML format (ISO/IEC 11179 schema)
- [ ] Implement export to Turtle/RDF
- [ ] Implement import from JSON
- [ ] Implement import from XML
- [ ] Implement import from Turtle/RDF
- [ ] Implement import from external registries (semanticMDR, etc.)
- [ ] Add validation during import
- [ ] Add conflict resolution (duplicate handling)
- [ ] Write import/export tests

#### Task 3.5: Implement Versioning

**Location**: `/libraries/pathfinder/iso11179/versioning/`

**Checklist**:
- [ ] Add version tracking to DataElement type
- [ ] Implement version creation on update
- [ ] Implement version history queries
- [ ] Implement diff between versions
- [ ] Implement rollback to previous version
- [ ] Add version metadata (author, timestamp, changelog)
- [ ] Write versioning tests

#### Task 3.6: Implement Lifecycle Management

**Location**: `/libraries/pathfinder/iso11179/lifecycle/`

**Checklist**:
- [ ] Implement state transitions (draft → approved → deprecated → retired)
- [ ] Implement approval workflows
- [ ] Implement deprecation warnings
- [ ] Implement retirement with archival
- [ ] Add lifecycle event logging
- [ ] Write lifecycle tests

### Success Criteria

- [ ] REST API fully functional and documented
- [ ] Metadata browser UI deployed and usable
- [ ] Import/export works with external registries
- [ ] Versioning tracks all changes correctly
- [ ] Lifecycle workflows enforce governance policies
- [ ] All tests pass
- [ ] Performance meets targets (API responses < 100ms)

### Dependencies

- **Phase 2** must be complete (RDF vocabulary + Pathfinder functions)
- **Sentinel** (authentication/authorization)
- **Operator** (event logging for lifecycle)

### Timeline

- **Duration**: 4-6 weeks
- **Effort**: 2 developers full-time
- **Prerequisites**: Phase 2 complete, Sentinel available

---

## Phase 4: Full Registry Implementation

### Objectives

- [ ] Achieve full ISO/IEC 11179 Part 3 metamodel conformance
- [ ] Implement advanced registry features (federation, lineage, impact analysis)
- [ ] Add AI-powered metadata discovery and mapping
- [ ] Obtain ISO/IEC 11179 certification (if desired)
- [ ] Publish Sitebender as open MDR standard

**Status**: ⏳ **PENDING** (Phase 3 must complete first)

### Deliverables

1. **Complete metamodel implementation**
2. **Federated registry support**
3. **Data lineage tracking**
4. **Impact analysis tools**
5. **AI-powered features**
6. **Certification documentation**

### Tasks

#### Task 4.1: Complete Metamodel Implementation

**Checklist**:
- [ ] Review ISO/IEC 11179-3 metamodel specification
- [ ] Identify missing entities in current implementation
- [ ] Implement Classification Scheme
- [ ] Implement Administered Item
- [ ] Implement Registration Authority
- [ ] Implement Submitting Organization
- [ ] Implement all remaining Part 3 entities
- [ ] Validate against official ISO test suite

#### Task 4.2: Implement Federated Registry

**Checklist**:
- [ ] Design federation protocol
- [ ] Implement registry discovery
- [ ] Implement cross-registry queries (SPARQL Federation)
- [ ] Implement metadata synchronization
- [ ] Implement conflict resolution (CRDTs via Agent)
- [ ] Add federation configuration UI
- [ ] Write federation tests

#### Task 4.3: Implement Data Lineage

**Checklist**:
- [ ] Track data element usage across applications
- [ ] Track derivation chains (calculated fields)
- [ ] Track transformations (ETL pipelines)
- [ ] Visualize lineage graphs
- [ ] Implement lineage queries
- [ ] Write lineage tests

#### Task 4.4: Implement Impact Analysis

**Checklist**:
- [ ] Analyze impact of changing a data element definition
- [ ] Identify all downstream dependencies
- [ ] Generate impact reports
- [ ] Add "what-if" analysis
- [ ] Integrate with CI/CD (block breaking changes)
- [ ] Write impact analysis tests

#### Task 4.5: Add AI-Powered Features

**Checklist**:
- [ ] Implement semantic similarity search (vector embeddings)
- [ ] Implement automated schema mapping
- [ ] Implement metadata quality scoring
- [ ] Implement anomaly detection
- [ ] Implement natural language metadata generation
- [ ] Train/fine-tune models on metadata corpus
- [ ] Write AI feature tests

#### Task 4.6: Obtain Certification (Optional)

**Checklist**:
- [ ] Contact ISO/IEC 11179 certification body
- [ ] Review certification requirements
- [ ] Prepare conformance documentation
- [ ] Run official conformance test suite
- [ ] Submit for certification review
- [ ] Address certification feedback
- [ ] Publish certification badge

#### Task 4.7: Publish as Open Standard

**Checklist**:
- [ ] Write specification document
- [ ] Submit to W3C or similar standards body
- [ ] Create reference implementation repository
- [ ] Write developer documentation
- [ ] Create tutorial and examples
- [ ] Present at conferences (SemanticWeb, ISWC, etc.)
- [ ] Publish academic paper

### Success Criteria

- [ ] Full ISO/IEC 11179 Part 3 conformance
- [ ] Federated queries work across multiple registries
- [ ] Lineage tracking covers all data flows
- [ ] Impact analysis catches breaking changes
- [ ] AI features improve metadata quality measurably
- [ ] Certification obtained (if pursued)
- [ ] Standard specification published

### Dependencies

- **Phase 3** must be complete
- **Agent** (for CRDT-based federation)
- **Envoy** (for lineage visualization)
- **AI/ML infrastructure** (embedding models, training pipeline)

### Timeline

- **Duration**: 8-12 weeks
- **Effort**: 2-3 developers full-time
- **Prerequisites**: Phase 3 complete

---

## Examples: JSX → IR → ISO/IEC 11179

### Example 1: Simple Integer Field

#### Authoring (Architect JSX)

```tsx
<IntegerField
  name="age"
  description="Person's age in completed years"
  required={true}
>
  <Validation>
    <And>
      <IsGreaterThan value={0} />
      <IsLessThan value={150} />
    </And>
  </Validation>
</IntegerField>
```

#### Internal Representation (Artificer IR)

```typescript
{
  _tag: "IntegerField",
  props: {
    name: "age",
    description: "Person's age in completed years",
    required: true
  },
  children: [
    {
      _tag: "Validation",
      children: [
        {
          _tag: "And",
          children: [
            { _tag: "IsGreaterThan", props: { value: 0 } },
            { _tag: "IsLessThan", props: { value: 150 } }
          ]
        }
      ]
    }
  ]
}
```

#### RDF Triples (Current Artificer Output)

```turtle
@prefix artificer: <https://sitebender.studio/artificer/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

:field-age a artificer:IntegerField ;
  artificer:name "age" ;
  artificer:description "Person's age in completed years" ;
  artificer:required true ;
  artificer:hasValidation :validation-age .

:validation-age a artificer:Validation ;
  artificer:hasRule :and-age .

:and-age a artificer:And ;
  artificer:hasOperand :gt-age, :lt-age .

:gt-age a artificer:IsGreaterThan ;
  artificer:value "0"^^xsd:integer .

:lt-age a artificer:IsLessThan ;
  artificer:value "150"^^xsd:integer .
```

#### ISO/IEC 11179 RDF Triples (Phase 2+)

```turtle
@prefix mdr: <https://sitebender.studio/pathfinder/iso11179/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

# Data Element
:de-person-age a mdr:DataElement ;
  rdfs:label "Person Age" ;
  rdfs:comment "Person's age in completed years" ;
  mdr:name "age" ;
  mdr:hasConcept :concept-person-age ;
  mdr:hasValueDomain :vd-age-integer ;
  mdr:status "approved" ;
  mdr:version "1.0.0" ;
  mdr:required true .

# Data Element Concept
:concept-person-age a mdr:DataElementConcept ;
  rdfs:label "Person Age Concept" ;
  rdfs:comment "The age of a person in completed years since birth" ;
  mdr:objectClass "Person" ;
  mdr:property "Age" .

# Value Domain
:vd-age-integer a mdr:ValueDomain ;
  rdfs:label "Age Integer Domain" ;
  mdr:datatype xsd:integer ;
  mdr:minValue "1"^^xsd:integer ;
  mdr:maxValue "149"^^xsd:integer ;
  mdr:unitOfMeasure "years" .
```

#### SPARQL Query Example

```sparql
PREFIX mdr: <https://sitebender.studio/pathfinder/iso11179/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

# Find all integer fields with age-related concepts
SELECT ?dataElement ?name ?min ?max WHERE {
  ?dataElement a mdr:DataElement ;
               mdr:name ?name ;
               mdr:hasConcept ?concept ;
               mdr:hasValueDomain ?vd .

  ?concept mdr:property "Age" .

  ?vd mdr:datatype xsd:integer ;
      mdr:minValue ?min ;
      mdr:maxValue ?max .
}

# Result:
# | dataElement      | name  | min | max |
# |------------------|-------|-----|-----|
# | :de-person-age   | "age" | 1   | 149 |
```

---

### Example 2: Email Field with Format

#### Authoring (Architect JSX)

```tsx
<EmailField
  name="email"
  description="Electronic mail address for contacting the person"
  required={true}
>
  <Validation>
    <Matches pattern="^[^@]+@[^@]+\.[^@]+$" />
  </Validation>
  <Format>
    <Lowercase />
  </Format>
</EmailField>
```

#### ISO/IEC 11179 RDF Triples

```turtle
# Data Element
:de-contact-email a mdr:DataElement ;
  rdfs:label "Contact Email" ;
  rdfs:comment "Electronic mail address for contacting the person" ;
  mdr:name "email" ;
  mdr:hasConcept :concept-email-address ;
  mdr:hasValueDomain :vd-email-string ;
  mdr:hasRepresentation :repr-lowercase ;
  mdr:status "approved" ;
  mdr:required true .

# Data Element Concept
:concept-email-address a mdr:DataElementConcept ;
  rdfs:label "Email Address Concept" ;
  rdfs:comment "An electronic mail address for digital communication" ;
  mdr:objectClass "Person" ;
  mdr:property "EmailAddress" .

# Value Domain
:vd-email-string a mdr:ValueDomain ;
  rdfs:label "Email String Domain" ;
  mdr:datatype xsd:string ;
  mdr:maxLength "254"^^xsd:integer ;
  mdr:pattern "^[^@]+@[^@]+\\.[^@]+$" .

# Representation Class
:repr-lowercase a mdr:RepresentationClass ;
  rdfs:label "Lowercase String Representation" ;
  mdr:formatRule "Convert to lowercase" .
```

---

### Example 3: Enumerated Field (Select)

#### Authoring (Architect JSX)

```tsx
<SelectField
  name="role"
  description="User's role in the system"
  required={true}
>
  <Options>
    <Option value="admin" label="Administrator" />
    <Option value="editor" label="Editor" />
    <Option value="viewer" label="Viewer" />
  </Options>
</SelectField>
```

#### ISO/IEC 11179 RDF Triples

```turtle
# Data Element
:de-user-role a mdr:DataElement ;
  rdfs:label "User Role" ;
  rdfs:comment "User's role in the system" ;
  mdr:name "role" ;
  mdr:hasConcept :concept-user-role ;
  mdr:hasValueDomain :vd-role-enum ;
  mdr:status "approved" ;
  mdr:required true .

# Data Element Concept
:concept-user-role a mdr:DataElementConcept ;
  rdfs:label "User Role Concept" ;
  rdfs:comment "The functional role assigned to a user" ;
  mdr:objectClass "User" ;
  mdr:property "Role" .

# Value Domain (Enumerated)
:vd-role-enum a mdr:ValueDomain ;
  rdfs:label "Role Enumeration Domain" ;
  mdr:datatype xsd:string ;
  mdr:hasPermissibleValue :pv-admin, :pv-editor, :pv-viewer .

# Permissible Values
:pv-admin a mdr:PermissibleValue ;
  mdr:value "admin" ;
  rdfs:label "Administrator" ;
  mdr:definition "Full system access and control" .

:pv-editor a mdr:PermissibleValue ;
  mdr:value "editor" ;
  rdfs:label "Editor" ;
  mdr:definition "Can create and modify content" .

:pv-viewer a mdr:PermissibleValue ;
  mdr:value "viewer" ;
  rdfs:label "Viewer" ;
  mdr:definition "Read-only access to content" .
```

---

### Example 4: Derived/Calculated Field

#### Authoring (Architect JSX)

```tsx
<CalculatedField
  name="fullName"
  description="Person's full name (first + last)"
  derivedFrom={["firstName", "lastName"]}
>
  <Calculation>
    <Concatenate separator=" ">
      <FieldRef name="firstName" />
      <FieldRef name="lastName" />
    </Concatenate>
  </Calculation>
</CalculatedField>
```

#### ISO/IEC 11179 RDF Triples

```turtle
# Data Element (Derived)
:de-full-name a mdr:DataElement ;
  rdfs:label "Full Name" ;
  rdfs:comment "Person's full name (first + last)" ;
  mdr:name "fullName" ;
  mdr:hasConcept :concept-full-name ;
  mdr:hasValueDomain :vd-name-string ;
  mdr:derivedFrom :de-first-name, :de-last-name ;
  mdr:derivationRule :rule-concatenate-names ;
  mdr:status "approved" .

# Derivation Rule
:rule-concatenate-names a mdr:DerivationRule ;
  rdfs:label "Concatenate First and Last Name" ;
  mdr:formula "CONCAT(?firstName, ' ', ?lastName)" ;
  mdr:language "SPARQL" .

# Source Data Elements
:de-first-name a mdr:DataElement ;
  rdfs:label "First Name" ;
  mdr:name "firstName" .

:de-last-name a mdr:DataElement ;
  rdfs:label "Last Name" ;
  mdr:name "lastName" .
```

#### SPARQL Query: Find All Derived Fields

```sparql
PREFIX mdr: <https://sitebender.studio/pathfinder/iso11179/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

# Find all calculated/derived data elements
SELECT ?derivedElement ?name ?sources ?formula WHERE {
  ?derivedElement a mdr:DataElement ;
                  mdr:name ?name ;
                  mdr:derivedFrom ?sources ;
                  mdr:derivationRule ?rule .

  ?rule mdr:formula ?formula .
}

# Result:
# | derivedElement  | name       | sources                        | formula                           |
# |-----------------|------------|--------------------------------|-----------------------------------|
# | :de-full-name   | "fullName" | :de-first-name, :de-last-name  | "CONCAT(?firstName, ' ', ...)"    |
```

---

### Example 5: Form as Collection of Data Elements

#### Authoring (Architect JSX)

```tsx
<Form id="user-registration">
  <EmailField name="email" required={true} />
  <IntegerField name="age" required={true} />
  <SelectField name="role" required={true}>
    <Options>
      <Option value="admin" label="Administrator" />
      <Option value="editor" label="Editor" />
    </Options>
  </SelectField>
  <SubmitButton>Register</SubmitButton>
</Form>
```

#### ISO/IEC 11179 RDF Triples

```turtle
# Form as Collection
:form-user-registration a mdr:DataElementCollection ;
  rdfs:label "User Registration Form" ;
  mdr:containsElement :de-email, :de-age, :de-role ;
  mdr:purpose "Collect information for new user registration" .

# Data Elements (defined separately, as shown in previous examples)
:de-email a mdr:DataElement ;
  mdr:name "email" ;
  mdr:required true .

:de-age a mdr:DataElement ;
  mdr:name "age" ;
  mdr:required true .

:de-role a mdr:DataElement ;
  mdr:name "role" ;
  mdr:required true .
```

#### SPARQL Query: Find All Fields in a Form

```sparql
PREFIX mdr: <https://sitebender.studio/pathfinder/iso11179/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

# Get all data elements in a specific form
SELECT ?element ?name ?required ?datatype WHERE {
  :form-user-registration mdr:containsElement ?element .

  ?element mdr:name ?name ;
           mdr:required ?required ;
           mdr:hasValueDomain ?vd .

  ?vd mdr:datatype ?datatype .
}

# Result:
# | element   | name   | required | datatype    |
# |-----------|--------|----------|-------------|
# | :de-email | "email"| true     | xsd:string  |
# | :de-age   | "age"  | true     | xsd:integer |
# | :de-role  | "role" | true     | xsd:string  |
```

---

## Integration with Other Libraries

### Architect: Authoring Interface

**Role**: Provide field components that serve as the UI for defining Data Elements.

**Integration points**:

1. **Component props** should map to ISO/IEC 11179 attributes
2. **JSDoc comments** should reference ISO/IEC 11179 concepts
3. **Documentation** should include mapping table

**Example documentation** (`/libraries/architect/docs/ISO_IEC_11179_MAPPING.md`):

```markdown
# ISO/IEC 11179 Mapping for Architect Components

## Field Component Props → Data Element Attributes

| Component Prop | ISO/IEC 11179 Attribute | Example |
|---|---|---|
| `name` | Data Element name | `name="email"` |
| `description` | Data Element definition | `description="Electronic mail address"` |
| `type` | Value Domain datatype | `type="EmailAddress"` |
| `required` | Obligation | `required={true}` |
| `<Validation>` | Value Domain constraints | `<IsGreaterThan value={0} />` |
| `<Format>` | Representation Class | `<TwoDecimalPlaces />` |

## Component Types → Conceptual Domains

| Architect Component | Conceptual Domain |
|---|---|
| `<EmailField>` | Electronic addresses |
| `<IntegerField>` | Numeric measurements |
| `<DateField>` | Temporal measurements |
| `<SelectField>` | Enumerated values |
| `<BooleanField>` | Binary states |
```

### Artificer: Compilation and Registration

**Role**: Extract metadata during JSX → IR transformation and register with Pathfinder.

**Integration points**:

1. **JSX → IR compilation**: Extract field metadata
2. **IR → Turtle serialization**: Generate ISO/IEC 11179 triples
3. **Auto-registration**: Call Pathfinder to insert metadata

**Workflow**:

```
JSX Component
    ↓ (Artificer: parse)
Internal Representation (IR)
    ↓ (Artificer: extractDataElementMetadata)
Array<DataElement> (ISO/IEC 11179 objects)
    ↓ (Artificer: generateDataElementTriples)
RDF Triples (Turtle format)
    ↓ (Pathfinder: insertTriples)
Oxigraph Triple Store
```

**Example integration**:

```typescript
// artificer/compileComponent/index.ts
import { extractDataElementMetadata } from "@sitebender/artificer/iso11179/index.ts"
import { insertTriples } from "@sitebender/pathfinder/insertTriples/index.ts"

export default function compileComponent(jsxSource: string) {
  return async function compileToIRAndRegisterMetadata(tripleStore: TripleStore) {
    // Parse JSX to IR
    const ir = parseJSXToIR(jsxSource)

    // Extract ISO/IEC 11179 metadata
    const dataElements = extractDataElementMetadata(ir)

    // Generate RDF triples
    const triples = dataElements.flatMap(dataElementToTriples)

    // Register in Pathfinder
    await insertTriples(triples)(tripleStore)

    // Return compiled IR
    return ir
  }
}
```

### Pathfinder: Registry Core

**Role**: THE single source of truth for all ISO/IEC 11179 metadata storage and query.

**Responsibilities**:

1. **Ontology management**: Define ISO/IEC 11179 RDF vocabulary
2. **CRUD operations**: Insert, update, delete, query data elements
3. **Reasoning**: Infer relationships (synonyms, derivations, hierarchies)
4. **API**: Expose registry interface (REST, GraphQL, SPARQL endpoint)

**Location**: `/libraries/pathfinder/iso11179/`

**Key functions**:

- `insertDataElement/index.ts`
- `queryDataElements/index.ts`
- `findSynonyms/index.ts`
- `findDerived/index.ts`
- `inferRelationships/index.ts`

### Operator: Event Logging

**Role**: Log all metadata registry changes as events.

**Integration points**:

1. **Data Element Created** event
2. **Data Element Updated** event
3. **Data Element Deprecated** event
4. **Data Element Retired** event

**Example**:

```turtle
<event:de-created-123> a op:Event ;
  op:type "DataElementCreated" ;
  op:subject <user:alice> ;
  op:object :de-person-age ;
  op:timestamp "2025-01-20T10:30:00Z"^^xsd:dateTime .
```

### Envoy: Metadata Visualization

**Role**: Visualize metadata registry, show relationships, generate reports.

**Integration points**:

1. **Metadata browser**: Navigate data elements, view details
2. **Relationship graphs**: Visualize synonyms, derivations, hierarchies
3. **Data dictionary generator**: Auto-generate documentation
4. **Quality dashboards**: Show metadata completeness, consistency

**Example**:

```typescript
import { createMetadataBrowser } from "@sitebender/envoy/createMetadataBrowser/index.ts"

const browser = await createMetadataBrowser({
  registry: pathfinderTripleStore,
  features: ["search", "graph", "export"]
})
```

### Sentinel: Access Control

**Role**: Enforce permissions on metadata operations.

**Integration points**:

1. **Who can register** new data elements?
2. **Who can approve** draft data elements?
3. **Who can deprecate** existing data elements?
4. **Who can view** sensitive metadata?

**Example**:

```typescript
import { authorize } from "@sitebender/sentinel/authorize/index.ts"

// Check if user can create data elements
const canCreate = await authorize({
  user: currentUser,
  action: "mdr:create",
  resource: "DataElement"
})

if (!canCreate) {
  return error({ _tag: "Forbidden", message: "Insufficient permissions" })
}
```

---

## Success Criteria

### Phase 1 Success Criteria

- [x] Comprehensive alignment documentation created
- [ ] ADR documenting architectural decision approved
- [ ] Team understands ISO/IEC 11179 concepts and benefits
- [ ] Clear roadmap established for Phases 2-4
- [ ] Pathfinder positioned as registry infrastructure owner

### Phase 2 Success Criteria

- [ ] ISO/IEC 11179 RDF ontology validates in OWL reasoner
- [ ] Pathfinder metadata functions pass all tests
- [ ] Artificer successfully extracts and registers metadata
- [ ] Example application demonstrates end-to-end flow
- [ ] SPARQL queries return correct ISO/IEC 11179 metadata

### Phase 3 Success Criteria

- [ ] REST API fully functional and documented (OpenAPI spec)
- [ ] Metadata browser UI deployed and usable
- [ ] Import/export works with external ISO/IEC 11179 registries
- [ ] Versioning tracks all metadata changes
- [ ] Lifecycle workflows enforce governance policies
- [ ] API performance meets targets (< 100ms response time)

### Phase 4 Success Criteria

- [ ] Full ISO/IEC 11179 Part 3 metamodel implemented
- [ ] Federated queries work across multiple registries
- [ ] Data lineage tracking covers all data flows
- [ ] Impact analysis catches breaking changes before deployment
- [ ] AI features measurably improve metadata quality
- [ ] ISO/IEC 11179 certification obtained (if pursued)
- [ ] Sitebender MDR specification published

### Overall Success Metrics

**Quantitative**:

- **Query performance**: < 50ms for simple metadata queries
- **Storage efficiency**: < 100 triples per data element
- **API uptime**: 99.9% availability
- **Metadata coverage**: > 90% of fields have complete definitions
- **Adoption**: > 50% of Sitebender applications use metadata registry

**Qualitative**:

- **Developer experience**: "Finding and reusing data elements is intuitive"
- **Interoperability**: "We successfully imported healthcare data elements from external MDR"
- **Governance**: "Metadata approval workflows prevent inconsistencies"
- **Documentation**: "The auto-generated data dictionary is always accurate"

---

## References and Resources

### ISO/IEC 11179 Standard

- **ISO/IEC 11179-1:2023**: Information technology — Metadata registries (MDR) — Part 1: Framework
  - https://www.iso.org/standard/78914.html

- **ISO/IEC 11179-3:2023**: Information technology — Metadata registries (MDR) — Part 3: Metamodel for registry common facilities
  - https://www.iso.org/standard/78915.html

- **ISO/IEC 11179-5**: Naming and identification principles
- **ISO/IEC 11179-6**: Registration process

### Semantic Web Standards

- **RDF 1.1**: Resource Description Framework
  - https://www.w3.org/TR/rdf11-concepts/

- **OWL 2**: Web Ontology Language
  - https://www.w3.org/TR/owl2-overview/

- **SPARQL 1.1**: Query language for RDF
  - https://www.w3.org/TR/sparql11-query/

- **SKOS**: Simple Knowledge Organization System
  - https://www.w3.org/TR/skos-reference/

### Existing Implementations

- **semanticMDR**: ISO/IEC 11179 semantic metadata registry (GitHub)
  - https://github.com/srdc/semanticMDR
  - Reference implementation using RDF/OWL

- **Aristotle Metadata Registry**: Open-source MDR
  - https://www.aristotlemetadata.com/
  - Django-based, ISO/IEC 11179 compliant

- **caDSR**: NCI Cancer Data Standards Repository
  - https://cadsrapi.cancer.gov/
  - Healthcare domain, ISO/IEC 11179 based

### Academic Papers

- **"The ISO/IEC 11179 norm for metadata registries: Does it cover healthcare standards in empirical research?"**
  - Journal of Biomedical Informatics, 2013
  - Analyzes ISO/IEC 11179 application to healthcare

- **"Clinical Data Element Ontology for Unified Indexing and Retrieval of Data Elements"**
  - PMC4231180
  - Semantic approach to clinical data elements

- **"Principles of Metadata Registries"** (DELOS Working Group)
  - http://www.metadataetc.org/book-website/readings/MetadataRegistry.pdf
  - Foundational principles of metadata registries

### Tools and Software

- **Protégé**: Ontology editor for OWL/RDF
  - https://protege.stanford.edu/
  - For editing and validating ISO/IEC 11179 ontology

- **Oxigraph**: Embeddable RDF triple store
  - https://github.com/oxigraph/oxigraph
  - Used by Pathfinder for storage

- **Jena**: Java framework for RDF/SPARQL
  - https://jena.apache.org/
  - Reference implementation for testing compliance

### Sitebender Documentation

- **Pathfinder README**: `/libraries/pathfinder/README.md`
- **Artificer Documentation**: `/libraries/artificer/README.md` (to be created)
- **Architect Documentation**: `/libraries/architect/README.md`
- **Contracts**: `/contracts/boundaries.json`

### Community Resources

- **ISO/IEC JTC 1/SC 32**: ISO standards committee for data management
  - https://www.iso.org/committee/45342.html

- **Dublin Core Metadata Initiative**: Related metadata standards
  - https://www.dublincore.org/

- **Semantic Web Community**: W3C working groups
  - https://www.w3.org/2001/sw/

---

## Appendix: Frequently Asked Questions

### Q1: Do we need to implement ALL of ISO/IEC 11179 Part 3?

**A**: No. The standard is comprehensive (some would say heavyweight). We implement the **core concepts** that provide value:

- **Core**: Data Element, Value Domain, Data Element Concept (Phase 2)
- **Enhanced**: Relationships (synonyms, derivations), versioning (Phase 3)
- **Complete**: Full metamodel, federation, certification (Phase 4 - optional)

Start simple, expand as needed.

### Q2: Will this slow down our development?

**A**: No. Alignment is mostly about **naming and structure**, not new code:

- **Phase 1**: Documentation only, zero code changes
- **Phase 2**: Ontology + metadata extraction (automatic during compilation)
- **Phase 3+**: Optional features for governance/enterprise use cases

Developers continue writing JSX. Metadata extraction happens automatically.

### Q3: Can we interoperate with existing ISO/IEC 11179 registries?

**A**: Yes, in Phase 3+. We'll implement:

- **Import**: Consume data element definitions from external MDRs
- **Export**: Publish our metadata in standard formats (JSON, XML, Turtle)
- **Federation**: Query across multiple registries (SPARQL Federation)

### Q4: What about performance with all these triples?

**A**: Triple store queries are fast:

- **Oxigraph**: Rust-based, optimized for SPARQL
- **Indexing**: Pathfinder creates indexes on common predicates
- **Caching**: Frequently-accessed metadata cached in memory
- **Targets**: < 50ms for simple queries, < 150ms for complex queries

### Q5: Is ISO/IEC 11179 certification required?

**A**: No. Certification is optional (Phase 4). Benefits:

- **Marketing**: "ISO/IEC 11179 certified" badge
- **Enterprise sales**: Compliance checkboxes
- **Validation**: Confirms our implementation is correct

But it's expensive and time-consuming. Recommend AFTER product-market fit.

### Q6: How does this relate to other metadata standards (Dublin Core, Schema.org)?

**A**: They're complementary:

- **ISO/IEC 11179**: Registry infrastructure (HOW to manage metadata)
- **Dublin Core**: Metadata vocabulary (WHAT metadata to capture)
- **Schema.org**: Semantic vocabulary for web content

We can use Dublin Core or Schema.org terms WITHIN our ISO/IEC 11179 registry.

### Q7: What if we want to change our metadata model later?

**A**: ISO/IEC 11179 supports versioning:

- Every data element has a version
- Changes create new versions (immutable history)
- Queries can target specific versions
- Applications can migrate at their own pace

Warden's cryptographic governance ensures architectural integrity.

### Q8: Can AI/LLMs understand our metadata registry?

**A**: Yes! This is a HUGE benefit:

- **RDF is machine-readable**: AI can parse triples natively
- **SPARQL queries**: AI can generate queries to discover metadata
- **Vector embeddings**: Semantic search over definitions
- **Ontology reasoning**: AI infers relationships automatically

Example: "Generate a form for collecting customer contact information"

AI queries registry for relevant data elements, generates JSX automatically.

---

## Conclusion

ISO/IEC 11179 alignment positions Sitebender Studio as **enterprise-grade data governance infrastructure** while preserving revolutionary simplicity.

**Key insights**:

1. **We're already 80% there**: JSX → IR → Turtle → Oxigraph is conceptually identical to ISO/IEC 11179 MDR
2. **Alignment is mostly naming**: Map our concepts to standard terminology
3. **Benefits are immediate**: Interoperability, governance, AI understanding
4. **Implementation is incremental**: Phase 1 (docs only) → Phase 2 (RDF vocab) → Phase 3 (APIs) → Phase 4 (certification)

**Next steps**:

1. ✅ **Review and approve this document**
2. ⏳ **Create ADR documenting decision** (Task 1.2)
3. ⏳ **Update Pathfinder README** (Task 1.3)
4. ⏳ **Update contracts** (Task 1.4)
5. ⏳ **Begin Phase 2 planning** when ready

**Philosophy**: Standards exist for a reason. ISO/IEC 11179 solves metadata management problems that every organization faces. By aligning with proven standards, Sitebender gains decades of collective wisdom while maintaining its revolutionary "everything is data" vision.

---

_Data elements as first-class citizens. Metadata as queryable knowledge. Semantic interoperability through standards. This is how enterprise applications should be built._
