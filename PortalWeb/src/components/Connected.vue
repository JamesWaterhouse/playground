<template>
	<div class="thanks-page">
		<template v-if="connectionType.includes('phone')">
			<img class="sms" src="../../public/images/text.png" />
			<div class="welcome" style="margin-top: 5px;">Check your texts!</div>

			<template v-if="$root.isCaptive">
				<div class="brackets">(but only once we've finished connecting you to the WiFi)</div>
				<div class="strapline">We have texted you a link to complete your profile and stay on the WiFi.</div>
				<div class="strapline">Once completed, you'll only need your phone number to connect at other Bowimi venues.</div>
			</template>
			<template v-else>
			</template>

			<div class="bottom-links">
				Didn't receive a text? <br />Head to
				<a href="http://www.bowimi.com">bowimi.com</a> and check in to the
				venue to claim your free drink.
			</div>
		</template>
		<template v-else>
			<img class="tick" src="../../public/images/tick.png" />
			<div class="welcome" v-if="$root.isReturning">Welcome back!</div>
			<div class="welcome" v-else>All done!</div>

			<template v-if="$root.isCaptive">
				<div class="text" v-if="$root.isReturning">Welcome back to {{ $root.venueName }}. You can now enjoy unlimited free WiFi.</div>
				<div class="text" v-else>Thank you for signing up to Bowimi WiFi at {{ $root.venueName }}. You can now enjoy unlimited free WiFi.</div>
			</template>
			<template v-else>
			</template>
		</template>

		<template v-if="!$root.isCaptive">
			<div class="text">If you put in the wrong details, you can go back and change them.</div>
			<button class="button" @click="goBack">Go back</button>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				connectionType: window.location.pathname.match(/^\/portal\/connected(.*)/)[1].split("/"),
			}
		},

		methods: {
			goBack() {
				window.location = '/portal' + window.location.search;
			}
		},

		mounted() {
			if(this.connectionType.includes('remote'))
			{
				setTimeout(
					function () { 
						location.reload(true);
					},
				10000
				);
			}
		}
	}
</script>
