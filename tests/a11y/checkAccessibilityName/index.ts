import type { Locator } from "playwright"

export default async function checkAccessibilityName(locator: Locator) {
  const handle = await locator.elementHandle()

  if (!handle) return { value: "", source: "none" }

  const snapshot = await locator.page().accessibility.snapshot({ root: handle })

  return { value: snapshot?.name ?? "", source: snapshot?.name ? "computed" : "none" }
}
