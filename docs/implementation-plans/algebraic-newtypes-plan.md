# Implementation Plan: Algebraic Newtypes & Primitive Type Fixes

## Overview

This plan covers two major work streams:
1. **Fix constitutional violations in existing primitive newtypes** (45+ types)
2. **Design and implement algebraic newtypes** with ontology integration, RDF serialization, and form generation

**Estimated Timeline**: 8-13 weeks
**Priority**: Fix primitives first, then algebraic types
**Approach**: Incremental (pattern → example → infrastructure → more types)

---

## Phase 1: Fix Primitive Type Constitutional Violations

### Objective
Clean up 4 constitutional rule violations in existing primitive newtypes before adding new complexity.

### Files to Fix
1. `libraries/toolsmith/src/newtypes/webTypes/iri/unwrapIri/index.ts` - Exception violation
2. `libraries/toolsmith/src/newtypes/webTypes/ipv4Address/index.ts` - Arrow function violations
3. `libraries/toolsmith/src/newtypes/webTypes/uri/_validateAuthority/index.ts` - Mutation violations
4. `libraries/toolsmith/src/newtypes/webTypes/iri/_validateIriAuthority/index.ts` - Mutation violations

### Batch Checklist

#### Batch 1.1: Fix Exception in unwrapIri
- [ ] Read `webTypes/iri/unwrapIri/index.ts`
- [ ] Change return type from `string` to `Result<ValidationError, string>`
- [ ] Replace `throw new TypeError()` with `error()` return
- [ ] Update all call sites that use `unwrapIri`
- [ ] Run `deno task fmt && deno task lint`
- [ ] Run tests for IRI module
- [ ] Verify no regressions

#### Batch 1.2: Fix Arrow Functions in ipv4Address
- [ ] Read `webTypes/ipv4Address/index.ts`
- [ ] Identify all arrow functions (e.g., `isValidPart`, lambdas in `findIndex`)
- [ ] Convert arrow functions to named function declarations
- [ ] Ensure proper currying if functions take parameters
- [ ] Run `deno task fmt && deno task lint`
- [ ] Run tests for IPv4 module
- [ ] Verify no regressions

#### Batch 1.3: Fix Mutations in _validateAuthority (URI)
- [ ] Read `webTypes/uri/_validateAuthority/index.ts`
- [ ] Identify all `let` variable declarations
- [ ] Refactor to use nested functions returning parse results
- [ ] Use immutable pattern: parse string → return structured result
- [ ] Ensure all reassignments eliminated
- [ ] Run `deno task fmt && deno task lint`
- [ ] Run tests for URI module
- [ ] Verify no regressions

#### Batch 1.4: Fix Mutations in _validateIriAuthority (IRI)
- [ ] Read `webTypes/iri/_validateIriAuthority/index.ts`
- [ ] Identify all `let` variable declarations
- [ ] Refactor to use same pattern as Batch 1.3
- [ ] Use immutable pattern for authority parsing
- [ ] Ensure consistency with URI authority validation
- [ ] Run `deno task fmt && deno task lint`
- [ ] Run tests for IRI module
- [ ] Verify no regressions

#### Batch 1.5: Final Verification
- [ ] Run `deno task fp:check` across entire newtypes folder
- [ ] Verify zero constitutional violations
- [ ] Run full test suite: `deno task test`
- [ ] Document fixes in fix_plan.md
- [ ] Update CLAUDE.md if needed

---

## Phase 2: Design Algebraic Type Pattern

### Objective
Establish the architectural pattern for object-based branded types with ontology integration.

### Design Document Sections

#### Section 2.1: Type Structure Design
- [ ] Define algebraic newtype structure (object-based branding)
- [ ] Design nested object composition patterns
- [ ] Define relationship to primitive newtypes
- [ ] Document when to use algebraic vs primitive types
- [ ] Create type hierarchy diagram

#### Section 2.2: Validation Interface Design
- [ ] Design TypeScript validation layer (always runs)
- [ ] Design ontology validation layer (optional, authoritative)
- [ ] Design combined validation with graceful degradation
- [ ] Define ValidationError structure for complex types
- [ ] Document validation composition patterns

#### Section 2.3: RDF Serialization Design
- [ ] Design triple serialization interface
- [ ] Design triple deserialization interface
- [ ] Design SPARQL query builder patterns
- [ ] Define Oxigraph integration points
- [ ] Document round-trip guarantees

#### Section 2.4: Form Schema Design
- [ ] Design FormSchema type structure
- [ ] Design form field generation from type structure
- [ ] Design country-specific field variations
- [ ] Define form validation integration
- [ ] Document accessibility requirements

#### Section 2.5: File Organization Pattern
- [ ] Define folder structure for algebraic types
- [ ] Define location: `newtypes/algebraicTypes/` vs `newtypes/types/`
- [ ] Document naming conventions
- [ ] Define helper function organization
- [ ] Ensure alignment with file-system-organization skill

