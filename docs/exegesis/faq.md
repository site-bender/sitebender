# <Sitebender> FAQ

<svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="faq-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:hsl(240, 85%, 30%);stop-opacity:1" />
      <stop offset="100%" style="stop-color:hsl(260, 90%, 25%);stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="200" fill="url(#faq-gradient)" rx="10"/>
  
  <!-- Question marks pattern -->
  <text x="50" y="80" font-family="Arial, sans-serif" font-size="48" fill="snow" opacity="0.3">?</text>
  <text x="150" y="120" font-family="Arial, sans-serif" font-size="36" fill="snow" opacity="0.2">?</text>
  <text x="250" y="90" font-family="Arial, sans-serif" font-size="42" fill="snow" opacity="0.25">?</text>
  <text x="650" y="110" font-family="Arial, sans-serif" font-size="40" fill="snow" opacity="0.3">?</text>
  <text x="720" y="85" font-family="Arial, sans-serif" font-size="38" fill="snow" opacity="0.2">?</text>
  
  <!-- Title -->
  <text x="400" y="110" font-family="Arial, sans-serif" font-size="42" font-weight="bold" fill="ghostwhite" text-anchor="middle">Common Questions</text>
</svg>

## **TL;DR**

Direct answers to the questions developers ask most about Sitebender - from practical concerns about learning curves to technical details about implementation.

---

## General Questions

### **What is Sitebender?**

Sitebender is a web development framework that treats everything as semantic data. Instead of traditional component-based architecture, your applications compile to RDF triples that can be queried, transformed, and distributed across networks.

### **Who is it for?**

Sitebender is designed for developers who:

- Build complex, data-intensive applications
- Need cryptographic verification and governance
- Want to eliminate runtime dependencies
- Require distributed, offline-first capabilities
- Value mathematical correctness over convention

### **How is it different from React/Vue/Angular?**

**Traditional frameworks:**

- Component-based architecture
- Virtual DOM diffing
- Runtime dependencies
- Client-side state management
- Build-time optimization

**Sitebender:**

- Everything compiles to RDF triples
- Direct DOM manipulation
- Zero runtime dependencies
- Distributed semantic state
- Compile-time verification

---

## Technical Questions

### **What does "everything is data" mean?**

In Sitebender, your entire application - components, styles, behavior, state - compiles down to RDF triples. These triples form a knowledge graph that represents your application's complete structure and logic.

```typescript
// This component...
const Button = ({ label }) => (
  <button onClick={handleClick}>{label}</button>
)

// Becomes these triples:
// :Button a :Component
// :Button :hasProperty :label
// :Button :hasEvent :onClick
// :Button :rendersElement :button
```

### **How does it work without a virtual DOM?**

Sitebender's compiler generates optimized DOM manipulation code at build time. Since everything is known statically (thanks to pure functional programming), the compiler can determine exactly what DOM operations are needed for any state change.

### **What are RDF triples?**

RDF (Resource Description Framework) triples are the fundamental unit of semantic data. Each triple consists of:

- **Subject**: The thing being described
- **Predicate**: The relationship or property
- **Object**: The value or related thing

Example: `:HomePage :hasTitle "Welcome to My App"`

### **Can I use it with existing projects?**

Sitebender can be integrated gradually through its Bridgewright library, which provides adapters for:

- React components
- REST APIs
- GraphQL endpoints
- Legacy databases

---

## Practical Questions

### **What's the learning curve?**

The learning curve has three phases:

1. **Week 1-2**: Basic concepts (triples, pure functions, semantic queries)
2. **Week 3-4**: Sitebender libraries and patterns
3. **Month 2+**: Advanced features (CRDT distribution, cryptographic governance)

Developers with functional programming experience adapt faster. The semantic data model takes the most adjustment for developers used to imperative paradigms.

### **Is there a community?**

Yes. Sitebender has:

- Active Discord server for real-time help
- GitHub discussions for long-form questions
- Weekly office hours with core team
- Contributed example projects and patterns

### **What about tooling?**

Sitebender provides:

- **CLI**: Project scaffolding and compilation
- **VSCode Extension**: Syntax highlighting, autocomplete
- **Dev Tools**: Browser extension for inspecting triple stores
- **Testing**: Built-in property-based testing via Forgemaster

### **How's the performance?**

Performance characteristics:

- **Build time**: Slower than traditional bundlers (more analysis)
- **Bundle size**: Smaller (no framework runtime)
- **Runtime speed**: Faster (no virtual DOM overhead)
- **Memory usage**: Lower (efficient triple storage)

---

## Library Questions

### **Do I need to learn all 15 libraries?**

No. Start with the core libraries:

1. **Toolsmith**: Functional utilities (always needed)
2. **Pagewright**: HTML generation (for web apps)
3. **Architect**: Component patterns (for structure)

Add others as needed:

- **Warden**: When you need authentication
- **Bridgewright**: For legacy integration
- **Forgemaster**: For testing

### **What does each library do?**

**Essential Libraries:**

- **Toolsmith**: 1000+ pure functional utilities
- **Pagewright**: HTML/SVG generation
- **Architect**: Application structure patterns

**Data Libraries:**

- **Lexivault**: Vocabulary management
- **Gatekeeper**: Schema validation
- **Bridgewright**: External system integration

**Security Libraries:**

- **Warden**: Cryptographic governance
- **Forgemaster**: Property-based testing

**Distribution Libraries:**

- **Mercator**: Remote data fetching
- **Syndicate**: Multi-store distribution
- **Envoy**: Real-time synchronization

**Utility Libraries:**

- **Shepherd**: Process orchestration
- **Vicar**: Code generation
- **Loremaster**: Documentation generation

---

## Philosophy Questions

### **Why pure functional programming?**

Pure functions enable:

- **Compile-time verification**: Know your code works before running it
- **Perfect caching**: Same inputs always produce same outputs
- **Time-travel debugging**: Replay any application state
- **Parallel execution**: No shared mutable state

### **Why zero dependencies?**

Zero runtime dependencies means:

- No supply chain attacks
- No version conflicts
- No breaking changes
- Complete control over your application

### **Why RDF/semantic web?**

Semantic data provides:

- **Universal interoperability**: Any system can understand your data
- **Automatic reasoning**: Infer new facts from existing ones
- **Distributed by design**: No central authority needed
- **Self-describing**: Data carries its own schema

---

## Getting Started Questions

### **What are the system requirements?**

- **Node.js**: 18.0 or higher
- **Memory**: 4GB minimum, 8GB recommended
- **Disk**: 500MB for Sitebender + libraries
- **OS**: Linux, macOS, Windows (WSL recommended)

### **How do I install it?**

```bash
# Install Sitebender CLI
npm install -g @sitebender/cli

# Create new project
sitebender create my-app

# Start development
cd my-app
npm run dev
```

### **Where's the best tutorial?**

Start with the [Getting Started](./getting-started.md) guide, which walks through building a complete todo application. Then explore the [Developer Guide](./for-developers.md) for patterns and best practices.

### **Can I contribute?**

Yes! Sitebender welcomes contributions:

- **Code**: Check the GitHub issues labeled "good first issue"
- **Documentation**: Help improve guides and examples
- **Libraries**: Create specialized triple transformers
- **Examples**: Share your Sitebender applications

---

## Migration Questions

### **Can I migrate from React?**

Yes, using a three-phase approach:

1. **Wrap**: Use Bridgewright to wrap React components
2. **Replace**: Gradually replace components with Sitebender equivalents
3. **Remove**: Eliminate React runtime once fully migrated

### **What about my REST API?**

Sitebender can consume REST APIs through Bridgewright adapters that convert responses to triples. Over time, you can migrate endpoints to return RDF directly.

### **Do I need to rewrite everything?**

No. Sitebender is designed for incremental adoption. Start with new features, then migrate existing ones as needed. The Bridgewright library ensures your existing code continues working during the transition.

---

## **The Bottom Line**

Sitebender isn't just another framework - it's a different way of thinking about web applications. If you're building complex, distributed systems that need cryptographic verification and zero dependencies, Sitebender provides the tools. The learning curve is real, but the architectural benefits compound over time.

**Ready to start?** Check out the [Getting Started](./getting-started.md) guide or dive into the [Architecture](./architecture.md) documentation.
