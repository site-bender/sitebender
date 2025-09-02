# Brainstorming Ideas for the Sitebender project

## New

1. How can we provide for great error logging, visualization, etc.?
  - Will we need a time-series database. If so, is there a good FOSS one? How about Prometheus? Should we use Grafana for visualization? Is that free? What about Thonos and Cortex? Can Thonos/Cortex work with distributed db such as Storacha or similar?
2. How are we going to handle authentication and authorization in our JSX-declarative way with components?

The idea is to provide a completely declarative, immutable, pure high level DSL for creating entire web apps using only JSX components (AI assisted).

1. An AI-assisted, natural language, **intent-based** interface for building and managing entire web applications without knowing any code.
2. A visual interface for designing application workflows, allowing users to drag and drop components and define their behavior through natural language instructions.
3. Integration with popular third-party APIs and services, enabling users to easily connect their applications to external data sources and functionality.
4. A comprehensive library of pre-built, customizable components and templates that guarantee accessibility, standards-compliance, semantic correctness, etc. using plain language for the components to accelerate the development process and promote best practices.
5. Real-time collaboration features, allowing multiple users to work on the same project simultaneously and see each other's changes in real-time, using CRDTs and more to sync up changes, and the ability to work offline.
6. Comprehensive documentation, tutorials, examples, and playgrounds (a la Jupyter notebooks) to help users understand the platform and get the most out of its features.

Ideally, the user describes what she wants in plain English and the AI translates this into our JSX DSL (visibly so the user can see the mapping from intent to code). The DSL is written in plain natural language, so it reads like English (but with angle brackets).

For power users, the ability to do the same in TOML or similar files. See example in YAML below.

This is a system where the triple store's unparalleled flexibility is the engine, and the user-facing abstraction is a **natural language and intent-based interface.** This is a paradigm shift from "how do I structure my database?" to "what data do I need to solve my problem?".

## Terminology (data-driven UI)

- Vault: The app’s private database boundary. Each app has its own Vault for security and privacy.
- Collection: The schema-defined type of things in your Vault (e.g., TShirt). It holds the fields and validations for that type.
- Item: A single instance within a Collection (e.g., one customer’s order).
- Field: A named piece of data in a Collection schema, with a Validation block defining datatype/constraints. Field maps directly to the `<Field />` used in forms.

How Form uses it
- `<Form for="TShirt">` reads the Collection schema from the Vault.
- `<Field name="size" />` renders the appropriate widget based on Field datatype/validators (and the same validators are used client- and server-side).

### 1. The "Simple English" Data Description

The user doesn't define tables or collections. They describe their domain.

**User's Input (in a UI wizard or config file):**
```yaml
# datasource.yml
MyTShirtStore:
  entities:
    Product:
      - name: String (required)
      - description: Text
      - price: Number
      - colors: List of Strings
      - sizes: List of Strings

    CustomerOrder:
      - orderId: String (auto-generated, unique)
      - customer: References a Customer
      - items: List of Items in this Order
      - status: One of: ["pending", "paid", "shipped", "delivered"]
      - createdAt: DateTime (auto-set)
      - total: Number (calculated)

    Customer:
      - email: String (required, unique, format: email)
      - name: String
      - shippingAddress: A complex Address object
```

**What SiteBender Does:**
1.  **AI/NLP Parsing:** Interprets this description. "List of Strings" -> `rdf:Seq` of `xsd:string`. "References a Customer" -> an `owl:ObjectProperty` with a class constraint.
2.  **Generates Ontology:** Creates a comprehensive OWL ontology behind the scenes, defining classes (`:Product`, `:CustomerOrder`), properties (`:hasPrice`, `:hasStatus`), and datatypes.
3.  **Generates SHACL Shapes:** Creates rigorous validation rules from the constraints. `(required, unique, format: email)` becomes a SHACL shape with `sh:minCount 1`, `sh:unique true`, and `sh:pattern` for email.
4.  **Creates Fuseki Entity:** Prepares the triplestore with the necessary graphs and prefixes.

