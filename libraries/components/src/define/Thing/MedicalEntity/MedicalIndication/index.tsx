import type BaseProps from "../../../../types/index.ts"
import type { MedicalIndication as MedicalIndicationProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = MedicalIndicationProps & BaseProps

export default function MedicalIndication({
	_type = "MedicalIndication",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
