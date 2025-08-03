import type BaseProps from "../../../../../types/index.ts"
import type { MediaManipulationRatingEnumeration as MediaManipulationRatingEnumerationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = MediaManipulationRatingEnumerationProps & BaseProps

export default function MediaManipulationRatingEnumeration({
	_type = "MediaManipulationRatingEnumeration",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
