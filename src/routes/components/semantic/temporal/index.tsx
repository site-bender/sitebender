import DateComponent from "~lib/components/semantic/temporal/Date/index.tsx"
import DateTime from "~lib/components/semantic/temporal/DateTime/index.tsx"
import Duration from "~lib/components/semantic/temporal/Duration/index.tsx"
import MonthDay from "~lib/components/semantic/temporal/MonthDay/index.tsx"
import Quarter from "~lib/components/semantic/temporal/Quarter/index.tsx"
import RelativeTime from "~lib/components/semantic/temporal/RelativeTime/index.tsx"
import Time from "~lib/components/semantic/temporal/Time/index.tsx"
import TimeZone from "~lib/components/semantic/temporal/TimeZone/index.tsx"
import Week from "~lib/components/semantic/temporal/Week/index.tsx"
import YearMonth from "~lib/components/semantic/temporal/YearMonth/index.tsx"

export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Temporal Components - Metadata Components</title>
			<meta
				name="description"
				content="Components for dates, times, durations, and other temporal concepts."
			/>
		</>
	)
}

export default function ({ route }: Props = {}) {
	const now = new Date()
	const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
	const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

	return (
		<main>
			<h1>Temporal Components</h1>

			<section>
				<h2>Date Component</h2>
				<p>
					Displays calendar dates with internationalization and calendar system
					support.
				</p>

				<dl>
					<dt>Simple date</dt>
					<dd>
						<DateComponent value="2024-01-15" />
					</dd>

					<dt>Date with locale (French)</dt>
					<dd>
						<DateComponent value="2024-01-15" locale="fr-FR" />
					</dd>

					<dt>Date with Hebrew calendar</dt>
					<dd>
						<DateComponent
							value="2024-01-15"
							calendar="hebrew"
							locale="he-IL"
						/>
					</dd>

					<dt>Relative date</dt>
					<dd>
						<DateComponent
							value={yesterday}
							format="relative"
							relativeTo={now}
						/>
					</dd>
				</dl>
			</section>

			<section>
				<h2>Time Component</h2>
				<p>Displays times of day with timezone and format options.</p>

				<dl>
					<dt>Simple time</dt>
					<dd>
						<Time value="14:30:00" />
					</dd>

					<dt>12-hour format (US)</dt>
					<dd>
						<Time value="14:30:00" locale="en-US" />
					</dd>

					<dt>Time with timezone</dt>
					<dd>
						<Time value="14:30:00" timezone="Europe/Paris" showZone />
					</dd>

					<dt>Time with seconds</dt>
					<dd>
						<Time value="14:30:45" showSeconds />
					</dd>
				</dl>
			</section>

			<section>
				<h2>DateTime Component</h2>
				<p>Combined date and time display with full timezone support.</p>

				<dl>
					<dt>Local datetime</dt>
					<dd>
						<DateTime value="2024-01-15T14:30:00" />
					</dd>

					<dt>DateTime with timezone</dt>
					<dd>
						<DateTime
							value="2024-01-15T14:30:00"
							timezone="America/New_York"
							locale="en-US"
							showZone
						/>
					</dd>

					<dt>UTC timestamp</dt>
					<dd>
						<DateTime value="2024-01-15T19:30:00Z" showZone />
					</dd>

					<dt>Japanese calendar datetime</dt>
					<dd>
						<DateTime
							value="2024-01-15T14:30:00"
							timezone="Asia/Tokyo"
							calendar="japanese"
							locale="ja-JP"
						/>
					</dd>
				</dl>
			</section>

			<section>
				<h2>Duration Component</h2>
				<p>Displays time durations in various formats.</p>

				<dl>
					<dt>ISO 8601 duration</dt>
					<dd>
						<Duration value="PT2H30M" />
					</dd>

					<dt>Duration in French</dt>
					<dd>
						<Duration value={{ hours: 2, minutes: 30 }} locale="fr-FR" />
					</dd>

					<dt>Narrow format</dt>
					<dd>
						<Duration value="P1DT12H30M" format="narrow" />
					</dd>

					<dt>Digital format</dt>
					<dd>
						<Duration
							value={{ hours: 2, minutes: 30, seconds: 45 }}
							format="digital"
						/>
					</dd>
				</dl>
			</section>

			<section>
				<h2>RelativeTime Component</h2>
				<p>Shows time relative to another point in time.</p>

				<dl>
					<dt>Past relative time</dt>
					<dd>
						<RelativeTime value={yesterday} />
					</dd>

					<dt>Future relative time</dt>
					<dd>
						<RelativeTime value={nextWeek} />
					</dd>

					<dt>Auto numeric (yesterday/today/tomorrow)</dt>
					<dd>
						<RelativeTime value={yesterday} numeric="auto" />
					</dd>

					<dt>Spanish relative time</dt>
					<dd>
						<RelativeTime value={yesterday} locale="es-ES" />
					</dd>
				</dl>
			</section>

			<section>
				<h2>TimeZone Component</h2>
				<p>Displays timezone information with abbreviations and offsets.</p>

				<dl>
					<dt>Simple timezone</dt>
					<dd>
						<TimeZone value="America/New_York" />
					</dd>

					<dt>Timezone with full name</dt>
					<dd>
						<TimeZone value="Europe/London" format="long" />
					</dd>

					<dt>Timezone with offset</dt>
					<dd>
						<TimeZone value="Asia/Tokyo" showOffset />
					</dd>

					<dt>Timezone with current time</dt>
					<dd>
						<TimeZone value="Australia/Sydney" showOffset showTime />
					</dd>
				</dl>
			</section>

			<section>
				<h2>YearMonth Component</h2>
				<p>Displays year-month combinations for credit cards, reports, etc.</p>

				<dl>
					<dt>Simple year-month</dt>
					<dd>
						<YearMonth value="2024-01" />
					</dd>

					<dt>Credit card expiration format</dt>
					<dd>
						Expires: <YearMonth value="2025-12" format="short" />
					</dd>

					<dt>Numeric format</dt>
					<dd>
						<YearMonth value="2024-01" format="numeric" />
					</dd>

					<dt>French year-month</dt>
					<dd>
						<YearMonth value="2024-01" locale="fr-FR" />
					</dd>
				</dl>
			</section>

			<section>
				<h2>MonthDay Component</h2>
				<p>Displays recurring dates like birthdays and holidays.</p>

				<dl>
					<dt>Birthday (no year)</dt>
					<dd>
						Birthday: <MonthDay value="--07-15" />
					</dd>

					<dt>Christmas in Spanish</dt>
					<dd>
						<MonthDay value="--12-25" locale="es-ES" />
					</dd>

					<dt>Valentine's Day (short)</dt>
					<dd>
						<MonthDay value="--02-14" format="short" />
					</dd>

					<dt>New Year (numeric)</dt>
					<dd>
						<MonthDay value="--01-01" format="numeric" />
					</dd>
				</dl>
			</section>

			<section>
				<h2>Week Component</h2>
				<p>Represents calendar weeks with various numbering systems.</p>

				<dl>
					<dt>ISO week</dt>
					<dd>
						<Week value="2024-W03" />
					</dd>

					<dt>Week from date</dt>
					<dd>
						<Week value="2024-01-15" />
					</dd>

					<dt>Week with date range</dt>
					<dd>
						<Week value="2024-W03" showRange />
					</dd>

					<dt>US week system</dt>
					<dd>
						<Week value="2024-01-15" weekSystem="US" />
					</dd>
				</dl>
			</section>

			<section>
				<h2>Quarter Component</h2>
				<p>Displays calendar or fiscal quarters.</p>

				<dl>
					<dt>Calendar quarter</dt>
					<dd>
						<Quarter value="2024-Q1" />
					</dd>

					<dt>Quarter from date</dt>
					<dd>
						<Quarter value="2024-04-15" />
					</dd>

					<dt>Quarter with date range</dt>
					<dd>
						<Quarter value="2024-Q3" showRange />
					</dd>

					<dt>Fiscal quarter (April start)</dt>
					<dd>
						<Quarter value="2024-04-15" fiscalYearStart={4} />
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
				
				time {
					font-family: monospace;
					font-size: 1.1em;
				}
			`}
			</style>
		</main>
	)
}
