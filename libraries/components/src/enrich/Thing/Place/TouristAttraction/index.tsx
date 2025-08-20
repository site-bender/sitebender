import type BaseProps from "../../../../types/index.ts"
import type { TouristAttraction as TouristAttractionProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = TouristAttractionProps & BaseProps

export default function TouristAttraction({
	_type = "TouristAttraction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
