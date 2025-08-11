import type BaseProps from "../../../../types/index.ts"
import type { Photograph as PhotographProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = PhotographProps & BaseProps

export default function Photograph({
	_type = "Photograph",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
