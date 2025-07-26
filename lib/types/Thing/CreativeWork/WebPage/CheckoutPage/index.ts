import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { WebPageProps } from "../index.ts"

export interface CheckoutPageProps {
}

type CheckoutPage =
	& Thing
	& CreativeWorkProps
	& WebPageProps
	& CheckoutPageProps

export default CheckoutPage
