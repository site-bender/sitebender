# AI Assistant Guide for @sitebender

## For AI Assistants Working on This Codebase

### Required Reading Order

1. **Load `docs/rules.json`** for all coding standards and requirements (machine-readable)
2. **Check `docs/project-overview.md`** to understand the architecture
3. **Review `docs/library-data-flow.md`** to understand library interactions  
4. **Respect `libraries/contracts/boundaries.json`** for dependency rules
5. **Read `libraries/docs/contract-enforcement-implementation.md`** for contract details

### The Prime Directive

**DO NOT ASSUME. DO NOT TAKE SHORTCUTS. DO NOT GUESS.**

This isn't advice. It's THE LAW. See `docs/rules.json` for complete rules.

### Document Structure

- **`docs/rules.json`** - Machine-readable rules (SOURCE OF TRUTH)
- **`docs/rules.md`** - Human-readable rules (GENERATED - DO NOT EDIT)
- **`docs/project-overview.md`** - Project goals, architecture, and library descriptions
- **`docs/library-data-flow.md`** - How data flows between libraries
- **`docs/future-plans.md`** - Roadmap, TODOs, and upcoming features
- **`libraries/contracts/boundaries.json`** - Inter-library dependency rules
- **`libraries/docs/contract-enforcement-implementation.md`** - Contract system details

### Quick Commands

```bash
# Development
deno task dev         # Start dev server
deno task test        # Run tests
deno task fmt         # Format code
deno task lint        # Lint code
deno task typecheck   # Type check

# Generate documentation
deno run --allow-read --allow-write docs/generateRulesDoc/index.ts

# Validate contracts
deno run --allow-read --allow-run scripts/validateContracts.ts
```

### Contract Enforcement

The project uses an enforceable contract system:
- Parser is THE ONLY library that can import TypeScript
- Envoy CANNOT parse code, only interpret Parser output
- All inter-library data is immutable via ContractOutput<T>
- Git hooks prevent commits that violate contracts

### Key Reminders for AI Assistants

1. **You are not the sole developer** - The Architect reviews EVERY line
2. **Run ALL pre-commit checks** before suggesting commits:
   - `deno task test` - All tests must pass
   - `deno task lint` - Zero lint errors
   - `deno task typecheck` - Zero type errors
   - `deno task fmt` - Code must be formatted
3. **Never commit if ANY check fails**
4. **Update all documentation BEFORE committing**

### The Bottom Line

**DO THE WORK RIGHT OR DON'T DO IT AT ALL.**

There are no points for trying. There are no participation trophies. There is only working code that serves users well, or there is failure.

---

_"In 30 years, I've seen every shortcut lead to a cliff. Don't be another cautionary tale."_

— The Architect