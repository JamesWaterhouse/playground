<template>
<div class="footer" ref="footer">
	<div class="footer-title" :style="{color: this.textColor}">
		<img class="wifiLogo" src="../../public/images/wifi-25.png">
		<sup> by </sup>
		<img class="bowimiLogo" src="../../public/images/bowimi.png">
	</div>
	<Carousel 
		:per-page="1" 
		:loop="true" 
		:autoplay="true"
		paginationPosition="bottom" 
		paginationColor="#C4C4C4" 
		:paginationActiveColor="this.paginationActiveColor" 
		:autoplayTimeout="5000" 
		ref="carousel" 
		@pageChange="test">
		<Slide>
			<div class="footer-content">Did you know that you can get free drinks texted to your phone in Bowimi venues</div>
		</Slide>
		
		<Slide v-if="$root.footerText">
			<div class="footer-content" > {{ $root.footerText }}</div>
		</Slide>
		<Slide v-if="this.$root.$data.campaignLive" ref="campaignSlide">
			<div class="footer__campaign-live" :style="{color: this.textColor}">
				Sign into our WiFi to receive a free drink now!
			</div>
		</Slide>
	</Carousel>
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {

	data() {
		return {
			backgroundColor: "black",
			paginationActiveColor: "#ffffff",
			textColor: "#ffffff"
		}
	},

	components: {
		Carousel,
		Slide,

	},
	
	watch: {

	},

	methods: {
		test(slide) {
			
			if (this.$refs.carousel.getSlide(slide) == this.$refs.campaignSlide) {
				//todo work out how to to set this to sass variable brand-color
				//text and logo colors would also need to change
				this.$refs.footer.classList.add('brandColor')
				this.paginationActiveColor = "#000000"
				this.textColor = "#000000"
			} else {
				this.$refs.footer.classList.remove('brandColor')
				this.paginationActiveColor = "#ffffff"
				this.textColor = "#ffffff"
			}
			
		}
	},
}
</script>
