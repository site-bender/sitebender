# <Sitebender> Documentation

<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="index-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(260, 90%, 30%);stop-opacity:1" />
      <stop offset="100%" style="stop-color:hsl(280, 85%, 25%);stop-opacity:1" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="snow" stroke-width="0.5" opacity="0.3"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="300" fill="url(#index-gradient)"/>
  <rect width="800" height="300" fill="url(#grid)"/>
  
  <!-- Central hexagon -->
  <g transform="translate(400,150)">
    <polygon points="60,0 30,52 -30,52 -60,0 -30,-52 30,-52" 
             fill="none" stroke="ghostwhite" stroke-width="2"/>
    <text y="8" font-family="Arial, sans-serif" font-size="28" font-weight="bold" 
          fill="ghostwhite" text-anchor="middle">Sitebender</text>
  </g>
  
  <!-- Surrounding nodes -->
  <circle cx="200" cy="80" r="25" fill="hsl(200, 85%, 32%)" stroke="snow" stroke-width="1.5"/>
  <text x="200" y="85" font-family="Arial, sans-serif" font-size="10" fill="snow" text-anchor="middle">Data</text>
  
  <circle cx="600" cy="80" r="25" fill="hsl(160, 85%, 30%)" stroke="snow" stroke-width="1.5"/>
  <text x="600" y="85" font-family="Arial, sans-serif" font-size="10" fill="snow" text-anchor="middle">Pure</text>
  
  <circle cx="200" cy="220" r="25" fill="hsl(20, 90%, 35%)" stroke="snow" stroke-width="1.5"/>
  <text x="200" y="225" font-family="Arial, sans-serif" font-size="10" fill="ghostwhite" text-anchor="middle">Zero</text>
  
  <circle cx="600" cy="220" r="25" fill="hsl(340, 85%, 32%)" stroke="snow" stroke-width="1.5"/>
  <text x="600" y="225" font-family="Arial, sans-serif" font-size="10" fill="snow" text-anchor="middle">Secure</text>
  
  <!-- Title -->
  <text x="400" y="250" font-family="Arial, sans-serif" font-size="24" 
        fill="ghostwhite" text-anchor="middle">Complete Documentation</text>
</svg>

## **Welcome to Sitebender**

A revolutionary web framework where **everything is data**. Build applications that compile to semantic triples, eliminate runtime dependencies, and distribute seamlessly across networks.

---

## **Documentation Sections**

### 📚 **Core Documentation**

#### [**Overview**](./overview.md)

Introduction to Sitebender's revolutionary approach to web development. Learn how semantic triples replace traditional components and why everything being data changes everything.

#### [**Architecture**](./architecture.md)

Deep technical dive into Sitebender's internals. Understand the compiler pipeline, triple store implementation, and distributed runtime architecture.

#### [**Design Principles**](./design-principles.md)

The philosophy behind Sitebender's design decisions. Explore why we chose pure functional programming, zero dependencies, and cryptographic governance.

---

### 🚀 **Getting Started**

#### [**Getting Started Tutorial**](./getting-started.md)

Build your first Sitebender application step by step. Create a todo app while learning core concepts like triples, pure functions, and semantic queries.

#### [**Developer Guide**](./for-developers.md)

Comprehensive guide for building production applications. Learn patterns, best practices, and advanced techniques for Sitebender development.

#### [**FAQ**](./faq.md)

Direct answers to common questions about Sitebender. From technical details to practical concerns about adoption and migration.

---

## **Quick Start**

```bash
# Install Sitebender CLI globally
npm install -g @sitebender/cli

# Create a new project
sitebender create my-app

# Start development server
cd my-app
npm run dev
```

Your application runs at `http://localhost:3000`

---

## **Core Concepts at a Glance**

### **Everything Is Data**

```typescript
// Traditional component
function Button({ label }) {
  return <button>{label}</button>
}

// Sitebender: Compiles to triples
:Button :renders :button .
:Button :hasProperty :label .
```

### **Pure Functional**

```typescript
// Every function is pure
const add = (a: number, b: number): number => a + b;

// Side effects are data too
const effect = { type: "FETCH", url: "/api/data" };
```

### **Zero Dependencies**

```typescript
// No runtime imports needed
// Everything compiles to vanilla JavaScript
// Your bundle contains only YOUR code
```

---

## **The 15 Libraries**

### **Essential**

- **Toolsmith**: 1000+ functional utilities
- **Pagewright**: HTML/SVG generation
- **Architect**: Application patterns

### **Data Management**

- **Lexivault**: Vocabulary management
- **Gatekeeper**: Schema validation
- **Bridgewright**: Legacy integration

### **Security & Testing**

- **Warden**: Cryptographic governance
- **Forgemaster**: Property testing

### **Distribution**

- **Mercator**: Remote data fetching
- **Syndicate**: Multi-store sync
- **Envoy**: Real-time updates

### **Development**

- **Shepherd**: Process orchestration
- **Vicar**: Code generation
- **Loremaster**: Documentation

---

## **Key Benefits**

**🔒 Security First**

- Cryptographic verification of all operations
- Zero supply chain vulnerabilities
- Capability-based access control

**⚡ Performance**

- No virtual DOM overhead
- Compile-time optimization
- Efficient triple storage

**🌐 Distributed**

- Offline-first by default
- CRDT-based synchronization
- No central authority needed

**✅ Correctness**

- Mathematical verification
- Property-based testing
- Time-travel debugging

---

## **Learning Path**

### **Week 1: Fundamentals**

1. Read the [Overview](./overview.md)
2. Complete [Getting Started](./getting-started.md)
3. Explore [Design Principles](./design-principles.md)

### **Week 2: Building**

1. Study the [Developer Guide](./for-developers.md)
2. Understand the [Architecture](./architecture.md)
3. Review the [FAQ](./faq.md)

### **Week 3: Mastery**

1. Explore all 15 libraries
2. Build a real application
3. Contribute to the ecosystem

---

## **Community**

**💬 Discord**: [discord.gg/sitebender](https://discord.gg/sitebender)  
**📧 Mailing List**: [groups.google.com/g/sitebender](https://groups.google.com/g/sitebender)  
**🐛 Issues**: [github.com/sitebender/issues](https://github.com/sitebender/issues)  
**🤝 Contributing**: [github.com/sitebender/contributing](https://github.com/sitebender/contributing)

---

## **Ready to Transform How You Build?**

Start with the [Overview](./overview.md) to understand Sitebender's revolutionary approach, or jump straight into the [Getting Started](./getting-started.md) tutorial to build your first application.

Welcome to the future of web development - where everything is data, nothing is hidden, and your applications are mathematically correct by construction.
