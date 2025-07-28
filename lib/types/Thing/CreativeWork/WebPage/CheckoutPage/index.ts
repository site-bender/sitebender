import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

import CheckoutPageComponent from "../../../../../../components/Thing/CreativeWork/WebPage/CheckoutPage/index.tsx"

export interface CheckoutPageProps {
}

type CheckoutPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& CheckoutPageProps

export default CheckoutPage
