<template>
	<div class="date-input field-input">
		<input type="date" :autocomplete="autocomplete" :id="uid" @change="onChange" :value="inputValue" ref="input" />
		<label :for="uid" @click.capture="onClick" :class="{'--placeholder': (value == null)}">{{ label }}</label>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				uid: '_' + Math.random().toString(36).substr(2, 9),
			};
		},

		props: {
			value: {
				type: Date,
				default: null,
			},
			defaultDate: {
				type: Date,
				default: null,
			},
			placeholder: {
				type: String,
				default: null,
			},
			autocomplete: {
				type: String,
				detault: null,
			},
		},

		computed: {
			label() {
				return this.value
					? this.value.toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' })
					: this.placeholder;
			},

			inputValue: {
				get() {
					return this.value ? this.value.toISOString().substr(0, 10) : '';
				},
				set(value) {
					this.$emit('input', value ? new Date(value) : null);
				}
			}
		},

		methods: {
			onClick() {
				if (this.inputValue == '' && this.defaultDate) {
					this.inputValue = this.defaultDate.toISOString().substr(0, 10);
				}
			},

			onChange() {
				this.inputValue = this.$refs.input.value;
			},
		},
	}
</script>
