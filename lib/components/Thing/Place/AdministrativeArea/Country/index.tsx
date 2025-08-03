import type BaseProps from "../../../../../types/index.ts"
import type { Country as CountryProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CountryProps & BaseProps

export default function Country({
	_type = "Country",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
