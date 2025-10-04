# FINISH THE RULES - COMPREHENSIVE COMPLETION GUIDE

**CRITICAL:** This document contains ALL context needed to complete the MCP rule restoration without ANY re-explanation.

---

## WHAT'S LEFT TO DO

### 1. COMPLETE content_rules - MISSING ~7 STRUNK RULES

**Current Status**: 15 of ~22 Strunk rules added. User expects ALL of them.

**Missing Strunk Rules to Add:**
- Use comma after introductory expressions (\"After the meeting, we discussed the results\")
- Place quotation marks correctly with periods/commas (inside in American English)
- Distinguish dash vs hyphen usage (em dash for breaks, hyphen for compounds)
- Maintain verb tense consistency throughout passages
- Handle split infinitives (generally avoid unless natural)
- Use \"data\" as plural (\"data are\", not \"data is\")
- Avoid \"and/or\" constructions (choose one or rewrite)
- Use \"while\" for time, \"although\" for concession
- Form possessive of plural nouns (\"employees' benefits\", \"children's toys\")
- Use \"fewer\" for countable, \"less\" for mass nouns
- Avoid beginning sentences with \"there is/are\" (weak construction)

### 2. COMPLETE accessibility_rules - PAGEWRIGHT COMPONENT DEVELOPMENT

**CRITICAL ARCHITECTURAL CONTEXT:**

**Pagewright = Semantic UI DSL (NOT HTML library):**
- **Purpose-based components**: `PhoneNumberField`, `ChooseOneField`, `EmailAddressField`
- **End users work in plain English** - never see HTML, ARIA, or technical details
- **Auto-protection system**: 
  - Invalid attributes: `badAttribute={666}` → `data-x-bad-attribute=\"666\"`
  - Invalid nesting: `<a><a>Oops</a></a>` → `<a><span data-error=\"...\" data-original-element=\"a\" /></a>`

**Widget Selection Logic:**
- `ChooseOneField`: radio buttons ≤ `RADIO_THRESHOLD` (default 6), select box >6
- User-configurable: `radioThreshold?: number` prop overrides
- All thresholds use named constants

**Progressive Enhancement Stack:**
- **HTML**: Works in Lynx, proper forms (POST/GET), anchor IDs, `rel` attributes
- **CSS**: `@supports` queries, legacy-first with fallbacks, CSS properties for theming
- **JS**: Operator events (progressively replace forms), Custodian state, live regions

**\"NO ARIA better than BAD ARIA\" Philosophy:**
- ARIA only when Pagewright semantics insufficient
- End users never see ARIA - mapped to semantic props (`use` not `role`)
- AIs building components use ARIA internally but hide complexity

**Rules Already Added (4 total):**
1. Use semantic Pagewright components exclusively, never raw HTML
2. Make accessibility required props non-optional
3. Progressive enhancement required - HTML must work in Lynx
4. When possible, provide easy tools for media accessibility

**Still Need to Add:**
- ARIA usage guidelines for component development
- Color independence requirements (get Architect approval for design)
- CSS enhancement with @supports requirements
- Keyboard navigation built into components
- Screen reader support considerations

### 3. POPULATE toolsmith_rules - INTERNAL DEVELOPMENT EXCEPTIONS

**Toolsmith Architecture:**
- **Vanilla functions**: Performance-optimized, return null, used internally
- **Boxed functions**: Monadic, return Result/Validation, used by applications
- **Performance exceptions allowed**: `.push()` on new arrays, loops in generators
- **Exception documentation**: Use Envoy `[EXCEPTION]` or `[OPTIMIZATION]` comments
- **Generator functions**: May use let/loops internally (no Haskell equivalent)
- **Four math types**: integer/bigint/float/precision (same names, different paths)

**Rules to Add:**
- When performance exceptions are permitted
- How to document exceptions with Envoy comments
- Vanilla vs boxed usage guidelines
- Generator function development permissions
- Performance vs ideology trade-offs

### 4. POPULATE jsx_rules - COMPONENT DEVELOPMENT PATTERNS

**JSX Context:**
- JSX as declarative DSL for Sitebender (NOT React!)
- Used in Pagewright (HTML), Architect (reactivity), Operator (events)
- Component patterns and progressive enhancement integration

**Rules to Add:**
- JSX component development patterns
- Integration with Pagewright semantic components
- Progressive enhancement considerations
- Component composition guidelines

---

## ARCHITECTURAL CONTEXT

### Library Ecosystem
- **Toolsmith**: ~1000 semantic functions (vanilla/boxed)
- **Pagewright**: Semantic UI DSL, compiles JSX → HTML
- **Operator**: Pub-sub events for module decoupling
- **Architect**: Reactivity, validation (approval needed for visual design)
- **Custodian**: State management
- **Sentinel**: Authentication
- **Formulator**: Lexing/parsing (uses generators)

### Core Philosophies
- **Natural Language Coding**: Code reads like English (`isEqual` not `===`)
- **Extreme Modularity**: One function per file, co-location, delete safety
- **Context-Aware Rules**: Different strictness for different libraries
- **Progressive Enhancement**: HTML works without CSS/JS

### User Expectations
- **Complete thoroughness** - All rules, not subsets
- **No rushing or corner-cutting**
- **Ask when uncertain** - don't make assumptions

---

## SUCCESS CRITERIA

Task complete when:
- ✅ content_rules has ALL ~22 Strunk rules
- ✅ accessibility_rules complete for Pagewright development
- ✅ toolsmith_rules populated with performance guidelines
- ✅ jsx_rules populated with component patterns
- ✅ All collections verified working

