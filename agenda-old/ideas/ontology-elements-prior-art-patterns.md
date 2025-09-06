# Ontology Elements (prior art) — brainstorming only (non-canonical)

Status: ARCHIVED UPSTREAM (read‑only as of 2025-07). Treat solely as prior art. Do not add dependencies. All items below are hypotheses or ideas to test against our constraints in `CLAUDE.md` and our `extending-schema.org.md` plan.

## Fit constraints (from our project)

- No JS required; SSR baseline must produce valid semantic HTML and structured data.
- Zero dependencies in libraries; Deno/TS only; progressive enhancement optional.
- OWL + SHACL are source of truth; validation in CI.
- Emit Schema.org/JSON‑LD and microdata; ARIA only to enhance.

## Patterns potentially worth borrowing (adapted to our stack)

1. Explicit JSON‑LD emission alongside visible HTML

- Pattern: Component accepts semantic props and emits a `<script type="application/ld+json">` adjacent to its HTML.
- Why: Works without JS, improves SEO, keeps semantics close to markup.
- Our twist: Generate the JSON‑LD shape from OWL + our `@context`; validate in CI with SHACL; no client runtime.

2. Slot/attribute mapping that mirrors vocabulary terms

- Pattern: Named slots/props correspond to Schema.org properties (e.g., `slot="name"`, `slot="description"`).
- Why: Readable authoring; easy mapping table from prop/slot → vocab IRI.
- Our twist: Provide SSR helpers that render microdata (`itemprop`) and JSON‑LD; reserve custom elements only for enhancement.

3. CURIE/prefix awareness for multi‑ontology interop

- Pattern: Allow prefix maps (e.g., `schema:name`, `dc:title`).
- Why: Extensibility beyond Schema.org.
- Our twist: Centralize prefixes in our JSON‑LD `@context`; compile prop/slot → IRI using the context at build time.

4. Dual representation: microdata in DOM + JSON‑LD block

- Pattern: Use `itemscope`, `itemtype`, `itemprop` on visible HTML and include JSON‑LD for robust consumers.
- Why: Works with/without JS; helps crawlers and accessibility tooling.
- Our twist: Generate both from one source (OWL/SHACL + props) to avoid drift.

5. Author‑facing prop names aligned to types

- Pattern: Authoring API reflects the types (e.g., `person`, `organization` props).
- Why: Discoverability; self‑describing examples.
- Our twist: Autogenerate TS `Props` types per class from OWL, including cardinalities and datatypes.

## Anti‑patterns to avoid (given our constraints)

- Heavy client runtime or framework wrappers (e.g., Vue‑compiled custom elements) — breaks zero‑dep + no‑JS baseline.
- Shadow DOM encapsulation for semantics — can hide microdata/ARIA; prefer light DOM SSR for semantic surfaces.
- Runtime ontology resolution (fetching contexts/shapes at load) — we validate/build in CI; runtime must be inert.
- Implicit global `@context` injection via JS — we ship explicit, pinned contexts with the page.

## Small experiments (safe, incremental)

1. Minimal Person SSR helper

- Input: `{ name, url }` → Output: semantic HTML with `itemtype` + `<script type="application/ld+json">`.
- Check: Valid against SHACL in CI; no client JS.

2. Slot mapping POC (docs site only)

- Render example using named slots (`slot="name"`, etc.) and show the generated HTML + JSON‑LD side‑by‑side.
- Check: Accessibility (labels, reading order); no JS needed.

3. Prefix context test

- Provide a doc page with both `schema:` and `dc:` props mapped via our `@context`.
- Check: Generated IRIs correct, SHACL passes, crawlers parse JSON‑LD.

## OWL + SHACL integration hooks

- Codegen: From OWL → TS types for class Props (cardinality/datatype hints) + mapping tables (prop → IRI).
- Validation: SHACL shapes run in CI on a corpus of example instances; block on failures.
- Docs: Each component page renders HTML + JSON‑LD + a validation snippet output (PASS/FAIL).

## Questions to verify against Ontology Elements (non‑blocking)

- How did they name attributes/slots vs. vocab terms? Any collisions/reserved words to watch?
- Did they ship both microdata and JSON‑LD? If not, why; any trade‑offs observed?
- Any accessibility gotchas with shadow DOM or custom element boundaries?
- Authoring ergonomics: what patterns made examples clearer?

## Decision

- Do not adopt as a dependency. Use as inspiration where it aligns with our standards.
- Source of truth remains OWL + SHACL + explicit `@context`.

---

Notes: The upstream repo is archived; treat any insights as historical reference, not active guidance. All proposals here must pass our progressive enhancement, accessibility, and zero‑dependency gates before adoption.
