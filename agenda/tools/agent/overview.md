## Tool: Agent — overview

Purpose
- VS Code-side bridge that invokes Deno scripts for common workflows; minimal Node glue, real work in Deno.

Architecture
- JS commands register palette entries → spawn terminal → run `deno run -A` on repo scripts.
- Deno scripts follow one-function-per-folder, export default, and `import.meta.main` for CLI.
