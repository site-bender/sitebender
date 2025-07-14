import Thing from "~lib/components/Thing/index.tsx"
import Organization from "~lib/components/Thing/Organization/index.tsx"
import Electrician from "~lib/components/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/Electrician/index.tsx"
import HomeAndConstructionBusiness from "~lib/components/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/index.tsx"
import LocalBusiness from "~lib/components/Thing/Organization/LocalBusiness/index.tsx"

import { Fragment } from "~utilities/createElement/index.ts"

export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Test - Metadata Components</title>
			<meta
				name="description"
				content="Test page for demonstrating the metadata components library with live examples."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<main>
			<header class="form-header">
				<h1>Test the Metadata Components!</h1>
			</header>

			<section class="metadata-examples">
				<h2>Metadata Components Demo</h2>

				<ul>
					<li>
						<p>Thing</p>
						<p>
							<Thing
								alternativeName="Thingamajigger"
								description="A thingamajigger is a device that does something."
							/>
						</p>
					</li>
					<li>
						<p>Organization</p>
						<p>
							<Organization
								alternativeName="Organismo"
								brand="Organismatron"
								description="An Organismo is a device that does nothing."
								email="organismo@organismo.com"
								foundingDate="2025-01-01"
								foundingLocation="Organismopolis"
								founder="Organismotron"
								numberOfEmployees={100}
								industry="Organismology"
							/>
						</p>
					</li>
					<li>
						<p>LocalBusiness</p>
						<p>
							<LocalBusiness
								alternativeName="Organismo"
								brand="Organismatron"
								currenciesAccepted={["USD", "EUR"]}
								openingHours="Mo-Fr 09:00-17:00"
								paymentAccepted={["Cash", "Credit Card"]}
								priceRange="$$"
								review="An Organismo is a device that does nothing."
								reviews={["An Organismo is a device that does nothing."]}
								description="An Organismo is a device that does nothing."
								email="organismo@organismo.com"
								foundingDate="2025-01-01"
								foundingLocation="Organismopolis"
								founder="Organismotron"
								numberOfEmployees={100}
								industry="Organismology"
							/>
						</p>
					</li>
					<li>
						<p>HomeAndConstructionBusiness</p>
						<p>
							<HomeAndConstructionBusiness />
						</p>
					</li>
					<li>
						<p>Electrician</p>
						<p>
							<Electrician format="This is the format string!" />
						</p>
					</li>
				</ul>
			</section>
		</main>
	)
}
