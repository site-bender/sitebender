import type BaseProps from "../../../../../../types/index.ts"
import type { HowToDirection as HowToDirectionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

// HowToDirection adds no properties to the ListItem schema type
export type Props = HowToDirectionProps & BaseProps

export default function HowToDirection({
	_type = "HowToDirection",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
