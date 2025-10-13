# Quartermaster Documentation Index

> **Navigation guide for Quartermaster's comprehensive documentation**

## 📚 Core Documentation

### Canonical References

- **[folder-hierarchy.md](./folder-hierarchy.md)** 🟢 CANONICAL
  - Complete guide to generated application structure
  - Lowest Common Ancestor (LCA) pattern explained
  - File naming rules and module organization
  - **Status**: Production Ready, Last Updated 2025-10-02

- **[hot-reload-refactor-plan.md](./hot-reload-refactor-plan.md)** ✅ COMPLETE
  - 14-phase constitutional refactor implementation record
  - Complete verification of 100% FP compliance
  - Detailed phase-by-phase completion status
  - **Status**: Historical record of successful refactor (2025-10-12)

### Implementation References

- **[FINISH_THE_IMPLEMENTATION.md](./FINISH_THE_IMPLEMENTATION.md)** 📋 ACTIVE
  - Complete implementation plan for remaining features
  - 6 phases with detailed steps and checklists
  - Excludes voice control (future feature)
  - 25-30 hour timeline estimate
  - **Status**: Ready to execute

- **[blueprint-processor-spec.md](./blueprint-processor-spec.md)** 🚧 TODO
  - Complete specification for blueprint processor
  - Template variable substitution system
  - File copy/template operations
  - **Status**: Fully specified, awaiting implementation

- **[dev-server-implementation-plan.md](./dev-server-implementation-plan.md)** 📊 PHASES
  - HTTP/3 + SSE with HTTP/2 + WebSocket fallback
  - Phase-by-phase implementation tracking
  - Current status and completed phases
  - **Status**: Phase 5 complete, ongoing development

- **[phase-5-summary.md](./phase-5-summary.md)** 📸 SNAPSHOT
  - Detailed Phase 5 completion status (as of 2025-01-12)
  - 70% complete assessment with blockers documented
  - Import map TODO and processor implementation needs
  - **Status**: Historical snapshot, preserved for reference

## 🔧 Component Documentation

### Hot Reload Client

- **[../src/client/hot-reload-client/README.md](../src/client/hot-reload-client/README.md)**
  - Browser-side hot reload implementation
  - HTTP/3 + SSE with HTTP/2 + WebSocket fallback
  - Connection state machine and auto-reconnection
  - Fully refactored to constitutional FP standards

### Template Documentation

- **[../src/templates/common/README.md](../src/templates/common/README.md)**
  - Common templates shared across blueprints
  - Base HTML, deno.json, server, hot-reload client
  - Template variable substitution guide

- **[../src/templates/dev-server-deno/README.md](../src/templates/dev-server-deno/README.md)**
  - Pure-Deno development server
  - WebSocket hot reload implementation
  - Zero dependencies, universal compatibility

## 📦 Archived Documentation

Historical documents preserved for reference but no longer actively maintained:

- **[archived/structure.md](./archived/structure.md)** - Superseded by folder-hierarchy.md
- **[archived/prompt.md](./archived/prompt.md)** - Session-specific notes (2025-10-02)
- **[archived/plan.md](./archived/plan.md)** - Incomplete implementation roadmap
- **[archived/plan.yaml](./archived/plan.yaml)** - Duplicate of plan.md in YAML

## 🎯 Quick Navigation

### I want to...

**Generate a new application**
- See main [README.md](../README.md) for CLI usage
- Reference [blueprint-processor-spec.md](./blueprint-processor-spec.md) for blueprint format

**Understand application structure**
- Start with [folder-hierarchy.md](./folder-hierarchy.md) (CANONICAL)
- Review module organization and LCA rules

**Work on hot reload**
- Read [hot-reload-refactor-plan.md](./hot-reload-refactor-plan.md) for implementation history
- Check [../src/client/hot-reload-client/README.md](../src/client/hot-reload-client/README.md) for usage

**Implement blueprint processor**
- Follow [FINISH_THE_IMPLEMENTATION.md](./FINISH_THE_IMPLEMENTATION.md) for complete plan
- Reference [blueprint-processor-spec.md](./blueprint-processor-spec.md) for detailed spec
- Reference [phase-5-summary.md](./phase-5-summary.md) for historical context

**Track development progress**
- Review [dev-server-implementation-plan.md](./dev-server-implementation-plan.md)
- Check phase completion status

## 📝 Documentation Standards

All Quartermaster documentation follows these principles:

1. **Status Labels**: Every doc has clear status (CANONICAL, COMPLETE, TODO, etc.)
2. **Last Updated**: Dates included for time-sensitive content
3. **One Source of Truth**: Canonical docs referenced, not duplicated
4. **Historical Preservation**: Outdated docs archived, not deleted
5. **Navigation**: Clear links between related documents

## 🔄 Maintenance

### When to Update This Index

- New documentation added to `docs/`
- Status changes (TODO → COMPLETE, etc.)
- Canonical reference changes
- Major refactors or reorganizations

### Documentation Lifecycle

```
Active → Outdated → Archived
  ↓         ↓          ↓
docs/   docs/      archived/
```

---

**Last Updated**: 2025-10-12
**Maintainer**: Quartermaster Team
