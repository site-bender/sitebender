import type BaseProps from "../../../../types/index.ts"
import type BrandProps from "../../../../types/Thing/Intangible/Brand/index.ts"

import Intangible from "../index.tsx"

export type Props = BrandProps & BaseProps

export default function Brand({
	aggregateRating,
	logo,
	review,
	slogan,
	_type = "Brand",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				aggregateRating,
				logo,
				review,
				slogan,
				...subtypeProperties,
			}}
		>{children}</Intangible>
	)
}
