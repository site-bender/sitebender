# Plan: MCP integration for docs/inspector

## Goals
- Safe, minimal read-only assistance via MCP.

## Deliverables
- MCP server exposing: search, read, run-task (allowlist).
- AuthZ and rate limits; local-only default.
- Example client workflow (docs authoring).

## Steps
1. Define tool contracts (inputs/outputs, error modes) and acceptance tests.
2. Implement server with sandboxing and logging.
3. Wire to docs app with opt-in toggle; evaluate ROI and safety.
