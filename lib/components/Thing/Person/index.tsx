import type BaseProps from "../../../types/index.ts"
import type { Person as PersonProps } from "../../../types/index.ts"

import Thing from "../index.tsx"

export type Props = PersonProps & BaseProps

export default function Person({
	_type = "Person",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
