import GlobalOnly from "@sitebender/architect/constructors/abstracted/GlobalOnly/index.ts"

/**
 * Creates a Picture element configuration object
 *
 * The picture element contains zero or more source elements
 * and one img element to offer alternative versions of an image.
 *
 * @example
 * ```typescript
 * const picture = Picture({
 *   id: "responsive-image"
 * })([
 *   Source({ media: "(min-width: 800px)", srcset: "large.jpg" }),
 *   Source({ media: "(min-width: 400px)", srcset: "medium.jpg" }),
 *   Img({ src: "small.jpg", alt: "Description" })
 * ])
 * ```
 */
const Picture = GlobalOnly("Picture")()

export default Picture
