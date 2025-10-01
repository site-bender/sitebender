# Sitebender Application-Wide DSL Specification

> **Status**: Initial architectural specification  
> **Purpose**: Define the unified JSX DSL that spans all 15 Sitebender libraries  
> **Philosophy**: Everything is JSX configuration, not programming
> **User Experience**: Never blame the user - if something is confusing, that's the framework's responsibility to guide kindly

## Terminology

- **Semantic components**: Components with semantic meaning (BooleanField, Accordion, Article)
- **Wrapped elements**: JSX wrappers around HTML/SSML/MathML/ChemML/SVG elements for standards compliance
- **Ontology**: OWL2/SHACL/RDFa ontology stored in triple store
- **Data model**: Schema for datatypes (EmailAddress, PhoneNumber), part of the ontology
- **Concept**: User-friendly name for datatype (for non-technical users)
- **Behaviors**: Declarative compositions of calculations, validations, comparisons, formatters stored as triples

## Core Principle

**In Sitebender, EVERYTHING IS JSX/TSX.** End users configure applications by composing JSX components and adding props - they never write TypeScript functions, custom components, or imperative code. The system provides all necessary functionality through declarative component composition.

## Top-Level Application Structure

Every Sitebender application starts with the `<Sitebender>` root component:

```tsx
<Sitebender>
  <Page>
    {/* Default page layout */}
  </Page>
  
  <Data>
    {/* Data model and concepts (Agent/Custodian) — creates the data store */}
  </Data>
  
  <Behavior>
    {/* Reusable reactive calculations, validations, conditionals, formatting (Architect) */}
  </Behavior>
  
  <Events>
    {/* Pub-sub event system (Operator) */}
  </Events>
  
  <Memory>
    {/* State management (Custodian) */}
  </Memory>
  
  <Distributed>
    {/* Distributed layer configuration (Agent) */}
  </Distributed>
  
  <Proofs>
    {/* Tests and mathematical proofs (Auditor) */}
  </Proofs>
</Sitebender>
```

## Pagewright's Standards-Compliant Element Wrappers

**Critical Architecture**: Pagewright provides wrapped versions of **ALL HTML, SVG, MathML, ChemML, and SSML elements** that enforce standards compliance and accessibility (see [Automatic Element Substitution](./automatic-element-substitution.md) for implementation details):

- `<a>` becomes `<A>` with proper href validation and nesting prevention
- `<div>` becomes `<Div>` with content model enforcement
- `<p>` becomes `<P>` with flow content validation
- `<input>` becomes `<Input>` with type-specific attribute validation
- `<svg>` becomes `<Svg>` with SVG namespace and content rules
- `<math>` becomes `<Math>` with MathML compliance
- And so on for **every markup element**

### Why This Matters

1. **Standards Compliance** - Prevents invalid HTML (e.g., `<a>` inside `<a>`)
2. **Accessibility Enforcement** - Ensures proper ARIA usage and keyboard navigation
3. **Attribute Validation** - Only allows valid attributes per W3C/WHATWG specifications
4. **TypeScript Safety** - Compile-time errors for markup violations

### Usage Rules for All Libraries

```tsx
// ✅ Correct - Use Pagewright's wrapped elements
import { A, Div, P, Input } from "@sitebender/pagewright"

<Div>
  <P>Welcome to our site!</P>
  <A href="/contact">Contact Us</A>
  <Input type="email" required />
</Div>

// ❌ Incorrect - Never use lowercase HTML elements
<div>
  <p>Welcome to our site!</p>
  <a href="/contact">Contact Us</a>
  <input type="email" required />
</div>
```

### Component Hierarchy Preference

**Other libraries should prefer Pagewright's semantic components over low-level elements:**

```tsx
// 🎯 Best - Use semantic components when available
<Article>
  <Heading level={1}>Title</Heading>
  <Form concept="Contact" />
  <Navigation>
    <Link href="/about">About</Link>
  </Navigation>
</Article>

// ✅ Good - Use wrapped elements when semantic components don't exist
<Section>
  <Div class="custom-layout">
    <P>Some content</P>
    <A href="/link">Custom Link</A>
  </Div>
</Section>

// ❌ Wrong - Never bypass Pagewright's element system
<section>
  <div class="custom-layout">
    <p>Some content</p>
    <a href="/link">Custom Link</a>
  </div>
</section>
```

