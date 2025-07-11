export default function assertNoAxeViolations(axeResults: { violations: Array<{ id: string }> }) {
  if (axeResults.violations && axeResults.violations.length > 0) {
    throw new Error(`Axe violations found: ${axeResults.violations.map((v) => v.id).join(", ")}`)
  }
}
