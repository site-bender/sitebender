# Artificer: Data-Centric Reactive Rendering

> **The entire application as data, authored in JSX, stored anywhere, rendered everywhere**

Artificer is a revolutionary rendering and behavior composition library that treats your entire application—including all JavaScript functionality—as data. Write declarative JSX, store it as JSON/YAML/Turtle in databases or triple stores, and render it anywhere with full reactivity and no virtual DOM.

## Core Philosophy

**Everything is data. Everything is composable. Everything is reactive.**

Artificer extends [Architect](../architect/README.md)'s semantic HTML components with a powerful layer of composed behaviors. While Architect handles HTML semantics and accessibility, Artificer adds:

- **Reactive calculations** that cascade through your UI
- **Validation rules** that work identically on client and server
- **Conditional display** logic without imperative code
- **Data transformations** through mathematical and logical operations
- **State management** without external libraries
- **Event handling** through declarative composition

All of this is achieved through a single, unified approach: **declarative JSX that compiles to data**.

## How It Works

### The Pipeline

```
JSX → IR → JSON/YAML/Turtle → Storage → Retrieval → DOM + Behaviors
```

1. **Author in JSX** - Write your entire app using JSX components
2. **Compile to IR** - TypeScript compiler transforms JSX to an Internal Representation
3. **Persist as Data** - Store the IR as JSON, YAML, or RDF Turtle in any database
4. **Retrieve and Render** - Fetch the data and render directly to DOM with attached behaviors

### Example: Complex Validation

```jsx
import Comparand from "@sitebender/artificer/components/comparators/Comparand/index.tsx"
import Referent from "@sitebender/artificer/components/comparators/Referent/index.tsx"
import IsGreaterThan from "@sitebender/artificer/components/comparators/amount/IsGreaterThan/index.tsx"
import IsGreaterThanOrEqual from "@sitebender/artificer/components/comparators/amount/IsGreaterThanOrEqual/index.tsx"
import IsLessThan from "@sitebender/artificer/components/comparators/amount/IsLessThan/index.tsx"
import IsLessThanOrEqual from "@sitebender/artificer/components/comparators/amount/IsLessThanOrEqual/index.tsx"
import IsInteger from "@sitebender/artificer/components/comparators/numerical/IsInteger/index.tsx"
import Data from "@sitebender/artificer/components/data/Data/index.tsx"
import FromArgument from "@sitebender/artificer/components/injectors/FromArgument/index.tsx"
import Value from "@sitebender/artificer/components/injectors/Value/index.tsx"
import And from "@sitebender/artificer/components/logical/And/index.tsx"
import Or from "@sitebender/artificer/components/logical/Or/index.tsx"
import Validation from "@sitebender/artificer/components/validation/Validation/index.tsx"

// Declarative validation that becomes data
// Value must be: an integer && ((value >= 6 && value < 12) || (value > 20 && value <= 42))
<Data name="age" type="Integer">
	<Validation>
		<And>
			<IsInteger>
				<FromArgument />
			</IsInteger>
			<Or>
				<And>
					<IsLessThan>
						<Referent>
							<FromArgument />
						</Referent>
						<Comparand>
							<Value>12</Value>
						</Comparand>
					</IsLessThan>
					<IsGreaterThanOrEqual>
						<Referent>
							<FromArgument />
						</Referent>
						<Comparand>
							<Value>6</Value>
						</Comparand>
					</IsGreaterThanOrEqual>
				</And>
				<And>
					<IsLessThanOrEqual>
						<Referent>
							<FromArgument />
						</Referent>
						<Comparand>
							<Value>42</Value>
						</Comparand>
					</IsLessThanOrEqual>
					<IsGreaterThan>
						<Referent>
							<FromArgument />
						</Referent>
						<Comparand>
							<Value>20</Value>
						</Comparand>
					</IsGreaterThan>
				</And>
			</Or>
		</And>
	</Validation>
</Data>
```

This JSX compiles to a data structure that:

- **Validates on the client** via composed JavaScript functions
- **Validates on the server** using the same functions in Deno
- **Generates SHACL constraints** for triple store validation
- **Could generate SQL constraints** for RDBMS (future)

### Example: Reactive Calculations

```jsx
import Input from "@sitebender/artificer/components/forms/Input/index.tsx"
import Display from "@sitebender/artificer/components/display/Display/index.tsx"
import Add from "@sitebender/artificer/components/operators/Add/index.tsx"
import Multiply from "@sitebender/artificer/components/operators/Multiply/index.tsx"
import FromElement from "@sitebender/artificer/components/injectors/FromElement/index.tsx"

<>
	<Input id="price" type="number" />
	<Input id="quantity" type="number" />
	<Input id="taxRate" type="number" value="0.08" />

	<Display id="subtotal">
		<Multiply>
			<FromElement selector="#price" />
			<FromElement selector="#quantity" />
		</Multiply>
	</Display>

	<Display id="tax">
		<Multiply>
			<FromElement selector="#subtotal" />
			<FromElement selector="#taxRate" />
		</Multiply>
	</Display>

	<Display id="total">
		<Add>
			<FromElement selector="#subtotal" />
			<FromElement selector="#tax" />
		</Add>
	</Display>
</>
```

