import type BaseProps from "../../../../../types/index.ts"
import type { HowToSection as HowToSectionProps } from "../../../../../types/index.ts"

import ListItem from "../index.tsx"

// HowToSection adds no properties to the ListItem schema type
export type Props = HowToSectionProps & BaseProps

export default function HowToSection({
	_type = "HowToSection",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
