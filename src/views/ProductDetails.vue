<template>
	<div>
		<v-row class="d-flex justify-center mt-8 px-4">
			<v-col xsm="12" lg="6">
				<div class="d-flex flex-column mb-8">
					<router-link :to="{ name: 'Products' }">
						<v-btn small color="primary" class="mb-8">
							Back to products list
						</v-btn>
					</router-link>
					<v-progress-circular
						indeterminate
						color="primary"
						v-if="loading"
					></v-progress-circular>
					<div v-else>
						<h1 class="mr-8 mb-4">{{ product.name }}</h1>
						<v-chip color="success" outlined>
							{{ product.category[0].name }}
						</v-chip>
					</div>
				</div>
				<div>
					<h3 class="mb-4">Product description</h3>
					<p>{{ product.description }}</p>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'ProductDetails',
	data() {
		return {
			product: {},
			loading: true
		}
	},
	methods: {
		fetchProductDetails() {
			axios
				.get(
					`https://my.api.mockaroo.com/products/${this.$route.params.id}.json?key=ff64ad20`
				)
				.then((productData) => {
					this.product = productData.data
					this.loading = false
				})
				.catch((err) => console.error(err))
		}
	},
	mounted() {
		this.fetchProductDetails()
	}
}
</script>

<style></style>
