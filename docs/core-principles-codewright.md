# Core Principles

## Minimizing Cognitive Load

**COGNITIVE LOAD IS THE ENEMY. MINIMIZE IT AT ALL COSTS.**

Every single rule in this project exists for ONE PURPOSE: reduce the mental effort required to understand code.

### Why Cognitive Load Matters

- **Developers work easier and longer** when their brains aren't overloaded
- **Fewer bugs** because there's less to mentally track and get wrong
- **Faster development** because understanding is instant, not gradual
- **Happier teams** because work feels effortless instead of exhausting
- **Better business outcomes** because velocity increases and defects decrease
- **Non-technical stakeholders can understand** because cognitive load is minimal

### How Every Rule Serves This Goal

- **One function per file** = Zero mental overhead figuring out what's in a file
- **Named functions over arrows** = Stack traces make sense, no mental parsing
- **Descriptive function names** = Code reads like English, zero translation needed
- **No semicolons** = Remove visual noise that adds zero meaning
- **Case conventions** = Instant recognition of what type of thing you're looking at
- **Default exports** = One thing per file, one import line, zero decisions
- **No mutations** = Never wonder "what's the state now?", it's always predictable
- **Pure functions** = Input → Output, no hidden side effects to track mentally
- **No classes/OOP** = No inheritance hierarchies to mentally traverse
- **Toolsmith functions** = Pre-solved problems, zero cognitive overhead on "how"

## Accessibility First

- **WCAG 2.3 AAA or better** — Screen readers are first-class citizens
- **Keyboard navigation for everything** — No mouse-only interactions
- **Accessibility from day one** — NO EXCEPTIONS

## Zero Dependencies

This codebase has zero dependencies by design. Keep it that way.

**Exceptions:** Deno standard library and TypeScript compiler only.

## Progressive Enhancement Philosophy (for pagewright/pagewright and architect/architect)

### The Three Layers of Truth

```
┌────────────────────────────────────────────┐
│    LAYER 3: Full Enhancement               │
│    JavaScript enriches the experience      │
│    (But is never required)                 │
├────────────────────────────────────────────┤
│    LAYER 2: Styled with CSS                │
│    Beautiful, responsive, themed           │
│    (But works without it)                  │
├────────────────────────────────────────────┤
│    LAYER 1: Semantic HTML                  │
│    Works in Lynx, Mosaic, everything       │
│    (This is the foundation)                │
└────────────────────────────────────────────┘
```

### The Unbreakable Rules

1. **Forms work without JavaScript**
   - Standard POST/GET submissions
   - Server-side validation
   - No AJAX-only endpoints

2. **Navigation works without JavaScript**
   - Real links to real pages
   - No SPA-only routes
   - Back button always works

3. **Content is accessible without CSS**
   - Semantic HTML structure
   - Logical reading order
   - No layout-dependent content

4. **Everything has keyboard access**
   - Tab order makes sense
   - Focus indicators visible
   - No mouse-only interactions

5. **Offline-first, online-enhanced**
   - CRDTs for eventual consistency (see libraries/agent)
   - IndexedDB for complex state
   - Service workers for caching



---

*"The Holy Grail is code that reads like well-written English and requires zero mental effort to understand."*

— The Architect
