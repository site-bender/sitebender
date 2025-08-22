import type BaseProps from "../../../../types/index.ts"
import type { MedicalDevice as MedicalDeviceProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MedicalDeviceProps & BaseProps

export default function MedicalDevice({
	_type = "MedicalDevice",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
