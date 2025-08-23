import ssrRenderAdaptive from "~lib/adaptive/rendering/ssrRenderAdaptive/index.tsx"
/**
 * Extended Adaptive Components Demo Page
 *
 * Demonstrates the new Phase 2 adaptive components including
 * advanced operators, comparators, and injectors.
 */

import {
	AbsoluteValue,
	Average,
	// Wrappers
	Base,
	Ceiling,
	Constant,
	Date,
	Exponent,
	Floor,
	FromElement,
	// New Injectors
	FromQueryString,
	FromSessionStorage,
	IsAfterDate,
	IsLongerThan,
	// New Comparators
	IsNoLessThan,
	Max,
	Min,
	Minuend,
	Modulo,
	Negate,
	// New Operators
	Power,
	Round,
	// Existing
	Subtract,
	Subtrahend,
	Threshold,
	Value,
} from "~lib/components/adaptive/index.ts"

export type Props = {
	route?: string
	assets?: Array<string>
}

export function Head() {
	return (
		<>
			<title>Extended Adaptive Components - Phase 2 Demo</title>
			<meta
				name="description"
				content="Working demonstrations of Phase 2 adaptive components."
			/>
		</>
	)
}

export default function ExtendedAdaptiveDemo({ route }: Props = {}) {
	// Example 1: Power calculation
	const powerConfig = (
		<Power>
			<Base>
				<FromElement id="base-number" type="Number" />
			</Base>
			<Exponent>
				<Constant value={2} />
			</Exponent>
		</Power>
	)

	// Example 2: Average of scores
	const averageConfig = (
		<Average type="Number">
			<FromElement id="score1" type="Number" />
			<FromElement id="score2" type="Number" />
			<FromElement id="score3" type="Number" />
		</Average>
	)

	// Example 3: Price rounding operations
	const roundConfig = (
		<Round>
			<FromElement id="raw-price" type="Number" />
		</Round>
	)
	const floorConfig = (
		<Floor>
			<FromElement id="raw-price" type="Number" />
		</Floor>
	)
	const ceilingConfig = (<Ceiling>
		<FromElement id="raw-price" type="Number" />
	</Ceiling>)

	// Example 4: Age validation
	const ageValidation = (
		<IsNoLessThan>
			<Value>
				<FromElement id="user-age" type="Number" />
			</Value>
			<Threshold>
				<Constant value={18} />
			</Threshold>
		</IsNoLessThan>
	)

	// Example 5: Mathematical aliases demo
	const discountCalc = (
		<Subtract>
			<Minuend>
				<FromElement id="original-price" type="Number" />
			</Minuend>
			<Subtrahend>
				<FromElement id="discount-amount" type="Number" />
			</Subtrahend>
		</Subtract>
	)

	// Example 6: Date comparison
	const dateCheck = (
		<IsAfterDate>
			<Value>
				<FromElement id="event-date" type="Date" />
			</Value>
			<Date>
				<Constant value="2024-12-25" />
			</Date>
		</IsAfterDate>
	)

	return (
		<main>
			<h1>Extended Adaptive Components - Working Examples</h1>
			<p class="lead">
				These are actual working examples of Phase 2 components. The
				configurations shown are the actual objects created by the JSX
				components.
			</p>

			<section class="example">
				<h2>1. Power Operation</h2>
				<p>Calculate a number raised to the power of 2 (squaring).</p>

				<div class="demo-box">
					<label>
						Base Number: <input id="base-number" type="number" value="5" />
					</label>

					<div class="result">
						Result: {ssrRenderAdaptive(powerConfig)}
					</div>
				</div>

				<details>
					<summary>Configuration Object</summary>
					<pre><code>{JSON.stringify(powerConfig, null, 2)}</code></pre>
				</details>
			</section>

			<section class="example">
				<h2>2. Average Calculator</h2>
				<p>Calculate the average of three test scores.</p>

				<div class="demo-box">
					<label>
						Score 1: <input id="score1" type="number" value="85" />
					</label>
					<label>
						Score 2: <input id="score2" type="number" value="92" />
					</label>
					<label>
						Score 3: <input id="score3" type="number" value="78" />
					</label>

					<div class="result">
						Average: {ssrRenderAdaptive(averageConfig)}
					</div>
				</div>

				<details>
					<summary>Configuration Object</summary>
					<pre><code>{JSON.stringify(averageConfig, null, 2)}</code></pre>
				</details>
			</section>

			<section class="example">
				<h2>3. Price Rounding Operations</h2>
				<p>Different rounding methods for a price value.</p>

				<div class="demo-box">
					<label>
						Raw Price:{" "}
						<input id="raw-price" type="number" value="19.95" step="0.01" />
					</label>

					<div class="result">
						<div>Rounded: {ssrRenderAdaptive(roundConfig)}</div>
						<div>Floor: {ssrRenderAdaptive(floorConfig)}</div>
						<div>Ceiling: {ssrRenderAdaptive(ceilingConfig)}</div>
					</div>
				</div>

				<details>
					<summary>Round Configuration</summary>
					<pre><code>{JSON.stringify(roundConfig, null, 2)}</code></pre>
				</details>
			</section>

			<section class="example">
				<h2>4. Age Verification</h2>
				<p>Check if user is at least 18 years old.</p>

				<div class="demo-box">
					<label>
						Age:{" "}
						<input id="user-age" type="number" value="21" min="1" max="120" />
					</label>

					<div class="result">
						Is 18 or older: {ssrRenderAdaptive(ageValidation)}
					</div>
				</div>

				<details>
					<summary>Configuration Object</summary>
					<pre><code>{JSON.stringify(ageValidation, null, 2)}</code></pre>
				</details>
			</section>

			<section class="example">
				<h2>5. Discount Calculator with Mathematical Aliases</h2>
				<p>Using Minuend and Subtrahend for mathematical precision.</p>

				<div class="demo-box">
					<label>
						Original Price:{" "}
						<input id="original-price" type="number" value="100" />
					</label>
					<label>
						Discount Amount:{" "}
						<input id="discount-amount" type="number" value="15" />
					</label>

					<div class="result">
						Final Price: ${ssrRenderAdaptive(discountCalc)}
					</div>
				</div>

				<details>
					<summary>Configuration Object</summary>
					<pre><code>{JSON.stringify(discountCalc, null, 2)}</code></pre>
				</details>
			</section>

			<section class="example">
				<h2>6. Date Comparison</h2>
				<p>Check if an event date is after Christmas 2024.</p>

				<div class="demo-box">
					<label>
						Event Date: <input id="event-date" type="date" value="2025-01-15" />
					</label>

					<div class="result">
						Is after Dec 25, 2024: {ssrRenderAdaptive(dateCheck)}
					</div>
				</div>

				<details>
					<summary>Configuration Object</summary>
					<pre><code>{JSON.stringify(dateCheck, null, 2)}</code></pre>
				</details>
			</section>

			<section class="info">
				<h2>How It Works</h2>
				<p>
					Each example above shows:
				</p>
				<ol>
					<li>
						<strong>Input fields</strong>{" "}
						- The HTML form elements that provide data
					</li>
					<li>
						<strong>JSX configuration</strong>{" "}
						- The adaptive components create configuration objects
					</li>
					<li>
						<strong>SSR placeholder</strong>{" "}
						- The server-side rendered placeholder (like [sum] or [validation])
					</li>
					<li>
						<strong>Configuration object</strong>{" "}
						- The actual JSON structure created by the components
					</li>
				</ol>
				<p>
					When JavaScript is available on the client, these configurations will
					be hydrated to provide live reactive updates as you change the input
					values. Without JavaScript, the forms still work with standard HTML
					form submission.
				</p>
			</section>

			<section class="info">
				<h2>Phase 2 Components Created</h2>
				<p>In this phase, we created:</p>
				<ul>
					<li>
						<strong>10 Operators:</strong>{" "}
						Power, Round, Average, Max, Min, AbsoluteValue, Floor, Ceiling,
						Modulo, Negate
					</li>
					<li>
						<strong>10 Comparators:</strong>{" "}
						IsNoLessThan, IsNoMoreThan, IsLength, IsLongerThan, IsShorterThan,
						IsAfterDate, IsBeforeDate, IsUnequalTo, DoesNotMatch, IsBoolean
					</li>
					<li>
						<strong>7 Injectors:</strong>{" "}
						FromApi, FromQueryString, FromSessionStorage, FromUrlParameter,
						FromArgument, FromLookup, FromLookupTable
					</li>
					<li>
						<strong>8 Wrappers:</strong>{" "}
						Base, Exponent, Date, Time, Minuend, Subtrahend, Dividend, Divisor
					</li>
				</ul>
			</section>
		</main>
	)
}
