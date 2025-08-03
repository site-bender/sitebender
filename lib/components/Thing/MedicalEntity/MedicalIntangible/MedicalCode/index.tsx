import type BaseProps from "../../../../../types/index.ts"
import type { MedicalCode as MedicalCodeProps } from "../../../../../types/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = MedicalCodeProps & BaseProps

export default function MedicalCode({
	_type = "MedicalCode",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
