import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = true;

new Vue({
	data: {
		...window.initializationData(),
		busy: null,
		submittedNumber: null,
		connected: false,
		showSending: false,
		showTerms: false,
		invalidNumber: false,
		error: (window.location.pathname == "/portal/error"),
		rejected: false,
		showConnectedEmail: (window.location.pathname == "/portal/connected/email"),
		showConnectedPhone: (window.location.pathname == "/portal/connected/phone"),
		showConnected: (window.location.pathname == "/portal/connected"),
		showThanks: (window.location.pathname == "/portal/thanks"),
		campaignLive: null,
		guestVoucher: null,
		accountPage: null,
	},

	computed: {
		isGuestProfileComplete() {
			if (this.emailState == "Missing") return false;
			if (this.emailState == "Expired") return false;
			if (this.genderState == "Missing") return false;
			if (this.dobState == "Missing") return false;
			return true;
		},

		isMailingListRequested() {
			return (this.mailingListState == 'Unknown' || this.mailingListState == 'Expired') && (this.guestEmail != null);
		},
	},

	render: h => h(App)
}).$mount("#app");
