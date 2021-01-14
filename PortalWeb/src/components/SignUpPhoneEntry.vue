<template>
	<div class="signup-page">
		<div class="welcome">Welcome to {{ this.$root.$data.venueName }}</div>
		<div class="strapline">
			WiFi that can text you free drinks! <br>
			First, let’s verify your phone number.
		</div>
		<PhoneNumber :countryCode.sync="countryCode" :phoneNumber.sync="phoneNumber" />
		<div class="terms-auto-clause">
			By clicking continue, you agree that you are over <br>18 and
			accept the <u @click="showTerms">Terms and Privacy Policy </u>
		</div>


		<button class="button" @click="submit">
			CONTINUE
		</button>
		<div class="user-messages">
			<div v-if="this.$parent.verifiedPhoneNumber == false" class="user-message">
				Please enter a valid phone number
			</div>
		</div>
		<div class="bottom-links">
			<p class="no-thanks">
				Don't want free drinks?
				<br />
				<u @click="showRejectPopup">
					Connect with email instead
				</u>
			</p>
		</div>

		<Modal v-if="showModal">
			<template v-slot:title>
				Don't want free drinks?
			</template>

			<template v-slot:body>
				By connecting with email you will no longer be able to claim free drinks
			</template>

			<template v-slot:buttons>
				<div @click="rejectCancel">
					Cancel
				</div>
				<div @click="rejectConfirm">
					Confirm
				</div>
			</template>
		</Modal>
	</div>
</template>

<script>
	import Modal from './Modal.vue';
	import PhoneNumber from './PhoneNumber.vue';

	export default {
		name: "sign-up",

		components: {
			Modal,
			PhoneNumber,
		},

		data() {
			return {
				countryCode: this.$root.$data.countryCode,
				phoneNumber: null,
				verifiedPhoneNumber: null,
				showPhoneError: false,
				showModal: false,
			};
		},
		methods: {
			submit() {
				if (isNaN(this.phoneNumber) || !this.phoneNumber) {
					this.showPhoneError = true;
					return false;
				}
				this.$root.busy = "Checking number...";
				fetch(
					'/portal/signup-validate' + window.location.search, {
					method: 'POST',
					credentials: 'same-origin',
					body: JSON.stringify({
						CountryCode: this.countryCode,
						PhoneNumber: this.phoneNumber,
					}),
				}
				).then(
					(response) => {
						this.$root.busy = null;
						switch (response.status) {
							case 200:
								return response.text();
							case 400:
								this.$parent.verifiedPhoneNumber = false;
								break;
							default:
								this.$root.error = true;
								break;
						}
					}
				).then(
					(data) => {
						if (data != null) {
							this.$parent.verifiedPhoneNumber = data;
						}
					});
			},

			showTerms() {
				this.$parent.$parent.showTerms = true;
				window.scrollTo(0, 0);
			},

			showRejectPopup() {
				this.showModal = true;
			},

			rejectCancel() {
				this.showModal = false;
			},

			rejectConfirm() {
				this.$parent.$parent.mode = 'email';
				window.scrollTo(0, 0);
			},
		},
	};
</script>
