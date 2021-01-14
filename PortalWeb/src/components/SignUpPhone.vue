<template>
	<component v-bind:is="chooseComponent()" />
</template>

<script>
	import Entry from './SignUpPhoneEntry.vue';
	import Confirm from './SignUpPhoneConfirm.vue';

	export default {
		data() {
			return {
				verifiedPhoneNumber: null,
			};
		},

		methods: {
			chooseComponent() {
				if (!this.verifiedPhoneNumber) return Entry;
				return Confirm;
			}
		},
	}
</script>