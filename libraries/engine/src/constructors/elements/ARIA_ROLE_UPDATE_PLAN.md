# ARIA Role Validation Update Plan

## Overview

This document outlines the specific changes needed for each element constructor to properly validate ARIA roles according to W3C specifications.

## Implementation Pattern

### Pattern A: No Roles Allowed

For elements in `NO_ROLE_ELEMENTS` list:

```typescript
// Don't destructure role
// Don't handle role in filterAttributes
// ARIA interface has role?: never
```

### Pattern B: Any Role Allowed (div, span)

```typescript
import { ALL_ARIA_ROLES } from "../../../constants/aria-roles.ts"

// In filterAttributes:
if (isDefined(role)) {
	Object.assign(
		filteredAttrs,
		filterAttribute(isMemberOf(ALL_ARIA_ROLES))("role")(role),
	)
}
```

### Pattern C: Specific Roles Allowed

```typescript
import { BUTTON_ROLES } from "../../../constants/aria-roles.ts"

// In filterAttributes:
if (isDefined(role)) {
	Object.assign(
		filteredAttrs,
		filterAttribute(isMemberOf(BUTTON_ROLES))("role")(role),
	)
}
```

### Pattern D: Conditional Roles

```typescript
import { getInputAllowedRoles } from "../../../constants/aria-roles.ts"

// For Input elements:
const allowedRoles = getInputAllowedRoles(type)
if (isDefined(role) && allowedRoles.includes(role)) {
	Object.assign(filteredAttrs, { role })
}
```

## Elements to Update

### HIGH PRIORITY - Interactive Elements

1. **Button** (`flow/interactive/Button/index.ts`)
   - Already uses BUTTON_ROLES ✓
   - Pattern: C (Specific roles)

2. **A (Anchor)** (`flow/interactive/A/index.ts`)
   - Current: Uses isString validator
   - Update: Use LINK_WITH_HREF_ROLES constant
   - Pattern: C (Specific roles)
   - Note: Need to handle with/without href condition

3. **Input Types** (`flow/interactive/Input/*/index.ts`)
   - Current: Various, mostly isString
   - Update: Use getInputAllowedRoles(type) helper
   - Pattern: D (Conditional based on type)

4. **Select** (`flow/interactive/Select/index.ts`)
   - Current: Uses isString
   - Update: Use getSelectAllowedRoles(multiple) helper
   - Pattern: D (Conditional based on multiple attribute)

5. **TextArea** (`flow/interactive/TextArea/index.ts`)
   - Current: Uses isString
   - Update: Use TEXTAREA_ROLES constant
   - Pattern: C (Specific roles)

6. **Details/Summary** (`flow/interactive/Details/index.ts`, `Summary/index.ts`)
   - Current: Uses isString
   - Update: Use DETAILS_ROLES, SUMMARY_ROLES
   - Pattern: C (Specific roles)

### MEDIUM PRIORITY - Semantic Elements

7. **Main** (`flow/miscellaneous/Main/index.ts`)
   - Current: Uses isString
   - Update: Use MAIN_ROLES constant
   - Pattern: C (Specific roles)

8. **Nav** (`flow/sectioning/Nav/index.ts`)
   - Current: Uses isString
   - Update: Use NAV_ROLES constant
   - Pattern: C (Specific roles)

9. **Article** (`flow/sectioning/Article/index.ts`)
   - Current: Uses isString
   - Update: Use ARTICLE_ROLES constant
   - Pattern: C (Specific roles)

10. **Section** (`flow/sectioning/Section/index.ts`)
    - Current: Uses isString
    - Update: Use getSectionAllowedRoles(hasAccessibleName) helper
    - Pattern: D (Conditional based on accessible name)

11. **Aside** (`flow/sectioning/Aside/index.ts`)
    - Current: Uses isString
    - Update: Use ASIDE_ROLES constant
    - Pattern: C (Specific roles)

12. **Header/Footer** (`flow/miscellaneous/Header/index.ts`, `Footer/index.ts`)
    - Current: Uses isString
    - Update: Use getHeaderAllowedRoles/getFooterAllowedRoles helpers
    - Pattern: D (Conditional based on sectioning context)

### LOW PRIORITY - Generic Elements

13. **Div** (`flow/miscellaneous/Div/index.ts`)
    - Current: Uses isString
    - Update: Use ALL_ARIA_ROLES constant
    - Pattern: B (Any role)

14. **Span** (`flow/phrasing/Span/index.ts`)
    - Current: Uses isString
    - Update: Use ALL_ARIA_ROLES constant
    - Pattern: B (Any role)

15. **P** (`flow/miscellaneous/P/index.ts`)
    - Current: Uses isString
    - Update: Use P_ROLES constant
    - Pattern: C (Specific roles)

### NO ROLES - Remove role handling

16. **Script** (`flow/metadata/Script/index.ts`)
    - Current: Has role handling
    - Update: Remove role destructuring and handling
    - Pattern: A (No roles)

17. **Style** (`metadata/Style/index.ts`)
    - Current: Has role handling
    - Update: Remove role destructuring and handling
    - Pattern: A (No roles)

18. **Meta** (`flow/metadata/Meta/index.ts`)
    - Current: Has role handling
    - Update: Remove role destructuring and handling
    - Pattern: A (No roles)

19. **Link** (`flow/metadata/Link/index.ts`)
    - Current: Has role handling
    - Update: Remove role destructuring and handling
    - Pattern: A (No roles)

20. **Legend** (`flow/forms/Fieldset/Legend/index.ts`)
    - Current: May have role handling
    - Update: Remove role destructuring and handling
    - Pattern: A (No roles)

21. **Meter** (`flow/forms/Meter/index.ts`)
    - Current: May have role handling
    - Update: Remove role destructuring and handling
    - Pattern: A (No roles)

### Table Elements

22. **Table** (`flow/miscellaneous/Table/index.ts`)
    - Update: Use TABLE_ROLES constant
    - Pattern: C (Specific roles)

23. **Tr/Td/Th** (`flow/miscellaneous/Table/*/index.ts`)
    - Update: Use TR_ROLES, TD_ROLES, TH_ROLES constants
    - Pattern: C (Specific roles)

### List Elements

24. **Ul/Ol** (`flow/miscellaneous/Ul/index.ts`, `Ol/index.ts`)
    - Update: Use UL_ROLES, OL_ROLES constants
    - Pattern: C (Specific roles)

25. **Li** (`flow/miscellaneous/Li/index.ts`)
    - Update: Use LI_ROLES constant
    - Pattern: C (Specific roles)

### Image Elements

26. **Img** (`flow/embedded/Img/index.ts`)
    - Current: Uses isString
    - Update: Use getImgAllowedRoles(alt) helper
    - Pattern: D (Conditional based on alt attribute)

## Testing Strategy

1. **Type Checking**: Run `deno check` to ensure type safety
2. **Linting**: Run `deno lint` to catch unused imports
3. **Unit Tests**: Update tests to verify role validation
4. **Manual Testing**: Test with invalid roles to ensure they're rejected

## Success Criteria

- [ ] All elements use proper role validation constants
- [ ] No elements accept invalid roles
- [ ] Elements with no roles don't have role handling
- [ ] Conditional role validation works correctly
- [ ] Type checking passes
- [ ] Linting passes with minimal warnings
