import type { Page } from "playwright"

import { AxeBuilder } from "@axe-core/playwright"

const runFullAccessibilityAudit =
  (options: { componentSelector?: string; skipHeadings?: boolean } = {}) =>
  async (page: Page) => {
    const axeBuilder = options.componentSelector
      ? new AxeBuilder({ page }).include(options.componentSelector)
      : new AxeBuilder({ page })

    const axe = await axeBuilder.analyze()

    const headings = options.skipHeadings
      ? null
      : await page.evaluate(() => {
          const h1s = Array.from(document.querySelectorAll('h1'))
          return {
            hasH1: h1s.length > 0,
            multipleH1: h1s.length > 1,
            issues: h1s.length === 0 ? ["No H1 present"] : h1s.length > 1 ? ["Multiple H1s present"] : []
          }
        })

    return { axe, headings, issues: [...axe.violations] }
  }

export default runFullAccessibilityAudit
