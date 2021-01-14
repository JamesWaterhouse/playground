<template>
	<div class="welcome-back-page">
		<div class="welcome">Welcome to {{ this.$root.venueName }}</div>

		<div class="welcome-back-not-signed-up">

			<div class="text">
				Would you like to subscribe to our email mailing list and be among the first to hear about our news and offers?
			</div>
			<div class="profile-form">
				<TextInput type="email" autocomplete="email" v-model="email" placeholder="EMAIL ADDRESS" :disabled="true" />
			</div>
			<div class="skipOrYes">
				<button @click="submit(false)" class="button skip">SKIP</button>
				<button @click="submit(true)" class="button yes">YES</button>
			</div>
		</div>
	</div>
</template>

<script>
import TextInput from './TextInput.vue';
	export default {

		data() {
			return {
				email: this.$root.guestEmail,
			}
		},

		components: {
			TextInput,
		},

		methods: {
			submit(joinResponse) {
				this.$root.busy = 'Updating preferences...';

				fetch(
					'/portal/mailing-list' + window.location.search,
					{
						method: "PUT",
						credentials: "same-origin",
						body: JSON.stringify(
							{
								JoinMailingList: joinResponse,
							}
						),
					}
				).then(
					(response) => {
						this.$root.busy = null;
						switch (response.status) {
							case 200:
								this.$root.accountPage = 'home';
								break;
							default:
								this.$root.error = true;
						}
					}
				);
			}
		},

		mounted() {
			console.log(this.$root.guestEmail)
		}
	};
</script>

<style></style>
