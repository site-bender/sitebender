import type BaseProps from "../../../../../../types/index.ts"
import type { TVSeason as TVSeasonProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = TVSeasonProps & BaseProps

export default function TVSeason({
	_type = "TVSeason",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
