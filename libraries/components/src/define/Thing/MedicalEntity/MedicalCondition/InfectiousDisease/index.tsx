import type BaseProps from "../../../../../../types/index.ts"
import type { InfectiousDisease as InfectiousDiseaseProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = InfectiousDiseaseProps & BaseProps

export default function InfectiousDisease({
	_type = "InfectiousDisease",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