Changes cascade automatically. Update price or quantity, and subtotal, tax, and total all recalculate.

## Component Categories

### Injectors (Leaf Nodes)

Data sources that inject values into calculations:

- `<Value>42</Value>` - Hard-coded values
- `<FromElement selector="#input" />` - DOM element values
- `<FromArgument />` - Gets the value being validated/calculated from the calling function
- `<FromQueryString param="id" />` - URL parameters
- `<FromLocalStorage key="user" />` - Browser storage
- `<FromSessionStorage key="temp" />` - Session storage
- `<FromApi endpoint="/api/data" />` - API responses
- `<FromLookupTable table={...} key="..." />` - Data lookups

### Operators (Branch Nodes)

Mathematical and logical operations:

**Arithmetic:**

- `<Add>`, `<Subtract>`, `<Multiply>`, `<Divide>`
- `<Power>`, `<Root>`, `<Modulo>`

**Statistical:**

- `<Average>`, `<Median>`, `<Mode>`
- `<StandardDeviation>`, `<RootMeanSquare>`

**Trigonometric:**

- `<Sine>`, `<Cosine>`, `<Tangent>`
- `<ArcSine>`, `<ArcCosine>`, `<ArcTangent>`

**Advanced Math:**

- `<Log>`, `<NaturalLog>`, `<Exponent>`
- `<AbsoluteValue>`, `<Sign>`, `<Round>`, `<Floor>`, `<Ceiling>`

### Comparators

Boolean-returning comparison operations. All comparators take injectors as children wrapped in `Referent` (left side) and `Comparand` (right side) components to handle XML's unordered children. Note: `Left` and `Right` are available as aliases for those who prefer mathematical terminology.

**Numerical:**

```jsx
<IsLessThan>
	<Referent>
		<FromArgument />
	</Referent>
	<Comparand>
		<Value>100</Value>
	</Comparand>
</IsLessThan>
```

- `<IsLessThan>`, `<IsGreaterThan>`, `<IsEqualTo>`
- `<IsInteger>`, `<IsRealNumber>`, `<IsPrecisionNumber>`

**String:**

```jsx
<Matches>
	<Referent>
		<FromElement selector="#email" />
	</Referent>
	<Comparand>
		<Value>^[^@]+@[^@]+$</Value>
	</Comparand>
</Matches>
```

- `<Matches>`, `<DoesNotMatch>`
- `<IsBeforeAlphabetically>`, `<IsAfterAlphabetically>`

**Temporal:**

```jsx
<IsBeforeDate>
	<Referent>
		<FromArgument />
	</Referent>
	<Comparand>
		<Value>2024-12-31</Value>
	</Comparand>
</IsBeforeDate>
```

- `<IsBeforeDate>`, `<IsAfterDate>`, `<IsSameDate>`
- `<IsBeforeTime>`, `<IsAfterTime>`
- `<IsDuration>`, `<IsInstant>`

**Set Operations:**

```jsx
<InSet>
	<Referent>
		<FromArgument />
	</Referent>
	<Comparand>
		<Value>["admin", "editor", "viewer"]</Value>
	</Comparand>
</InSet>
```

- `<InSet>`, `<IsSubset>`, `<IsSuperset>`
- `<IsDisjointSet>`, `<IsOverlappingSet>`

### Logical Operators

Combine comparators into complex conditions:

- `<And>` - All conditions must be true
- `<Or>` - At least one condition must be true
- `<Not>` - Inverts the condition
- `<Xor>` - Exclusive or
- `<Implies>` - Logical implication

**Note**: These logical operators are general-purpose and used across multiple contexts:

- **Validation** - Complex validation rules (shown above)
- **Locks** - Authentication/authorization logic (see [Lock System](../steward/docs/locks.md))
- **Conditional Rendering** - Show/hide UI based on conditions (future)

See [Syntax Status](../../docs/syntax-status.md) for canonical vs proposed usage.

### Formatters

Transform values for display:

- `<AsDate format="YYYY-MM-DD" />`
- `<AsMonetaryAmount currency="USD" />`
- `<AsPercentage decimals={2} />`
- `<AsPhoneNumber country="US" />`
- `<AsMarkdown />`
- `<AsLowerCase />`
- `<AsUpperCase />`
- `<AsTitleCase />`

