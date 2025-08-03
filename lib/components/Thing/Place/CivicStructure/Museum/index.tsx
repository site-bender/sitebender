import type BaseProps from "../../../../../types/index.ts"
import type { Museum as MuseumProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = MuseumProps & BaseProps

export default function Museum({
	_type = "Museum",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
