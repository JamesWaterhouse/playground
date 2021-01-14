<template>
	<div class="account-page">

		<template v-if="!$root.campaignLive">
			<div class="welcome">All done!</div>
			<div class="strapline">Thankyou for signing up to Bowimi at {{ $root.venueName }}.</div>
			<div class="text">Unfortunately there are no free drinks available at the moment, but keep your eyes peeled for upcoming promotions!</div>
		</template>

		<template v-else-if="guestVoucher == false">
			<div class="welcome">
				Sorry, we're unable to find a drink for you
			</div>
			<div class="strapline">
				This could be because they have all been claimed.
			</div>
			<button @click="checkVouchers()" class="button">CHECK AGAIN</button>
		</template>

	</div>
</template>

<script>

export default {
	data() {
		return {
			guestVoucher: null
		}
	},

	methods: {
		checkVouchers() {
			this.$root.busy = 'Checking for free drinks...';
			
			fetch("/portal/get-vouchers" + window.location.search, {
				method: "GET",
				credentials: "same-origin",
			}).then((response) => {
				switch (response.status) {
					case 200:
						return response.json();
					default:
						this.$root.error = true;
				}
			}).then(data => {
				if (data.length == 0) {
					setTimeout(
						function() {
							this.$root.busy = null;
							this.$root.accountPage = 'home';
							this.guestVoucher = false;
						}.bind(this),
						1000
					);
					return;
				}
				// do the voucher thing
				window.location = data[0].voucherUrl;
			});
		}
	},

	mounted() {
		if(this.$root.campaignLive) {
			this.checkVouchers();
		}
	}
}

</script>
