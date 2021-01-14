<template>
	<component v-bind:is="chooseComponent()" />
</template>

<script>
	import Phone from './SignUpPhone.vue';
	import Email from './SignUpEmail.vue';
	import Terms from './SignUpTerms.vue';

	export default {
		data() {
			return {
				mode: 'phone',
				showTerms: false,
			};
		},

		methods: {
			chooseComponent() {
				if (this.showTerms) return Terms;

				switch (this.mode) {
					case 'email': return Email;
					case 'phone': return Phone;
				}
			}
		},
	}
</script>