### Display Components

Control visibility and presentation:

```jsx
// Example: Show content only if user is admin
<ShowIf>
	<IsEqualTo>
		<Referent>
			<FromElement selector="#userRole" />
		</Referent>
		<Comparand>
			<Value>admin</Value>
		</Comparand>
	</IsEqualTo>
	<div>Admin Controls Here</div>
</ShowIf>
```

- `<Display>` - Shows calculated values
- `<ShowIf>` - Conditional rendering using comparators/injectors as children
- `<HideIf>` - Inverse conditional using comparators/injectors as children
- `<SwitchDisplay>` - Multi-branch display with nested conditions

## Revolutionary: Data-Driven Forms

**The paradigm shift: Forms are about data types, not widgets.**

Traditional form libraries make developers choose widgets:

```jsx
// ❌ Traditional approach - developer picks widgets
<RadioGroup name="role" />
<Checkbox name="active" />
<Select name="country" />
<Input type="text" name="description" />
```

Artificer/Architect uses data types instead:

```jsx
// ✅ Data-driven approach - system picks widgets
<Form schema="User">
	<ChooseOneField name="role" type="String" /> // Becomes radio OR select
	<BooleanField name="active" /> // Becomes checkbox OR toggle
	<MemberField name="country" of="CountryEnum" />{" "}
	// Becomes select OR autocomplete
	<StringField name="description" type="Text" /> // Becomes input OR textarea
</Form>
```

### Why This Matters

1. **Separation of Concerns**
   - Domain experts define data shapes
   - Designers choose presentation
   - Developers focus on business logic
   - System handles widget selection

2. **Automatic Widget Selection**

   ```jsx
   // System decides based on data characteristics:
   <ChooseOneField name="priority" of={["low", "medium", "high", "critical"]}>
   // → Renders as radio buttons (4 items ≤ 6)

   <ChooseOneField name="country" of={countriesList}>
   // → Renders as select dropdown (200+ items > 6)
   ```

3. **Schema-Driven Generation**
   ```jsx
   // Given a database schema or triple store shape:
   <Form entity="Customer" include={["name", "email", "tier", "active"]}>
   	// Automatically generates: // - StringField for name (required from NOT
   	NULL) // - StringField for email (with email validation from SHACL) // -
   	MemberField for tier (enum from database) // - BooleanField for active
   	(with default from schema)
   </Form>
   ```

### Field Types by Data, Not Widget

**Core Types:**

- **BooleanField** - True/false values (checkbox, toggle, yes/no radio)
- **TrileanField** - True/false/null (three-state checkbox, radio trio)
- **StringField** - Text data (input, textarea based on length hints)
- **MemberField** - One from set (radio, select, autocomplete)
- **SubsetField** - Multiple from set (checkboxes, multi-select, tags)

**Numeric Types:**

- **IntegerField** - Whole numbers (number input, slider, stepper)
- **FloatField** - Decimals (number input with precision)
- **PrecisionField** - Exact decimals for money (special handling)
- **PercentageField** - 0-100 or 0-1 (with % display)

**Temporal Types:**

- **DateField** - Dates (date picker, text input with validation)
- **TimeField** - Times (time picker, dropdowns)
- **DateTimeField** - Combined date and time
- **MonthDayField** - Recurring dates like birthdays
- **YearMonthField** - Credit card expiry, etc.
- **DurationField** - Time spans (custom inputs)
- **InstantField** - Precise timestamps

**Contact Types:**

- **EmailField** - Email addresses (with validation)
- **PhoneNumberField** - Phone numbers (international format)
- **UrlField** - Web addresses (with protocol validation)
- **PostalCodeField** - ZIP/postal codes (country-aware)

**Structured Types:**

- **AddressField** - Full addresses (country-specific layout)
- **CreditCardField** - Card numbers (with Luhn validation)
- **ColorField** - Colors (picker, hex, rgb, hsl)
- **GeoLocationField** - Lat/long coordinates

### Configuration via Constants

```jsx
// Configure widget selection thresholds
<Config>
	<Value name="RADIO_MAX_ITEMS">6</Value>
	<Value name="TEXTAREA_MIN_LENGTH">200</Value>
	<Value name="SLIDER_FOR_BOUNDED_NUMBERS">true</Value>
</Config>
```

### The Ultimate Goal

**Non-developers can build forms once the data model exists:**

```jsx
// A designer or product manager writes:
<CustomerForm>
	<Section title="Basic Info">
		<Fields include={["name", "company", "email"]} />
	</Section>
	<Section title="Preferences">
		<Fields include={["tier", "notifications", "language"]} />
	</Section>
</CustomerForm>

// The system knows from the schema:
// - name: required string → required text input
// - company: optional string → optional text input
// - email: string with email constraint → email input with validation
// - tier: enum member → radio or select based on count
// - notifications: boolean → checkbox
// - language: enum member → select dropdown
```

