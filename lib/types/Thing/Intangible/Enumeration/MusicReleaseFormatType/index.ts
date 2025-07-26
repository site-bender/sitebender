import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface MusicReleaseFormatTypeProps {
}

type MusicReleaseFormatType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MusicReleaseFormatTypeProps

export default MusicReleaseFormatType