#### Section 2.6: Design Review
- [ ] Review design with constitutional rules
- [ ] Verify functional programming compliance
- [ ] Check immutability patterns
- [ ] Verify no loops, no exceptions, no mutations
- [ ] Get design approval before implementation

---

## Phase 3: Build PhoneNumber Example (End-to-End)

### Objective
Prove the algebraic type pattern with one complete implementation including ontology, validation, RDF, and form generation.

### Sub-Phase 3.1: Create E.164+ Ontology

#### Task 3.1.1: Research E.164 Standard
- [ ] Research E.164 telephone numbering specification
- [ ] Document country code structure (1-3 digits)
- [ ] Document national destination code patterns
- [ ] Document subscriber number patterns
- [ ] Research extension handling

#### Task 3.1.2: Research IContact PhoneNumber Class
- [ ] Review IContact PhoneNumber class definition
- [ ] Extract properties: hasCountryCode, hasAreaCode, hasPhoneNumber
- [ ] Extract PhoneNumber subclasses: CellNumber, FaxNumber, etc.
- [ ] Identify gaps between IContact and E.164+
- [ ] Document integration points

#### Task 3.1.3: Define E.164+ Ontology (Turtle)
- [ ] Create ontology file: `ontologies/e164plus.ttl`
- [ ] Define namespace: `http://sitebender.com/ontology/e164plus#`
- [ ] Define PhoneNumber class
- [ ] Define PhoneType class with individuals (Mobile, Landline, Satellite, VoIP, Pager)
- [ ] Define PhoneUse class with individuals (Voice, Fax, SMS, MMS, VoiceMail, Data)
- [ ] Define E164Components class (countryCode, nationalDestinationCode, subscriberNumber, extension)
- [ ] Define compatibility constraints (type → compatible uses)
- [ ] Add rdfs:label and rdfs:comment annotations
- [ ] Validate Turtle syntax

#### Task 3.1.4: Load Ontology into Oxigraph
- [ ] Write ontology loader script
- [ ] Load e164plus.ttl into Oxigraph
- [ ] Verify classes and properties loaded
- [ ] Test SPARQL queries against ontology
- [ ] Document ontology loading process

### Sub-Phase 3.2: Implement TypeScript Types

#### Task 3.2.1: Define Discriminated Unions from Ontology
- [ ] Create `PhoneType` discriminated union from ontology
- [ ] Create `PhoneUse` discriminated union from ontology
- [ ] Create type predicates: `isPhoneType`, `isPhoneUse`
- [ ] Add to `libraries/toolsmith/src/types/` or new location
- [ ] Follow type-definition skill patterns

#### Task 3.2.2: Define Component Types
- [ ] Create `E164Components` type (object structure)
- [ ] Define fields: countryCode, nationalDestinationCode, subscriberNumber, extension
- [ ] Use branded types for components where appropriate
- [ ] Define as readonly object
- [ ] Document structure

#### Task 3.2.3: Define PhoneNumberData Structure
- [ ] Create `PhoneNumberData` type
- [ ] Include e164: E164Components
- [ ] Include type: PhoneType
- [ ] Include use: ReadonlyArray&lt;PhoneUse&gt;
- [ ] Define as fully readonly/immutable

#### Task 3.2.4: Create Branded PhoneNumber Type
- [ ] Define `PhoneNumber = Brand<PhoneNumberData, "PhoneNumber">`
- [ ] Add to branded types index
- [ ] Document usage examples
- [ ] Follow naming skill conventions

#### Task 3.2.5: Implement Smart Constructor (TypeScript Validation)
- [ ] Create `phoneNumber/index.ts`
- [ ] Accept input: string (E.164 format) OR PhoneNumberInput object
- [ ] Parse E.164 string if provided
- [ ] Validate E164Components structure
- [ ] Validate PhoneType
- [ ] Validate PhoneUse compatibility (hardcoded rules from ontology)
- [ ] Return `Result<ValidationError, PhoneNumber>`
- [ ] Use functional patterns (no loops, no mutations)
- [ ] Add [EXCEPTION] comments where needed

#### Task 3.2.6: Implement Validation Helpers
- [ ] Create `_validateE164Structure/index.ts`
- [ ] Create `_parseE164String/index.ts`
- [ ] Create `_validateTypeUseCompatibility/index.ts`
- [ ] Create `_validateCountryCode/index.ts`
- [ ] Each returns Result monad
- [ ] Each follows constitutional rules

#### Task 3.2.7: Implement Unsafe Constructor
- [ ] Create `unsafePhoneNumber/index.ts`
- [ ] Takes validated PhoneNumberData
- [ ] Returns branded PhoneNumber
- [ ] Simple cast with no validation

#### Task 3.2.8: Implement Unwrap Function
- [ ] Create `unwrapPhoneNumber/index.ts`
- [ ] Takes PhoneNumber
- [ ] Returns PhoneNumberData
- [ ] Follow unwrap pattern from primitives