## Library Ownership and Boundaries

### Pagewright: `<Page>` Wrapper
**Owns**: All HTML-rendering components, semantic markup, and standards-compliant element wrappers
**Compiles to**: Pure HTML with progressive enhancement hooks

**Critical Architecture**: Pagewright provides wrapped versions of ALL HTML elements (`<a>` → `<A>`, `<div>` → `<Div>`, `<p>` → `<P>`) that enforce W3C standards compliance and accessibility. **All Sitebender libraries must use these wrapped elements instead of lowercase HTML.** BUT, wherever possible, libraries should use the Pagewright components rather than the wrappers. Code semantically, not to the implementation. Tell it what, not how.

```tsx
<!-- In a page route (e.g., `pages/about/index.tsx`), the top level component is promoted to a Page element -->
<Article>
  <Heading>
    <Title>About us</Title>
  </Heading>
  <Paragraph>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.<Ref>1</Ref> Phasellus at magna vitae mauris lacinia placerat.
  </Paragraph>
  <Section>
    <Heading>
      <Title>A subtitle</Title>
    </Heading>
    <Paragraph>
      In tincidunt venenatis enim a scelerisque. Donec vel enim a urna feugiat elementum in vitae.
    </Paragraph>
  </Section>
  <EndMatter>
    <Notes>
      <Note id="1">Curabitur rhoncus dolor et rhoncus.</Note>
    </Notes>
  </EndMatter>
</Article>
```

### Architect: `<Behavior>` Wrapper
**Owns**: Reactive calculations, validation, formatting, display control
**Compiles to**: Composed pure functions with lazy evaluation

```tsx
<Behavior>
  <Validation name="EmailFormat">
    <And>
      <Is.String />
      <Is.Matching>
        <Constant>^.+@.+$</Constant>
      </Is.Matching>
      <MinLength>
        <Constant>5<Constant>
      </MinLength>
      <MaxLength>
        <Constant>150<Constant>
      </MaxLength>
    </And>
  </Validation>
  
  <Calculation name="TaxAmount">
    <Multiply>
      <From.Element selector="#subtotal" />
      <From.Element selector="#taxRate" />
    </Multiply>
  </Calculation>
  
  <Display>
    <If>
      <IsEqualTo>
        <From.Element selector="#userRole" />
        <Constant>admin</Constant>
      </IsEqualTo>
    </If>
    <Then>
      <AdminPanel />
    </Then>
    <Else>
      <UserDashboard />
    </Else>
  </Display>
</Behavior>
```

### Agent/Custodian: `<Data>` Wrapper
**Owns**: Data model, concepts, relationships, schema definitions
**Compiles to**: RDF triples, SHACL constraints, database schemas

```tsx
<Data>
  <Concept name="EmailAddress" type="string">
    <Shape>
      <And>
        <Is.String />
        <Matches pattern="/.+@.+/" />
      </And>
    </Shape>
  </Concept>
  
  <Concept name="Person">
    <Property name="email">
      <EmailAddress />
    </Property>
    <Property name="age">
      <PositiveInteger />
    </Property>
    <HasOne name="worksFor">
      <Organization />
    </HasOne>
  </Concept>
  
  <Concept name="Organization">
    <Property name="name">
      <CompanyName />
    </Property>
    <HasMany name="employees">
      <Person />
    </HasMany>
  </Concept>
</Data>
```

### Operator: `<Events>` Wrapper
**Owns**: Pub-sub system, event definitions, CQRS, event sourcing
**Compiles to**: Event stream configuration and handlers

```tsx
<Events>
  <EventType name="UserRegistered">
    <Payload>
      <Property name="userId" type="UUID" />
      <Property name="email" type="EmailAddress" />
      <Property name="timestamp" type="DateTime" />
    </Payload>
  </EventType>
  
  <EventType name="FormSubmitted">
    <Payload>
      <Property name="formId" type="String" />
      <Property name="concept" type="String" />
      <Property name="data" type="Object" />
    </Payload>
  </EventType>
</Events>
```

