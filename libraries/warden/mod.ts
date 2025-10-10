//++ Warden: Cryptographically Enforced Architectural Governance
//++
//++ IMPORTANT: This library follows the "NO BARREL FILES" rule.
//++ Do NOT import from this file. Import directly from the function tree.
//++
//++ Correct usage:
//++   import enforce from "@sitebender/warden/src/enforce/enforce/index.ts"
//++   import formatReport from "@sitebender/warden/src/enforce/formatReport/index.ts"
//++   import validatePrivacy from "@sitebender/warden/src/privacy/validatePrivacy/index.ts"
//++   import hashArtifact from "@sitebender/warden/src/hash/hashArtifact/index.ts"
//++
//++ Incorrect usage:
//++   import { enforce } from "@sitebender/warden/mod.ts"  // ← WRONG!
//++
//++ Example usage:
//++   import enforce from "@sitebender/warden/src/enforce/enforce/index.ts"
//++   import formatReport from "@sitebender/warden/src/enforce/formatReport/index.ts"
//++   import type { WardenConfig } from "@sitebender/warden/src/types/index.ts"
//++
//++   const config: WardenConfig = {
//++     targets: ["src/"],
//++     phase: "block",
//++   }
//++
//++   const result = await enforce(config)
//++   const report = formatReport(result)
//++   console.log(report)
//++
//++ This file exists only to satisfy Deno's module structure requirements.
//++ It intentionally exports nothing to enforce direct tree imports.

export {}