#### Task 3.2.9: Write Unit Tests
- [ ] Test smart constructor with valid inputs
- [ ] Test E.164 string parsing
- [ ] Test type/use compatibility validation
- [ ] Test invalid inputs (all error paths)
- [ ] Test edge cases (max lengths, special chars)
- [ ] Property-based tests for E.164 parsing
- [ ] All tests follow testing skill patterns

### Sub-Phase 3.3: Implement Ontology Validation Layer

#### Task 3.3.1: Design Ontology Validator Interface
- [ ] Define function signature: `validateWithOntology(phone, store)`
- [ ] Returns `Result<OntologyViolation, PhoneNumber>`
- [ ] Document error types for ontology violations
- [ ] Design SPARQL query structure

#### Task 3.3.2: Implement SPARQL Queries
- [ ] Create query to validate PhoneType against ontology
- [ ] Create query to validate PhoneUse against ontology
- [ ] Create query to check type/use compatibility constraints
- [ ] Test queries against Oxigraph
- [ ] Optimize query performance

#### Task 3.3.3: Implement Ontology Validator
- [ ] Create `validateWithOntology/index.ts`
- [ ] Execute SPARQL queries against Oxigraph
- [ ] Parse query results
- [ ] Return detailed errors for violations
- [ ] Handle Oxigraph connection errors gracefully

#### Task 3.3.4: Implement Combined Validator
- [ ] Create `phoneNumberValidated/index.ts`
- [ ] Run TypeScript validation first
- [ ] If store provided, run ontology validation
- [ ] Graceful degradation when store unavailable
- [ ] Return unified Result type

#### Task 3.3.5: Write Integration Tests
- [ ] Test with Oxigraph running
- [ ] Test without Oxigraph (degradation)
- [ ] Test ontology constraint violations
- [ ] Test valid data round-trip
- [ ] Test error message quality

### Sub-Phase 3.4: Implement RDF Serialization

#### Task 3.4.1: Design Triple Structure
- [ ] Define RDF structure for PhoneNumber instances
- [ ] Map PhoneNumberData to e164plus ontology predicates
- [ ] Define subject URI generation strategy
- [ ] Document triple patterns

#### Task 3.4.2: Implement Serialization
- [ ] Create `phoneNumberToTriples/index.ts`
- [ ] Takes PhoneNumber and optional subject IRI
- [ ] Returns `ReadonlyArray<Triple>`
- [ ] Generate triples for all properties
- [ ] Handle optional extension field
- [ ] Handle multiple PhoneUse values

#### Task 3.4.3: Implement Deserialization
- [ ] Create `phoneNumberFromTriples/index.ts`
- [ ] Takes subject IRI and triples array
- [ ] Parses triples into PhoneNumberData
- [ ] Validates reconstructed data
- [ ] Returns `Result<ValidationError, PhoneNumber>`

#### Task 3.4.4: Implement SPARQL Builders
- [ ] Create `phoneNumberSparqlInsert/index.ts`
- [ ] Create `phoneNumberSparqlQuery/index.ts`
- [ ] Create `phoneNumberSparqlUpdate/index.ts`
- [ ] Create `phoneNumberSparqlDelete/index.ts`
- [ ] Test all queries against Oxigraph

#### Task 3.4.5: Write Round-Trip Tests
- [ ] Test TypeScript → RDF → TypeScript
- [ ] Test data preservation
- [ ] Test all field combinations
- [ ] Test optional fields
- [ ] Test error handling for malformed triples

### Sub-Phase 3.5: Implement Form Generation

#### Task 3.5.1: Define FormSchema Type
- [ ] Create FormSchema type structure
- [ ] Define FormField type
- [ ] Define validation rules structure
- [ ] Define field type options
- [ ] Document schema structure

#### Task 3.5.2: Implement Form Generator
- [ ] Create `phoneNumberFormSchema/index.ts`
- [ ] Generate country code select field (from CountryCode enum)
- [ ] Generate area code text field (with pattern validation)
- [ ] Generate subscriber number tel field
- [ ] Generate extension text field (optional)
- [ ] Generate phone type radio field
- [ ] Generate phone use checkbox field (multiple selection)
- [ ] Include validation rules for each field

#### Task 3.5.3: Add Country-Specific Validation
- [ ] Research country-specific phone number formats
- [ ] Add pattern validation per country
- [ ] Add length validation per country
- [ ] Make area code optional for countries without it
- [ ] Document country-specific rules

#### Task 3.5.4: Write Form Schema Tests
- [ ] Test schema generation
- [ ] Test field validation rules
- [ ] Test country-specific variations
- [ ] Verify accessibility attributes
- [ ] Test schema JSON serialization

### Sub-Phase 3.6: Documentation & Examples

#### Task 3.6.1: Create Usage Examples
- [ ] Example: Create phone number from E.164 string
- [ ] Example: Create phone number from components
- [ ] Example: Validate with TypeScript only
- [ ] Example: Validate with ontology
- [ ] Example: Serialize to RDF
- [ ] Example: Deserialize from RDF
- [ ] Example: Generate form schema
- [ ] Example: Handle validation errors

