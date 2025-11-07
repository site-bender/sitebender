# ISO/IEC 11179 Metadata Registry Alignment + OpenMetadata Integration

> **Aligning Sitebender Studio's data-as-configuration architecture with international standards for metadata registries and enterprise data catalogs**

---

## Executive Summary

**ISO/IEC 11179** is an international standard for **Metadata Registries (MDR)** that provides a framework for standardizing and registering metadata to enable semantic interoperability across systems and organizations.

**OpenMetadata** is the leading open-source data catalog and governance platform with 2,000+ enterprise deployments, 100+ data connectors, and comprehensive features for discovery, lineage, quality, and collaboration.

**Sitebender Studio's revolutionary approach** of treating everything as data—where JSX components transform into RDF triples stored in Oxigraph and queried via SPARQL—is conceptually identical to an ISO/IEC 11179 metadata registry.

This document establishes a **hybrid strategy** that leverages the best of both worlds:

1. **ISO/IEC 11179 as foundation** - Standards-based registry core in Pathfinder (RDF/SPARQL)
2. **OpenMetadata as enterprise integration** - Optional connector for organizations needing broader data governance
3. **Complementary roles** - Pathfinder manages Sitebender application metadata; OpenMetadata handles data infrastructure (databases, pipelines, dashboards)
4. **Federation over coupling** - Systems remain independent, connected via SPARQL/REST APIs

This document provides:

1. **Conceptual mapping** between Sitebender IR and ISO/IEC 11179 terminology
2. **OpenMetadata integration architecture** showing how both systems work together
3. **Benefits analysis** of hybrid approach (standards + platform)
4. **5-phase implementation roadmap** with detailed checklists
5. **Concrete examples** showing JSX/IR/Turtle/ISO/OpenMetadata flows
6. **Integration strategy** for Pathfinder (registry core), Artificer (compilation), Architect (authoring), and OpenMetadata (enterprise catalog)

### Key Insights

**Sitebender already implements the core concepts of ISO/IEC 11179:**

- **Data Elements** = Form field components (`<TextField>`, `<IntegerField>`, etc.)
- **Value Domains** = Type constraints + validation rules
- **Conceptual Domains** = Semantic meanings (branded types like `EmailAddress`, `Isbn13`)
- **Metadata Registry** = Pathfinder's triple store + SPARQL queries

**Hybrid strategy advantages:**

- **Standards-based foundation** - ISO/IEC 11179 ensures interoperability with any system (not locked to OpenMetadata)
- **No external dependencies** - Sitebender works standalone with Pathfinder registry
- **Enterprise appeal** - "Works with OpenMetadata" unlocks large-scale data governance use cases
- **Phased adoption** - Start simple (Pathfinder only), add OpenMetadata integration when needed
- **Flexibility** - Could integrate with Amundsen, Apache Atlas, Collibra, Alation using same patterns

Formal alignment positions Sitebender as **enterprise-grade data governance infrastructure** while maintaining revolutionary simplicity.

---

## Table of Contents

