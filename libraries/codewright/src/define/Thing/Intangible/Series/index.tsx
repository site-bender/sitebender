import type BaseProps from "../../../../../types/index.ts"
import type { Series as SeriesProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = SeriesProps & BaseProps

export default function Series({
	_type = "Series",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