#### Task 3.6.2: Document PhoneNumber Type
- [ ] API documentation for all functions
- [ ] Type structure documentation
- [ ] Validation rules documentation
- [ ] Ontology integration documentation
- [ ] Form generation documentation

#### Task 3.6.3: Create PhoneNumber Skill (Optional)
- [ ] Consider creating .claude/skills/phone-number.md
- [ ] Document patterns specific to phone numbers
- [ ] Include examples and common violations
- [ ] Add to skills index

---

## Phase 4: Build Infrastructure & Generators

### Objective
Generalize the PhoneNumber patterns into reusable tooling for creating more algebraic types.

### Sub-Phase 4.1: Create Algebraic Type Generator

#### Task 4.1.1: Design Generator Configuration
- [ ] Define AlgebraicTypeConfig type
- [ ] Include: name, fields, ontologyUrl, validationRules
- [ ] Support nested object structures
- [ ] Support discriminated union fields
- [ ] Support optional fields

#### Task 4.1.2: Create Generator Script
- [ ] Create `scripts/generators/algebraicType/`
- [ ] Implement interactive prompts for config
- [ ] Generate type definitions
- [ ] Generate smart constructor
- [ ] Generate unsafe/unwrap functions
- [ ] Generate validation helpers
- [ ] Generate RDF serialization
- [ ] Generate form schema
- [ ] Generate test scaffold

#### Task 4.1.3: Add Deno Task
- [ ] Add `deno task new:algebraic` to deno.jsonc
- [ ] Test generator with sample config
- [ ] Verify generated code follows constitutional rules
- [ ] Document generator usage

#### Task 4.1.4: Test Generator
- [ ] Generate test algebraic type
- [ ] Verify all files created
- [ ] Run fmt/lint on generated code
- [ ] Run tests on generated code
- [ ] Iterate on generator based on results

### Sub-Phase 4.2: Build Ontology Integration Tools

#### Task 4.2.1: Create Ontology Parser
- [ ] Parse Turtle/RDF ontology files
- [ ] Extract class definitions
- [ ] Extract property definitions
- [ ] Extract individuals (enum values)
- [ ] Extract constraints
- [ ] Return structured ontology data

#### Task 4.2.2: Create TypeScript Generator from Ontology
- [ ] Generate discriminated unions from owl:oneOf
- [ ] Generate type structures from classes
- [ ] Generate property interfaces from object/data properties
- [ ] Generate type predicates
- [ ] Generate validation rules from constraints

#### Task 4.2.3: Create Validation Rule Extractor
- [ ] Extract SHACL constraints
- [ ] Extract OWL property restrictions
- [ ] Convert to TypeScript validation functions
- [ ] Generate error messages from constraints
- [ ] Document extraction process

#### Task 4.2.4: Test Ontology Tools
- [ ] Test with e164plus ontology
- [ ] Test with IContact ontology
- [ ] Verify correct TypeScript generation
- [ ] Test validation rule extraction
- [ ] Document tool usage

### Sub-Phase 4.3: Create RDF Utilities

#### Task 4.3.1: Generic Triple Serialization
- [ ] Create generic object-to-triples converter
- [ ] Handle nested objects
- [ ] Handle arrays
- [ ] Handle optional fields
- [ ] Handle discriminated unions
- [ ] Use ontology metadata for mapping

#### Task 4.3.2: Generic Triple Deserialization
- [ ] Create generic triples-to-object converter
- [ ] Parse nested structures
- [ ] Parse arrays
- [ ] Handle missing optional fields
- [ ] Validate during parsing

#### Task 4.3.3: SPARQL Query Builders
- [ ] Generic INSERT builder
- [ ] Generic SELECT builder
- [ ] Generic UPDATE builder
- [ ] Generic DELETE builder
- [ ] Support parameterization

#### Task 4.3.4: Oxigraph Helpers
- [ ] Connection management
- [ ] Query execution wrapper
- [ ] Error handling
- [ ] Transaction support
- [ ] Batch operations

#### Task 4.3.5: Test RDF Utilities
- [ ] Unit tests for serialization
- [ ] Unit tests for deserialization
- [ ] Integration tests with Oxigraph
- [ ] Round-trip tests
- [ ] Performance tests

### Sub-Phase 4.4: Build Form Schema System

#### Task 4.4.1: Define FormSchema Types
- [ ] FormSchema type
- [ ] FormField type
- [ ] FieldType enum
- [ ] ValidationRule type
- [ ] FieldOptions type

#### Task 4.4.2: Create Generic Schema Generator
- [ ] Generate schema from type structure
- [ ] Map TypeScript types to field types
- [ ] Generate validation rules from type constraints
- [ ] Handle nested objects
- [ ] Handle discriminated unions