The user *never* sees this, but it's generated and stored:
```turtle
# Generated Ontology
:Customer a owl:Class .
:email a owl:DatatypeProperty ;
    rdfs:domain :Customer ;
    sh:minCount 1 ;
    sh:unique true ;
    sh:pattern "^\\S+@\\S+\\.\\S+$" .
```

### 2. The AI-Assisted UI

This is where the magic happens for the user. The AI acts as a co-pilot.

*   **"I need a form to collect a new customer's email and name."**
    *   The AI knows what a `Customer` is from the data description.
    *   It generates the starting JSX:
        ```jsx
        <Form for="Customer">
          <Form.Text name="email" label="Email Address" />
          <Form.Text name="name" label="Full Name" />
          <Form.SubmitButton label="Sign Up" />
        </Form>
        ```
    *   It explains: "I've created a form for your Customer entity. I've added validation to ensure the email is unique and properly formatted."

*   **"Now I need a page where someone can order a t-shirt."**
    *   The AI understands the relationships: an `Order` has `items` which are related to `Products`.
    *   It generates a complex `<Entity>` with calculations for the total and a form that lets you select a product, choose a color/size, and quantity.
    *   It might suggest: "For performance, I can pre-fetch the list of products. I'll also add a validation to ensure the selected size is available for the chosen product."

*   **"Make the 'total' field update automatically."**
    *   The AI understands this is a derived value. It modifies the JSX, wrapping the form in a `<Entity>` and adding a `<Calculation>` for the `total` that depends on the `items` in the order and their quantities.

### 3. The Architectural Advantage of the Triplestore

This is why a triple store is the only choice for this vision:

*   **Agility:** The schema is fluid. If the user adds `" - loyaltyTier: String"` to the `Customer` description, the system just adds a new triple `:loyaltyTier a owl:DatatypeProperty; rdfs:domain :Customer .`. No migrations, no `ALTER TABLE` statements.
*   **Inference:** Your AI could use reasoners to suggest improvements. "I see you have a `birthdate` field and you're calculating age. I can infer an `age` property for you if you'd like."
*   **No Impedance Mismatch:** The user's mental model (objects with properties) maps 1:1 to the database's model (RDF triples). There's no need for an ORM to translate between objects and relational tables.

### 4. Addressing Your Practical Concerns

*   **Distributed Data Store:** You're right, vanilla Fuseki isn't distributed. The pragmatic path is to **start with a single Fuseki instance.** Your abstraction means you can swap it out later without the user ever knowing. When you need to scale, you could move to:
    *   **AWS Neptune:** A managed graph database that supports RDF/SPARQL. It's essentially "Fuseki-as-a-service" with distribution and high availability.
    *   **Stardog:** A commercial semantic graph database with advanced features.
    *   **A Custom Sharding Layer:** A more advanced project would be to build a layer that distributes data across multiple Fuseki instances based on the graph name.

*   **Performance & ACID:** For most CRUD-style form applications, Fuseki is more than performant enough. You can use **named graphs** to isolate user data logically. For transactions requiring strong ACID guarantees, you could still use the triplestore as your primary "schema-less" data store but offload certain operations to a traditional RDBMS if an audit trail is critical, using the same IR to generate both.

### Conclusion: The Invisible Database

We are building the ultimate abstraction: **The Invisible Database.**

The user describes their problem and their data in human terms. The AI and the triple store handle the implementation details. The JSX is the elegant, visible manifestation of this system — a declarative language for building UIs that is perfectly mirrored by a declarative data layer.

By building it in layers — starting with the JSX DSL and a local Fuseki instance — we create immense value at each step, all while working towards this groundbreaking final product.

## Declarative databases generated from JSX

