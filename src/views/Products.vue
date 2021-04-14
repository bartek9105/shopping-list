<template>
	<div>
		<v-row class="justify-center mt-4">
			<v-col xs="12" md="6">
				<div class="d-flex justify-space-between align-center">
					<div class="d-flex align-center">
						<h2 class="mr-4">Your products</h2>
						<span>({{ products.length }})</span>
					</div>
					<v-btn color="success" @click="showSidebar = true">
						Add product
					</v-btn>
				</div>
				<v-progress-circular
					indeterminate
					color="primary"
					class="mt-4"
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
								<td>
									{{ product.name }}
									<v-chip class="ma-2" color="success" outlined>
										{{ product.category[0].name }}
									</v-chip>
								</td>
								<td>
									<v-btn
										small
										color="primary"
										dark
										@click="deleteProduct(index)"
									>
										Delete
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
		<add-product-sidebar
			v-if="showSidebar"
			:categories="categories"
			@newProduct="addProduct"
			@closeSidebar="showSidebar = false"
		/>
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
		addProduct(product) {
			this.products.unshift(product)
			this.showSidebar = false
			this.snackbarText = 'Product added'
			this.showSnackbar = true
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
