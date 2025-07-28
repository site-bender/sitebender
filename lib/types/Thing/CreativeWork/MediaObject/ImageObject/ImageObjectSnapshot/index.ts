import type Thing from "../../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ImageObjectProps } from "../index.ts"

export interface ImageObjectSnapshotProps {}

type ImageObjectSnapshot =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& ImageObjectProps
	& ImageObjectSnapshotProps

export default ImageObjectSnapshot
