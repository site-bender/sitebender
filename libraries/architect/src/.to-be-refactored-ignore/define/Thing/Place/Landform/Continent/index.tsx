import type BaseProps from "../../../../../../types/index.ts"
import type { Continent as ContinentProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ContinentProps & BaseProps

export default function Continent({
	_type = "Continent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