### Custodian: `<Memory>` Wrapper
**Owns**: State management, temporal state, state machines
**Compiles to**: State management logic and transitions

```tsx
<Memory>
  <StateDefinition name="UserSession">
    <Property name="isAuthenticated" type="Boolean" />
    <Property name="user" type="Person" />
    <Property name="preferences" type="UserPreferences" />
  </StateDefinition>
  
  <StateTransition from="anonymous" to="authenticated" on="UserLoggedIn" />
  <StateTransition from="authenticated" to="anonymous" on="UserLoggedOut" />
</Memory>
```

### Agent: `<Distributed>` Wrapper
**Owns**: Distributed systems, CRDTs, P2P networking, offline-first
**Compiles to**: Distributed coordination and synchronization

```tsx
<Distributed>
  <SyncableData concept="Person" strategy="LastWriteWins" />
  <SyncableData concept="Document" strategy="OperationalTransform" />
  
  <OfflineStrategy>
    <CacheEssential concepts={["User", "Preferences"]} />
    <SyncOnReconnect priority="UserData" />
  </OfflineStrategy>
</Distributed>
```

### Auditor: `<Proofs>` Wrapper
**Owns**: Mathematical proofs, property-based testing, contract verification
**Compiles to**: Executable tests and formal proofs

```tsx
<Proofs>
  <PropertyTest name="EmailValidation">
    <ForAll concept="EmailAddress">
      <Property>
        <Contains char="@" />
        <IsLength min={5} />
      </Property>
    </ForAll>
  </PropertyTest>
  
  <MathematicalProof name="CalculationCorrectness">
    <Prove>
      <ForAll>
        <Given>
          <Variable name="price" type="PositiveNumber" />
          <Variable name="tax" type="Percentage" />
        </Given>
        <Then>
          <TaxCalculation />
          <IsGreaterThan>
            <Left><Variable name="price" /></Left>
            <Right><Constant>0</Constant></Right>
          </IsGreaterThan>
        </Then>
      </ForAll>
    </Proofs>
  </MathematicalProof>
</Proofs>
```

## Revolutionary Form Generation

