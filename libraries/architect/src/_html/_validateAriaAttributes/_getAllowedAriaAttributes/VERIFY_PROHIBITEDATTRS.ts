/*++
 + VERIFICATION SCRIPT: Proves prohibitedAttrs is actually implemented
 + Run this to verify none/presentation roles only allow aria-hidden
 +
 + Run: deno run --allow-read VERIFY_PROHIBITEDATTRS.ts
 */

import _getAllowedAriaAttributes from "./index.ts"

console.log("=== VERIFICATION: prohibitedAttrs Implementation ===\n")

console.log("1. Testing role='none' on div element:")
const noneResult = _getAllowedAriaAttributes("div")("none")
console.log("   Allowed attributes:", JSON.stringify(noneResult))
console.log("   Expected: [\"aria-hidden\"]")
console.log("   Match:", JSON.stringify(noneResult) === JSON.stringify(["aria-hidden"]) ? "✅ PASS" : "❌ FAIL")

console.log("\n2. Testing role='presentation' on div element:")
const presentationResult = _getAllowedAriaAttributes("div")("presentation")
console.log("   Allowed attributes:", JSON.stringify(presentationResult))
console.log("   Expected: [\"aria-hidden\"]")
console.log("   Match:", JSON.stringify(presentationResult) === JSON.stringify(["aria-hidden"]) ? "✅ PASS" : "❌ FAIL")

console.log("\n3. Testing role='button' on div element (should have global + role-specific):")
const buttonResult = _getAllowedAriaAttributes("div")("button")
console.log("   Allowed attributes count:", buttonResult.length)
console.log("   Should have >20 attributes (global + button-specific)")
console.log("   Includes aria-label:", buttonResult.includes("aria-label") ? "✅ YES" : "❌ NO")
console.log("   Includes aria-pressed:", buttonResult.includes("aria-pressed") ? "✅ YES" : "❌ NO")
console.log("   Match:", buttonResult.length > 20 ? "✅ PASS" : "❌ FAIL")

console.log("\n4. Verifying none/presentation do NOT include global attributes:")
const hasAriaLabel = noneResult.includes("aria-label")
const hasAriaDescribedby = noneResult.includes("aria-describedby")
const hasAriaExpanded = presentationResult.includes("aria-expanded")
console.log("   none includes aria-label:", hasAriaLabel ? "❌ FAIL (should not)" : "✅ PASS (correctly excluded)")
console.log("   none includes aria-describedby:", hasAriaDescribedby ? "❌ FAIL (should not)" : "✅ PASS (correctly excluded)")
console.log("   presentation includes aria-expanded:", hasAriaExpanded ? "❌ FAIL (should not)" : "✅ PASS (correctly excluded)")

console.log("\n=== VERIFICATION COMPLETE ===")
console.log("\nSUMMARY:")
console.log("- none role allows ONLY aria-hidden:", JSON.stringify(noneResult) === JSON.stringify(["aria-hidden"]) ? "✅" : "❌")
console.log("- presentation role allows ONLY aria-hidden:", JSON.stringify(presentationResult) === JSON.stringify(["aria-hidden"]) ? "✅" : "❌")
console.log("- Other roles still work correctly:", buttonResult.length > 20 ? "✅" : "❌")
