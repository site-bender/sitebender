import type Thing from "../../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ImageObjectProps } from "../index.ts"

export type BarcodeType = "Barcode"

export interface BarcodeProps {
	"@type"?: BarcodeType
}

type Barcode =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& ImageObjectProps
	& BarcodeProps

export default Barcode
