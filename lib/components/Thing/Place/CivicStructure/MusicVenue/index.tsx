import type BaseProps from "../../../../../types/index.ts"
import type { MusicVenue as MusicVenueProps } from "../../../../../types/index.ts"

import CivicStructure from "../index.tsx"

export type Props = MusicVenueProps & BaseProps

export default function MusicVenue({
	_type = "MusicVenue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
