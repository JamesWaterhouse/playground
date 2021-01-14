<template>
	<div v-bind:class="classes">
		<div class="__selected-dialling" @click="openDropdown">
			({{ selectedDiallingCode }})
		</div>
		<div class="__dropdown-arrow" @click="openDropdown">
			<svg v-if="open" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up" class="svg-inline--fa fa-angle-up fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg>
			<svg v-else aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
		</div>
		<input class="__number" autocomplete="tel-local" type="tel" placeholder="PHONE NUMBER" :value="phoneNumber" @input="$emit('update:phoneNumber', $event.target.value)" />

		<div class="__dropdown" v-show="open">
			<div class="__list">
				<div class="__country" v-for="(country, cc) in this.$root.countries" :key="cc" v-bind:data-cc="cc">
					<div class="__country-dialling">({{ country.diallingCode }})</div>
					<div class="__country-name">{{ country.countryName }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var assignedClickHandler = null;

	function clickHandler(e) {
		let country = e.target.closest('.__country');
		if (this.$el.contains(e.target) && (country != null)) {
			this.$emit('update:countryCode', country.getAttribute('data-cc'));
		}
		this.closeDropdown();
		e.stopPropagation();
	}

	export default {
		data() {
			return {
				open: false,
			};
		},

		props: [
			'countryCode',
			'phoneNumber',
		],

		computed: {
			classes() {
				return {
					'phone-number': true,
					'--open': this.open,
				};
			},
			selectedDiallingCode() {
				return this.$root.countries[this.countryCode].diallingCode;
			}
		},

		methods: {
			openDropdown() {
				if (assignedClickHandler == null) {
					assignedClickHandler = clickHandler.bind(this);
					document.addEventListener('click', assignedClickHandler, true);

					this.open = true;

					this.$nextTick(
						function () {
							var currentSelection = this.$el.querySelector('[data-cc="' + this.countryCode + '"]');
							currentSelection.scrollIntoView();
						}
					)
				}
			},

			closeDropdown() {
				if (assignedClickHandler) {
					this.open = false;
					document.removeEventListener('click', assignedClickHandler, true);
					assignedClickHandler = null;
				}
			}
		},
	}
</script>