```tsx
    <Entity>
      <Calculation name="basePrice" dependsOn="selectedSize">
        <When>
          <Or>
            <Is.Equal>
              <From.Value name="selectedSize" />
              <From.Constant value="2XL" />
            </Is.Equal>
            <Is.Equal>
              <From.Value name="selectedSize" />
              <From.Constant value="3XL" />
            </Is.Equal>
          </Or>
        </When>
        <Then>
          <From.Constant value={28} />
        </Then>
        <Else>
          <From.Constant value={25} />
        </Else>
      </Calculation>
      <Calculation name="subtotal" dependsOn="basePrice, quantity">
        <Multiply>
          <From.Value name="basePrice" />
          <From.Value name="quantity" />
        </Multiply>
      </Calculation>
      <Calculation name="gst" dependsOn="subtotal">
        <Multiply>
          <From.Value name="subtotal" />
          <From.Constant value={0.15} />
        </Multiply>
      </Calculation>
      <Calculation name="shippingCost" dependsOn="selectedShipping">
        <From.Value name="selectedShipping" select="price" />
      </Calculation>
      <Calculation name="total" dependsOn="subtotal, gst, shippingCost">
        <Add>
          <From.Value name="subtotal" />
          <From.Value name="gst" />
          <From.Value name="shippingCost" />
        </Add>
      </Calculation>

      <Form>
        <ChooseOneField
          name="selectedColor"
          label="T-Shirt Color"
          optionsFrom="tShirtColors" // Assumes this list is provided elsewhere
          required
        />
        <ChooseOneField
          name="selectedSize"
          label="Size"
          options={['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']}
          required
        />
        <IntegerField
          name="quantity"
          label="Quantity"
          min={1}
          max={10}
          defaultValue={1}
          required
        />
        <ChooseOneField
          name="selectedShipping"
          label="Shipping Method"
          options={[
            { name: 'Standard (5-7 days)', price: 5 },
            { name: 'Express (2-3 days)', price: 12 },
            { name: 'Next Day', price: 25 }
          ]}
          optionLabel="name"
          required
        />
      </Form>
    </Entity>
```

### Why This Version is Radically Better

1.  **Zero Imperative Code:** There is no JavaScript logic embedded in the UI definition. No `() =>`, no `? :`, no `===`. This is a pure, serializable JSON-like structure expressed as JSX.
2.  **True Declarative Power:** The logic is built by composing components. `<Multiply>` declares an intent to multiply, `<Is.Equal>` declares an intent to compare. The platform's compiler/interpreter is responsible for figuring out *how* to execute that intent. This is a much deeper and more powerful abstraction.
3.  **AI and Tooling Friendly:** This structure is perfectly suited for AI. An AI assistant can easily generate and manipulate these component trees without having to generate and parse complex code strings. It can also be visualized, edited in a GUI builder, and analyzed for errors much more easily.
4.  **The Ultimate Single Source of Truth:** This entire file can be compiled *deterministically* to:
    *   The frontend form UI
    *   The client-side validation functions
    *   The backend SHACL schema
    *   The backend data model (RDF)
    *   The backend calculation logic (e.g., via a custom interpreter or compilation to SPARQL)
    There is no ambiguity and no room for impedance mismatch.
5.  **Accessibility:** A developer or even a tech-savvy product manager only needs to learn the vocabulary of the components (`When`, `Then`, `Is`, `Add`) rather than the semantics of a programming language. The learning curve is about understanding what the components *do*, not how to *code*.

This is the correct one for creating a truly novel and accessible platform that hides the immense complexity of the technologies underneath (Fuseki, SHACL, SPARQL). We're not building a form library; we're building a **declarative application compiler.**

## A Step Further

**SiteBender** isn't a form generator; it's a **high-level, declarative compiler for building entire web applications.** The forms and the Jena Fuseki backend are just powerful, hidden features within that system.

The JSX DSL defines the *what*, and SiteBender handles the *how*: HTML, CSS, client-side state, validation, routing, data persistence, and business logic.

Here is how a T-shirt page might look within this all-encompassing vision of SiteBender.

### The SiteBender DSL in Action (`TShirtPage.tsx`)

