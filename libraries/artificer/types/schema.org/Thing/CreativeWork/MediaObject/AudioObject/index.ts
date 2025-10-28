import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MediaObject from "../../../MediaObject/index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { AudiobookType } from "./Audiobook/index.ts"
import type { AudioObjectSnapshotType } from "./AudioObjectSnapshot/index.ts"

import { MediaObject as MediaObjectComponent } from "../../../../../../pagewright/index.tsx"

export type AudioObjectType =
	| "AudioObject"
	| AudiobookType
	| AudioObjectSnapshotType

export interface AudioObjectProps {
	"@type"?: AudioObjectType
	caption?: MediaObject | Text | ReturnType<typeof MediaObjectComponent>
	embeddedTextCaption?: Text
	transcript?: Text
}

type AudioObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& AudioObjectProps

export default AudioObject
