import type BaseProps from "../../../../../types/index.ts"
import type { PhysicalActivity as PhysicalActivityProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PhysicalActivityProps & BaseProps

export default function PhysicalActivity({
	_type = "PhysicalActivity",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
