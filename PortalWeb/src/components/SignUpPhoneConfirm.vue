<template>
	<div class="signup-confirm-page">
		<div class="welcome">Verify your number</div>
		<div class="strapline">Bowimi will send a text to:</div>
		<div class="phone-confirm">{{ this.$parent.verifiedPhoneNumber }}</div>
		<div class="go-back">
			Not your number?
			<span
				style="text-decoration: underline; font-weight: bold; cursor: pointer;"
				@click="back"
			>
				Change
			</span>
		</div>
		<div class="text" v-if="$root.isCaptive">Follow the link in the text to complete your profile and stay connected to the WiFi.</div>
		<button class="button" @click="submit">CONFIRM & CONTINUE</button>
	</div>
</template>

<script>
export default {
	name: "sign-up",

	methods: {
		back() {
			this.$parent.verifiedPhoneNumber = null;
		},

		submit() {
			this.$root.busy = "Sending...";
			fetch(
				"/portal/signup" + window.location.search,
				{
					method: "POST",
					credentials: "same-origin",
					body: JSON.stringify(
						{
							CountryCode: this.$root.$data.countryCode,
							PhoneNumber: this.$parent.verifiedPhoneNumber,
						}
					),
				}
			).then(
				(response) => {
					switch (response.status) {
						case 200:
							setTimeout(
								function () {
									window.location.href = "/portal/grant/phone" + window.location.search;
								}.bind(this),
								3000
							);
							break;
						case 400:
							this.$parent.verifiedPhoneNumber = false;
							this.$root.busy = null;
							break;
						default:
							this.$parent.verifiedPhoneNumber = null;
							this.$root.busy = null;
							this.$root.error = true;
					}
				}
			);
		},
	},
};
</script>
