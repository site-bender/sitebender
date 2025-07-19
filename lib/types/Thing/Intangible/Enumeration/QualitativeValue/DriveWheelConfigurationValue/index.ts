// DriveWheelConfigurationValue extends QualitativeValue but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { QualitativeValueProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface DriveWheelConfigurationValueProps {}

type DriveWheelConfigurationValue =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& QualitativeValueProps
	& DriveWheelConfigurationValueProps

export default DriveWheelConfigurationValue
