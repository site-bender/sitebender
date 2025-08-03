import type BaseProps from "../../../../../types/index.ts"
import type { GenderType as GenderTypeProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = GenderTypeProps & BaseProps

export default function GenderType({
	_type = "GenderType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
