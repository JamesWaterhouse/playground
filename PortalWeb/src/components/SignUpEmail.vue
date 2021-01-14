<template>
	<div class="email-page">
		<div class="welcome">Sign up to WiFi</div>
		<div class="strapline">Let's get you connected</div>
		<div class="profile-form">
			<TextInput type="email" autocomplete="email" v-model="email" placeholder="EMAIL ADDRESS" />
		</div>
		<div class="checkboxes">
			<div class="offers">
				<input class="checkbox" v-model="mailingList" type="checkbox" />
				<div class="offers-text">
					Receive emails and offers from
					{{ this.$root.$data.venueName }}
				</div>
			</div>
			<div class="offers">
				<input
					class="checkbox"
					v-model="termsAccepted"
					type="checkbox"
				/>
				<div class="offers-text">
					I agree to the
					<u @click="showTerms">terms and privacy policy</u>
				</div>
			</div>
		</div>
		<button @click="submit" class="button">CONNECT</button>
		<div class="user-messages">
			<div v-if="showEmailError" class="user-message">
				Please enter a valid email address
			</div>
			<div v-if="showTermsError" class="user-message">
				Please accept the terms and privacy policy
			</div>
		</div>
		<div class="bottom-links">
			<p class="no-thanks">
				Changed your mind?
				<br />
				<u @click="switchBackToPhone">Connect with phone number</u>
			</p>
		</div>
	</div>
</template>

<script>
import TextInput from './TextInput.vue';

export default {
	
	data() {
		return {
			email: null,
			showEmailError: false,
			showTermsError: false,
			termsAccepted: false,
			mailingList: false,
		};
	},

	components: {
		TextInput,
	},
	methods: {
		switchBackToPhone() {
			this.$parent.$data.mode = 'phone';
			window.scrollTo(0, 0);
		},

		submit() {
			this.showEmailError = false;
			this.showTermsError = false;

			if (
				!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
					this.email
				)
			) {
				this.showEmailError = true;
				return false;
			} else if (!this.termsAccepted) {
				this.showTermsError = true;
				return false;
			}
			fetch("/portal/email-signup" + window.location.search, {
				method: "POST",
				credentials: "same-origin",
				body: JSON.stringify(
					this.email
				),
			}).then((response) => {
				
				switch (response.status) {
					case 200:
						window.location.href = "/portal/grant/email" + window.location.search;
						break;
					default:
						this.$root.$data.error = true;
				}
			});
		},

		showTerms() {
			this.$parent.showTerms = true;
			window.scrollTo(0, 0);
		},
	},
};
</script>
