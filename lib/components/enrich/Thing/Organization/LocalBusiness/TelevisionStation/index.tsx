import type BaseProps from "../../../../../types/index.ts"
import type { TelevisionStation as TelevisionStationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TelevisionStationProps & BaseProps

export default function TelevisionStation({
	_type = "TelevisionStation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
