import type BaseProps from "../../../../types/index.ts"
import type { CreativeWorkSeason as CreativeWorkSeasonProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = CreativeWorkSeasonProps & BaseProps

export default function CreativeWorkSeason({
	_type = "CreativeWorkSeason",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
