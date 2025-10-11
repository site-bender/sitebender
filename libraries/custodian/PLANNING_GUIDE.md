# Custodian Planning Guide

> **Navigation guide for Custodian development planning**
>
> **Last Updated**: 2025-01-10

---

## Document Structure

Custodian's development is organized across several planning documents, each serving a specific purpose:

### Active Documents

#### 1. [`MASTER_PLAN.md`](MASTER_PLAN.md) - The Single Source of Truth

**Purpose**: Authoritative MVP implementation plan with detailed tasks

**Use When**:
- Starting a new development session
- Tracking current progress
- Understanding task dependencies
- Resuming work after a break
- Coordinating with AI assistants

**Key Features**:
- **"NEXT SESSION STARTS HERE"** marker for easy resumption
- Detailed task breakdowns (168 MVP tasks)
- Session resumption guide
- Progress tracking
- Testing philosophy
- MCP query instructions

**Structure**:
- Phases 1-5 (MVP only)
- Milestones with task checklists
- Definition of Done criteria
- Session notes

#### 2. [`POST_MVP_ROADMAP.md`](POST_MVP_ROADMAP.md) - Future Enhancements

**Purpose**: Post-MVP features (Phases 6-15) to implement AFTER MVP validation

**Use When**:
- Planning beyond MVP
- Understanding long-term vision
- Prioritizing post-MVP features
- After 3-6 months of MVP in production

**Key Features**:
- 299 post-MVP tasks across 10 phases
- Implementation prerequisites
- Phased rollout strategy
- Success criteria for each phase

**Structure**:
- Phases 6-15 summaries
- Implementation timeline (~23 months)
- Success criteria
- Philosophy and principles

⚠️ **Important**: Do NOT start post-MVP work until MVP is validated in production

#### 3. [`README.md`](README.md) - User-Facing Documentation

**Purpose**: Library overview, philosophy, and usage examples

**Use When**:
- Understanding Custodian's purpose
- Learning core concepts
- Finding code examples
- Getting started with the library

**Key Features**:
- Philosophy and principles
- Core concepts explained
- API documentation
- Integration examples
- Visual workflow features

#### 4. [`PLANNING_GUIDE.md`](PLANNING_GUIDE.md) - This Document

**Purpose**: Meta-guide explaining how to use all planning documents

**Use When**:
- First time working on Custodian
- Confused about which document to use
- Setting up AI development sessions
- Onboarding new contributors

### Archived Documents

Located in `docs/archive/`:

#### [`plan-original.md`](docs/archive/plan-original.md)
- Original comprehensive plan
- Detailed phase descriptions
- Historical context
- Use for reference only

#### [`plan-original.yaml`](docs/archive/plan-original.yaml)
- Structured task data
- Machine-readable format
- Complete task breakdowns
- Use for tooling/automation

#### [`todos-original.md`](docs/archive/todos-original.md)
- TDD-focused approach
- Testing philosophy details
- Parallel execution strategy
- Use for testing reference

---

## When to Use Which Document

### Starting Fresh

**Day 1**: Read in this order:
1. `README.md` - Understand the vision
2. `MASTER_PLAN.md` - Understand the implementation plan
3. `PLANNING_GUIDE.md` - This document

### Daily Development

**Every session**:
1. Open `MASTER_PLAN.md`
2. Find "📍 NEXT SESSION STARTS HERE" marker
3. Read current phase/milestone context
4. Query MCP servers as indicated
5. Write tests first, implement to pass
6. Update checkboxes and progress
7. Move marker to next task

### Planning Ahead

**Long-term planning**:
1. Review `MASTER_PLAN.md` for MVP scope
2. Check `POST_MVP_ROADMAP.md` for future features
3. Don't mix MVP and post-MVP work

### Contributing

**New contributors**:
1. Read `README.md` for context
2. Read `MASTER_PLAN.md` sections relevant to your work
3. Follow TDD approach strictly
4. Update progress as you go