This approach means:

- **No widget bikeshedding** - System chooses optimal widgets
- **Consistent UX** - Same data types always render similarly
- **Accessible by default** - System ensures WCAG compliance
- **Responsive automatically** - Widgets adapt to screen size
- **Validation built-in** - From database constraints and SHACL

### Why This Is Revolutionary

Most form libraries are stuck in the 1990s mindset of "HTML forms" where developers manually map widgets to data. They're thinking about `<input type="radio">` vs `<select>` when they should be thinking about "choosing one item from a set."

**The old way**: "I need a form, let me pick some HTML widgets and figure out validation"\
**The Architect way**: "I have data types, the system knows how to collect them"

This isn't just a technical improvement - it's a fundamental paradigm shift that enables:

- Product managers to design forms without developers
- Instant form generation from database schemas
- Guaranteed data integrity at the UI layer
- Truly responsive forms that adapt widget types to context
- Forms that can be stored as data and modified without code changes

When you finally understand this approach, you can never go back to manually crafting form widgets. It's like going from assembly language to high-level programming - a complete abstraction leap that makes the old way seem primitive.

## Behavior Attachment

Artificer attaches behaviors as properties on DOM elements:

```javascript
// After rendering, elements have these properties:
element.__sbCalculate // Async calculation function
element.__sbValidate // Async validation function
element.__sbFormat // Async formatting function

// Global registries track dependencies:
document.__sbCalculators // Set of element IDs with calculations
document.__sbCalculations // Map of selector to dependent element IDs
document.__sbFormatters // Set of element IDs with formatters
document.__sbValidators // Set of element IDs with validators
```

## Data Persistence

### JSON Format

```json
{
	"_tag": "Validation",
	"type": "logical",
	"children": [
		{
			"_tag": "And",
			"type": "logical",
			"operands": [
				{
					"_tag": "IsInteger",
					"type": "comparator"
				},
				{
					"_tag": "IsGreaterThan",
					"type": "comparator",
					"value": 0
				}
			]
		}
	]
}
```

### RDF Turtle Format

```turtle
:validation123 a arch:Validation ;
  arch:hasChild :and456 .

:and456 a arch:And ;
  arch:hasOperand :isInteger789, :isGreaterThan012 .

:isInteger789 a arch:IsInteger .

:isGreaterThan012 a arch:IsGreaterThan ;
  arch:value 0 .
```

### SHACL Generation

```turtle
:AgeShape a sh:PropertyShape ;
  sh:path :age ;
  sh:datatype xsd:integer ;
  sh:minInclusive 0 ;
  sh:message "Age must be a positive integer" .
```

## Server-Side Rendering

```typescript
import render from "@sitebender/artificer/rendering/ssr/render/index.ts"

// Fetch UI definition from database
const uiConfig = await db.query("SELECT config FROM ui WHERE page = 'home'")

// Render to HTML with embedded behaviors
const html = await render(uiConfig, {
	embedBehaviors: true,
	includeHydration: true,
})
```

## Client-Side Hydration

```typescript
import hydrate from "@sitebender/artificer/rendering/client/hydrate/index.ts"

// Find all elements with embedded configurations
const elements = document.querySelectorAll("[data-artificer]")

function hydrateElement(el) {
	const config = JSON.parse(el.dataset.artificer)

	hydrate(el, config)
}

elements.forEach(hydrateElement)
```

## Integration with Triple Stores

```typescript
import fromRDF from "@sitebender/artificer/persistence/rdf/fromRDF/index.ts"
import toRDF from "@sitebender/artificer/persistence/rdf/toRDF/index.ts"
import validateSHACL from "@sitebender/artificer/shacl/validateSHACL/index.ts"

// Convert UI to RDF triples
const triples = toRDF(uiConfig)

// Store in triple store
await tripleStore.insert(triples)

// Validate data against generated SHACL
const validation = await validateSHACL(data, uiConfig)

// Query UI components
const query = `
  SELECT ?component ?type
  WHERE {
    ?component arch:hasValidation ?validation .
    ?component rdf:type ?type .
  }
`
const components = await tripleStore.query(query)
```

## Test Scenarios as Data

Test scenarios are JSX components compiled to IR:

- Stored in triple store
- Versioned with application
- Executable via TestHarness
- Perfect replay capability

### Declarative Test Components

