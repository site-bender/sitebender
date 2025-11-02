# CSS Styling Skill - Session Summary

**Date:** 2025-11-02
**Status:** Planning Complete - Ready for Implementation

---

## What We Accomplished

### 1. Completed .claude Directory Audit

**Findings:**
- ✅ All 6 commands present and excellent quality
- ✅ All 11 skills complete with comprehensive documentation
- ✅ 4 generator systems working (function, component, type-definition with 2 scripts, error-handling, testing)
- ✅ 9 MCP Qdrant servers operational
- ⚠️ 2 missing task registrations in deno.jsonc (FIXED)
- ⚠️ 1 file naming inconsistency (FIXED)

**Fixes Applied:**
- ✅ Added `new:error` task to deno.jsonc
- ✅ Added `new:test` task to deno.jsonc
- ✅ Renamed `toolsmith/SKILL.md` → `toolsmith/skill.md`

System is now 100% consistent.

### 2. Created CSS Styling Skill Plan

**Complete plan document:** `.claude/skills/css-styling/PLAN.md`

---

## Key Architecture Decisions

### Component CSS Structure
- One `index.css` per component folder
- CSS cascades from ancestor folders (top-down)
- Example: `buttons/index.css` → `buttons/Button/index.css` → `buttons/Button/SubmitButton/index.css`
- `createElement` discovers and links CSS automatically

### Naming Convention
- Single class per component: `.bend-{component-name}` (kebab-case)
- Tag-based sub-element selectors: `.bend-text-field label`, `.bend-text-field input[type="text"]`
- **NO BEM** (user explicitly hates it)
- Low specificity, semantic, clean HTML

### IE11 Compatibility
- **Baseline:** 2010-era CSS (floats, inline-block, positioning)
- **No flexbox** (IE11 has buggy implementation)
- **No CSS Grid**
- **Progressive enhancement:** `@supports` for modern features
- **Custom properties:** Use cascade (IE11 ignores `var()`, gets fallback)

### Three-Tier Custom Property System
1. **Tier 1: Primitives (Specific Named Values)** in `themes/default/index.css`:
   - Specific values with clear names: `--color-blue-600: #007bff`
   - Clamped ranges for fluid scaling: `--space-4: clamp(1rem, 1vw + 0.75rem, 1.5rem)`
   - **These ARE the IE11 fallback values**
   - Change one primitive → everything using it updates
2. **Tier 2: Semantic Design Tokens** in `themes/default/index.css`:
   - Give MEANING to Tier 1: `--color-primary: var(--color-blue-600)`
   - Design intent: `--padding-default: var(--space-4)`, `--font-heading: var(--font-serif-stack)`
   - Colors, spacing, typography, opacities, borders, focus, print
   - **Change one semantic token → all components using it update**
3. **Tier 3: Component-Specific Properties** defined IN component CSS:
   - Component class or `:root` block: `--bend-button-padding: var(--padding-default)`
   - **CAN include colors** by referencing Tier 2 semantic tokens
   - `--bend-button-background-color: var(--color-primary)`, `--bend-button-padding: var(--padding-default)`
   - Allows per-component overrides
   - Users can override at ANY tier level

### Accessibility (WCAG AAA)
- **Dual contrast compliance:** APCA (modern) + WCAG 2.1 AAA (legacy)
- **Focus states:** `outline` property, mandatory
- **Touch targets:** 48×48px minimum (can be less height if wider per WCAG 2.2)
- **Reduced motion:** `@media (prefers-reduced-motion)`
- **High contrast:** `@media (forced-colors: active)`
- **Light/dark mode:** `@media (prefers-color-scheme: dark|light)`

### Responsive Design
- **Prefer fluid layouts** (avoid breakpoints)
- Fluid typography with `clamp()`
- Multi-column reflow
- Breakpoints allowed as exceptions with `/*++ [EXCEPTION] ... */` comment
- Container queries when justified (must explain why)

