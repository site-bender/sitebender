import type BaseProps from "../../../../../../types/index.ts"
import type { MedicalDevicePurpose as MedicalDevicePurposeProps } from "../../../../../../types/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = MedicalDevicePurposeProps & BaseProps

export default function MedicalDevicePurpose({
	_type = "MedicalDevicePurpose",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