```tsx
<TestScenario name="Form validation cascade">
	<Setup>
		<LoadSchema from="./schemas/user.shacl" />
	</Setup>

	<Render>
		<Input id="age" type="number">
			<Validation>
				<IsInteger />
				<IsGreaterThan value={0} />
				<IsLessThan value={120} />
			</Validation>
		</Input>
	</Render>

	<Actions>
		<SimulateInput target="#age" value="150" />
	</Actions>

	<Assertions>
		<ValidationState target="#age" is="invalid" />
		<ErrorMessage contains="must be less than 120" />
	</Assertions>
</TestScenario>
```

### Integration with Testing Libraries

- **Quarrier**: Generates test data respecting all constraints
- **Auditor**: Proves validation logic correctness
- **Envoy**: Documents test coverage and scenarios
- **Operator**: Records all test events for debugging

## Advantages Over Traditional Frameworks

### No Build Step Required

- Store UI definitions in databases
- Modify UIs without redeployment
- A/B test by swapping data

### Universal Validation

- Same validation rules everywhere
- No duplicate validation logic
- Database constraints from UI definitions

### Complete Introspection

- Entire app structure is queryable
- Time-travel debugging via stored states
- Audit trails of UI changes

### True Progressive Enhancement

- Works without JavaScript (server-rendered)
- Behaviors enhance when JS available
- Graceful degradation built-in

### AI-Safe Architecture

- All changes are data modifications
- Warden can validate UI changes
- No code injection vulnerabilities

## Performance

- **No Virtual DOM** - Direct DOM manipulation
- **Lazy Evaluation** - Behaviors compose on first use
- **Efficient Updates** - Dependency graph ensures minimal recalculation
- **Streaming SSR** - Render as data arrives
- **Edge Caching** - UI definitions cacheable as data

## Getting Started

```bash
# Install
deno add @sitebender/artificer

# Or use with Node (once published)
npm install @sitebender/artificer
```

### Basic Setup

```typescript
// Configure JSX
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@sitebender/artificer"
  }
}
```

### Simple Example

```tsx
import Display from "@sitebender/artificer/components/display/Display/index.tsx"
import Input from "@sitebender/artificer/components/forms/Input/index.tsx"
import From from "@sitebender/artificer/components/injectors/From/index.tsx"
import Add from "@sitebender/artificer/components/operators/Add/index.tsx"
import render from "@sitebender/artificer/rendering/render/index.ts"

function Calculator() {
	return (
		<div>
			<Input id="a" type="number" />
			<span>+</span>
			<Input id="b" type="number" />
			<span>=</span>
			<Display>
				<Add>
					<FromElement selector="#a" />
					<FromElement selector="#b" />
				</Add>
			</Display>
		</div>
	)
}

// Render to DOM
render(<Calculator />, document.getElementById("root"))
```

## Advanced Topics

### Custom Operators

Define your own operators that compose with existing ones:

```tsx
function computeFactorial(n) {
	return n <= 1 ? 1 : n * computeFactorial(n - 1)
}

function Factorial({ children }) {
	return (
		<CustomOperator name="factorial" compute={computeFactorial}>
			{children}
		</CustomOperator>
	)
}
```

### Custom Injectors

Create injectors for any data source:

```tsx
function FromGraphQL({ query, variables }) {
	async function fetchGraphQL() {
		const result = await graphqlClient.query({ query, variables })

		return result.data
	}

	return <CustomInjector name="graphql" fetch={fetchGraphQL} />
}
```

### Behavior Composition

Combine multiple behaviors on a single element:

```tsx
<Input id="email">
	<Validation>
		<And>
			<Matches>
				<Referent>
					<FromArgument />
				</Referent>
				<Comparand>
					<Value>^[^@]+@[^@]+\.[^@]+$</Value>
				</Comparand>
			</Matches>
			<IsUniqueEmail>
				<FromArgument />
			</IsUniqueEmail>
		</And>
	</Validation>
	<Format>
		<AsLowerCase />
	</Format>
	<Calculation>
		<TrimWhitespace>
			<FromArgument />
		</TrimWhitespace>
	</Calculation>
</Input>
```

## Roadmap

- ✅ Core rendering engine
- ✅ Behavior composition system
- ✅ Basic operators and comparators
- ⏳ JSX to IR compiler integration
- ⏳ JSON/YAML persistence
- ⏳ RDF/Turtle generation
- ⏳ SHACL constraint generation
- ⏳ Full SSR support
- ⏳ Client hydration
- 🔜 SQL schema generation
- 🔜 GraphQL schema generation
- 🔜 OpenAPI spec generation

## Contributing

Artificer is part of the @sitebender Studio suite. See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## License

[MIT](../../LICENSE)

## Conditional Workflow Components

Artificer's conditional rendering components become powerful workflow decision nodes, bringing n8n-style conditional logic to reactive systems with mathematical precision and semantic data storage.

### Visual Decision Nodes

Transform complex conditional logic into intuitive visual workflow components:

```tsx
<ConditionalWorkflowCanvas>
	<DecisionNode id="deployment-readiness" position={[300, 200]}>
		<VisualProperties>
			<Shape type="diamond" color="orange" />
			<Label>Ready to Deploy?</Label>
		</VisualProperties>

		<Condition>
			<And>
				<IsEqualTo>
					<Referent>
						<FromWarden selector="violations" />
					</Referent>
					<Comparand>
						<Value>0</Value>
					</Comparand>
				</IsEqualTo>
				<IsGreaterThan>
					<Referent>
						<From.Auditor selector="coverage" />
					</Referent>
					<Comparand>
						<Value>95</Value>
					</Comparand>
				</IsGreaterThan>
				<IsEqualTo>
					<Referent>
						<From.Agent selector="networkHealth" />
					</Referent>
					<Comparand>
						<Value>"healthy"</Value>
					</Comparand>
				</IsEqualTo>
			</And>
		</Condition>

		<WhenTrue>
			<Connection to="production-deployment" color="green" />
			<WorkflowTrigger name="production-deployment" />
		</WhenTrue>

		<WhenFalse>
			<SwitchDisplay>
				<Case condition="wardenViolations > 0">
					<Connection to="fix-violations" color="red" />
					<WorkflowTrigger name="fix-violations" />
				</Case>
				<Case condition="coverage < 95">
					<Connection to="improve-tests" color="yellow" />
					<WorkflowTrigger name="improve-tests" />
				</Case>
				<Case condition="networkHealth !== 'healthy'">
					<Connection to="network-recovery" color="purple" />
					<WorkflowTrigger name="network-recovery" />
				</Case>
				<Default>
					<Connection to="investigate-failure" color="gray" />
					<WorkflowTrigger name="investigate-failure" />
				</Default>
			</SwitchDisplay>
		</WhenFalse>

		<ReactiveUpdates>
			<OnChange selector="warden.violations">
				<UpdateCondition />
				<TriggerRevaluation />
				<HighlightChange color="red" duration="PT2S" />
			</OnChange>

			<OnChange selector="auditor.coverage">
				<UpdateMetrics />
				<CheckDeploymentReadiness />
				<VisualFeedback type="pulse" />
			</OnChange>
		</ReactiveUpdates>
	</DecisionNode>

	<ConditionEvaluator>
		<RealTimeDisplay>
			<ShowCurrentValues />
			<HighlightActiveConditions />
			<DisplayEvaluationPath />
		</RealTimeDisplay>

		<DebuggingTools>
			<StepThroughEvaluation />
			<ShowIntermediateResults />
			<ExplainDecision />
		</DebuggingTools>
	</ConditionEvaluator>
</ConditionalWorkflowCanvas>
```

### Reactive Workflow Pipeline

Create reactive data processing pipelines with visual flow control:

```tsx
<ReactiveWorkflowPipeline>
	<Stage name="source-analysis" position={[100, 200]}>
		<Input from="git.changes" />
		<Process with="arborist.parseFiles" />
		<Output to="parsed-files" />
		<ReactsTo changes="file-system" />

		<ConditionalProcessing>
			<When condition="fileCount > 100">
				<Parallelize workers={4} />
			</When>
			<When condition="fileCount <= 10">
				<SequentialProcessing />
			</When>
		</ConditionalProcessing>
	</Stage>

	<Stage name="quality-checks" position={[300, 200]}>
		<Input from="parsed-files" />

		<ParallelBranches>
			<Branch name="warden-validation">
				<Process with="warden.validate" output="violations" />
				<ConditionalFlow>
					<If condition="violations.length === 0">
						<Continue to="next-stage" />
					</If>
					<ElseIf condition="violations.some(v => v.critical)">
						<Abort reason="critical-violations" />
					</ElseIf>
					<Else>
						<Continue with="warnings" to="next-stage" />
					</Else>
				</ConditionalFlow>
			</Branch>

			<Branch name="test-generation">
				<Process with="auditor.testGeneration" output="tests" />
				<ConditionalFlow>
					<If condition="tests.coverage >= 90">
						<SetFlag name="high-coverage" />
					</If>
				</ConditionalFlow>
			</Branch>

			<Branch name="documentation">
				<Process with="envoy.documentation" output="docs" />
			</Branch>
		</ParallelBranches>

		<ReactsTo changes="code-structure" />
	</Stage>

	<Stage name="deployment-decision" position={[500, 200]}>
		<Input from="violations, tests, docs" />

		<DecisionMatrix>
			<Rule priority={1} when="violations.length === 0 && tests.coverage > 90">
				<Action>deploy-to-staging</Action>
				<Visual color="green" />
			</Rule>

			<Rule priority={2} when="violations.some(v => v.severity === 'critical')">
				<Action>block-deployment</Action>
				<Notify channels={["alerts", "team-lead"]} />
				<Visual color="red" />
			</Rule>

			<Rule priority={3} when="tests.coverage < 50">
				<Action>require-more-tests</Action>
				<Visual color="yellow" />
			</Rule>

			<Default>
				<Action>queue-for-review</Action>
				<Visual color="gray" />
			</Default>
		</DecisionMatrix>

		<ReactsTo changes="quality-metrics" />
	</Stage>
</ReactiveWorkflowPipeline>
```