Forms are automatically generated from Concept definitions in the Data model (see [Application Folder Hierarchy](./application-folder-hierarchy.md#data---concept-definitions) for data organization). There are three distinct approaches depending on your needs:

### Approach 1: Full Auto-Generation (Persisted Concepts)

For concepts already defined in your data model, forms can be completely auto-generated:

```tsx
<Form concept="Person" type="create" enhance="validate" />
```

This single line:
1. Queries the triple store for the Person concept definition
2. Extracts all properties and their shapes (validation rules)
3. Auto-selects appropriate field components (EmailField, PhoneField, etc.)
4. Applies progressive enhancement for client-side validation
5. Handles form submission and data persistence

**Use when**: All form fields correspond to persisted properties in your data model.

### Approach 2: Auto-Generation with Layout Control (Persisted Concepts + Custom Layout)

For the same persisted concepts, but when you want control over layout, grouping, and conditional display:

```tsx
<Form concept="Person" type="edit" enhance="validate">
  <Hidden>
    <Feature name="id" />
  </Hidden>
  
  <Group name="personal">
    <Feature name="nameGiven" />
    <Feature name="nameFamily" />
    <Feature name="email" />
  </Group>
  
  <Group name="work" label="Employment Information">
    <Feature name="worksFor" />
    <Feature name="jobTitle" />
  </Group>
  
  <DisplayWhen>
    <Condition>
      <Is.True>
        <From.Feature name="hasManager" />
      </Is.True>
    </Condition>
    <Feature name="manager" />
  </DisplayWhen>
</Form>
```

**Use when**: You want automatic field generation but need custom layout, grouping, or conditional display of persisted fields.

**Note**: This DSL is planned but not yet implemented.

### Approach 3: Mixed Persisted + Ephemeral Fields

For forms that combine persisted data model fields with ephemeral fields (like confirmPassword):

```tsx
<Form concept="Person">
  <!-- Persisted fields get validation automatically from Person concept -->
  <Feature name="email help="This is the email address that you use at work" />
  
  <!-- Ephemeral fields need explicit behaviors -->
  <Feature name="confirmPassword">
    <Validation>
      <Is.Equal>
        <From.Feature name="confirmPassword" />
        <From.Feature name="password" />
      </Is.Equal>
    </Validation>
  </Feature>
</Form>
```

**Use when**: Your form combines data model fields (which get automatic validation) with temporary fields like confirmPassword, agree-to-terms checkboxes, or other non-persisted inputs.

**Key distinction**: Ephemeral fields are not in your data store, so the system cannot provide automatic validation - you must specify it explicitly.

## Data-Driven Field Selection

Field components are automatically selected based on concept definitions:

- **EmailAddress** concept → **EmailField** component
- **PhoneNumber** concept → **PhoneNumberField** component  
- **Boolean** concept → **BooleanField** (checkbox/toggle)
- **ChooseOne** from set → **RadioGroup** (≤6 options) or **SelectField** (>6 options)
- **ChooseSome** from set → **CheckboxGroup** or **MultiSelectField**

### Composite Field Example: PhoneNumber
```tsx
<Concept name="PhoneNumber">
  <Property name="countryCode" type="CountryDialingCode" />
  <Property name="number" type="String" />
  <Property name="extension" type="String" optional />
  <Property name="type">
    <ChooseOne options={["mobile", "landline", "voip"]} />
  </Property>
  <Property name="capabilities">
    <ChooseSome options={["voice", "sms", "mms", "fax"]} />
  </Property>
</Concept>
```

This automatically generates a **PhoneNumberField** with:
- Country code dropdown
- Main number input
- Optional extension field
- Phone type selection (auto-radio for 3 options)
- Capabilities checkboxes

## Component Interaction and Pub-Sub

All components communicate through the Operator pub-sub system. Components declare what they publish and subscribe to, enabling complete decoupling:

### Auto-Publishing Components
```tsx
<Form concept="Person" type="create" 
      publish={["FORM.submitted", "PERSON.created"]} />

<ValidationBehavior 
      subscribe="FORM.fieldChanged" 
      publish="VALIDATION.result" />

<NotificationDisplay 
      subscribe={["PERSON.created", "VALIDATION.failed"]} />
```

### Event Flow Example
```
1. User types in email field
2. EmailField publishes "FORM.fieldChanged" 
3. EmailValidation subscribes, validates, publishes "VALIDATION.result"
4. Form subscribes to validation results, updates UI state
5. ErrorDisplay subscribes to validation failures, shows messages
```

## Nesting and Composition Patterns

### Behaviors within Pages

**For Persisted Data**: Validation comes automatically from the concept's Shape definition. Behaviors in forms are typically for overriding help messages or ephemeral fields:

```tsx
<Page>
  <Article>
    <Form concept="Person">
      <!-- Persisted fields get validation automatically from Person concept -->
      <Feature name="email" help="This is your personal email address." />
      
      <!-- Ephemeral fields need explicit behaviors -->
      <Feature name="confirmPassword">
        <Validation>
          <Is.Equal>
            <From.Feature name="confirmPassword" />
            <From.Feature name="password" />
          </Is.Equal>
        </Validation>
      </Feature>
    </Form>
  </Article>
</Page>
```

### Imported Reusable Behaviors

**Primarily for conditional display and ephemeral features**:

```tsx
// In behaviors/display/ShowAdminOnly/index.tsx
export default function ShowAdminOnly() {
  return (
    <ShowIf>
      <Is.True>
        <From.Element selector="#userIsAdmin" />
      </Is.True>
    </ShowIf>
  )
}

// In behaviors/validation/PasswordConfirmation/index.tsx
export default function PasswordConfirmation() {
  return (
    <Validation name="PasswordsMatch">
      <Is.Equal>
        <From.Feature name="password" />
        <From.Feature name="confirmPassword" />
      </Is.Equal>
    </Validation>
  )
}

// In pages/admin/Dashboard/index.tsx
<Page>
  <Article>
    <If.Admin>
      <AdminControlPanel />
    </If.Admin>
    
    <!-- Regular persisted data gets automatic validation -->
    <Form concept="User" />
  </Article>
</Page>
```

## File Organization Integration

Components are organized in folders matching their DSL wrapper:

- **pages/** → `<Page>` components (using Pagewright wrapped elements)
- **behaviors/** → `<Behavior>` components  
- **data/** → `<Data>` concepts
- **events/** → `<Events>` definitions
- **memory/** → `<Memory>` state management
- **distributed/** → `<Distributed>` configuration
- **proofs/** → `<Proofs>` tests and verification

## Key Design Principles

### 1. Configuration, Not Programming
End users compose and configure existing components rather than writing custom code:

```tsx
// ✅ Configuration - user composes existing components
<Validation>
  <And>
    <Is.Integer />
    <Is.Positive />
    <Is.LessThan>
      <Constant>42</Constant>
    </Is.LessThan>
  </And>
</Validation>

// ❌ Programming - requires writing custom functions
function validateAge(value) {
  return Number.isInteger(value) && value > 0 && value < 120
}
```

### 2. Never Blame the User
If something is confusing or produces unexpected results, that's the framework's responsibility to guide users kindly and helpfully. The system should:

- **Provide helpful guidance** instead of cryptic error messages
- **Preserve user intent** even when technically incorrect (e.g., automatic element substitution)
- **Teach through examples** rather than scolding through warnings
- **Make corrections transparently** while explaining why
- **Build user confidence** by making success feel natural and failure feel like learning

This philosophy extends throughout the entire DSL - from component composition to validation messages to development tooling.

### 3. Single Source of Truth
Data concepts defined once drive everything else:

```tsx
<Concept name="EmailAddress">
  <Shape>
    <And>
      <Is.String />
      <Is.Matching>
        <Constant>/.+@.+/</Constant>
      </Is.Matching>
      <And>
        <Is.GreaterThan>
          <Constant>5</Constant>
        </Is.GreaterThan>
        <Is.LessThan>
          <Constant>100</Constant>
        </Is.LessThan>
      </And>
    </And>
  </Shape>
</Concept>

// This automatically provides:
// - Client-side validation (from Shape)
// - Server-side validation (same Shape rules)
// - Database constraints (generated from Shape)
// - Form field selection (EmailField component)
// - SHACL ontology rules (compiled from Shape)
// - Property-based test generation (by Auditor)
// - Error messages (default, customizable per form)
```

### 4. Complete Decoupling
Components interact only through pub-sub events, never direct references:

```tsx
// Form doesn't know about validation - publishes events
<Form concept="Person" publish={["FIELD.changed"]} />

// Validation doesn't know about forms - subscribes to events  
<Validation subscribe="FIELD.changed" publish="VALIDATION.result" />

// Display doesn't know about either - subscribes to results
<ErrorDisplay subscribe="VALIDATION.failed" />
```

### 5. Progressive Enhancement Built-In
All components work without JavaScript and enhance when available:

```tsx
<Form concept="Person" enhance="validate">
  <!-- Works as standard HTML form POST -->
  <!-- Enhanced with client-side validation when JS loads -->
  <!-- Enhanced with real-time feedback via pub-sub -->
</Form>
```

### 6. Natural Language Readability
Component names and compositions read like plain English:

```tsx
<Person>
  <HasOne name="worksFor">
    <Organization />
  </HasOne>
  <HasMany name="manages">
    <Person />
  </HasMany>
</Person>

<If>
  <Is.Adult>
    <From.Element selector="#age" />
  </Is.Adult>
  <Then>
    <VotingEligibilityForm />
  </Then>
</If>
```

**Or using more explicit comparison:**
```tsx
<If>
  <Is.GreaterThanOrEqual>
    <Referent>
      <From.Element selector="#age" />
    </Referent>
    <Comparand>
      <Constant>18</Constant>
    </Comparand>
  </Is.GreaterThanOrEqual>
  <Then>
    <VotingEligibilityForm />
  </Then>
</If>
```

## Implementation Status

**ALPHA** with plenty of obsolete or broken code and even more missing.

This DSL specification enables the "everything is data" philosophy while maintaining intuitive, English-like component composition that domain experts can understand and configure without programming knowledge.
