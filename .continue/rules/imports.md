---
name: Import Order and Grouping
alwaysApply: true
---

# Import Realms and Order

## Realms
- External dependencies only allowed in Linguist (TS compiler) and Agent (distributed services). All others: zero external deps.
- Libraries: internal imports are relative; cross-library use @sitebender namespace; external use Deno std URLs.
- Applications: internal use ~ aliases; libraries via @sitebender; external standard paths.
- Tests: import tested code relatively; test deps via standard URLs.

## Order & Grouping (top to bottom)
1. Type imports from external libraries (with `type` keyword)
2. Type imports from internal sources (with `type` keyword)
3. Named imports from external libraries
4. Constants imports from external libraries
5. Default imports from external libraries
6. Named imports from internal sources
7. Constants imports from internal sources
8. Default imports from internal sources

- Alphabetize within each group.
- Separate groups with a single blank line.
- No barrel files. No circular dependencies.
