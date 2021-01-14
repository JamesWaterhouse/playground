<template>
	<div class="app">
		<div class="venue-hero"
			v-bind:style="{
				'background-image': 'url(' + this.$root.$data.background + ')',
			}"></div>
		<div class="venue-header">
			<img class="venue-logo" v-bind:src="this.$root.$data.logo" />
		</div>
		<div class="bowimi-panel">
			<div class="spinner-overlay" v-if="this.$root.busy">
				<div class="spinner-overlay-text">{{this.$root.busy}}</div>
				<img class="spinner" src="../public/images/spinner.png">
			</div>
			<div class="bowimi-panel-container">

				<div class="bowimi-content">
					<component v-bind:is="chooseComponent()" />
				</div>
			</div>
		</div>
		<Footer />
		
	</div>
</template>

<script>
	import SignUp from './components/SignUp.vue';
	import Connected from './components/Connected.vue';
	import Footer from './components/Footer.vue';
	import Logo from './components/Logo.vue';
	import ErrorPage from './components/Error.vue';
	import Profile from './components/Profile.vue';
	import MailingList from './components/MailingList.vue';
	import Account from './components/Account.vue';
	import EmailVerified from './components/EmailVerified.vue';

	export default {
		name: "App",
		components: {
			Footer,
			Logo,
		},

		methods: {

			chooseComponent() {
				if (this.$root.error) {
					// Error states are unexpected terminal routes
					return ErrorPage;
				} else if (/^\/portal\/connected/.test(window.location.pathname)) {
					// Connected states are terminal routes for in-captive experiences,
					// and we redirect here after connecting them to the WiFi
					return Connected;
				} else if (/^\/portal\/thanks/.test(window.location.pathname)) {
					return EmailVerified;
				} else if (this.$root.isGuest) {
					switch (this.$root.accountPage) {
						case 'home':
							return Account;
						default:
							// We know this person, but...
							if (!this.$root.isGuestProfileComplete) {
								// ...have they not completed their profile?
								return Profile;
							} else if (this.$root.isMailingListRequested) {
								// ...do they need to be prompted for a mailing list signup?
								return MailingList;
							} else {
								// ...do we need to grant them internet access?
								if (this.$root.isCaptive) {
									window.location = '/portal/grant' + window.location.search;
								} else {
									return Account;
								}
							}
					}
				} else {
					// We don't know this person, so we want to capture their phone number
					// in order to sign them up or verify their identity.
					return SignUp;
				}
			}

		},
		beforeCreate() {
			fetch(
				'/portal/get-campaigns' + window.location.search
			).then(
				(response) => {
					return response.json()
				}
			).then(
				(data) => {
					data.forEach(campaign => {
						if (campaign.Active) {
							this.$root.$data.campaignLive = true;
						}
					});
				}
			);
		},
	};
</script>
