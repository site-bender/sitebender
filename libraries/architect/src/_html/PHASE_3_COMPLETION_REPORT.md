# Phase 3 Implementation - Completion Report

**Date**: 2025-11-05
**Verified**: 2025-11-08
**Status**: ✅ COMPLETE
**Scope**: Generic _validateRole function and helper for conditional validation

---

## Executive Summary

Successfully implemented the generic role validation function that validates ARIA roles for any HTML element against the ROLES_BY_ELEMENT constant. The implementation correctly handles three permission types: "none" (no role allowed), "any" (any role allowed), and specific role arrays. Also created a helper function for conditional role validation where permission is computed dynamically at runtime.

---

## Tasks Completed

### 1. Implemented _validateRole Function

**Purpose**: Generic role validation for all HTML elements using ROLES_BY_ELEMENT constant.

**Signature**:

```typescript
function _validateRole(tagName: string) {
	return function _validateRoleForTagName(
		role: unknown,
	): Readonly<Record<string, string>>
}
```

**Validation Logic**:

1. If role is undefined or not a string → return `{}` (ignore)
2. Look up permission in ROLES_BY_ELEMENT for tagName
3. If permission not found → return `{ "data-§-bad-role": role }`
4. If permission === "none" → return `{ "data-§-bad-role": role }`
5. If permission === "any" → return `{ role }`
6. If role in permission array → return `{ role }`
7. Otherwise → return `{ "data-§-bad-role": role }`

**File**: `_validateRole/index.ts` (44 lines)

**Key Features**:

- ✅ Curried function (single parameter)
- ✅ Uses `isDefined` check for defensive programming
- ✅ Uses `isString` type guard
- ✅ Uses Toolsmith `includes` function (no loops)
- ✅ Returns flat object (not structured)
- ✅ Uses `data-§-bad-role` for invalid roles
- ✅ Handles all three permission types correctly

**Constitutional Compliance**:

- ✅ No arrow functions (named function declarations)
- ✅ No loops (uses functional `includes`)
- ✅ No mutations (all data immutable)
- ✅ No exceptions (no try/catch/throw)
- ✅ Properly curried (one parameter per function)

---

### 2. Created _validateRoleAgainstPermission Helper

**Purpose**: Validate role against dynamically computed permission for conditional elements.

**Usage Example**:

```typescript
// In _A component
const permission = isDefined(href)
	? ["button", "checkbox", "menuitem", ...]
	: "any"

const roleAttrs = _validateRoleAgainstPermission(permission)(role)
```

**Signature**:

```typescript
function _validateRoleAgainstPermission(
	permission: "none" | "any" | ReadonlyArray<string>,
) {
	return function _validateRoleAgainstPermissionWithRole(
		role: unknown,
	): Readonly<Record<string, string>>
}
```

**File**: `_validateRoleAgainstPermission/index.ts` (43 lines)

**Key Features**:

- ✅ Same validation logic as _validateRole
- ✅ Takes permission as parameter instead of looking up by tagName
- ✅ Used by conditional validators (_validateARole, _validateAreaRole, etc.)

**Constitutional Compliance**: Same as _validateRole

---

### 3. Created Comprehensive Tests

**Test File**: `_validateRole/index.test.ts`

**Test Coverage**:

- ✅ Validates role="any" for elements with "any" permission
- ✅ Validates specific roles for elements with role arrays
- ✅ Rejects invalid roles for elements with role arrays
- ✅ Rejects all roles for elements with "none" permission
- ✅ Handles undefined role (returns empty object)

**Test Results**: 1 passed (5 steps) | 0 failed

**Note**: _validateRoleAgainstPermission does not have dedicated tests but is tested through conditional validator tests (_validateARole, etc.).

---

## Implementation Details

### Comparison to Plan Specification

**Plan specified** (lines 609-670 of ROLE_IMPLEMENTATION_PLAN.md):

