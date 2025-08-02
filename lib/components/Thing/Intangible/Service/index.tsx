import type BaseProps from "../../../../types/index.ts"
import type ServiceProps from "../../../../types/Thing/Intangible/Service/index.ts"

import Intangible from "../index.tsx"

export type Props = ServiceProps & BaseProps

export default function Service({
	aggregateRating,
	areaServed,
	audience,
	availableChannel,
	award,
	brand,
	broker,
	category,
	hasCertification,
	hasOfferCatalog,
	hoursAvailable,
	isRelatedTo,
	isSimilarTo,
	logo,
	offers,
	produces,
	provider,
	providerMobility,
	review,
	serviceArea,
	serviceAudience,
	serviceOutput,
	serviceType,
	slogan,
	termsOfService,
	_type = "Service",
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
				areaServed,
				audience,
				availableChannel,
				award,
				brand,
				broker,
				category,
				hasCertification,
				hasOfferCatalog,
				hoursAvailable,
				isRelatedTo,
				isSimilarTo,
				logo,
				offers,
				produces,
				provider,
				providerMobility,
				review,
				serviceArea,
				serviceAudience,
				serviceOutput,
				serviceType,
				slogan,
				termsOfService,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
