# Context-Aware Semantic Compilation

> **The Revolutionary Approach**: Write what you're building, not how HTML works. The system determines correct structure from semantic context.

## The Paradigm Shift

Traditional web development forces developers to think in HTML elements:
- "Should this be an `<h1>` or `<h2>`?"
- "Do I need a `<header>` or just a `<div>`?"
- "Is this a `<section>` or an `<article>`?"

**Pagewright eliminates this cognitive burden entirely.**

## Context-Aware Compilation

The compiler analyzes the entire component tree to determine correct HTML structure automatically:

```tsx
// Developer writes semantic JSX:
<Article>
  <Heading>
    <Title>Why Sitebender Rocks</Title>
    <ByLine>
      <Author>The Architect</Author>
    </ByLine>
  </Heading>
  <Paragraph>Content here...</Paragraph>
  <Section>
    <Heading>
      <Title>'Cuz it is!</Title>
    </Heading>
    <Paragraph>More content...</Paragraph>
    <Section>
      <Heading>
        <Title>Deep Nesting Example</Title>
      </Heading>
      <Paragraph>Even deeper content...</Paragraph>
    </Section>
  </Section>
</Article>

// Compiler generates contextually correct HTML:
<article>
  <header>
    <h1>Why Sitebender Rocks</h1>
    <p class="byline">
      <span class="author">The Architect</span>
    </p>
  </header>
  <p>Content here...</p>
  <section>
    <h2>'Cuz it is!</h2>
    <p>More content...</p>
    <section>
      <h3>Deep Nesting Example</h3>
      <p>Even deeper content...</p>
    </section>
  </section>
</article>
```

## Context Determines Everything

### **Heading Hierarchy**
- `<Title>` in `<Article>` `<Heading>` → `<h1>`
- `<Title>` in `<Section>` `<Heading>` → `<h2>`, `<h3>`, `<h4>`, etc. (based on nesting depth)
- No more manual H1-H6 decisions
- No more developers treating headings as font sizes

### **Context-Sensitive Components**
The same component name produces different HTML based on context:

```tsx
<Poem>
  <Line>Roses are red</Line>        // → <div class="poem-line">
</Poem>

<Lyrics>
  <Line>Yesterday, all my troubles</Line>  // → <div class="lyric-line">
</Lyrics>

<Address>
  <Line>123 Main Street</Line>      // → <div class="address-line">
</Address>

<Dialogue>
  <Line speaker="Hamlet">To be or not to be</Line>  // → <p class="dialogue-line">
</Dialogue>

<Code>
  <Line>const x = 42;</Line>        // → <div class="code-line">
</Code>

<Navigation>
  <Item url="/home">Home</Item>    // → <li><a href="/home">Home</a></li>
</Navigation>

<Bibliography>
  <Item>Smith, J. (2024)</Item>     // → <li class="citation">
</Bibliography>

<Recipe>
  <Ingredients>
    <Item>2 cups flour</Item>       // → <li class="ingredient">
  </Ingredients>
  <Instructions>
    <Item>Mix ingredients</Item>    // → <li class="instruction">
  </Instructions>
</Recipe>
```

## Route-Based Page Promotion

**Revolutionary insight**: Any component becomes a full page when it's the top-level component in a route.

```tsx
// In pages/about/index.tsx (top-level route):
<About>
  <Heading>
    <Title>About Sitebender</Title>
  </Heading>
  <Paragraph>We're revolutionizing web development...</Paragraph>
</About>

// Automatically becomes a FULL PAGE:
<html>
  <head>
    <title>About Sitebender</title>
    <meta name="description" content="We're revolutionizing web development..." />
    <!-- All site metadata, overridable but not required -->
  </head>
  <body>
    <main>
      <section class="about">
        <h1>About Sitebender</h1>
        <p>We're revolutionizing web development...</p>
      </section>
    </main>
  </body>
</html>

// In some-article.tsx (nested context):
<Article>
  <Paragraph>Main content...</Paragraph>
  <EndMatter>
    <About>...</About>  // Same component, different context!
  </EndMatter>
</Article>
// → Becomes about SECTION within footer, no page wrapper
```

## Semantic Component Types

Think in terms of what things ARE, not their implementation:

```tsx
<Essay>                    // Academic or long-form writing
<Tutorial>                 // Instructional content
<Reference>                // Documentation
<Portfolio>                // Showcasing work
<Landing>                  // Marketing content
<Dashboard>                // Application interfaces
<Blog>                     // Blog collection
<Article>                  // Individual article
<Products>                 // Product collection
<Product>                  // Individual product
<Contact>                  // Contact information
<About>                    // About information
<Services>                 // Service offerings
<Team>                     // Team information
```

Each generates appropriate structure based on context:
- **As top-level route**: Full page with html/head/body wrapper
- **As nested component**: Appropriate section/article/div element
- **Schema.org metadata**: Automatic based on semantic type
- **Accessibility patterns**: Context-appropriate ARIA roles
- **CSS classes**: Semantic class names for styling

## Document Components

