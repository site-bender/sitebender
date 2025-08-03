import type BaseProps from "../../../../../types/index.ts"
import type { Volcano as VolcanoProps } from "../../../../../types/index.ts"

import Landform from "../index.tsx"

export type Props = VolcanoProps & BaseProps

export default function Volcano({
	_type = "Volcano",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
