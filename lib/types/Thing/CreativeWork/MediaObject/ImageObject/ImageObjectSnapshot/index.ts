// ImageObjectSnapshot extends ImageObject but adds no additional properties
import type Thing from "../../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { ImageObjectProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface ImageObjectSnapshotProps {}

type ImageObjectSnapshot =
	& Thing
	& CreativeWorkProps
	& ImageObjectProps
	& MediaObjectProps
	& ImageObjectSnapshotProps

export default ImageObjectSnapshot