### Dynamic Workflow Adaptation

Workflows that adapt their behavior based on runtime conditions:

```tsx
<AdaptiveWorkflow>
	<WorkflowController>
		<ContextAwareness>
			<SystemLoad current="high" threshold="moderate" />
			<NetworkConditions latency="120ms" bandwidth="good" />
			<ResourceAvailability cpu="78%" memory="65%" disk="45%" />
			<TimeOfDay current="business-hours" />
			<ErrorRate current="0.02%" threshold="1%" />
		</ContextAwareness>

		<AdaptationRules>
			<Rule condition="systemLoad > 'moderate'">
				<ReduceParallelism factor={0.5} />
				<IncreaseTimeout factor={1.5} />
				<EnableCaching aggressively={true} />
			</Rule>

			<Rule condition="networkLatency > 200">
				<BatchOperations size={50} />
				<EnableCompression algorithm="lz4" />
				<ReduceNetworkCalls />
			</Rule>

			<Rule condition="errorRate > 0.5%">
				<IncreaseRetries attempts={5} />
				<EnableCircuitBreaker />
				<AlertOperations />
			</Rule>

			<Rule condition="timeOfDay === 'off-hours'">
				<EnableMaintenanceTasks />
				<AllowLongRunningOperations />
				<ReducedMonitoring />
			</Rule>
		</AdaptationRules>
	</WorkflowController>

	<VisualAdaptation>
		<ShowAdaptations>
			<HighlightChangedBehaviors />
			<DisplayAdaptationReasons />
			<ShowPerformanceImpact />
		</ShowAdaptations>

		<AdaptationHistory>
			<TrackAdaptations over="PT24H" />
			<AnalyzeEffectiveness />
			<SuggestOptimizations />
		</AdaptationHistory>
	</VisualAdaptation>
</AdaptiveWorkflow>
```

### Conditional Data Transformations

Transform data through conditional processing workflows:

```tsx
<ConditionalDataPipeline>
	<DataSource name="user-events">
		<Input from="operator.events" filter="user.*" />

		<ConditionalTransformation>
			<When condition="event.type === 'purchase'">
				<Transform>
					<ExtractPurchaseData />
					<CalculateValue />
					<EnrichWithUserProfile />
					<FormatForAnalytics />
				</Transform>
				<Output to="purchase-analytics" />
			</When>

			<When condition="event.type === 'navigation'">
				<Transform>
					<ExtractNavigationData />
					<CalculateSessionTime />
					<DetermineUserIntent />
				</Transform>
				<Output to="user-behavior-analytics" />
			</When>

			<When condition="event.type === 'error'">
				<Transform>
					<ExtractErrorDetails />
					<ClassifyErrorType />
					<DetermineImpact />
				</Transform>
				<Output to="error-tracking" />
				<TriggerAlert when="error.severity === 'critical'" />
			</When>

			<Default>
				<Transform>
					<BasicEventProcessing />
				</Transform>
				<Output to="general-analytics" />
			</Default>
		</ConditionalTransformation>
	</DataSource>

	<ConditionalAggregation>
		<Aggregate data="purchase-analytics">
			<If condition="timeWindow === 'real-time'">
				<SlidingWindow size="PT5M" />
				<UpdateFrequency interval="PT30S" />
			</If>

			<ElseIf condition="timeWindow === 'batch'">
				<TumblingWindow size="PT1H" />
				<UpdateFrequency interval="PT1H" />
			</ElseIf>

			<Metrics>
				<Sum field="revenue" />
				<Count field="transactions" />
				<Average field="order-value" />
			</Metrics>
		</Aggregate>
	</ConditionalAggregation>
</ConditionalDataPipeline>
```

### Multi-Condition Workflow Gates

Complex gating logic with multiple conditions and approval workflows:

