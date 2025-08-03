import type BaseProps from "../../../../../types/index.ts"
import type { BloodTest as BloodTestProps } from "../../../../../types/index.ts"

import MedicalTest from "../index.tsx"

export type Props = BloodTestProps & BaseProps

export default function BloodTest({
	_type = "BloodTest",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
