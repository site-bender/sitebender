import type BaseProps from "../../../../../../types/index.ts"
import type { InfectiousAgentClass as InfectiousAgentClassProps } from "../../../../../../types/index.ts"

import MedicalEnumeration from "../index.tsx"

export type Props = InfectiousAgentClassProps & BaseProps

export default function InfectiousAgentClass({
	_type = "InfectiousAgentClass",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