1. [What is ISO/IEC 11179?](#what-is-isoiec-11179)
2. [What is OpenMetadata?](#what-is-openmetadata)
3. [Why ISO/IEC 11179 Matters for Sitebender](#why-isoiec-11179-matters-for-sitebender)
4. [Hybrid Strategy: ISO/IEC 11179 + OpenMetadata](#hybrid-strategy-isoiec-11179--openmetadata)
5. [Conceptual Mapping: Sitebender ↔ ISO/IEC 11179](#conceptual-mapping-sitebender--isoiec-11179)
6. [Benefits of Formal Alignment](#benefits-of-formal-alignment)
7. [Architecture: Who Owns What](#architecture-who-owns-what)
8. [Phase 1: Conceptual Alignment (Current)](#phase-1-conceptual-alignment-current)
9. [Phase 2: RDF Vocabulary Integration](#phase-2-rdf-vocabulary-integration)
10. [Phase 3: MDR-Compliant APIs](#phase-3-mdr-compliant-apis)
11. [Phase 4: Advanced ISO/IEC 11179 Features](#phase-4-advanced-isoiec-11179-features)
12. [Phase 5: OpenMetadata Integration](#phase-5-openmetadata-integration)
13. [Examples: JSX → IR → ISO/IEC 11179](#examples-jsx--ir--isoiec-11179)
14. [Integration with Other Libraries](#integration-with-other-libraries)
15. [Success Criteria](#success-criteria)
16. [References and Resources](#references-and-resources)

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

- **Data Element Concept (DEC)**: The _meaning_ of the data (what it represents semantically)
- **Value Domain (VD)**: How the data is _recorded_ (format, datatype, constraints, permissible values)

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

## What is OpenMetadata?

### Overview

OpenMetadata is the **#1 open-source data catalog and governance platform**, built by the founders of Apache Hadoop, Apache Atlas, and Uber Databook. With 2,000+ enterprise deployments, 7,100+ GitHub stars, and 340+ contributors, it represents the modern standard for enterprise data governance.

### Core Purpose

OpenMetadata addresses enterprise data governance challenges:

1. **Data Discovery** - Locate relevant data assets across complex environments
2. **Metadata Management** - Centralize metadata that becomes "big data" at scale
3. **Data Democratization** - Break down silos between technical and business users
4. **Governance at Scale** - Manage thousands of data assets with automated workflows
5. **Team Collaboration** - Enable data practitioners to work together effectively

### Key Features

1. **Discovery** - Search and preview across data estates with 100+ connectors
2. **Lineage** - Track data flow and dependencies across systems
3. **Observability** - Monitor data health and quality metrics
4. **Quality** - Implement data quality frameworks and tests
5. **Collaboration** - Conversations, tasks, and knowledge sharing
6. **Governance** - Enforce policies, standards, and compliance

### Architecture

- **Streamlined 4-component architecture** (simpler than competitors)
- **Unified Metadata Graph** - Centralized metadata across all data assets
- **API-First & Schema-First** - Extensible, customizable
- **100+ Data Connectors** including:
  - **Databases**: Snowflake, BigQuery, Databricks, PostgreSQL, MySQL, Oracle
  - **Pipelines**: Airflow, dbt, Fivetran, Dagster
  - **Dashboards**: Tableau, Looker, Power BI, Metabase
  - **Data Lakes**: AWS S3, Google Cloud Storage, Azure ADLS
  - **Messaging**: Kafka, Kinesis
  - **ML Models**: MLflow, SageMaker

### Target Use Cases

- **Data-centric culture** - Communication through metadata
- **Data democratization** - Access for diverse user types
- **Governance automation** - Policy enforcement at scale
- **Column-level understanding** - Detailed metadata for analytics
- **Asset documentation** - Comprehensive data catalogs

### Adoption

- 2,000+ enterprise deployments
- 10,000+ open source community members
- Deployments managing 2+ million data assets

### Relationship to Sitebender

**OpenMetadata is a PLATFORM, not a standard.** It consumes metadata from various sources and provides rich UI/collaboration features. It's designed for **data infrastructure** (databases, pipelines, dashboards), not **application metadata** (form fields, components, validations).

**Key insight**: OpenMetadata and ISO/IEC 11179 are **complementary**:

- **ISO/IEC 11179** = Registry standard (HOW to structure metadata)
- **OpenMetadata** = Catalog platform (WHERE to discover/govern metadata)
- **Sitebender/Pathfinder** = ISO/IEC 11179-compliant registry (application metadata)
- **Integration** = Pathfinder exports to OpenMetadata for enterprise visibility

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

> "An ISO/IEC 11179-compliant metadata registry for web applications, where data elements are defined declaratively in JSX, stored as RDF triples, and queried via SPARQL. Native integrations with enterprise data catalogs including OpenMetadata, Amundsen, and Apache Atlas."

This language resonates with:

- **Enterprise architects** (compliance, governance, standards)
- **Data stewards** (metadata management, data catalogs)
- **Healthcare CIOs** (regulatory requirements, interoperability)
- **Government agencies** (open data, transparency, standardization)

---

## Hybrid Strategy: ISO/IEC 11179 + OpenMetadata

### Why Both?

**ISO/IEC 11179 and OpenMetadata are complementary, not competing:**

- **ISO/IEC 11179** is a **registry STANDARD** - defines HOW to structure and store metadata
- **OpenMetadata** is a **catalog PLATFORM** - provides discovery, lineage, governance UI

**They solve different problems:**

| Aspect           | ISO/IEC 11179 (Pathfinder)               | OpenMetadata                                           |
| ---------------- | ---------------------------------------- | ------------------------------------------------------ |
| **What it is**   | Metadata registry standard               | Data catalog platform                                  |
| **Scope**        | Application metadata (forms, components) | Data infrastructure (databases, pipelines, dashboards) |
| **Storage**      | RDF triple store (Oxigraph)              | Unified metadata graph                                 |
| **Query**        | SPARQL                                   | REST API + Search                                      |
| **Standards**    | International standard (ISO)             | Open-source platform                                   |
| **Lock-in**      | None (standard-based)                    | Platform-specific                                      |
| **UI**           | Build custom or use Envoy                | Rich built-in UI (discovery, lineage, collaboration)   |
| **Connectors**   | Custom (via standards)                   | 100+ out-of-box                                        |
| **Target users** | Sitebender developers                    | Enterprise data teams                                  |

### Complementary Roles

```
┌─────────────────────────────────────────────────────────────┐
│ Sitebender Application Layer                                │
│ - JSX components define data elements                        │
│ - Forms, validations, components                             │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ↓ (metadata extraction via Artificer)
┌─────────────────────────────────────────────────────────────┐
│ Pathfinder: ISO/IEC 11179 Metadata Registry                 │
│ - Standards-based registry core                              │
│ - Application metadata (fields, validations, semantics)      │
│ - RDF/SPARQL storage and query                               │
│ - Source of truth for Sitebender metadata                    │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ↓ (optional integration - Phase 5)
┌─────────────────────────────────────────────────────────────┐
│ OpenMetadata Platform (Optional Enterprise Integration)     │
│ - Enterprise data catalog                                    │
│ - Data infrastructure metadata (DBs, pipelines, dashboards)  │
│ - Rich discovery UI, lineage visualization                   │
│ - Team collaboration and governance workflows                │
│ - Consume Sitebender metadata via connector                  │
└─────────────────────────────────────────────────────────────┘
```

### Integration Architecture

**Phase 1-4: Pathfinder Standalone**

Sitebender works completely independently with Pathfinder as registry:

- JSX → IR → Turtle → Pathfinder (Oxigraph)
- SPARQL queries for metadata discovery
- No external dependencies
- Standards-based, no lock-in

**Phase 5: Optional OpenMetadata Connector**

For enterprises needing broader data governance:

- Pathfinder exports metadata to OpenMetadata via connector
- Map ISO/IEC 11179 Data Elements → OpenMetadata Entities
- Unified lineage: Sitebender forms → databases → dashboards
- Bidirectional: Import database schemas from OpenMetadata to auto-generate Sitebender components

### Three Integration Scenarios

#### Scenario 1: Sitebender as Metadata Source

**Flow**: Sitebender Application → Pathfinder → OpenMetadata → Enterprise Data Stack

```
Sitebender Form (JSX)
  ├─ EmailField: "email"
  ├─ IntegerField: "age"
  └─ SelectField: "role"
       ↓ (Artificer extracts metadata)
Pathfinder ISO/IEC 11179 Registry
  ├─ DataElement: "email" (String, RFC 5321 validation)
  ├─ DataElement: "age" (Integer, 1-149 range)
  └─ DataElement: "role" (Enum: admin/editor/viewer)
       ↓ (OpenMetadata connector exports)
OpenMetadata Catalog
  └─ Discover that "customer.email" in Snowflake
     originated from "EmailField in CustomerRegistrationForm"
```

**Benefit**: Data analysts understand the origin and semantics of data in warehouses.

#### Scenario 2: Bidirectional Metadata Flow

**Flow**: OpenMetadata Schema → Pathfinder → Auto-Generated Sitebender Components

```
OpenMetadata: PostgreSQL Schema
  └─ Table: users
     ├─ email VARCHAR(254) NOT NULL
     ├─ age INTEGER CHECK (age >= 0 AND age < 150)
     └─ role VARCHAR(20) CHECK (role IN ('admin', 'editor', 'viewer'))
          ↓ (Import to Pathfinder as ISO/IEC 11179 Data Elements)
Pathfinder Registry
  └─ DataElement definitions with Value Domains
          ↓ (Generate Sitebender components)
Auto-Generated JSX
  <Form>
    <EmailField name="email" required={true} />
    <IntegerField name="age" required={true}>
      <Validation>
        <And>
          <IsAtLeast value={0} />
          <IsLessThan value={150} />
        </And>
      </Validation>
    </IntegerField>
    <SelectField name="role">
      <Options>
        <Option value="admin" />
        <Option value="editor" />
        <Option value="viewer" />
      </Options>
    </SelectField>
  </Form>
```

**Benefit**: Automatically generate Sitebender forms that match existing database schemas.

#### Scenario 3: Federated SPARQL Queries

**Flow**: Cross-system metadata queries via SPARQL Federation

```sparql
PREFIX mdr: <https://sitebender.studio/pathfinder/iso11179/>
PREFIX om: <https://openmetadata.org/>

# Find all Sitebender fields semantically equivalent to OpenMetadata columns
SELECT ?sitebenderField ?openmetadataColumn ?datatype WHERE {
  # Query Pathfinder (local)
  ?sitebenderField a mdr:DataElement ;
                   mdr:name ?fieldName ;
                   mdr:hasValueDomain/mdr:datatype ?datatype .

  # Federate to OpenMetadata SPARQL endpoint
  SERVICE <https://openmetadata.company.com/sparql> {
    ?openmetadataColumn om:name ?fieldName ;
                        om:dataType ?datatype .
  }
}
```

**Benefit**: Discover semantic mappings between Sitebender and enterprise data infrastructure.

### Benefits of Hybrid Approach

1. **No Lock-In** - ISO/IEC 11179 standard ensures interoperability with ANY catalog (not just OpenMetadata)
2. **Works Standalone** - Sitebender operates independently, OpenMetadata is optional
3. **Enterprise Appeal** - "Works with OpenMetadata" unlocks large-scale governance use cases
4. **Phased Adoption** - Start simple (Pathfinder only), add OpenMetadata when needed
5. **Standards Foundation** - ISO/IEC 11179 provides proven, tested metadata semantics
6. **Rich UI** - Leverage OpenMetadata's mature discovery/lineage/collaboration features
7. **Ecosystem** - 100+ OpenMetadata connectors bring Sitebender into broader data ecosystem
8. **Flexibility** - Same patterns work for Amundsen, Apache Atlas, Collibra, Alation

### Positioning Statement

> **"Sitebender: ISO/IEC 11179-compliant metadata registry for web applications. Define data elements declaratively in JSX, store as RDF triples, query via SPARQL. Native integrations with enterprise data catalogs (OpenMetadata, Amundsen, Apache Atlas) for unified data governance at scale."**

This positions Sitebender as:

- **Standards-based** (not proprietary)
- **Flexible** (works standalone or integrated)
- **Enterprise-grade** (connects to established governance platforms)
- **No lock-in** (RDF/SPARQL enables any integration)

---

## Conceptual Mapping: Sitebender ↔ ISO/IEC 11179

### Core Concepts

| ISO/IEC 11179 Concept    | Sitebender Equivalent             | Location                                         | Example                                             |
| ------------------------ | --------------------------------- | ------------------------------------------------ | --------------------------------------------------- |
| **Data Element**         | Form field component              | Architect components                             | `<IntegerField>`, `<EmailField>`                    |
| **Data Element Concept** | Semantic meaning of field         | Component props: `name`, `description`           | `name="age"`, `description="Person's age in years"` |
| **Value Domain**         | Datatype + validation rules       | Component props: `type`, `<Validation>` children | `type="Integer"`, `<IsGreaterThan value={0} />`     |
| **Conceptual Domain**    | Branded type family               | Toolsmith branded types                          | `EmailAddress`, `Isbn13`, `IPv4Address`             |
| **Permissible Values**   | Validation constraints            | `<Validation>` children                          | `<IsOneOf values={["draft", "published"]} />`       |
| **Representation Class** | Display format                    | `<Format>` children                              | `<TwoDecimalPlaces />`, `<PhoneNumber />`           |
| **Metadata Registry**    | Pathfinder triple store           | Oxigraph + SPARQL                                | All triples stored in Pathfinder                    |
| **Registration Process** | Component authoring + compilation | JSX → IR → Turtle → insertTriples                | Architect → Artificer → Pathfinder                  |
| **Query Interface**      | SPARQL queries                    | Pathfinder's executeQuery                        | `SELECT ?field WHERE { ?field a artificer:Data }`   |

### Lifecycle Mapping

| ISO/IEC 11179 Lifecycle State | Sitebender Equivalent            | Implementation                   |
| ----------------------------- | -------------------------------- | -------------------------------- |
| **Draft**                     | Component in development         | Not yet committed to git         |
| **Approved**                  | Component in main branch         | Passed all tests, merged to main |
| **Published**                 | Component deployed to production | Released in library version      |
| **Deprecated**                | Component marked for removal     | JSDoc `@deprecated` tag          |
| **Retired**                   | Component removed                | Deleted from codebase            |

### Metadata Attributes

| ISO/IEC 11179 Attribute | Sitebender Equivalent         | Example                                               |
| ----------------------- | ----------------------------- | ----------------------------------------------------- |
| **Definition**          | Component JSDoc description   | `/** Age of person in years */`                       |
| **Example**             | Unit test fixtures            | `age: 25` in test cases                               |
| **Context**             | Parent form/section           | Nested within `<UserRegistrationForm>`                |
| **Steward**             | Git author/maintainer         | Git commit author                                     |
| **Version**             | Git commit hash               | SHA-256 hash (also tracked by Warden)                 |
| **Status**              | Git branch + deployment state | main = approved, feature/* = draft                    |
| **Synonyms**            | Type aliases                  | `type Age = Integer`                                  |
| **Related elements**    | Component composition         | `<FullName>` composed of `<FirstName>` + `<LastName>` |

### Validation Rules

| ISO/IEC 11179 Constraint | Sitebender Equivalent              | Example                                         |
| ------------------------ | ---------------------------------- | ----------------------------------------------- |
| **Datatype**             | `type` prop                        | `type="Integer"`                                |
| **Minimum value**        | `<IsGreaterThan>` or `<IsAtLeast>` | `<IsAtLeast value={0} />`                       |
| **Maximum value**        | `<IsLessThan>` or `<IsAtMost>`     | `<IsAtMost value={150} />`                      |
| **Pattern**              | `<Matches>`                        | `<Matches pattern="^[A-Z]{2}\\d{5}$" />`        |
| **Length**               | `<HasLengthBetween>`               | `<HasLengthBetween min={8} max={100} />`        |
| **Enumeration**          | `<IsOneOf>`                        | `<IsOneOf values={["red", "blue", "green"]} />` |
| **Required**             | `required` prop                    | `required={true}`                               |
| **Uniqueness**           | Custom validation                  | `<IsUnique table="users" column="email" />`     |

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
	registry: "NIH CDE Repository",
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
	method: "semantic", // Uses vector embeddings + ontology reasoning
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

- [x] Executive summary (updated with hybrid strategy)
- [x] What is ISO/IEC 11179?
- [x] What is OpenMetadata?
- [x] Why ISO/IEC 11179 matters for Sitebender
- [x] Hybrid strategy section (ISO/IEC 11179 + OpenMetadata)
- [x] Conceptual mapping tables
- [x] Benefits analysis
- [x] Architecture ownership
- [x] 5-phase roadmap with detailed checklists (no time estimates)
- [x] Concrete examples
- [x] Integration scenarios
- [x] Updated FAQs (OpenMetadata questions added)
- [x] Updated references (OpenMetadata and other catalogs)

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
	element: DataElement,
): (tripleStore: TripleStore) => Promise<Result<string, Error>> {
	return async function insertDataElementIntoTripleStore(
		tripleStore: TripleStore,
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
	componentIR: ComponentIR,
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
						property: node.props.name,
					},
					valueDomain: extractValueDomain(node),
					status: "approved",
					version: "1.0.0",
					steward: "system",
					context: extractContext(node),
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

---

## Phase 4: Advanced ISO/IEC 11179 Features

### Objectives

- [ ] Achieve full ISO/IEC 11179 Part 3 metamodel conformance
- [ ] Implement advanced registry features (SPARQL federation, lineage, impact analysis)
- [ ] Add AI-powered metadata discovery and mapping
- [ ] Obtain ISO/IEC 11179 certification (optional)

**Status**: ⏳ **PENDING** (Phase 3 must complete first)

**Note**: This phase focuses on **pure ISO/IEC 11179 standard features**, not platform integrations. OpenMetadata integration is Phase 5 (optional).

### Deliverables

1. **Complete ISO/IEC 11179-3 metamodel implementation**
2. **SPARQL federation** for cross-registry queries
3. **Data lineage tracking** within Sitebender applications
4. **Impact analysis tools** for metadata changes
5. **AI-powered features** (semantic search, automated mapping)
6. **ISO/IEC 11179 certification documentation** (optional)

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

#### Task 4.7: Document Best Practices

**Checklist**:

- [ ] Write comprehensive ISO/IEC 11179 implementation guide
- [ ] Document Sitebender-specific patterns and conventions
- [ ] Create tutorial and examples for advanced features
- [ ] Document SPARQL federation patterns
- [ ] Create case studies of real-world usage

### Success Criteria

- [ ] Full ISO/IEC 11179 Part 3 conformance validated
- [ ] SPARQL federation working across multiple registries
- [ ] Lineage tracking operational within Sitebender applications
- [ ] Impact analysis catches breaking metadata changes
- [ ] AI features demonstrably improve metadata quality
- [ ] ISO/IEC 11179 certification obtained (if pursued)
- [ ] Comprehensive documentation and best practices published

### Dependencies

- **Phase 3** must be complete
- **Agent** (for CRDT-based federation, optional)
- **Envoy** (for lineage visualization)
- **AI/ML infrastructure** (embedding models, training pipeline)

---

## Phase 5: OpenMetadata Integration

### Objectives

- [ ] Build OpenMetadata connector for Pathfinder
- [ ] Export Sitebender metadata to OpenMetadata catalog
- [ ] Import database schemas from OpenMetadata to auto-generate components
- [ ] Implement unified lineage tracking across Sitebender and data infrastructure
- [ ] Enable SPARQL federation between Pathfinder and OpenMetadata
- [ ] Provide enterprise-grade data governance integration

**Status**: ⏳ **PENDING** (Phase 4 must complete first)

**Note**: This phase is **OPTIONAL**. Sitebender works standalone with Pathfinder. OpenMetadata integration is for enterprises needing broader data governance.

### Deliverables

1. **OpenMetadata Connector** (`pathfinder/openmetadata/`)
2. **Metadata Export Pipeline** (Pathfinder → OpenMetadata)
3. **Metadata Import Pipeline** (OpenMetadata → Pathfinder)
4. **Component Generator** (auto-generate JSX from schemas)
5. **Unified Lineage** (Sitebender forms → databases → dashboards)
6. **SPARQL Federation** (cross-system queries)
7. **Integration Documentation** and examples

### Tasks

#### Task 5.1: Build OpenMetadata Connector

**Location**: `/libraries/pathfinder/openmetadata/`

**Checklist**:

- [ ] Design connector architecture
- [ ] Implement OpenMetadata REST API client
- [ ] Map ISO/IEC 11179 → OpenMetadata entity types
- [ ] Handle authentication and authorization
- [ ] Implement error handling and retry logic
- [ ] Add connection pooling and rate limiting
- [ ] Write connector tests

**Mapping ISO/IEC 11179 → OpenMetadata**:

| ISO/IEC 11179      | OpenMetadata Entity      |
| ------------------ | ------------------------ |
| DataElement        | Column or Field          |
| DataElementConcept | Tag or Glossary Term     |
| ValueDomain        | Data Type + Constraints  |
| Form/Component     | Custom Property or Asset |
| Validation Rule    | Test Definition          |

#### Task 5.2: Implement Metadata Export

**Location**: `/libraries/pathfinder/openmetadata/export/`

**Checklist**:

- [ ] Implement `exportToOpenMetadata/index.ts`
- [ ] Query Pathfinder for Data Elements
- [ ] Transform ISO/IEC 11179 triples → OpenMetadata JSON
- [ ] Batch export for performance
- [ ] Handle incremental updates (only changed elements)
- [ ] Add export scheduling (cron-like)
- [ ] Implement conflict resolution (version comparison)
- [ ] Add export monitoring and logging
- [ ] Write export tests

**Example**:

```typescript
import { exportToOpenMetadata } from "@sitebender/pathfinder/openmetadata/export/index.ts"

// Export all Sitebender metadata to OpenMetadata
const result = await exportToOpenMetadata({
	pathfinderStore: localTripleStore,
	openmetadataUrl: "https://openmetadata.company.com",
	apiKey: process.env.OPENMETADATA_API_KEY,
	mode: "incremental", // or "full"
})(config)

// Result: { exported: 150, skipped: 23, errors: 0 }
```

#### Task 5.3: Implement Metadata Import

**Location**: `/libraries/pathfinder/openmetadata/import/`

**Checklist**:

- [ ] Implement `importFromOpenMetadata/index.ts`
- [ ] Query OpenMetadata for database schemas
- [ ] Transform OpenMetadata JSON → ISO/IEC 11179 triples
- [ ] Detect schema changes (compare versions)
- [ ] Import as draft Data Elements (require approval)
- [ ] Handle column-level metadata (descriptions, tags)
- [ ] Map OpenMetadata glossary → Conceptual Domains
- [ ] Add import validation
- [ ] Write import tests

**Example**:

```typescript
import { importFromOpenMetadata } from "@sitebender/pathfinder/openmetadata/import/index.ts"

// Import PostgreSQL "users" table schema
const result = await importFromOpenMetadata({
	openmetadataUrl: "https://openmetadata.company.com",
	apiKey: process.env.OPENMETADATA_API_KEY,
	entityType: "table",
	entityFqn: "postgres.public.users",
})(pathfinderStore)

// Result: Array<DataElement> with status "draft"
```

#### Task 5.4: Implement Component Auto-Generation

**Location**: `/libraries/pathfinder/openmetadata/generate/`

**Checklist**:

- [ ] Implement `generateComponentsFromSchema/index.ts`
- [ ] Read imported Data Elements from Pathfinder
- [ ] Map Value Domains → Architect field components
- [ ] Map constraints → Validation components
- [ ] Generate JSX code as strings
- [ ] Format with Deno formatter
- [ ] Add JSDoc comments with metadata
- [ ] Handle complex types (enums, foreign keys)
- [ ] Write generation tests

**Example**:

```typescript
import { generateComponentsFromSchema } from "@sitebender/pathfinder/openmetadata/generate/index.ts"

// Generate Sitebender form from imported schema
const jsxCode = await generateComponentsFromSchema({
	dataElements: importedElements,
	formName: "UserRegistrationForm",
})(pathfinderStore)

// Result: JSX string ready to save as .tsx file
```

#### Task 5.5: Implement Unified Lineage

**Location**: `/libraries/pathfinder/openmetadata/lineage/`

**Checklist**:

- [ ] Track data flow: Sitebender form → database table
- [ ] Query OpenMetadata for downstream lineage (table → dashboards)
- [ ] Combine lineage graphs
- [ ] Visualize end-to-end lineage in Envoy
- [ ] Add lineage queries (upstream/downstream)
- [ ] Handle circular dependencies
- [ ] Write lineage tests

**Lineage Example**:

```
Sitebender CustomerRegistrationForm
  ├─ EmailField "email"
  └─ IntegerField "age"
       ↓ (writes to)
PostgreSQL customers table
  ├─ email VARCHAR(254)
  └─ age INTEGER
       ↓ (consumed by)
dbt model customer_summary
       ↓ (feeds)
Tableau dashboard "Customer Analytics"
```

#### Task 5.6: Implement SPARQL Federation

**Location**: `/libraries/pathfinder/openmetadata/federation/`

**Checklist**:

- [ ] Check if OpenMetadata supports SPARQL endpoint
- [ ] If yes: Implement federated SPARQL queries
- [ ] If no: Implement REST API bridge (query OpenMetadata, return as triples)
- [ ] Add federation examples
- [ ] Optimize cross-system queries (caching, pagination)
- [ ] Write federation tests

#### Task 5.7: Create Integration Examples

**Location**: `/examples/openmetadata-integration/`

**Checklist**:

- [ ] Example 1: Export Sitebender metadata to OpenMetadata
- [ ] Example 2: Import database schema and auto-generate form
- [ ] Example 3: Query unified lineage
- [ ] Example 4: Federated SPARQL query
- [ ] Comprehensive README with setup instructions
- [ ] Docker Compose for local OpenMetadata instance
- [ ] Integration test suite

### Success Criteria

- [ ] OpenMetadata connector successfully exports Sitebender metadata
- [ ] Database schemas imported and components auto-generated
- [ ] Unified lineage visualized end-to-end (form → DB → dashboard)
- [ ] SPARQL federation or REST bridge working
- [ ] Example applications demonstrate all integration scenarios
- [ ] Documentation comprehensive and clear
- [ ] All tests pass

### Dependencies

- **Phase 4** must be complete (advanced ISO/IEC 11179 features)
- **OpenMetadata instance** available (local or enterprise deployment)
- **Envoy** (for lineage visualization)

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

| Component Prop | ISO/IEC 11179 Attribute  | Example                                 |
| -------------- | ------------------------ | --------------------------------------- |
| `name`         | Data Element name        | `name="email"`                          |
| `description`  | Data Element definition  | `description="Electronic mail address"` |
| `type`         | Value Domain datatype    | `type="EmailAddress"`                   |
| `required`     | Obligation               | `required={true}`                       |
| `<Validation>` | Value Domain constraints | `<IsGreaterThan value={0} />`           |
| `<Format>`     | Representation Class     | `<TwoDecimalPlaces />`                  |

## Component Types → Conceptual Domains

| Architect Component | Conceptual Domain     |
| ------------------- | --------------------- |
| `<EmailField>`      | Electronic addresses  |
| `<IntegerField>`    | Numeric measurements  |
| `<DateField>`       | Temporal measurements |
| `<SelectField>`     | Enumerated values     |
| `<BooleanField>`    | Binary states         |
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
	return async function compileToIRAndRegisterMetadata(
		tripleStore: TripleStore,
	) {
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
	features: ["search", "graph", "export"],
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
	resource: "DataElement",
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

- [ ] Full ISO/IEC 11179 Part 3 metamodel implemented and validated
- [ ] SPARQL federation working across multiple registries
- [ ] Data lineage tracking operational within Sitebender applications
- [ ] Impact analysis catches breaking metadata changes before deployment
- [ ] AI features demonstrably improve metadata quality
- [ ] ISO/IEC 11179 certification obtained (if pursued)
- [ ] Comprehensive implementation guide and best practices published

### Phase 5 Success Criteria

- [ ] OpenMetadata connector exports Sitebender metadata successfully
- [ ] Database schemas imported from OpenMetadata
- [ ] Component auto-generation working from imported schemas
- [ ] Unified lineage visualized end-to-end (Sitebender → databases → dashboards)
- [ ] SPARQL federation or REST API bridge functional
- [ ] Example applications demonstrate all integration scenarios
- [ ] Integration documentation comprehensive and clear

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

### Existing ISO/IEC 11179 Implementations

- **semanticMDR**: ISO/IEC 11179 semantic metadata registry (GitHub)
  - https://github.com/srdc/semanticMDR
  - Reference implementation using RDF/OWL

- **Aristotle Metadata Registry**: Open-source MDR
  - https://www.aristotlemetadata.com/
  - Django-based, ISO/IEC 11179 compliant

- **caDSR**: NCI Cancer Data Standards Repository
  - https://cadsrapi.cancer.gov/
  - Healthcare domain, ISO/IEC 11179 based

### Data Catalog Platforms

- **OpenMetadata**: #1 open-source data catalog
  - https://open-metadata.org/
  - https://github.com/open-metadata/OpenMetadata
  - 2,000+ deployments, 100+ connectors
  - API-first architecture, extensible

- **Apache Amundsen**: Data discovery and metadata engine
  - https://www.amundsen.io/
  - https://github.com/amundsen-io/amundsen
  - Developed by Lyft, adopted by many enterprises

- **Apache Atlas**: Data governance and metadata framework
  - https://atlas.apache.org/
  - Part of Hadoop ecosystem
  - Some ISO/IEC 11179 alignment

- **Collibra**: Enterprise data catalog (commercial)
  - https://www.collibra.com/
  - Comprehensive data governance platform

- **Alation**: Enterprise data catalog (commercial)
  - https://www.alation.com/
  - Behavioral analysis and automated curation

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

### Q9: Why not just use OpenMetadata instead of building an ISO/IEC 11179 registry?

**A**: Different purposes and scopes:

- **OpenMetadata** is for **data infrastructure** (databases, pipelines, dashboards)
- **Sitebender/Pathfinder** is for **application metadata** (forms, components, validations)
- **OpenMetadata** is a **platform** (requires running OpenMetadata server)
- **ISO/IEC 11179** is a **standard** (no platform lock-in, works with any catalog)

**Key difference**: OpenMetadata doesn't understand Sitebender's JSX-based data element definitions. Pathfinder IS the source of truth for Sitebender metadata. OpenMetadata can CONSUME that metadata via connector.

**Analogy**: Pathfinder is like Git (distributed, standards-based, standalone). OpenMetadata is like GitHub (centralized platform, rich UI, collaboration features). You need Git first; GitHub is optional.

### Q10: Does OpenMetadata support ISO/IEC 11179?

**A**: Not natively. OpenMetadata has its own metamodel, but the concepts are **similar**:

| ISO/IEC 11179        | OpenMetadata            |
| -------------------- | ----------------------- |
| Data Element         | Column/Field            |
| Data Element Concept | Glossary Term/Tag       |
| Value Domain         | Data Type + Constraints |
| Metadata Registry    | Metadata Store          |

Our connector (Phase 5) provides the mapping layer. Because Pathfinder uses ISO/IEC 11179, we can integrate with ANY catalog, not just OpenMetadata.

### Q11: Can we integrate with other data catalogs besides OpenMetadata?

**A**: **YES!** This is the power of ISO/IEC 11179 standards-based approach:

- **OpenMetadata** - Phase 5 (priority, largest user base)
- **Apache Amundsen** - Same connector patterns apply
- **Apache Atlas** - Has some ISO/IEC 11179 alignment already
- **Collibra** - Enterprise catalog, REST API similar to OpenMetadata
- **Alation** - Enterprise catalog, API-based integration
- **AWS Glue Data Catalog** - Cloud-based catalog
- **Any system with RDF/SPARQL** - Direct federation

**ISO/IEC 11179 is our guarantee of interoperability.** We're not locked to OpenMetadata.

### Q12: What if OpenMetadata adds native ISO/IEC 11179 support?

**A**: **Perfect!** Then our integration becomes even simpler:

- Instead of custom mapping, direct ISO/IEC 11179 ↔ ISO/IEC 11179 exchange
- SPARQL federation becomes trivial
- Other systems using ISO/IEC 11179 can integrate with OpenMetadata too

This is exactly why standards matter. We're future-proof.

### Q13: Do we need to run OpenMetadata locally for development?

**A**: **No, not required**:

- **Phases 1-4**: Work entirely with Pathfinder (no OpenMetadata needed)
- **Phase 5 development**: Use Docker Compose for local OpenMetadata instance
- **Phase 5 production**: Connect to enterprise OpenMetadata deployment

OpenMetadata is **optional infrastructure**, not a core dependency.

---

## Conclusion

The **hybrid strategy** of ISO/IEC 11179 (foundation) + OpenMetadata (optional integration) positions Sitebender Studio as **enterprise-grade data governance infrastructure** while preserving revolutionary simplicity and zero lock-in.

**Key insights**:

1. **We're already 80% there**: JSX → IR → Turtle → Oxigraph is conceptually identical to ISO/IEC 11179 MDR
2. **Standards-based foundation**: ISO/IEC 11179 ensures interoperability with ANY system (not locked to OpenMetadata)
3. **Alignment is mostly structure**: Map our concepts to standard terminology and RDF ontology
4. **Benefits are immediate**: Interoperability, governance, AI understanding, enterprise appeal
5. **Implementation is incremental**: Phase 1 (docs) → Phase 2 (RDF vocab) → Phase 3 (APIs) → Phase 4 (advanced ISO features) → Phase 5 (OpenMetadata, optional)
6. **Complementary systems**: Pathfinder manages application metadata; OpenMetadata manages data infrastructure
7. **Flexible integration**: Works standalone OR with OpenMetadata (or Amundsen, Atlas, Collibra, etc.)

**Next steps**:

1. ✅ **Review and approve this document**
2. ⏳ **Create ADR documenting hybrid strategy** (Task 1.2)
3. ⏳ **Update Pathfinder README** (Task 1.3)
4. ⏳ **Update contracts** (Task 1.4)
5. ⏳ **Begin Phase 2 implementation** when ready

**Strategic positioning**:

> **"Sitebender: ISO/IEC 11179-compliant metadata registry for web applications. Define data elements declaratively in JSX, store as RDF triples, query via SPARQL. Native integrations with enterprise data catalogs (OpenMetadata, Amundsen, Apache Atlas) for unified data governance at scale."**

**Philosophy**:

Standards exist for a reason. ISO/IEC 11179 solves metadata management problems that every organization faces. By aligning with proven international standards FIRST, Sitebender gains decades of collective wisdom while maintaining its revolutionary "everything is data" vision.

Platforms like OpenMetadata provide rich discovery and governance features for enterprises. By building on standards (ISO/IEC 11179), we can integrate with these platforms WITHOUT being locked to them. RDF and SPARQL ensure Sitebender metadata can flow anywhere.

**This is the power of standards over platforms**: Flexibility, interoperability, and future-proof architecture.

---

_Data elements as first-class citizens. Metadata as queryable knowledge. Semantic interoperability through standards. Enterprise integration without lock-in. This is how modern applications should be built._