#### Task 4.4.3: Create Field Type Mappers
- [ ] String → text/email/tel/url
- [ ] Number → number/range
- [ ] Boolean → checkbox
- [ ] Discriminated union → select/radio
- [ ] Array → multi-select/checkboxes
- [ ] Date → date/datetime-local

#### Task 4.4.4: Add Accessibility Support
- [ ] ARIA labels
- [ ] ARIA descriptions
- [ ] ARIA error messages
- [ ] Required field indicators
- [ ] Focus management hints

#### Task 4.4.5: Test Form Schema System
- [ ] Test schema generation
- [ ] Test all field type mappings
- [ ] Test validation rule generation
- [ ] Test accessibility attributes
- [ ] Test with real forms

### Sub-Phase 4.5: Update Skills & Documentation

#### Task 4.5.1: Create algebraic-types Skill
- [ ] Create `.claude/skills/algebraic-types.md`
- [ ] Document when to use algebraic vs primitive types
- [ ] Document type structure patterns
- [ ] Document validation patterns
- [ ] Document RDF serialization patterns
- [ ] Document form generation patterns
- [ ] Include examples and counter-examples
- [ ] Include generator usage

#### Task 4.5.2: Update type-definition Skill
- [ ] Add section on algebraic types
- [ ] Update decision tree (primitive vs algebraic)
- [ ] Reference algebraic-types skill
- [ ] Update generator documentation

#### Task 4.5.3: Update function-implementation Skill
- [ ] Add patterns for ontology validation
- [ ] Add patterns for RDF serialization
- [ ] Add patterns for working with Oxigraph
- [ ] Include error handling for ontology violations

#### Task 4.5.4: Create Infrastructure Documentation
- [ ] Document all generators
- [ ] Document ontology tools
- [ ] Document RDF utilities
- [ ] Document form schema system
- [ ] Include API reference
- [ ] Include usage examples

---

## Phase 5: Implement Address Type (Apply Infrastructure)

### Objective
Validate infrastructure by implementing comprehensive Address algebraic type using IContact ontology.

### Sub-Phase 5.1: Integrate IContact Address Ontology

#### Task 5.1.1: Download & Review IContact
- [ ] Download icontact.owl from University of Toronto
- [ ] Review Address class definition
- [ ] Review address properties (hasStreet, hasCity, etc.)
- [ ] Review StreetDirection, StreetType enumerations
- [ ] Review address subclasses (HomeAddress, WorkAddress, etc.)
- [ ] Identify dependencies (WGS84, vCard, FOAF)

#### Task 5.1.2: Adapt IContact for Sitebender
- [ ] Create sitebender-contact.ttl
- [ ] Import/adapt IContact classes
- [ ] Add Sitebender-specific extensions if needed
- [ ] Align namespace: http://sitebender.com/ontology/contact#
- [ ] Validate Turtle syntax
- [ ] Load into Oxigraph

#### Task 5.1.3: Generate TypeScript from Ontology
- [ ] Use ontology parser to extract Address structure
- [ ] Generate StreetDirection discriminated union
- [ ] Generate StreetType discriminated union
- [ ] Generate AddressType discriminated union
- [ ] Generate component types (City, State, Country, etc.)
- [ ] Review generated code

### Sub-Phase 5.2: Implement Address Components

#### Task 5.2.1: Create Primitive Address Components
- [ ] StreetNumber (string, alphanumeric)
- [ ] StreetName (NonEmptyString)
- [ ] BuildingIdentifier (NonEmptyString, for UK/India)
- [ ] UnitNumber (string, apartment/suite)
- [ ] CityName (NonEmptyString)
- [ ] StateName (string)
- [ ] PostalCode (country-specific validation)
- [ ] Each as separate newtype with smart constructor

#### Task 5.2.2: Create Discriminated Unions
- [ ] StreetDirection (North, South, East, West, etc.)
- [ ] StreetType (Street, Avenue, Road, Boulevard, etc.)
- [ ] AddressType (Home, Work, Cottage)
- [ ] Follow type-definition skill patterns

#### Task 5.2.3: Create GeoCoordinates Type
- [ ] Latitude (number, -90 to 90)
- [ ] Longitude (number, -180 to 180)
- [ ] GeoCoordinates (composite)
- [ ] Integrate with WGS84 ontology

### Sub-Phase 5.3: Implement Address Algebraic Type

#### Task 5.3.1: Define AddressData Structure
- [ ] Street components (number, direction, name, type)
- [ ] Building/unit identifiers
- [ ] City, state, country
- [ ] Postal code
- [ ] Geo coordinates (optional)
- [ ] Address type
- [ ] All fields readonly/immutable

#### Task 5.3.2: Create Address Smart Constructor
- [ ] Accept structured input
- [ ] Validate all components
- [ ] Validate country-specific rules
- [ ] Handle international variations (US, UK, India, etc.)
- [ ] Return Result<ValidationError, Address>

