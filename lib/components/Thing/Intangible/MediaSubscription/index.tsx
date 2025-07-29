import type BaseProps from "../../../../types/index.ts"
import type MediaSubscriptionProps from "../../../../types/Thing/Intangible/MediaSubscription/index.ts"

import Intangible from "../index.tsx"

export type Props = MediaSubscriptionProps & BaseProps

export default function MediaSubscription({
	authenticator,
	expectsAcceptanceOf,
	_type = "MediaSubscription",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				authenticator,
				expectsAcceptanceOf,
				...subtypeProperties,
			}}
		/>
	)
}
