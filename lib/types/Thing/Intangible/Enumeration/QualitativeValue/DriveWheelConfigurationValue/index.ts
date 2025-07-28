import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { QualitativeValueProps } from "../index.ts"

export interface DriveWheelConfigurationValueProps {}

type DriveWheelConfigurationValue =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& QualitativeValueProps
	& DriveWheelConfigurationValueProps

export default DriveWheelConfigurationValue
