<template>
	<div class="error-page">
		<p class="welcome">Something's gone wrong...</p>
		<p class="strapline">
			We are having some technical difficulties, click below to go back
		</p>
		<button class="button" @click="tryAgain">Go back</button>
	</div>
</template>

<script>
export default {
	methods: {
		tryAgain() {
			window.location = '/portal';
		},
	},
};
</script>