```tsx
// TShirtPage.tsx
import { Site, Page, Entity, View, Calculation, Form, When, Then, Else, Or, Is, From, Add, Multiply } from 'sitebender';

// 1. Define the product data. This could come from a CMS block or a Query.
const product = {
  name: "Premium T-Shirt",
  description: "A classic, comfortable t-shirt in a range of vibrant colors.",
  colors: ['Obsidian Black', 'Glacier White', 'Midnight Blue', 'Forest Green', 'Crimson Red', 'Sunburst Yellow', 'Volcanic Orange', 'Lavender Purple', 'Dusty Pink', 'Slate Grey', 'Ocean Teal', 'Sandstone Beige'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
  shippingOptions: [
    { name: 'Standard (5-7 days)', price: 5 },
    { name: 'Express (2-3 days)', price: 12 },
    { name: 'Next Day', price: 25 }
  ]
};

// 2. The Page Component - No <div>, <h1>, or <p> in sight.
<Page name="TShirtProductPage" title="Premium T-Shirt">
  <Heading>
    Premium T-Shirt
  </Heading>

  <Text>
    A classic, comfortable t-shirt in a range of **vibrant colors**.
  </Text>

  {/*
    3. Is this really how we want to do this? This isn't actually a schema
       for the entity, it is more of a query definition or some kind of 
       business logic.

       Really, the Vault.Item should define the structure of the data more explicitly.
       So a Property and then a Validation object that describes the datatype: the
       "shape" of the data.

       Example:

       ```tsx
       ```tsx
        <Vault name="myOnlineShirtShop>
          <Entity name="tShirt">
            <Property name="size" type="set">
              <Validation>
                <Is.InSet>
                  <From.Value name="sizes" />
                  <From.Constant value="XS, S, M, L, XL, 2XL, 3XL" />
                </Is.InSet>
              </Validation>
            </Property>
            <Property name="color" type="set">
              <Validation>
                <Is.InSet>
                  <From.Value name="colors" />
                  <From.Constant value="Obsidian Black, Glacier White, Midnight Blue, Forest Green, Crimson Red, Sunburst Yellow, Volcanic Orange, Lavender Purple, Dusty Pink, Slate Grey, Ocean Teal, Sandstone Beige" />
                </Is.InSet>
              </Validation>
            </Property>
          </Entity>
          <Entity name="polo">...</Entity>
        </Vault>
       ```

       Not exactly that, maybe, but something like that. The Vault.Item converts to SHACL from the IR.

       The Vault with that name is a singleton. If we open it elsewhere, we are simply adding to it.
       How to avoid collisions?
  */}
  {/* multiple <Vault.Item />s make up a <Vault/> */}
  <Entity>
    <Calculation name="basePrice" dependsOn="selectedSize">
      <When>
        <Or>
          <Is.Equal>
            <From.Value name="selectedSize" />
            <From.Constant value="2XL" />
          </Is.Equal>
          <Is.Equal>
            <From.Value name="selectedSize" />
            <From.Constant value="3XL" />
          </Is.Equal>
        </Or>
      </When>
      <Then>
        <From.Constant value={28} />
      </Then>
      <Else>
        <From.Constant value={25} />
      </Else>
    </Calculation>

    <Calculation name="subtotal">
      <Multiply>
        <From.Value name="basePrice" />
        <From.Value name="quantity" />
      </Multiply>
    </Calculation>

    <Calculation name="gst">
      <Multiply>
        <From.Value name="subtotal" />
        <From.Constant value={0.15} />
      </Multiply>
    </Calculation>

    <Calculation name="shippingCost">
      <From.Value name="selectedShipping" key="price" />
    </Calculation>

    <Calculation name="total">
      <Add>
        <From.Value name="subtotal" />
        <From.Value name="gst" />
        <From.Value name="shippingCost" />
      </Add>
    </Calculation>

    {/* 4. The Form provides the input UI, bound to the Entity */}
    <Form>
      <Form.ChooseOneField
        name="selectedColor"
        label="T-Shirt Color"
      >
        <From.Value name="tShirtColors" />
      </Form.ChooseOneField>

      <Form.ChooseOneField
        name="selectedSize"
        label="Size"
      >
        <From.Value name="tShirtSizes" />
      </Form.ChooseOneField>

      <Form.IntegerField name="quantity" label="Quantity" min="1" max="10" default="1" />

      <Form.ChooseOneField name="selectedShipping" label="Shipping Method" optionLabel="name">
        <From.Value name="tShirtShippingOptions" />
      </Form.ChooseOneField>

      {/* 5. The View component displays data from the Entity */}
      <Divider />

      <Heading>Order Summary</Heading>

      <DataGrid>
        <DataRow label="Price per shirt">
          <From.Value name="basePrice" format="currency" />
        </DataRow>
        <DataRow label="Subtotal">
          <From.Value name="subtotal" format="currency" />
        </DataRow>
        <DataRow label="GST (15%)">
          <From.Value name="gst" format="currency" />
        </DataRow>
        <DataRow label="Shipping">
          <From.Value name="shippingCost" format="currency" />
        </DataRow>
        <DataRow label="Total" emphasis="high">
          <From.Value name="total" format="currency" />
        </DataRow>
      </DataGrid>

      <Form.SubmitButton label="Add to Cart" />
    </Form>
  </Entity>
