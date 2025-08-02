import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type MusicReleaseFormatTypeType = "MusicReleaseFormatType"

export interface MusicReleaseFormatTypeProps {
	"@type"?: MusicReleaseFormatTypeType
}

type MusicReleaseFormatType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MusicReleaseFormatTypeProps

export default MusicReleaseFormatType
