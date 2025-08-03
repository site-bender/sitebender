import type BaseProps from "../../../../types/index.ts"
import type { PropertyValueSpecification as PropertyValueSpecificationProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = PropertyValueSpecificationProps & BaseProps

export default function PropertyValueSpecification({
	_type = "PropertyValueSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
