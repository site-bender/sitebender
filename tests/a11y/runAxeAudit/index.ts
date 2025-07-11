import type { Page } from "playwright"

import { AxeBuilder } from "@axe-core/playwright"

export default async function runAxeAudit(page: Page) {
  const axe = await new AxeBuilder({ page }).analyze()

  return axe
}
