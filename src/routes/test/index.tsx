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
						<p>Thing (no format - debug view)</p>
						<p>
							<Thing
								alternativeName="Thingamajigger"
								description="A thingamajigger is a device that does something."
							/>
						</p>
					</li>
					<li>
						<p>Organization (nameOnly format)</p>
						<p>
							<Organization
								name="Acme Corporation"
								alternativeName="Organismo"
								brand="Organismatron"
								description="An Organismo is a device that does nothing."
								email="organismo@organismo.com"
								foundingDate="2025-01-01"
								foundingLocation="Organismopolis"
								founder="Organismotron"
								numberOfEmployees={100}
								industry="Organismology"
								format="nameOnly"
							/>
						</p>
					</li>
					<li>
						<p>Organization (organizationInfo format)</p>
						<p>
							<Organization
								name="Acme Corporation"
								foundingDate="1985-03-15"
								format="organizationInfo"
							/>
						</p>
					</li>
					<li>
						<p>LocalBusiness (businessContact format)</p>
						<p>
							<LocalBusiness
								name="Joe's Diner"
								email="contact@joesdiner.com"
								format="businessContact"
							/>
						</p>
					</li>
					<li>
						<p>Electrician (custom format)</p>
						<p>
							<Electrician
								name="Smith Electric"
								foundingDate="2010-06-01"
								format="{{cite(name)}} - Professional electricians since {{year(foundingDate)}}"
							/>
						</p>
					</li>
					<li>
						<p>Electrician (with escaped braces)</p>
						<p>
							<Electrician
								name="Lightning Electric"
								format="Call \{{{{cite(name)}} today!"
							/>
						</p>
					</li>
				</ul>
			</section>
		</main>
	)
}