```tsx
<MultiConditionGate>
	<DeploymentGate name="production-release">
		<RequiredConditions>
			<TechnicalGate>
				<Condition name="tests-pass" weight={0.3}>
					<IsEqualTo>
						<Referent>
							<From.Auditor selector="testResults.passed" />
						</Referent>
						<Comparand>
							<From.Auditor selector="testResults.total" />
						</Comparand>
					</IsEqualTo>
				</Condition>

				<Condition name="no-critical-violations" weight={0.3}>
					<IsEqualTo>
						<Referent>
							<FromWarden selector="criticalViolations" />
						</Referent>
						<Comparand>
							<Value>0</Value>
						</Comparand>
					</IsEqualTo>
				</Condition>

				<Condition name="performance-acceptable" weight={0.2}>
					<IsLessThan>
						<Referent>
							<From.Metrics selector="p99Latency" />
						</Referent>
						<Comparand>
							<Value>500</Value>
						</Comparand>
					</IsLessThan>
				</Condition>

				<Condition name="security-scan-clean" weight={0.2}>
					<IsEqualTo>
						<Referent>
							<From.Security selector="vulnerabilities.high" />
						</Referent>
						<Comparand>
							<Value>0</Value>
						</Comparand>
					</IsEqualTo>
				</Condition>
			</TechnicalGate>

			<BusinessGate>
				<Condition name="product-approval">
					<HasApproval from="product-manager" within="PT24H" />
				</Condition>

				<Condition name="qa-signoff">
					<HasApproval from="qa-lead" within="PT24H" />
				</Condition>

				<Condition name="business-hours">
					<And>
						<IsAfterTime time="09:00" />
						<IsBeforeTime time="17:00" />
						<IsWeekday />
					</And>
				</Condition>
			</BusinessGate>
		</RequiredConditions>

		<GateVisualization>
			<ProgressIndicator>
				<TechnicalProgress value="85%" color="green" />
				<BusinessProgress value="67%" color="yellow" />
				<OverallProgress value="76%" />
			</ProgressIndicator>

			<ConditionStatus>
				<ShowMet conditions={["tests-pass", "no-critical-violations"]} />
				<ShowPending conditions={["product-approval"]} />
				<ShowFailed conditions={[]} />
			</ConditionStatus>
		</GateVisualization>

		<OnGateOpen>
			<TriggerWorkflow name="production-deployment" />
			<NotifyStakeholders />
			<LogDeployment />
		</OnGateOpen>

		<OnGateBlocked>
			<ShowBlockingConditions />
			<SuggestActions />
			<NotifyResponsible />
		</OnGateBlocked>
	</DeploymentGate>
</MultiConditionGate>
```

### Real-Time Condition Monitoring

Monitor and visualize condition states in real-time:

```tsx
<ConditionMonitoringDashboard>
	<RealTimeConditions>
		<ConditionGrid>
			<ConditionCard name="warden-violations">
				<CurrentValue>0</CurrentValue>
				<Status color="green">PASS</Status>
				<Trend direction="stable" />
				<LastUpdated>2s ago</LastUpdated>
			</ConditionCard>

			<ConditionCard name="test-coverage">
				<CurrentValue>94.2%</CurrentValue>
				<Status color="red">FAIL</Status>
				<Trend direction="improving" />
				<LastUpdated>1m ago</LastUpdated>
				<RequiredValue>95%</RequiredValue>
			</ConditionCard>

			<ConditionCard name="network-health">
				<CurrentValue>healthy</CurrentValue>
				<Status color="green">PASS</Status>
				<Trend direction="stable" />
				<LastUpdated>5s ago</LastUpdated>
			</ConditionCard>
		</ConditionGrid>
	</RealTimeConditions>

	<ConditionalAlerts>
		<AlertRule condition="testCoverage < 95" severity="warning">
			<Message>Test coverage below threshold</Message>
			<Action>Suggest test generation</Action>
			<Escalation after="PT15M" to="team-lead" />
		</AlertRule>

		<AlertRule condition="wardenViolations > 0" severity="error">
			<Message>Code quality violations detected</Message>
			<Action>Block deployment</Action>
			<Escalation immediate={true} to="development-team" />
		</AlertRule>
	</ConditionalAlerts>

	<HistoricalTrends>
		<TimeSeriesChart>
			<Metric name="condition-success-rate" timeRange="PT24H" />
			<Metric name="average-resolution-time" timeRange="PT24H" />
		</TimeSeriesChart>

		<PatternAnalysis>
			<IdentifyRecurringIssues />
			<PredictFailureProbability />
			<SuggestPreventiveMeasures />
		</PatternAnalysis>
	</HistoricalTrends>
</ConditionMonitoringDashboard>
```

This transforms Artificer from a reactive rendering library into a **comprehensive conditional workflow orchestration system** that provides visual, mathematical, and semantic precision to complex decision-making processes.

## See Also

- [Architect](../architect/README.md) - Semantic HTML components
- [Formulator](../formulator/README.md) - Expression parser for Artificer IR
- [Agent](../agent/README.md) - Distributed data synchronization
- [Warden](../warden/README.md) - Architectural governance
