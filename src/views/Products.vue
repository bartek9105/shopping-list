<template>
	<v-row class="justify-center">
		<v-col xs="12" md="6">
			<v-simple-table class="py-6">
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
								<v-btn small color="primary" dark @click="deleteProduct(index)">
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
</template>

<script>
import axios from 'axios'

export default {
	name: 'Products',
	data() {
		return {
			product: {
				name: '',
				description: ''
			},
			products: [],
			showSnackbar: false,
			snackbarText: ''
		}
	},
	mounted() {
		axios
			.get('https://my.api.mockaroo.com/products.json?key=ff64ad20')
			.then((response) => {
				this.products = response.data
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