---

## MVP vs Post-MVP Distinction

### MVP (Phases 1-5) - 168 Tasks

**Focus**: Core functionality that works without JavaScript

**Scope**:
- ✅ Core types and contracts
- ✅ Server-side state management
- ✅ Cryptographic continuations
- ✅ Pure state machines
- ✅ Progressive enhancement

**Timeline**: 2-3 months of focused development

**Success Criteria**:
- Works in Lynx text browser
- All state in URLs
- Idempotent operations
- Secure continuations
- Progressive enhancement
- All tests passing

### Post-MVP (Phases 6-15) - 299 Tasks

**Focus**: Advanced features and tooling

**Scope**:
- Visual state machine designer
- Real-time collaboration
- Analytics and insights
- Workflow integration
- Production hardening

**Timeline**: ~23 months (AFTER MVP validation)

**Prerequisites**:
- MVP in production for 3-6 months
- Real user validation
- 99.9% uptime
- Positive user feedback
- Technical debt addressed

**⚠️ Critical Rule**: Never start post-MVP work before MVP is validated

---

## Resuming AI Sessions

### For AI Assistants

When resuming work on Custodian, follow this protocol:

#### 1. Read MASTER_PLAN.md First

Always start by reading the complete `MASTER_PLAN.md`:

```
Read: libraries/custodian/MASTER_PLAN.md
```

#### 2. Find Current Position

Look for the **"📍 NEXT SESSION STARTS HERE"** marker:
- **Current Focus**: Phase and milestone
- **Next Task**: Specific task ID
- **Context Needed**: MCP queries to run
- **Files to Create**: What to build next

#### 3. Query MCP Servers

Before coding, query relevant MCP servers:

```
Query functional_programming_rules for: "Result monad", "error handling"
Query typescript_rules for: "branded types", "type-level programming"
Query syntax_rules for: "naming conventions", "function declarations"
```

#### 4. Follow TDD Strictly

**Always write tests first**:
1. Write failing test
2. Run test (should fail)
3. Implement minimum code to pass
4. Run test (should pass)
5. Refactor if needed
6. Update checkboxes

#### 5. Update Progress

After completing tasks:
1. ✅ Check off completed tasks
2. Update progress counters
3. Move "NEXT SESSION" marker
4. Update "Last Updated" timestamp
5. Add session notes

#### 6. Context for Next Session

Before ending:
1. Document what was completed
2. Note any blockers
3. Specify next task clearly
4. Update MCP query needs

### Session Checklist

Copy this for every session:

```markdown
## Session Start
- [ ] Read MASTER_PLAN.md completely
- [ ] Check "NEXT SESSION STARTS HERE" marker
- [ ] Read current phase/milestone context
- [ ] Query MCP servers as indicated
- [ ] Understand task dependencies

## During Session
- [ ] Write tests first (TDD)
- [ ] Implement to pass tests
- [ ] Update checkboxes as you go
- [ ] Run tests: `deno task test`
- [ ] Format & lint: `deno task fmt && deno task lint`

## Session End
- [ ] All tests passing
- [ ] Progress updated
- [ ] "NEXT SESSION" marker moved
- [ ] Timestamps updated
- [ ] Session notes added
```

---

## Common Workflows

### Starting a New Phase

1. Read phase goal and dependencies
2. Review all milestones in phase
3. Check Definition of Done
4. Start with first milestone
5. Work through tasks sequentially

### Completing a Milestone

1. Verify all tasks checked off
2. Review Definition of Done
3. Run full test suite
4. Document any learnings
5. Move to next milestone

### Encountering Blockers

1. Document the blocker clearly
2. Check if it affects task order
3. Consider parallel work
4. Update "NEXT SESSION" notes
5. Consult team if needed

### Refactoring

1. Ensure tests pass first
2. Make changes incrementally
3. Run tests after each change
4. Update documentation
5. Don't skip test updates

---

## Best Practices

