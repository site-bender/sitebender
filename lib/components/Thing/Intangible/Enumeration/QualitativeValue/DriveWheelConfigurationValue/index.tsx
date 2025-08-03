import type BaseProps from "../../../../../../types/index.ts"
import type { DriveWheelConfigurationValue as DriveWheelConfigurationValueProps } from "../../../../../../types/index.ts"

import QualitativeValue from "../index.tsx"

export type Props = DriveWheelConfigurationValueProps & BaseProps

export default function DriveWheelConfigurationValue({
	_type = "DriveWheelConfigurationValue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