</Page>
```

### Key Principles of the SiteBender DSL

1.  **Total Abstraction:** No native HTML elements. Everything is a SiteBender component (`<View>`, `<Form.*>`, `<Calculation>`), which guarantees consistency, accessibility, and compiles to optimized code.
2.  **Vocabulary, Not Syntax:** The language is built around a task-oriented vocabulary.
    *   **"ChooseOneField"** is clearer than "select" or "radio group".
    *   **"DataGrid"** and **"DataRow"** are clearer than wrestling with `<table>` or `<div>` layouts.
    *   **"From.Value"** is a clear declaration of intent to read from a named state.
3.  **Multiple Expression Syntaxes:** Two valid styles for brevity and power:
    *   **JSX Style (`<Multiply>...</Multiply>`)**: Most verbose, most declarative, easiest for AI and tools to manipulate.
    *   **Function Style (`Multiply(...)`)**: More concise for simple expressions. The compiler treats them identically. (This is an add on for actual devs to be less verbose.)
4.  **Dogfooding Everything:** The SiteBender documentation, tutorial site, and component browser are themselves built with SiteBender. This proves its capability and provides the ultimate, living examples. A user can literally click "View Source" on any part of the docs to see the SiteBender JSX that built it.

This approach creates a completely new authoring experience. The user is not coding; they are **declaratively composing** an application using a curated set of powerful, interoperable components. The complexity of the underlying triple store, SHACL validation, and JSX code is completely abstracted away, delivered as a reliable, scalable service. 

This level of abstraction is exactly what makes a system like SiteBender revolutionary. The developer describes the *semantic structure* ("this is a heading"), and the system handles the precise implementation (the `h` level, the CSS class, the accessibility attributes) automatically and correctly.

This removes entire categories of common errors and decisions, streamlining development immensely.

### Why This is a Fundamental Improvement

1.  **Pure Semantics:** The component names (`<Heading>`, `<Text>`, `<DataGrid>`, `<DataRow>`) describe their *purpose and meaning* within the document, not their appearance. The system infers the correct HTML element and structure.
2.  **Automatic Document Outline:** The SiteBender compiler can analyze the page structure. The main `<Heading>` becomes an `<h1>`. The `<Heading>` inside the form becomes an `<h2>`, but the compiler ensures it is *semantically correct* (e.g., it might be nested inside a `<section>` created for the form, maintaining a valid document outline). The developer never thinks about `h` levels. (The compiler looks up the ancestry to see what the next higher Heading is and increments that by one, but never more than six.)
3.  **Unified Theming:** A theme applies to these semantic components. Changing the theme will change the appearance of *every* `<Heading>` across the entire site consistently. The developer isn't applying a class like `text-lg font-bold`; they are defining content structure, and the design system handles the rest.
4.  **Reduced Cognitive Load:** The developer has fewer decisions to make. They don't choose between a `div`, `span`, or `p`; they use `<Text>`. They don't debate `h2` vs. `h3`; they use `<Heading>`. This dramatically simplifies the mental model for building pages.
5.  **Built-in Accessibility:** Because the system controls the output, it can guarantee accessibility features are implemented correctly. `<DataGrid>` and `<DataRow>` will generate proper ARIA roles. The automatic heading hierarchy ensures screen readers can navigate the page logically.

This approach doesn't just make building the *first* version of a page easier; it makes the entire application more **consistent, maintainable, and robust.** It embodies the principle that the developer should focus on the *what* (the content and the logic), and the powerful, opinionated platform should handle the *how*. This is the hallmark of a truly transformative development tool.

## The Text Component

This is a killer feature and the perfect evolution of the `<Text>` component. It combines the readability and simplicity of Markdown for the common cases with the power and expressiveness of your JSX DSL for complex elements, all within a single, cohesive semantic container.

This approach respects the user's mental model at different levels of task complexity.

### Thoughts on the Hybrid Markdown/JSX `<Text>` Element

**1. For Content Authors / Designers (The 80% Case):**
They can write pure, familiar Markdown. It's the fastest way to get rich text onto a page.

```tsx
<Text>
  This is a paragraph with some **bold** text and a [link to Google](https://google.com/).

  This is another paragraph with *italic* and `code`.
</Text>
```
This is low-friction, intuitive, and requires no knowledge of the component library.

**2. For Developers / Power Users (The 20% Case):**

When they need something more powerful than a standard Markdown link—like a dynamically generated link, a tooltip, or a complex interactive element—they can drop into JSX seamlessly.

```tsx
<Text>
  Check out our new feature! **It's amazing!** 

  <Link tooltip="Click to explore">
    <Property name="url">
      <From.Value name=dynamicPagePath" />
    </Property>
    Learn more here.
  </Link>

  Or, contact <Button variant="inline" label="Support">
    <When.Clicked action="openChatSupport" />
  </Button>.
</Text>
```
This is incredibly powerful. It turns static text into a potential mini-application.

**3. The Best of Both Worlds (The 100% Case):**
The ability to intermingle them is where the magic truly happens.
```tsx
<Text>
  Welcome back, **{userName}**. You have <Badge type="info">{unreadCount}</Badge> new messages.

  [View your inbox](/inbox) or <Button variant="primary" size="small" label="Dismiss">
    <When.Clicked action="dismissNotification" />
  </Button>.
</Text>
```

### Why This is good design

*   **Progressive Complexity:** The user starts with simple Markdown. As their needs grow, they progressively enhance their text with JSX without having to change their fundamental approach. There's no "rewriting" from Markdown to a different component system.
*   **Single Source of Truth:** The content for a block of text, from simple formatting to complex interactions, lives in one place. This is much easier to maintain than having a Markdown file and a separate component file for the same UI element.
*   **Component-Driven Design Meets Content:** It bridges the gap between a traditional CMS (which loves Markdown) and a modern component-based application. You could even pull Markdown from a headless CMS and inject your own JSX components into it at runtime.
*   **Simplifies Common Tasks:** Need a link? Just use Markdown. Need a link that fetches data first? Drop in the `<Link>` component. The right tool for the right job is available in the same context.

### Revised Example with the Enhanced `<Text>`

```tsx
<Page name="TShirtProductPage" title="Premium T-Shirt">
  
  <Heading>Premium T-Shirt</Heading>
  
  <Text>
    A classic, comfortable t-shirt in a range of **vibrant colors**. 

    All shirts are $25, except for **2XL and 3XL, which are $28**.
  </Text>

  <Entity>
    {/* ... calculations remain the same ... */}

    <Form>
      {/* ... form fields remain the same ... */}

      <Divider />

      <Heading>Order Summary</Heading>

      <Text>
        Please review your order below. Your total includes **15% GST** and shipping.
      </Text>

      <DataGrid>
        {/* ... data rows remain the same ... */}
      </DataGrid>

      <Text>
        By clicking 'Add to Cart', you agree to our [Terms of Service](/tos) and [Privacy Policy](/privacy).
      </Text>

      <Form.SubmitButton label="Add to Cart" />
    </Form>
  </Entity>
</Page>
```

This approach makes the page feel much more natural and content-rich. The `<Text>` component becomes the workhorse for all narrative content, from simple descriptions to complex, interactive disclosures, all while maintaining the pristine, semantic, and automatically styled nature of the SiteBender system. It's a win for usability and expressiveness.

## Assistant review (copied from chat)

### Quick reactions to strategy points

- Triplestore ops/perf later: Agree. Keep a clean boundary so we can swap storage backends without user-visible changes. MVP can run single-node, even in-process.
- Abstraction stance: Also agree. Prefer a very small set of semantic primitives with a compiler that does the heavy lifting. Marker-components + IR have been working well so far.
- High-level DSL for non-coders: This is the north star, not wrong at all. Guardrails: constrain vocabulary, prove determinism (same input → same IR), and provide clear AI explanations for every transform.
- “Get ontology/shapes right once”: Practically, avoid runtime migrations by versioning IR and codegen, not the ontology itself. Treat ontology/shapes as compiled artifacts from user intent + DSL, then recompile when the source changes.
- AI maturity: Plan for human-in-the-loop. Require the AI to emit both the JSX and a rationale diff. Keep the compiler strict so weak AI output fails fast with actionable messages.
- Offline-first: Desideratum acknowledged. Keep it out of MVP; don’t let it complicate the core pipeline. Design the storage interface with a future offline driver.
- Plugins: No plugins for MVP. An opinionated core keeps the DSL small, the IR precise, and the experience coherent. “This is not for everyone” is a strength.

### Pros I see

- Deterministic declarative IR enables multi-target compilation (UI, validation, RDF/SHACL) with zero impedance mismatch.
- Great fit for AI and GUI tooling; trees of markers are easy to synthesize, diff, and visualize.
- Accessibility and semantics come “for free” from the compiler instead of repeated app code.

### Risks / open questions

- State explosion and debugging: How do users see why a value is what it is? We’ll need an inspector that shows dataflow over the IR. [Editor: agree.]
- Expressivity pressure: Power users will ask for escape hatches. We should design an extension surface that doesn’t leak arbitrary JS into the IR. [Editor: agree. And fuck "power users". They can wait and keep using react.]
- Error messaging: With a high-level DSL, compile-time diagnostics need to be precise and friendly, mapping back to JSX locations and to plain-English guidance. [Editor: absolutely. We need to use monads well and build error tracking and accumulation into everything (error boundaries, too, and a very good UI for debugging — time travel?)]

### MVP slice proposal (thin but end-to-end)

- Inputs: One Page with a Form, 3–5 field types, When/Then/Else, basic arithmetic (Add/Multiply), and a couple of comparators (Is.Equal, Is.Matches).
- Compiler: JSX markers → validated IR; IR → runtime graph + evaluators; IR → basic SHACL stub (file output) for future backend.
- Runtime: In-memory state, reactive recomputation for Calculations, form validation, and submit action that logs/persists JSON locally.
- Tooling: A small Jexer playground that shows JSX, IR, and live view side-by-side; include an AI suggestion pane that prints rationale + diff (stubbed if needed).
- Success criteria: Deterministic compilation, passing strict tests for operators/comparators, live recomputation in the playground, and a docs page built with the same components.

### Next guardrails

- Keep the public DSL vocabulary ruthlessly small until we lock the IR. Prefer adding compiler passes over adding DSL elements.
- Enforce “no JS in DSL” at the type level; expressions are only trees of constructors/markers.
- Emit explanations: every compiler transform should be inspectable to build trust and aid AI. [Editor: absolutely!]

Regarding our back end services (fuseki, visualization, etc. and the site API), should we be considering microservices? How would we best implment them without making the classic microservice mistakes?

Also, how is our devops and devsecops looking? What could be improved?
