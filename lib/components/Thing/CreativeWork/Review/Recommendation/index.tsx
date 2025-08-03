import type BaseProps from "../../../../../types/index.ts"
import type { Recommendation as RecommendationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = RecommendationProps & BaseProps

export default function Recommendation({
	_type = "Recommendation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
