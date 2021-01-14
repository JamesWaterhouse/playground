<template>
<div>
	<div class="welcome">Welcome back to {{this.$root.$data.venueName}}</div>
	<div class="text"> The last time we asked, you said you didn’t want to receive free drinks. </div>
	<div class="text">We just thought we’d check if that was still the case so that you’re not missing out on anything. </div>
	<div class="text"><b>Would you like to start receiving free drinks?</b></div>
	<div class="skipOrYes">
		<button @click="skip" class="button skip">SKIP</button>
		<button @click="yes" class="button yes">YES</button>
	</div>
</div>
</template>

<script>
export default {

	methods: {
		yes() {
			fetch("/portal/email-signup" + window.location.search, {
				method: "POST",
				credentials: "same-origin",
				body: JSON.stringify(
					false
				),
			}).then((response) => {
				
				switch (response.status) {
					case 200:
						window.location.href = "/portal/entry" + window.location.search;
						break;
					case 400:
						alert("It didn't work! 400");
						break;
					case 500:
						alert("It didn't work! 500");
						break;
					default:
						alert("It didn't work! Default");
				}
			});
		},

		skip() {
			fetch("/portal/email-signup" + window.location.search, {
				method: "POST",
				credentials: "same-origin",
				body: JSON.stringify(
					true
				),
			}).then((response) => {
				
				switch (response.status) {
					case 200:
						window.location.href = "/portal/grant/email" + window.location.search;
						break;
					case 400:
						alert("It didn't work! 400");
						break;
					case 500:
						alert("It didn't work! 500");
						break;
					default:
						alert("It didn't work! Default");
				}
			});
		}
	}
}
</script>

<style>

</style>