import type BaseProps from "../../../../../types/index.ts"
import type { RadioSeason as RadioSeasonProps } from "../../../../../types/index.ts"

import CreativeWorkSeason from "../index.tsx"

export type Props = RadioSeasonProps & BaseProps

export default function RadioSeason({
	_type = "RadioSeason",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