#### Task 5.3.3: Implement Country-Specific Validation
- [ ] US address validation
- [ ] UK address validation (with building)
- [ ] Indian address validation (with building)
- [ ] Canadian address validation
- [ ] Add more countries as needed
- [ ] Use country code to select validation rules

#### Task 5.3.4: Implement Validation Helpers
- [ ] _validateStreetComponents
- [ ] _validateCityStateCountry
- [ ] _validatePostalCodeForCountry
- [ ] _validateGeoCoordinates
- [ ] Each returns Result monad

#### Task 5.3.5: Create Unsafe/Unwrap Functions
- [ ] unsafeAddress
- [ ] unwrapAddress
- [ ] Follow established patterns

### Sub-Phase 5.4: Implement RDF Serialization for Address

#### Task 5.4.1: Use Generic RDF Utilities
- [ ] Configure ontology mapping
- [ ] Test generic serialization with Address
- [ ] Adjust utilities if needed
- [ ] Verify all IContact properties mapped

#### Task 5.4.2: Implement Address-Specific Functions
- [ ] addressToTriples
- [ ] addressFromTriples
- [ ] addressSparqlInsert
- [ ] addressSparqlQuery
- [ ] Handle nested geo coordinates

#### Task 5.4.3: Test Round-Trip
- [ ] TypeScript → RDF → TypeScript
- [ ] All address variations (US, UK, India)
- [ ] Optional fields
- [ ] Geo coordinates
- [ ] Error cases

### Sub-Phase 5.5: Implement Form Generation for Address

#### Task 5.5.1: Use Generic Form Generator
- [ ] Generate base schema from Address structure
- [ ] Test field generation
- [ ] Verify validation rules

#### Task 5.5.2: Add Country-Specific Forms
- [ ] US address form (street, city, state, ZIP)
- [ ] UK address form (with building, postcode)
- [ ] Indian address form (with building)
- [ ] Canadian address form
- [ ] Dynamic form switching based on country selection

#### Task 5.5.3: Add Smart Features
- [ ] State dropdown populated per country
- [ ] Postal code format hint per country
- [ ] Optional vs required fields per country
- [ ] Address autocomplete hints
- [ ] Geo coordinate lookup (optional)

#### Task 5.5.4: Test Form Schemas
- [ ] Test all country variations
- [ ] Test validation rules
- [ ] Test accessibility
- [ ] Test with real form rendering

### Sub-Phase 5.6: Testing & Documentation

#### Task 5.6.1: Comprehensive Tests
- [ ] Unit tests for all address components
- [ ] Integration tests with IContact ontology
- [ ] Property-based tests for address parsing
- [ ] Round-trip tests
- [ ] Form generation tests
- [ ] Country-specific validation tests

#### Task 5.6.2: Documentation
- [ ] Address type API documentation
- [ ] Country-specific validation rules
- [ ] IContact integration documentation
- [ ] Form generation examples
- [ ] Migration guide from simple string addresses

#### Task 5.6.3: Examples
- [ ] Create address from US format
- [ ] Create address from UK format
- [ ] Serialize to RDF
- [ ] Query addresses in Oxigraph
- [ ] Generate country-specific forms
- [ ] Handle validation errors

---

## Phase 6: Documentation, Refinement & Polish

### Objective
Finalize documentation, create migration guides, and ensure production readiness.

### Sub-Phase 6.1: Comprehensive Documentation

#### Task 6.1.1: Architecture Documentation
- [ ] Document primitive vs algebraic type decision tree
- [ ] Document when to use each type system
- [ ] Document file organization patterns
- [ ] Document naming conventions
- [ ] Create architecture diagrams

#### Task 6.1.2: Generator Documentation
- [ ] new:algebraic usage guide
- [ ] Configuration options reference
- [ ] Generated file structure documentation
- [ ] Customization guide
- [ ] Troubleshooting guide

#### Task 6.1.3: Ontology Integration Guide
- [ ] How to create ontologies
- [ ] How to integrate existing ontologies
- [ ] How to generate TypeScript from ontologies
- [ ] How to validate against ontologies
- [ ] Best practices

#### Task 6.1.4: RDF Serialization Guide
- [ ] Serialization patterns
- [ ] Deserialization patterns
- [ ] SPARQL query patterns
- [ ] Oxigraph integration
- [ ] Performance optimization

#### Task 6.1.5: Form Generation Guide
- [ ] Form schema structure
- [ ] Field type mapping
- [ ] Validation integration
- [ ] Accessibility best practices
- [ ] Country-specific forms

### Sub-Phase 6.2: Migration Guides

#### Task 6.2.1: Primitive to Algebraic Migration
- [ ] When to migrate
- [ ] How to migrate existing code
- [ ] Breaking change considerations
- [ ] Gradual migration strategy
- [ ] Examples

#### Task 6.2.2: Adding New Algebraic Types
- [ ] Step-by-step guide
- [ ] Using generators
- [ ] Custom validation
- [ ] Ontology creation
- [ ] Testing requirements