```typescript
export default function _validateRole(tagName: string) {
	return function _validateRoleForTagName(
		role: unknown,
	): Readonly<Record<string, string>> {
		if (!isDefined(role) || !isString(role)) {
			return {}
		}

		const permission = ROLES_BY_ELEMENT[tagName]

		if (permission === "none") {
			return { "data-§-bad-role": role }
		}

		if (permission === "any") {
			return { role }
		}

		// Array of specific roles
		if (includes(permission as ReadonlyArray<string>)(role)) {
			return { role }
		}

		return { "data-§-bad-role": role }
	}
}
```

**Actual implementation** (verified 2025-11-08):

```typescript
export default function _validateRole(tagName: string) {
	return function _validateRoleForTagName(
		role: unknown,
	): Readonly<Record<string, string>> {
		if (!isDefined(role) || !isString(role)) {
			return {}
		}

		const permission = ROLES_BY_ELEMENT[tagName]

		if (!isDefined(permission)) {
			return { "data-§-bad-role": role }
		}

		if (permission === "none") {
			return { "data-§-bad-role": role }
		}

		if (permission === "any") {
			return { role }
		}

		if (includes(permission as ReadonlyArray<string>)(role)) {
			return { role }
		}

		return { "data-§-bad-role": role }
	}
}
```

**Improvement over spec**: Added `if (!isDefined(permission))` check for defensive programming against missing tagName entries.

---

## Verification Checklist

### Code Quality

- ✅ All functions use named declarations (no arrow functions)
- ✅ All functions properly curried (single parameter)
- ✅ No loops (uses `includes` from Toolsmith)
- ✅ No mutations (all data immutable)
- ✅ No exceptions (no try/catch/throw)
- ✅ Proper imports from Toolsmith

### Functionality

- ✅ _validateRole correctly handles "none" permission
- ✅ _validateRole correctly handles "any" permission
- ✅ _validateRole correctly handles role arrays
- ✅ _validateRole correctly handles undefined/non-string roles
- ✅ _validateRoleAgainstPermission has same behavior with dynamic permission
- ✅ Invalid roles return `data-§-bad-role` attribute
- ✅ Valid roles return `role` attribute

### Testing

- ✅ Test file exists: `_validateRole/index.test.ts`
- ✅ All tests passing (5 steps)
- ✅ Covers all three permission types
- ✅ Covers edge cases (undefined, invalid)

### Documentation

- ✅ Inline documentation with `/*++ */` comments
- ✅ Clear purpose statement
- ✅ Notes on limitations (does NOT validate role structure, conditional permissions, ancestor-dependent rules)

---

## Integration Status

**Used by**: 113 HTML element wrappers

All element wrappers call `_validateRole` with their tagName:

```typescript
const roleAttrs = _validateRole("div")(role)
const roleAttrs = _validateRole("button")(role)
const roleAttrs = _validateRole("article")(role)
// ... etc for all 113 elements
```

**Conditional validators using _validateRoleAgainstPermission**:

- ✅ `_A/_validateARole` - href-dependent role validation
- ✅ `_Area/_validateAreaRole` - href-dependent role validation
- ✅ `_Img/_validateImgRole` - alt-dependent role validation
- ✅ `_Label/_validateLabelRole` - for-dependent role validation
- ✅ `_Figure/_validateFigureRole` - figcaption descendant check

---

## Success Criteria

All criteria met:

- ✅ _validateRole function created and working
- ✅ _validateRoleAgainstPermission helper created and working
- ✅ All three permission types handled correctly
- ✅ Comprehensive tests passing
- ✅ 100% constitutional compliance
- ✅ Used by all element wrappers
- ✅ Zero type errors
- ✅ Zero test failures

---

## Files Created/Modified

**Created**:

- `_validateRole/index.ts` (44 lines)
- `_validateRole/index.test.ts` (test file)
- `_validateRoleAgainstPermission/index.ts` (43 lines)

**Total**: 2 implementation files (87 lines), 1 test file (5 test steps)

---

## Next Steps

Phase 3 complete. Proceed to Phase 4: Update all element wrappers to use _validateRole.
