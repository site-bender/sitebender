import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { ImageObjectProps } from "../index.ts"

import BarcodeComponent from "../../../../../../../components/Thing/CreativeWork/MediaObject/ImageObject/Barcode/index.tsx"

export interface BarcodeProps {
}

type Barcode =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& ImageObjectProps
	& BarcodeProps

export default Barcode
