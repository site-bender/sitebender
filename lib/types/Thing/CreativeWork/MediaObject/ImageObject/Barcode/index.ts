// Barcode extends ImageObject but adds no additional properties
import type Thing from "../../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ImageObjectProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface BarcodeProps {}

type Barcode =
	& Thing
	& CreativeWorkProps
	& ImageObjectProps
	& MediaObjectProps
	& BarcodeProps

export default Barcode