### Sub-Phase 6.3: Examples & Tutorials

#### Task 6.3.1: Create Tutorial Series
- [ ] Tutorial 1: Creating a simple algebraic type
- [ ] Tutorial 2: Ontology integration
- [ ] Tutorial 3: RDF serialization
- [ ] Tutorial 4: Form generation
- [ ] Tutorial 5: Complex validation

#### Task 6.3.2: Real-World Examples
- [ ] E-commerce product catalog
- [ ] Contact management system
- [ ] Geographic location system
- [ ] Multi-tenant configuration
- [ ] User profile system

### Sub-Phase 6.4: Performance & Optimization

#### Task 6.4.1: Benchmark Validation
- [ ] Benchmark TypeScript validation performance
- [ ] Benchmark ontology validation performance
- [ ] Compare with/without triple store
- [ ] Identify bottlenecks
- [ ] Document performance characteristics

#### Task 6.4.2: Optimize Hot Paths
- [ ] Optimize common validation paths
- [ ] Cache ontology query results
- [ ] Optimize RDF serialization
- [ ] Optimize form generation
- [ ] Re-benchmark

#### Task 6.4.3: Memory Profiling
- [ ] Profile memory usage for large datasets
- [ ] Optimize object creation
- [ ] Check for memory leaks
- [ ] Document memory characteristics

### Sub-Phase 6.5: Quality Assurance

#### Task 6.5.1: Code Review Checklist
- [ ] All code follows constitutional rules
- [ ] No loops, no mutations, no exceptions, no arrow functions
- [ ] All files follow naming conventions
- [ ] All code formatted and linted
- [ ] All tests passing
- [ ] Documentation complete

#### Task 6.5.2: Test Coverage Review
- [ ] Verify test coverage for all algebraic types
- [ ] Add missing tests
- [ ] Review property-based test coverage
- [ ] Review integration test coverage
- [ ] Document test strategy

#### Task 6.5.3: Security Review
- [ ] Review validation for injection attacks
- [ ] Review SPARQL query building for injection
- [ ] Review form generation for XSS
- [ ] Review error messages for info leaks
- [ ] Document security considerations

### Sub-Phase 6.6: Final Verification

#### Task 6.6.1: Run All Checks
- [ ] `deno task fmt` - all code formatted
- [ ] `deno task lint` - no lint errors
- [ ] `deno task fp:check` - no FP violations
- [ ] `deno task contracts:check` - no boundary violations
- [ ] `deno task test` - all tests pass

#### Task 6.6.2: Update CLAUDE.md
- [ ] Document algebraic types
- [ ] Update workflows
- [ ] Update MCP server queries
- [ ] Add new skills to list
- [ ] Document new generators

#### Task 6.6.3: Create Release Notes
- [ ] List all new features
- [ ] List breaking changes
- [ ] Migration guide references
- [ ] Known limitations
- [ ] Future roadmap

---

## Constitutional Rules (MANDATORY - ZERO TOLERANCE)

These rules apply to ALL code written in ALL phases:

### Rule 1: No Classes
❌ NEVER use TypeScript classes
✅ Use modules with exported pure functions

### Rule 2: No Mutations
❌ NEVER use `let`, `array.push()`, `obj.property = value`
✅ Use `const`, `[...array, item]`, `{ ...obj, property: value }`

### Rule 3: No Loops
❌ NEVER use `for`, `while`, `do...while`
✅ Use `map`, `filter`, `reduce` from Toolsmith

### Rule 4: No Exceptions
❌ NEVER use `try`, `catch`, `throw`
✅ Use `Result<T,E>` or `Validation<T,E>` monads

### Rule 5: One Function Per File
✅ Each file exports exactly ONE function
✅ Helpers go in nested folders (`_helperName/index.ts`)

### Rule 6: Pure Functions
✅ Same input → same output
✅ No side effects (except explicit IO boundaries)

### Rule 7: No Arrow Functions
❌ NEVER use `const fn = (a, b) => a + b`
✅ Use `function fn(a) { return function(b) { ... } }`

### Rule 8: All Functions Must Be Curried
✅ Every function takes ONLY ONE parameter
✅ Multi-parameter functions → nested functions
❌ DO NOT turn single-parameter functions into thunks

---

## Workflow Rules (MANDATORY - NO BATCHING)

### Rule 1: One File at a Time
Work on ONE file, then test it, then move to next file.

### Rule 2: Immediate Testing
After EVERY file change, run:
```bash
deno task fmt && deno task lint
```

### Rule 3: No Batching
NEVER batch multiple files before testing.

### Rule 4: Verify Before Proceeding
Fix all errors before moving to next file.

### Rule 5: Sequential Work
NO parallel file operations for efficiency.

---

## MCP Server Query Rules

### Before Writing ANY Code

Query these MCP servers:

