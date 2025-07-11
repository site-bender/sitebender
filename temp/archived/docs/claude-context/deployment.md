# Deployment Guidelines

This document covers deployment practices and infrastructure. For core philosophy and principles, see [essentials.md](./essentials.md). For development practices, see [development.md](./development.md). For testing practices, see [testing.md](./testing.md).

## Deno Deploy Platform

**Platform**: Deno + Deno Deploy for edge functions and global distribution

**Edge-First Deployment**: All dynamic functionality runs on Deno Deploy's global edge network using edge functions. Static assets are served from edge cache.

**Edge function dependencies**: Third-party libraries are acceptable in edge functions when necessary and practical, but add dependencies last, not first.

## Database Integration

**Database**: PostgreSQL (via Supabase) with postgres.js for type-safe database access

**Database-First Design**: PostgreSQL domains and constraints are the single source of truth for all data validation. TypeScript types are generated from the database schema to maintain consistency.

## File Structure

**Names on folders, not files**: All files are named `index.ts` or `index.tsx` or `index.css` or `index.test.ts` or `index.test.tsx`

**Routes**: `kebab-case/index.tsx` for all page files (mirrors URL structure)

## Production Considerations

**Framework-Free Frontend**: Vanilla TypeScript, HTML, and CSS with progressive enhancement. No React, Vue, or similar frameworks.

**Progressive Enhancement**: Applications work with JavaScript disabled and are enhanced with vanilla JS for better user experience.

**No client-side dependencies**: Use only built-in browser APIs and Deno's standard library on the client.
