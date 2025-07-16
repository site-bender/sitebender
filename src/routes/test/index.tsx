import ForeignTerm from "~lib/components/Semantic/ForeignTerm/index.tsx"
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
				<h2>Schema.org Components Demo</h2>

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

			<section class="semantic-examples">
                <h2>Semantic Components Demo</h2>

                <ul>
                    <li>
                        <p>ForeignTerm (basic French term)</p>
                        <p>
                            I said <ForeignTerm term="bonjour" lang="fr" translation="hello" /> to my friend.
                        </p>
                    </li>
                    <li>
                        <p>ForeignTerm (German loanword)</p>
                        <p>
                            He felt <ForeignTerm term="schadenfreude" lang="de" translation="a feeling of pleasure derived from someone else's misfortune" /> watching his rival fail.
                        </p>
                    </li>
                    <li>
                        <p>ForeignTerm (technical term)</p>
                        <p>
                            The citation used <ForeignTerm term="ibid" lang="la" translation="in the same place (used in citations)" termType="technical" /> to reference the previous source.
                        </p>
                    </li>
                    <li>
                        <p>ForeignTerm (proper noun)</p>
                        <p>
                            We attended <ForeignTerm term="San Fermín" lang="es" translation="The Running of the Bulls festival" termType="properNoun" /> in Pamplona.
                        </p>
                    </li>
                    <li>
                        <p>ForeignTerm (idiomatic phrase)</p>
                        <p>
                            When it started raining, she just shrugged and said <ForeignTerm term="c'est la vie" lang="fr" translation="that's life; such is life" termType="phrase" />.
                        </p>
                    </li>
                    <li>
                        <p>ForeignTerm (with custom formatting)</p>
                        <p>
                            The Latin phrase <ForeignTerm term="carpe diem" lang="la" translation="seize the day" format="<strong>{{term}}</strong> ({{translation}})" /> is often quoted.
                        </p>
                    </li>
                    <li>
                        <p>ForeignTerm (with microdata)</p>
                        <p>
                            The art technique <ForeignTerm term="chiaroscuro" lang="it" translation="artistic technique using light and shadow" class="art-term" itemProp="technique" /> was mastered by Caravaggio.
                        </p>
                    </li>
                </ul>
            </section>
		</main>
	)
}
