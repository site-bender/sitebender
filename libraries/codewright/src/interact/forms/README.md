# Forms package overview

This folder houses interactive form building blocks. The structure aligns with the library’s category model (interact, transform, augment, wrap, etc.) and keeps concerns well-separated.

- elements/ — Thin, accessible primitives that map to HTML inputs (Input, Select, TextArea, Checkbox, Radio, Label, Help). No domain logic; forward all props; own ARIA semantics only.
- fields/ — Controlled field wrappers that compose one or more elements with label/help/error plumbing. Single source of truth via value/onChange; surface validation state but don’t implement rules.
- composites/ — Multi-element groupings (RadioGroup, CheckboxGroup, LabelWrapper, Legend). Layout + group semantics only.
- Form, Field, FieldSet — Shells/orchestrators that coordinate fields, submission, and messaging. They wire to transform/* for rules, derived values, and events.
- recipes/ — App-level compositions (e.g., ContactForm, InOrUp, Test). These are examples built from primitives.

JSX-only rule (MANDATORY)

- Do NOT import or call helpers/createElement or helpers/Fragment in components or recipes.
- Write JSX and import components; the compiler handles transformation.
- The linter enforces this; violations will fail CI.

Field vs specialized fields

- Field: generic shell used by automated form generation from database schema (Fuseki, etc.). Do not use it for hand-authored forms.
- Specialized fields: use TextField, EmailAddressField, UrlField, PhoneNumberField, etc., in recipes and hand-written forms.

Implementation guidance

- Keep logic declarative: route validation, conditions, and reactions through transform/control, comparators, and do actions. Fields should not embed business logic.
- Accessibility first: reuse interact/feedback (ErrorMessage, HelpMessage, HelpTooltip) and augment/screen-reader. Ensure labels are programmatically associated and error/help are referenced via aria-describedby.
- Composition over inheritance: fields compose elements; forms compose fields/composites; recipes compose forms. Prefer small props and slot patterns to enable reuse.
- Side-effect boundaries: data fetching and storage belong to transform/injectors. UI components subscribe via props.
- Theming/styling: keep styling minimal and opt-in via className/style tokens. Avoid coupling to any CSS framework in primitives.

Migration from helpers to JSX

- If you see any `import ... from ".../helpers/createElement"` or `helpers/Fragment` in a component, replace it with JSX syntax.
- Children: use JSX children `<X>...</X>` or props/slots, not `createElement(type, props, child)`.
- If you need to transform JSX to data, keep it inside small components; `createElement` will normalize intrinsic nodes to `{ type, props }`.

Local checks

- Lint guard (no helper imports/calls): `deno task lint:no-react-junk`
- Type checks (workspace): `deno task type-check`
- Codewright tests: `deno task test:components:strict`

Recommended housekeeping

- Consider moving ContactForm, InOrUp, and Test into forms/recipes/ to clearly distinguish primitives from examples. Update imports via a simple codemod when ready.
- Add minimal unit tests per field (happy path + required/invalid) and an interaction test for Form orchestration.
- Provide barrel exports at each level (elements, fields, composites) for ergonomic imports once stable.

Contract checklist (quick reference)

- elements: uncontrolled by default, forwardRef, ARIA-compliant, no validation
- fields: controlled, accepts value/onChange, accepts error/help, no validation rules inside
- composites: no state; group semantics (role, name, aria-*)
- shells (Form/FieldSet): coordinates submit/reset, passes state to children, integrates transform/*
- recipes: app-level examples only
