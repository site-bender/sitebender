import type { Date, DateTime, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Organization from "../../Organization/index.ts"
import type Person from "../../Person/index.ts"
import type AdministrativeArea from "../../Place/AdministrativeArea/index.ts"
import type Place from "../../Place/index.ts"
import type Product from "../../Product/index.ts"
import type DefinedTerm from "../DefinedTerm/index.ts"
import type IncentiveQualifiedExpenseType from "../Enumeration/IncentiveQualifiedExpenseType/index.ts"
import type IncentiveStatus from "../Enumeration/IncentiveStatus/index.ts"
import type IncentiveType from "../Enumeration/IncentiveType/index.ts"
import type PurchaseType from "../Enumeration/PurchaseType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type LoanOrCredit from "../Service/FinancialProduct/LoanOrCredit/index.ts"
import type GeoShape from "../StructuredValue/GeoShape/index.ts"
import type MonetaryAmount from "../StructuredValue/MonetaryAmount/index.ts"
import type UnitPriceSpecification from "../StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"
import type QuantitativeValue from "../StructuredValue/QuantitativeValue/index.ts"

import DefinedTermComponent from "../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import IncentiveQualifiedExpenseTypeComponent from "../../../../components/Thing/Intangible/Enumeration/IncentiveQualifiedExpenseType/index.ts"
import IncentiveStatusComponent from "../../../../components/Thing/Intangible/Enumeration/IncentiveStatus/index.ts"
import IncentiveTypeComponent from "../../../../components/Thing/Intangible/Enumeration/IncentiveType/index.ts"
import PurchaseTypeComponent from "../../../../components/Thing/Intangible/Enumeration/PurchaseType/index.ts"
import LoanOrCreditComponent from "../../../../components/Thing/Intangible/Service/FinancialProduct/LoanOrCredit/index.ts"
import GeoShapeComponent from "../../../../components/Thing/Intangible/StructuredValue/GeoShape/index.ts"
import MonetaryAmountComponent from "../../../../components/Thing/Intangible/StructuredValue/MonetaryAmount/index.ts"
import UnitPriceSpecificationComponent from "../../../../components/Thing/Intangible/StructuredValue/PriceSpecification/UnitPriceSpecification/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import OrganizationComponent from "../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"
import AdministrativeAreaComponent from "../../../../components/Thing/Place/AdministrativeArea/index.ts"
import PlaceComponent from "../../../../components/Thing/Place/index.ts"
import ProductComponent from "../../../../components/Thing/Product/index.ts"

export interface FinancialIncentiveProps {
	areaServed?:
		| AdministrativeArea
		| GeoShape
		| Place
		| Text
		| ReturnType<typeof AdministrativeAreaComponent>
		| ReturnType<typeof GeoShapeComponent>
		| ReturnType<typeof PlaceComponent>
	eligibleWithSupplier?: Organization | ReturnType<typeof OrganizationComponent>
	incentiveAmount?:
		| LoanOrCredit
		| QuantitativeValue
		| UnitPriceSpecification
		| ReturnType<typeof LoanOrCreditComponent>
		| ReturnType<typeof QuantitativeValueComponent>
		| ReturnType<typeof UnitPriceSpecificationComponent>
	incentiveStatus?:
		| IncentiveStatus
		| ReturnType<typeof IncentiveStatusComponent>
	incentiveType?: IncentiveType | ReturnType<typeof IncentiveTypeComponent>
	incentivizedItem?:
		| DefinedTerm
		| Product
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof ProductComponent>
	incomeLimit?:
		| MonetaryAmount
		| Text
		| ReturnType<typeof MonetaryAmountComponent>
	provider?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	publisher?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	purchasePriceLimit?:
		| MonetaryAmount
		| ReturnType<typeof MonetaryAmountComponent>
	purchaseType?: PurchaseType | ReturnType<typeof PurchaseTypeComponent>
	qualifiedExpense?:
		| IncentiveQualifiedExpenseType
		| ReturnType<typeof IncentiveQualifiedExpenseTypeComponent>
	validFrom?: Date | DateTime
	validThrough?: Date | DateTime
}

type FinancialIncentive = Thing & IntangibleProps & FinancialIncentiveProps

export default FinancialIncentive
