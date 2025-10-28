# Form Recipes

Recipes are app-level compositions of primitives (Form, Field, FieldSet) and fields.

- Purpose: Provide ready-to-use flows (ContactForm, InOrUp, Test) while primitives remain reusable and logic-free.
- Location: `interact/forms/recipes/` (current implementations are re-exported via shims to avoid breaking imports).
- Guidance: Keep domain logic in `transform/*` and wire via props. Recipes compose; they don’t introduce new primitives.
