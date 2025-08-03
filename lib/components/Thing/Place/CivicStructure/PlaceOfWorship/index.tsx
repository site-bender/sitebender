import type BaseProps from "../../../../../types/index.ts"
import type { PlaceOfWorship as PlaceOfWorshipProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = PlaceOfWorshipProps & BaseProps

export default function PlaceOfWorship({
	_type = "PlaceOfWorship",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
