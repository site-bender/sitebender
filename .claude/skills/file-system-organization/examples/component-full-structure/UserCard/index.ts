//++ Progressive enhancement: adds hover effect to user card
function enhanceUserCard(): void {
	const cards = document.querySelectorAll(".user-card")

	cards.forEach(function (card) {
		card.addEventListener("mouseenter", function () {
			card.classList.add("hovered")
		})

		card.addEventListener("mouseleave", function () {
			card.classList.remove("hovered")
		})
	})
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", enhanceUserCard)
} else {
	enhanceUserCard()
}
