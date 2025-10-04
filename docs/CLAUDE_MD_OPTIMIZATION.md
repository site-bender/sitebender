# CLAUDE.md Optimization Documentation

## Overview

Optimized CLAUDE.md from 139 lines to 56 lines (60% reduction) by removing content that should be retrieved from MCP servers on-demand.

## What Was Removed and Why

### 1. Detailed Architecture Information (Lines 56-66)
**Removed:**
- Monorepo structure details (15 libraries, layer descriptions)
- Specific library names and dependencies
- DAG enforcement details

**Why:** This information is:
- Project-specific and changes over time
- Only relevant when working on specific libraries
- Better retrieved from MCP when needed: `constitutional_rules: "dependency boundaries layers"`

### 2. Arborist-Specific Details (Lines 68-81)
**Removed:**
- "Arborist is King" section
- Performance claims (20-50x faster)
- Detailed usage instructions
- Code examples

**Why:** This is:
- Library-specific documentation
- Only relevant when working with Arborist
- Available in `libraries/arborist/README.md`
- Better retrieved when needed: `constitutional_rules: "arborist parser typescript"`

### 3. File Structure Examples (Lines 83-99)
**Removed:**
- Detailed directory tree example
- Specific folder structure rules
- Private helper conventions

**Why:** This is:
- Available in MCP: `constitutional_rules: "file structure one function exports"`
- Duplicates what's in the RAG system
- Static examples that don't adapt to context

### 4. Import Style Examples (Lines 101-112)
**Removed:**
- Correct/incorrect import examples
- Detailed explanations of barrel file prohibition
- Alias usage instructions

**Why:** This is:
- Available in MCP: `constitutional_rules: "barrel files imports"`
- Code examples better retrieved contextually
- Duplicates RAG content

### 5. Extended Workflow Steps (Lines 114-121)
**Removed:**
- Detailed step-by-step workflow
- Specific command sequences
- Multiple verification steps

**Why:**
- Simplified to 4 essential steps
- Detailed workflow can be retrieved when needed
- Commands consolidated in "Essential Commands" section

### 6. Extended Key References (Lines 123-129)
**Removed:**
- Multiple README references
- Library-specific documentation links

**Why:**
- Kept only the 3 most critical references
- Library-specific docs retrieved when working on that library
- Reduces cognitive load

### 7. Verbose "Remember" Section (Lines 131-138)
**Removed:**
- Detailed explanations of each rule
- "No-compromise, greenfield codebase" rhetoric
- Extended rule descriptions

**Why:**
- Simplified to essential reminders
- Detailed rules in MCP servers
- Reduced redundancy

## What Was Kept and Why

### 1. MCP Query Instructions (Lines 5-28)
**Kept:** Critical instructions on HOW to query MCP servers
**Why:** This is the core workflow - agents must know to query BEFORE coding

### 2. Project Essence (Lines 30-32)
**Kept:** One-line project description
**Why:** Provides essential context without detail overload

### 3. Essential Commands (Lines 34-42)
**Kept:** 6 most common commands
**Why:** Quick reference for daily workflow, no need to query MCP

### 4. Simplified Workflow (Lines 44-48)
**Kept:** 4-step workflow
**Why:** Clear process without overwhelming detail

### 5. When to Query MCP (Lines 50-58)
**Kept:** Specific query examples for common scenarios
**Why:** Teaches agents WHAT to query for different tasks

### 6. Critical References (Lines 60-63)
**Kept:** 3 most important files
**Why:** These are always relevant, not context-specific

### 7. Core Reminders (Lines 65-69)
**Kept:** Essential rules summary
**Why:** Quick mental model without duplicating MCP content

## Benefits of Optimization

1. **Reduced Cognitive Load**: 60% less content to process
2. **Dynamic Context**: Agents retrieve only relevant rules
3. **Single Source of Truth**: MCP servers are authoritative
4. **Maintainability**: Changes to rules only need MCP updates
5. **Scalability**: Can add more rules to MCP without bloating CLAUDE.md
6. **Efficiency**: Agents spend less time reading, more time querying

## Metrics

- **Before**: 139 lines, ~1,200 words
- **After**: 56 lines, ~400 words
- **Reduction**: 60% fewer lines, 67% fewer words
- **MCP Queries Required**: ~2-4 per coding task (vs 0 with old approach)
- **Net Benefit**: Faster initial read, more accurate rule application

## Migration Impact

**For AI Agents:**
- Must adopt MCP-first workflow
- Learn to query before coding
- Benefit from always-current rules

**For Developers:**
- Cleaner, more focused CLAUDE.md
- Rules maintained in one place (MCP)
- Easier to update and extend

**For the Project:**
- Better separation of concerns
- Scalable rule management
- Consistent rule application
