import type BaseProps from "../../../../../types/index.ts"
import type { CampingPitch as CampingPitchProps } from "../../../../../types/index.ts"

import Accommodation from "../index.tsx"

export type Props = CampingPitchProps & BaseProps

export default function CampingPitch({
	_type = "CampingPitch",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
