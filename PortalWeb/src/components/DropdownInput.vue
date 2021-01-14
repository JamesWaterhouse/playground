<template>
	<div class="dropdown-input field-input">
		<select :id="uid" :autocomplete="autocomplete" v-model="inputValue" ref="select">
			<slot />
		</select>
		<label :for="uid" :class="{'--placeholder': !this.value}">{{ label }}</label>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				label: null,
				uid: '_' + Math.random().toString(36).substr(2, 9),
			};
		},

		props: {
			value: {
				type: String,
				default: null,
			},
			placeholder: {
				type: String,
				default: null,
			},
			autocomplete: {
				type: String,
				default: null,
			},
		},

		computed: {
			inputValue: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				}
			}
		},

		methods: {
			recalculateLabel() {
				if (this.$refs.select.selectedIndex < 0) {
					this.label = this.placeholder;
				} else {
					this.label = this.$refs.select.options[this.$refs.select.selectedIndex].text;
				}
			},
		},

		mounted() {
			this.recalculateLabel();
		},

		watch: {
			inputValue() {
				this.recalculateLabel();
			}
		},
	}
</script>