### For Human Developers

1. **Always start with MASTER_PLAN.md**
2. **Follow TDD strictly** - tests first, always
3. **Update progress frequently** - don't wait until end of day
4. **Query MCP servers** - they have the rules and context
5. **One task at a time** - finish before moving on
6. **Document learnings** - session notes are valuable

### For AI Assistants

1. **Read completely before acting** - understand full context
2. **Follow the marked path** - "NEXT SESSION" is authoritative
3. **Query before coding** - MCP has constitutional rules
4. **Test-first always** - no exceptions to TDD
5. **Update progressively** - check boxes as you go
6. **Be explicit** - move markers, update timestamps

### For Teams

1. **One source of truth** - MASTER_PLAN.md is authoritative
2. **Coordinate work** - check current focus before starting
3. **Update frequently** - push changes often
4. **Respect dependencies** - don't skip ahead
5. **Share learnings** - session notes help everyone

---

## Troubleshooting

### "I don't know where to start"

→ Open `MASTER_PLAN.md` and find "📍 NEXT SESSION STARTS HERE"

### "Which document should I read?"

→ See "When to Use Which Document" section above

### "Can I work on post-MVP features?"

→ NO - not until MVP is validated in production (3-6 months)

### "The NEXT SESSION marker is unclear"

→ Read the full current phase section for context

### "I want to change the plan"

→ Update `MASTER_PLAN.md` with rationale in session notes

### "Tests are failing"

→ Check you followed TDD (test first, then implement)

### "I need more context"

→ Query the MCP servers as specified in MASTER_PLAN.md

---

## Document Maintenance

### Keeping Documents in Sync

**MASTER_PLAN.md**:
- Update after every session
- Keep progress counters accurate
- Move markers promptly
- Add detailed session notes

**POST_MVP_ROADMAP.md**:
- Update only after MVP completion
- Adjust based on MVP learnings
- Keep prerequisites current

**README.md**:
- Update when API changes
- Keep examples working
- Sync with actual implementation

**PLANNING_GUIDE.md**:
- Update when process changes
- Add new troubleshooting items
- Keep workflows current

### Version Control

- Commit planning documents separately from code
- Write clear commit messages for plan changes
- Tag major milestones
- Keep history intact for reference

---

## Quick Reference

### File Locations

```
libraries/custodian/
├── MASTER_PLAN.md              # ← Start here
├── POST_MVP_ROADMAP.md         # ← After MVP validated
├── README.md                   # ← User documentation
├── PLANNING_GUIDE.md           # ← This file
└── docs/
    └── archive/
        ├── plan-original.md    # ← Historical reference
        ├── plan-original.yaml  # ← Structured data
        └── todos-original.md   # ← Testing reference
```

### Essential Commands

```bash
# Read current task
cat MASTER_PLAN.md | grep -A 20 "NEXT SESSION STARTS HERE"

# Run tests
deno task test

# Format and lint
deno task fmt && deno task lint

# Check progress
grep -c "\[x\]" MASTER_PLAN.md
grep -c "\[ \]" MASTER_PLAN.md
```

### Key Sections in MASTER_PLAN.md

- Line ~12: "NEXT SESSION STARTS HERE"
- Line ~27: Vision & Core Principles
- Line ~50: Testing Philosophy
- Line ~66: MVP Scope
- Line ~1377: Post-MVP Reference
- Line ~1430: Session Resumption Guide

---

## Philosophy

This planning structure embodies Custodian's principles:

- **Single Source of Truth**: MASTER_PLAN.md is authoritative
- **Progressive Enhancement**: Start with MVP, enhance later
- **Test-Driven**: Tests first, always
- **Pure Functions**: Clear, predictable planning
- **Privacy-First**: Separate concerns (MVP vs post-MVP)
- **Accessibility**: Easy to navigate and understand

---

**Last Updated**: 2025-01-10

Keep this guide current as the planning process evolves. Good planning enables good code.
