<template>
	<div class="text-input field-input">
		<input :type="type" :id="uid" :disabled="disabled" :autocomplete="autocomplete" @focus="focus = true" @blur="focus = false" v-model="inputValue" />
		<label :for="uid" v-if="showLabel" class="--placeholder">{{ label }}</label>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				uid: '_' + Math.random().toString(36).substr(2, 9),
				focus: false,
			};
		},

		props: {
			type: {
				type: String,
				default: 'text',
			},
			value: {
				type: String,
				default: '',
			},
			placeholder: {
				type: String,
				default: null,
			},
			autocomplete: {
				type: String,
				default: null,
			},
			disabled : {
				type: Boolean,
				default: false,
			},
		},

		computed: {
			label() {
				return this.value
					? this.value
					: this.placeholder;
			},
			showLabel() {
				return !(this.value || this.focus);
			},

			inputValue: {
				get() {
					return this.value;
				},
				set(value) {
					this.$emit('input', value);
				}
			}
		},
	}
</script>
