<template>
	<div>
		<v-row class="justify-center">
			<v-col xs="12" md="6">
				<v-btn
					color="success"
					class="mt-6 d-flex justify-end"
					@click="showSidebar = true"
				>
					Add product
				</v-btn>
				<v-progress-circular
					indeterminate
					color="primary"
					v-if="isLoading"
				></v-progress-circular>
				<v-simple-table class="py-6" v-else>
					<template v-slot:default>
						<thead>
							<tr>
								<th class="text-left">
									Name
								</th>
								<th class="text-left">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(product, index) in products" :key="index">
								<td>{{ product.name }}</td>
								<td>
									<v-btn
										small
										color="primary"
										dark
										@click="deleteProduct(index)"
									>
										Delete product
									</v-btn>
								</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
				<v-snackbar v-model="showSnackbar" timeout="2000">
					{{ snackbarText }}
				</v-snackbar>
			</v-col>
		</v-row>
		<add-product-sidebar :show-sidebar="showSidebar" :categories="categories" />
	</div>
</template>

<script>
import axios from 'axios'
import AddProductSidebar from '@/components/AddProductSidebar'

export default {
	name: 'Products',
	components: {
		AddProductSidebar
	},
	data() {
		return {
			product: {
				name: '',
				description: ''
			},
			products: [],
			showSnackbar: false,
			snackbarText: '',
			isLoading: true,
			showSidebar: false,
			categories: []
		}
	},
	mounted() {
		axios
			.get('https://my.api.mockaroo.com/products.json?key=ff64ad20')
			.then((response) => {
				this.products = response.data
				this.isLoading = false
			})
			.catch((error) => {
				console.log(error)
			})
		axios
			.get('https://my.api.mockaroo.com/categories.json?key=ff64ad20')
			.then((response) => {
				this.categories = response.data
			})
			.catch((error) => {
				console.log(error)
			})
	},
	methods: {
		addProduct() {
			this.products.push(this.product)
		},
		deleteProduct(index) {
			this.products.splice(index, 1)
			this.snackbarText = 'Product deleted'
			this.showSnackbar = true
		}
	}
}
</script>

<style></style>
