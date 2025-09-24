import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"

/**
 * Creates a NoScript element configuration object
 *
 * The noscript element represents nothing if scripting is enabled,
 * and represents its children if scripting is disabled.
 *
 * @example
 * ```typescript
 * const noScript = NoScript({
 *   children: [
 *     P({ children: ["This page requires JavaScript."] })
 *   ]
 * })
 * ```
 */
const NoScript = GlobalOnly("noscript")

export default NoScript