| Purpose | Server | Query |
|---------|--------|-------|
| File structure | constitutional_rules | "file structure one function exports" |
| Imports | constitutional_rules | "barrel files imports" |
| Function syntax | syntax_rules | "arrow functions named functions" |
| Naming | syntax_rules | "abbreviations full words naming" |
| Loops | functional_programming_rules | "loops map filter reduce" |
| Errors | functional_programming_rules | "exceptions try catch Result" |
| Formatting | formatting_rules | "tabs indentation line length" |
| Algebraic types | constitutional_rules | "branded types objects" |
| Ontology | constitutional_rules | "ontology validation RDF" |

---

## Skills to Use

### Always Use
- **function-implementation** - For ALL function creation
- **type-definition** - For ALL type creation
- **error-handling** - For ALL error types
- **naming** - For ALL naming decisions
- **operator-substitutions** - Instead of raw operators

### Use When Relevant
- **testing** - When writing tests
- **component** - When creating UI components
- **file-system-organization** - When organizing files
- **algebraic-types** - When creating algebraic types (Phase 4+)

---

## Success Criteria

### Phase 1 Complete When:
- [ ] All 4 violation files fixed
- [ ] `deno task fp:check` shows zero violations
- [ ] All tests passing
- [ ] No regressions

### Phase 2 Complete When:
- [ ] Design document approved
- [ ] All interfaces defined
- [ ] Patterns documented
- [ ] Examples created

### Phase 3 Complete When:
- [ ] PhoneNumber fully implemented
- [ ] E.164+ ontology created and loaded
- [ ] TypeScript validation working
- [ ] Ontology validation working
- [ ] RDF serialization working
- [ ] Form generation working
- [ ] All tests passing
- [ ] Documentation complete

### Phase 4 Complete When:
- [ ] Generators working
- [ ] Ontology tools working
- [ ] RDF utilities working
- [ ] Form schema system working
- [ ] Skills updated
- [ ] Infrastructure tested

### Phase 5 Complete When:
- [ ] Address fully implemented
- [ ] IContact integrated
- [ ] Country-specific validation working
- [ ] All capabilities working
- [ ] Tests passing
- [ ] Documentation complete

### Phase 6 Complete When:
- [ ] All documentation complete
- [ ] Migration guides complete
- [ ] Performance acceptable
- [ ] Security reviewed
- [ ] All checks passing
- [ ] Release notes ready

---

## Estimated Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Phase 1: Fix Violations | 1-2 weeks | None |
| Phase 2: Design Pattern | 1 week | Phase 1 |
| Phase 3: PhoneNumber | 2-3 weeks | Phase 2 |
| Phase 4: Infrastructure | 2-3 weeks | Phase 3 |
| Phase 5: Address | 1-2 weeks | Phase 4 |
| Phase 6: Polish | 1-2 weeks | Phase 5 |
| **TOTAL** | **8-13 weeks** | Sequential |

---

## IContact Ontology Reference

### Key Information
- **Full Name**: International Contact Ontology
- **Creator**: Mark S. Fox, Enterprise Integration Lab, University of Toronto
- **Type**: RDF/OWL Ontology
- **Namespace**: `http://ontology.eil.utoronto.ca/tove/icontact#`
- **Ontology IRI**: `http://ontology.eil.utoronto.ca/icontact.owl`
- **Focus**: International addresses, phone numbers, emails
- **Strength**: Complex address decomposition (UK, India focus)

### Core Classes
- **Address** - Main contact concept with international address support
- **PhoneNumber** - International phone numbers with country codes
- **HoursOfOperation** - Business/contact availability

### Key Properties
- `hasStreetDirection` - Street direction (North, South, East, West)
- `hasStreetType` - Street type (Street, Avenue, Road, Boulevard)
- `hasStreetNumber` - House/building number
- `hasBuilding` - Building/structure identifier (critical for UK/India)
- `hasCitySection` - City subdivision or district
- `hasPostalCode` - ZIP/postal code
- `hasCity` - City name
- `hasState` - State/province/region
- `hasCountry` - Country
- `hasGeoCoordinates` - WGS84 coordinates
- `hasCountryCode` - Phone country code
- `hasAreaCode` - Phone area code
- `hasPhoneNumber` - Phone number digits
- `hasPhoneType` - Phone type (Cell, Fax, Home, Work, TollFree)

### Sitebender Integration Points
- Address components map to IContact properties
- Phone number structure aligns with IContact PhoneNumber class
- Geo coordinates integrate with WGS84 ontology
- Street direction/type use IContact enumerations

---

## Next Steps

1. **Review this plan** - Ensure understanding of all phases
2. **Start Phase 1, Batch 1.1** - Fix unwrapIri exception
3. **Work through checklist sequentially** - One batch at a time
4. **Update checklist as you progress** - Mark items complete
5. **Request help if needed** - Ask questions before proceeding

---

**Document Version**: 1.0
**Created**: 2025-11-08
**Last Updated**: 2025-11-08
**Status**: Approved - Ready for Implementation
