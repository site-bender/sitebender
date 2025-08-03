import type BaseProps from "../../../../../types/index.ts"
import type { MedicalTestPanel as MedicalTestPanelProps } from "../../../../../types/index.ts"

import MedicalTest from "../index.tsx"

export type Props = MedicalTestPanelProps & BaseProps

export default function MedicalTestPanel({
	_type = "MedicalTestPanel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
