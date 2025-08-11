import type BaseProps from "../../../../../types/index.ts"
import type { PropertyValue as PropertyValueProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PropertyValueProps & BaseProps

export default function PropertyValue({
	_type = "PropertyValue",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
