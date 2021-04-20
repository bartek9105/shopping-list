<template>
	<div>
		<v-row class="justify-center mt-4 px-4">
			<v-col xs="12" lg="6">
				<div class="d-flex justify-space-between align-center">
					<div class="d-flex align-items">
						<h2 class="mr-4">Your lists ({{ lists.length }})</h2>
					</div>
					<v-btn color="success" @click="addList()">
						Add list
					</v-btn>
				</div>
			</v-col>
		</v-row>
		<v-row class="justify-center px-4">
			<v-col xs="12" lg="6">
				<v-progress-circular
					indeterminate
					color="primary"
					class="mt-4"
					v-if="isLoading"
				></v-progress-circular>
				<div v-else>
					<v-simple-table class="py-6 lists-table pr-4" v-if="lists.length > 0">
						<template v-slot:default>
							<tbody>
								<tr v-for="(list, listIndex) in lists" :key="listIndex">
									<v-card
										shaped
										tile
										outlined
										class="mb-8"
										:class="{ 'green lighten-5': list.completed }"
									>
										<v-card-title>
											<div class="d-flex flex-column flex-grow-1">
												<v-text-field
													v-model="list.name"
													counter="50"
													hint="Change list name"
													label="List name"
												></v-text-field>
												<router-link
													:to="{ name: 'ListDetails', params: { id: list.id } }"
												>
													<v-btn color="primary" class="mb-4"
														>See details</v-btn
													>
												</router-link>
											</div>
										</v-card-title>
										<v-card-subtitle>
											Created:
											{{ new Date(Date.parse(list.createdAt)).toDateString() }}
										</v-card-subtitle>
										<v-card-actions>
											<v-container class="px-0" fluid>
												<v-checkbox
													v-model="list.completed"
													label="Completed"
													@click="completeList"
												></v-checkbox>
											</v-container>
											<v-btn
												small
												color="error"
												dark
												@click="deleteList(listIndex)"
											>
												DELETE
											</v-btn>
										</v-card-actions>
										<v-expansion-panels>
											<v-expansion-panel>
												<v-expansion-panel-header>
													Products
												</v-expansion-panel-header>
												<v-expansion-panel-content>
													<tr
														v-for="(product, productIndex) in list.products"
														:key="productIndex"
														class="d-flex justify-space-between align-center flex-wrap mb-2 border-bottom-1"
													>
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
																@click="
																	deleteProductFromList(list, productIndex)
																"
															>
																Delete
															</v-btn>
														</td>
													</tr>
													<tr
														class="d-flex justify-space-between align-center flex-grow-1 flex-wrap"
													>
														<td>
															<v-select
																:items="products"
																label="Select product"
																item-text="name"
																v-model="selectedProduct"
																return-object
															>
															</v-select>
														</td>
														<td>
															<v-btn
																small
																color="success"
																dark
																@click="addProductToList(list)"
															>
																Add product
															</v-btn>
														</td>
													</tr>
												</v-expansion-panel-content>
											</v-expansion-panel>
										</v-expansion-panels>
									</v-card>
								</tr>
							</tbody>
						</template>
					</v-simple-table>
					<div class="mt-4" v-else>
						No products found with specified criteria
					</div>
				</div>
			</v-col>
			<v-col xs="12" lg="6">
				<h3 class="mb-8">Bought products amount</h3>
				<products-amount-chart
					v-if="lists.length > 0"
					:lists="lists"
					class="mb-8"
				/>
				<h3 class="mb-8">Bought categories amount</h3>
				<categories-amount-chart v-if="lists.length > 0" :lists="lists" />
			</v-col>
		</v-row>
		<v-snackbar v-model="showSnackbar" timeout="2000">
			{{ snackbarText }}
		</v-snackbar>
	</div>
</template>

<script>
import axios from 'axios'
import ProductsAmountChart from '@/components/ProductsAmountChart'
import CategoriesAmountChart from '@/components/CategoriesAmountChart'

export default {
	name: 'Lists',
	data() {
		return {
			lists: [],
			products: [],
			selectedProduct: {},
			isLoading: true,
			showSnackbar: false,
			snackbarText: ''
		}
	},
	components: {
		ProductsAmountChart,
		CategoriesAmountChart
	},
	methods: {
		addList() {
			this.lists.unshift({
				name: '',
				id: Date.now(),
				createdAt: new Date().toDateString(),
				completed: false,
				products: []
			})
			this.snackbarText = 'New shopping list added'
			this.showSnackbar = true
		},
		deleteList(index) {
			this.lists.splice(index, 1)
			this.snackbarText = 'Shopping list deleted'
			this.showSnackbar = true
		},
		addProductToList(list) {
			list.products.push(this.selectedProduct)
		},
		deleteProductFromList(list, index) {
			list.products.splice(index, 1)
		},
		completeList() {
			this.snackbarText = 'List marked as completed'
			this.showSnackbar = true
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
			.get('https://my.api.mockaroo.com/lists.json?key=ff64ad20')
			.then((response) => {
				this.lists = response.data.map((list) => {
					return {
						...list,
						products: list.products.map((product) => ({
							...product,
							category: JSON.parse(product.category)
						}))
					}
				})
				this.isLoading = false
			})
			.catch((error) => {
				console.log(error)
			})
	}
}
</script>

<style scoped>
.lists-table {
	height: 100vh;
	overflow-y: scroll;
}
</style>
