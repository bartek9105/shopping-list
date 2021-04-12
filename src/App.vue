<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">
				<span class="mr-2">Shopping list app</span>
				<router-link :to="{ name: 'Categories' }" class="white--text mr-2"
					>Categories</router-link
				>
				<router-link :to="{ name: 'Products' }" class="white--text mr-2"
					>Products</router-link
				>
			</div>
			<v-spacer></v-spacer>
		</v-app-bar>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App'
}
</script>