### Print Styles
- **Global print stylesheet** removes chrome (nav, footer, etc.)
- **Link expansion:** `text (url)` and `text (rel: url)`
- **Optimized typography** for print
- **Component-specific** print styles allowed
- Easy for users to override if they want chrome

### Animations
- **Minimal only** (only for usability, not decoration)
- **Always** include reduced motion fallbacks
- No gratuitous effects

### Property Ordering
- **Cascade order groups:** position → display → layout → box model → typography → colors → other
- **Alphabetical within groups**
- **Logical properties preferred** (`margin-block-start` vs `margin-top`) but IE11 fallback required

---

## The 10 Patterns

1. **Component CSS Structure** - File organization, cascade order, naming
2. **IE11 Baseline + Progressive Enhancement** - 2010 CSS + `@supports`
3. **Two-Level Custom Properties** - Global tokens + component properties
4. **Accessibility** - WCAG AAA (APCA + WCAG 2.1), focus, touch targets, reduced motion
5. **Responsive/Fluid Design** - Avoid breakpoints, fluid typography, exceptions allowed
6. **State Management** - Pseudo-classes, data attributes
7. **Print Styles** - Global + component-specific, link expansion
8. **Animations** - Minimal, usability-focused, reduced motion fallbacks
9. **Property Ordering** - Cascade groups, alphabetical within
10. **Performance** - Efficient selectors, never sacrifice accessibility

---

## Generator Requirements

**Input:** CSSConfig type
```typescript
{
  componentName: string
  className: string (auto-generated)
  subElements?: Array<{ tagName, selector?, states? }>
  includeAccessibility?: boolean
  includeResponsive?: boolean
  includePrint?: boolean
}
```

**Output:** CSS scaffold with:
- Component class + IE11 fallback + custom properties
- Sub-element selectors
- Accessibility boilerplate (focus, touch targets, reduced motion)
- Print media query section
- Envoy comments

---

## Implementation Checklist

See `.claude/skills/css-styling/PLAN.md` for complete checklist.

**Files to create:**
1. `skill.md` (~1000-1400 lines)
2. `types.ts` (CSSConfig type)
3. `generator.ts` (all curried functions, no loops, Result monad)
4. `script.ts` (CLI interface)
5. `examples/` (6 example files)
6. `themes/default/index.css` (global theme, APCA + WCAG 2.1 AAA compliant)
7. Update `deno.jsonc` with `new:css` task

---

## Important Constraints

1. **NO BEM** - User explicitly hates it
2. **IE11 baseline** - Must work with 2010-era CSS
3. **Both contrast standards** - APCA + WCAG 2.1 AAA non-negotiable
4. **Fluid design** - Avoid fixed breakpoints (exceptions allowed)
5. **Minimal animations** - Only for usability
6. **Print is important** - Link expansion, chrome removal
7. **Component-scoped** - Single class + tag selectors
8. **Constitutional rules** - No loops, mutations, arrow functions
9. **Accessibility first** - Never compromise for performance
10. **User will break contrast** - Not our problem, we provide defaults

---

## Context for Next Session

**Current State:**
- Audit complete, 2 fixes applied
- CSS skill fully planned in PLAN.md
- Ready to implement following strict-implementation workflow

**Next Steps:**
1. Follow `/strict-implementation` workflow
2. Query MCP servers (formatting_rules, accessibility_rules already done)
3. Read PLAN.md thoroughly
4. Implement all files following constitutional rules
5. Verify with `/verify-constitutional`
6. Test generator

**Do NOT:**
- Research obsolete CSS in `.to-be-refactored-ignore/`
- Use BEM or complex class naming
- Skip IE11 fallbacks
- Compromise accessibility for performance
- Add gratuitous animations

**Key Files:**
- Plan: `.claude/skills/css-styling/PLAN.md`
- Architecture: `libraries/architect/README.md`
- Only research: `libraries/architect/src/` (exclude `.to-be-refactored-ignore/`)

---

**Everything needed for implementation is in PLAN.md**
