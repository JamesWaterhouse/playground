<template>
	<div class="modal">
		<div class="modal__window">
			<div class="modal__title">
				<slot name="title" />
			</div>
			<div class="modal__body">
				<slot name="body" />
			</div>
			<div class="modal__buttons">
				<slot name="buttons" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		
	};
</script>
