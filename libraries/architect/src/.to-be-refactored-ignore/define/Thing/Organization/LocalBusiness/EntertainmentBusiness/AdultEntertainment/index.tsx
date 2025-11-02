import type BaseProps from "../../../../../../../types/index.ts"
import type { AdultEntertainment as AdultEntertainmentProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = AdultEntertainmentProps & BaseProps

export default function AdultEntertainment({
	_type = "AdultEntertainment",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