### **Academic Writing**
```tsx
<Essay>
  <Heading>
    <Title>The Revolutionary Nature of Semantic Compilation</Title>
    <Subtitle>How Context Awareness Changes Everything</Subtitle>
    <ByLine>
      <Author>The Architect</Author>
      <Affiliation>Sitebender Studio</Affiliation>
      <PublicationDate>2024-12-30</PublicationDate>
    </ByLine>
  </Heading>
  
  <Abstract>
    This paper explores the revolutionary approach of context-aware semantic compilation...
  </Abstract>
  
  <Section>
    <Heading>
      <Title>Introduction</Title>
    </Heading>
    <Paragraph>Traditional web development...</Paragraph>
  </Section>
  
  <EndMatter>
    <References>
      <Citation id="smith2024">Smith, J. (2024). Semantic Web Principles.</Citation>
      <Citation id="jones2023">Jones, M. (2023). Context-Aware Systems.</Citation>
    </References>
    <Appendix>
      <Title>Implementation Details</Title>
      <Paragraph>Technical specifications...</Paragraph>
    </Appendix>
  </EndMatter>
</Essay>
```

### **Creative Writing**
```tsx
<Poem>
  <Heading>
    <Title>Digital Dreams</Title>
    <Author>Code Poet</Author>
    <PublicationDate>2024-12-30</PublicationDate>
  </Heading>
  
  <Epigraph>
    <Quote>In the beginning was the Word, and the Word was with Code</Quote>
    <Attribution>Ancient Developer Proverb</Attribution>
  </Epigraph>
  
  <Stanza>
    <Line>In silicon valleys deep and wide,</Line>
    <Line>Where algorithms dance and collide,</Line>
    <Line>A framework rises, pure and bright,</Line>
    <Line>To bring semantic web to light.</Line>
  </Stanza>
  
  <Stanza>
    <Line>No more divs without meaning,</Line>
    <Line>No more headers intervening,</Line>
    <Line>Context guides the compilation,</Line>
    <Line>Semantic web's new foundation.</Line>
  </Stanza>
</Poem>
```

### **Technical Documentation**
```tsx
<Tutorial>
  <Heading>
    <Title>Getting Started with Semantic Components</Title>
    <Difficulty>Beginner</Difficulty>
    <EstimatedTime>15 minutes</EstimatedTime>
  </Heading>
  
  <Prerequisites>
    <Item>Basic JSX knowledge</Item>
    <Item>TypeScript familiarity</Item>
  </Prerequisites>
  
  <Step number={1}>
    <Title>Install Pagewright</Title>
    <CodeBlock language="bash">
      deno add @sitebender/pagewright
    </CodeBlock>
  </Step>
  
  <Step number={2}>
    <Title>Write Your First Semantic Component</Title>
    <CodeBlock language="tsx">
      {`<Essay>
        <Heading>
          <Title>My First Essay</Title>
        </Heading>
        <Paragraph>This is revolutionary!</Paragraph>
      </Essay>`}
    </CodeBlock>
  </Step>
  
  <Summary>
    You've just written semantic HTML without thinking about HTML structure!
  </Summary>
</Tutorial>
```

## The Revolutionary Benefits

### **1. Cognitive Load Elimination**
- Developers think in **semantic terms** (what am I building?)
- System handles **technical details** (what HTML should this be?)
- No more HTML structure decisions
- Focus on content and meaning

### **2. Automatic Accessibility**
- Context determines proper ARIA roles
- Heading hierarchy generated correctly
- Navigation patterns applied automatically
- Screen reader optimization built-in

### **3. Perfect SEO**
- Schema.org metadata generated from semantic context
- Proper heading structure for search engines
- Rich snippets from semantic components
- Structured data embedded automatically

### **4. CSS Becomes Semantic**
```css
.poem-line { /* Poetry-specific styling */ }
.lyric-line { /* Music-specific styling */ }
.address-line { /* Address-specific styling */ }
.dialogue-line { /* Drama-specific styling */ }
.code-line { /* Programming-specific styling */ }
```

### **5. Domain Expert Authoring**
- Writers can author `<Essay>` components
- Musicians can create `<Song>` components  
- Scientists can build `<Research>` components
- No HTML knowledge required

## Implementation Architecture

### **Compilation Pipeline**
```
Semantic JSX → Context Analysis → HTML Structure Determination → Standards-Compliant Output
```

1. **Parse semantic components** - Identify component types and nesting
2. **Analyze context** - Determine parent-child relationships
3. **Apply context rules** - Map semantic components to HTML elements
4. **Generate structure** - Create proper heading hierarchy, navigation, etc.
5. **Embed metadata** - Add Schema.org, ARIA, and accessibility attributes
6. **Preserve user data** - Convert unknown props to data-x- attributes

### **Context Rules Engine**
```typescript
// Example context rules
const contextRules = {
  Title: {
    inArticleHeading: () => 'h1',
    inSectionHeading: (depth) => `h${Math.min(depth + 1, 6)}`,
    inFigureCaption: () => 'figcaption',
  },
  Line: {
    inPoem: () => 'div.poem-line',
    inLyrics: () => 'div.lyric-line', 
    inAddress: () => 'div.address-line',
    inDialogue: () => 'p.dialogue-line',
    inCode: () => 'div.code-line',
  },
  Item: {
    inNavigation: () => 'li > a',
    inBibliography: () => 'li.citation',
    inIngredients: () => 'li.ingredient',
    inInstructions: () => 'li.instruction',
  }
}
```

## Why This Is Revolutionary

This approach represents a fundamental leap in web development:

1. **Semantic expressiveness** - Say what you mean directly
2. **Context intelligence** - System understands relationships
3. **Automatic correctness** - Perfect HTML without HTML knowledge
4. **Domain accessibility** - Non-developers can author complex content
5. **Maintenance elimination** - No manual heading hierarchy management

**You're not just building a framework - you're creating a semantic authoring language that compiles to perfect HTML.**

This is genuinely revolutionary because it eliminates the impedance mismatch between human intent and HTML structure, while ensuring perfect accessibility, SEO, and standards compliance automatically.
