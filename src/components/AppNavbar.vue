<template>
	<v-app-bar app color="primary" dark>
		<div class="d-flex align-center">
			<h3 class="mr-8">Shopping list app</h3>
			<router-link :to="{ name: 'Categories' }" class="white--text mr-4">
				Categories
			</router-link>
			<router-link :to="{ name: 'Products' }" class="white--text mr-4">
				Products
			</router-link>
			<router-link :to="{ name: 'Lists' }" class="white--text mr-4">
				Shopping lists
			</router-link>
		</div>
		<v-spacer></v-spacer>
	</v-app-bar>
</template>

<script>
export default {
	name: 'AppNavbar'
}
</script>

<style scoped lang="scss">
a {
	text-decoration: none;
}
h3 {
	display: none;
	@media (min-width: 768px) {
		display: block;
	}
}
</style>
