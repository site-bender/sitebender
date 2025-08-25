import type BaseProps from "../../../../types/index.ts"
import type { Place as PlaceProps } from "../../../../types/index.ts"

import Base from "../../Base/index.tsx"

export type Props = PlaceProps & BaseProps

export default function Place({
	_type = "Place",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
