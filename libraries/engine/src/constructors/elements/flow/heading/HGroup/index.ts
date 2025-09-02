import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"

/**
 * Creates an HGroup element configuration object
 *
 * The hgroup element represents a heading and related content.
 * It is used to group a set of h1-h6 elements when the heading
 * has multiple levels.
 *
 * @example
 * ```typescript
 * const hgroup = HGroup({
 *   children: [
 *     H1({ children: ["Main Title"] }),
 *     H2({ children: ["Subtitle"] })
 *   ]
 * })
 * ```
 */
export const HGroup = GlobalOnly("hgroup")

export default HGroup
