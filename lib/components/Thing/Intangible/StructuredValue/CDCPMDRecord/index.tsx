import type BaseProps from "../../../../../types/index.ts"
import type { CDCPMDRecord as CDCPMDRecordProps } from "../../../../../types/index.ts"

import StructuredValue from "../index.tsx"

export type Props = CDCPMDRecordProps & BaseProps

export default function CDCPMDRecord({
	_type = "CDCPMDRecord",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
