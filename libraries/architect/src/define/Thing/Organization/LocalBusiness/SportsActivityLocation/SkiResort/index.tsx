import type BaseProps from "../../../../../../../types/index.ts"
import type { SkiResort as SkiResortProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = SkiResortProps & BaseProps

export default function SkiResort({
	_type = "SkiResort",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
