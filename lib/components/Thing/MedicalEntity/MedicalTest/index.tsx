import type BaseProps from "../../../../types/index.ts"
import type { MedicalTest as MedicalTestProps } from "../../../../types/index.ts"

import MedicalEntity from "../index.tsx"

export type Props = MedicalTestProps & BaseProps

export default function MedicalTest({
	_type = "MedicalTest",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
