import type BaseProps from "../../../../types/index.ts"
import type { GuideProps } from "../../../../types/Thing/CreativeWork/Guide/index.ts"

import CreativeWork from "../index.tsx"

export type Props = GuideProps & BaseProps

export default function Guide({
	reviewAspect,
	_type = "Guide",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				reviewAspect,
				...subtypeProperties,
			}}
		/>
	)
}
