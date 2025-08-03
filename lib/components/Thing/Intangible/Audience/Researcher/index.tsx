import type BaseProps from "../../../../../types/index.ts"
import type { Researcher as ResearcherProps } from "../../../../../types/index.ts"

import Audience from "../index.tsx"

export type Props = ResearcherProps & BaseProps

export default function Researcher({
	_type = "Researcher",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
