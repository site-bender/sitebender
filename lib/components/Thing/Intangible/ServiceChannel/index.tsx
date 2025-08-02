import type BaseProps from "../../../../types/index.ts"
import type ServiceChannelProps from "../../../../types/Thing/Intangible/ServiceChannel/index.ts"

import Intangible from "../index.tsx"

export type Props = ServiceChannelProps & BaseProps

export default function ServiceChannel({
	availableLanguage,
	processingTime,
	providesService,
	serviceLocation,
	servicePhone,
	servicePostalAddress,
	serviceSmsNumber,
	serviceUrl,
	_type = "ServiceChannel",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				availableLanguage,
				processingTime,
				providesService,
				serviceLocation,
				servicePhone,
				servicePostalAddress,
				serviceSmsNumber,
				serviceUrl,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
