import Abbreviation from "~lib/components/semantic/textual/abbreviations/Abbreviation/index.tsx"
import Acronym from "~lib/components/semantic/textual/abbreviations/Acronym/index.tsx"
import Initialism from "~lib/components/semantic/textual/abbreviations/Initialism/index.tsx"
import ForeignTerm from "~lib/components/semantic/textual/ForeignTerm/index.tsx"
import Jargon from "~lib/components/semantic/textual/Jargon/index.tsx"
import MentionedTerm from "~lib/components/semantic/textual/MentionedTerm/index.tsx"
import Neologism from "~lib/components/semantic/textual/Neologism/index.tsx"
import TransliteratedTerm from "~lib/components/semantic/textual/TransliteratedTerm/index.tsx"
import WordAsWord from "~lib/components/semantic/textual/WordAsWord/index.tsx"

export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Textual Components - Metadata Components</title>
			<meta
				name="description"
				content="Components for marking up different types of text content."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	return (
		<main>
			<h1>Textual Components</h1>

			<section>
				<h2>ForeignTerm Component</h2>
				<p>Marks foreign language terms within text.</p>

				<dl>
					<dt>French term in English text</dt>
					<dd>
						The French have a phrase,{" "}
						<ForeignTerm lang="fr">je ne sais quoi</ForeignTerm>, which means "I
						don't know what" but implies an indefinable quality.
					</dd>

					<dt>Latin phrase with translation</dt>
					<dd>
						The motto{" "}
						<ForeignTerm lang="la" translate="no">carpe diem</ForeignTerm>
						means "seize the day" in English.
					</dd>
				</dl>
			</section>

			<section>
				<h2>Jargon Component</h2>
				<p>Marks specialized terminology from specific fields.</p>

				<dl>
					<dt>Medical jargon</dt>
					<dd>
						The patient presented with{" "}
						<Jargon field="medical">tachycardia</Jargon> and
						<Jargon field="medical">dyspnea</Jargon> on exertion.
					</dd>

					<dt>Legal jargon with definition</dt>
					<dd>
						The{" "}
						<Jargon field="legal" title="A written statement confirmed by oath">
							affidavit
						</Jargon>{" "}
						was submitted to the court.
					</dd>
				</dl>
			</section>

			<section>
				<h2>MentionedTerm Component</h2>
				<p>Marks terms being defined or introduced.</p>

				<dl>
					<dt>Introducing a new concept</dt>
					<dd>
						<MentionedTerm>Quantum entanglement</MentionedTerm>{" "}
						is a phenomenon where particles become correlated in such a way that
						the quantum state of each particle cannot be described
						independently.
					</dd>

					<dt>Defining a term inline</dt>
					<dd>
						The term <MentionedTerm>algorithm</MentionedTerm>{" "}
						comes from the name of the Persian mathematician Al-Khwarizmi.
					</dd>
				</dl>
			</section>

			<section>
				<h2>Neologism Component</h2>
				<p>Marks newly coined words or phrases.</p>

				<dl>
					<dt>Internet neologism</dt>
					<dd>
						The act of <Neologism dateCoined="2020">doomscrolling</Neologism>
						{" "}
						became common during the pandemic.
					</dd>

					<dt>Tech neologism with origin</dt>
					<dd>
						<Neologism dateCoined="2008" origin="Satoshi Nakamoto">
							Bitcoin
						</Neologism>
						revolutionized digital currency.
					</dd>
				</dl>
			</section>

			<section>
				<h2>TransliteratedTerm Component</h2>
				<p>Shows text converted from one writing system to another.</p>

				<dl>
					<dt>Russian name transliteration</dt>
					<dd>
						The composer{" "}
						<TransliteratedTerm
							fromLang="ru"
							originalScript="Пётр Ильич Чайковский"
						>
							Pyotr Ilyich Tchaikovsky
						</TransliteratedTerm>{" "}
						wrote Swan Lake.
					</dd>

					<dt>Japanese transliteration</dt>
					<dd>
						The word{" "}
						<TransliteratedTerm
							fromLang="ja"
							originalScript="さようなら"
							system="romaji"
						>
							sayonara
						</TransliteratedTerm>{" "}
						means goodbye.
					</dd>
				</dl>
			</section>

			<section>
				<h2>WordAsWord Component</h2>
				<p>Marks words being discussed as linguistic objects.</p>

				<dl>
					<dt>Grammar example</dt>
					<dd>
						The word <WordAsWord>run</WordAsWord> can be a noun or a verb.
					</dd>

					<dt>Spelling discussion</dt>
					<dd>
						Is it spelled <WordAsWord>grey</WordAsWord> or{" "}
						<WordAsWord>gray</WordAsWord>? Both are correct!
					</dd>
				</dl>
			</section>

			<section>
				<h2>Abbreviation Components</h2>
				<p>Various types of shortened forms.</p>

				<dl>
					<dt>Standard abbreviation</dt>
					<dd>
						<Abbreviation expansion="Doctor">Dr.</Abbreviation>{" "}
						Smith will see you now.
					</dd>

					<dt>Acronym (pronounced as word)</dt>
					<dd>
						<Acronym expansion="National Aeronautics and Space Administration">
							NASA
						</Acronym>
						launched another satellite.
					</dd>

					<dt>Initialism (spelled out)</dt>
					<dd>
						The{" "}
						<Initialism expansion="Federal Bureau of Investigation">
							FBI
						</Initialism>
						is investigating the case.
					</dd>

					<dt>Complex abbreviation</dt>
					<dd>
						Please{" "}
						<Abbreviation expansion="répondez s'il vous plaît" lang="fr">
							RSVP
						</Abbreviation>{" "}
						by Friday.
					</dd>
				</dl>
			</section>

			<style>
				{`
				dl {
					margin: 1.5rem 0;
				}
				
				dt {
					font-weight: bold;
					margin-top: 1rem;
					margin-bottom: 0.5rem;
					color: #333;
				}
				
				dd {
					margin-left: 2rem;
					margin-bottom: 1rem;
					padding: 1rem;
					background-color: #f5f5f5;
					border-radius: 4px;
					border-left: 3px solid #ddd;
				}
				
				i[lang] {
					font-style: italic;
					color: #0066cc;
				}
				
				dfn {
					font-style: italic;
					font-weight: 600;
					color: #333;
				}
				
				abbr {
					text-decoration: none;
					border-bottom: 1px dotted #666;
					cursor: help;
				}
			`}
			</style>
		</main>
	)
}
