<template>
    <div>
        <v-row class="justify-center mt-4 px-4">
			<v-col xs="12" sm="8" md="6">
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
        <v-row class="justify-center">
			<v-col xs="12" sm="8" md="6">
				<v-progress-circular
					indeterminate
					color="primary"
					class="mt-4"
					v-if="isLoading"
				></v-progress-circular>
				<div v-else>
					<v-simple-table class="py-6" v-if="lists.length > 0">
						<template v-slot:default>
							<thead>
								<tr>
									<th class="text-left">
										Name
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(list, listIndex) in lists" :key="listIndex">
									<v-card shaped tile outlined>
                                        <v-card-title>
                                            <v-text-field
                                                v-model="list.name"
                                                :rules="rules"
                                                counter="50"
                                                hint="Change list name"
                                                label="List name"
                                            ></v-text-field>
                                        </v-card-title>
                                        <v-card-subtitle>
                                            ID: {{list.id}}
                                            Created: {{list.createdAt}}
                                        </v-card-subtitle>
                                        <v-card-actions>
                                            <v-container
                                                class="px-0"
                                                fluid
                                            >
                                                <v-checkbox
                                                v-model="list.completed"
                                                label="Completed"
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
                                                    <tr v-for="(product, productIndex) in list.products" :key="productIndex">
                                                        <td>
                                                            {{ product.name }}
                                                            <v-chip class="ma-2" color="success" outlined>
                                                                {{ product.category }}
                                                            </v-chip>
                                                        </td>
                                                        <td>
                                                            <v-btn
                                                                small
                                                                color="primary"
                                                                dark
                                                                @click="deleteProductFromList(list, productIndex)"
                                                            >
                                                                Delete
                                                            </v-btn>
                                                        </td>
                                                    </tr>
                                                    <tr>
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
		</v-row>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Lists',
        data() {
            return {
                lists: [],
                products: [],
                selectedProduct: {}
            }
        },
        methods:{
            addList(){
                this.lists.push(
                    {
                        name:"test", 
                        id: 999, 
                        createdAt:"just now", 
                        completed: false, 
                        products: []
                    }
                )
            },
            deleteList(index){
                this.lists.splice(index, 1);
            },
            addProductToList(list){
                list.products.push(this.selectedProduct);
            },
            deleteProductFromList(list, index){
                list.products.splice(index,1);
            }
        },
        mounted() {
        axios
			.get('products.json')
			.then((response) => {
				this.products = response.data
				this.isLoading = false
			})
			.catch((error) => {
				console.log(error)
			})
		axios
			.get('lists.json')
			.then((response) => {
				this.lists = response.data
				this.isLoading = false
			})
			.catch((error) => {
				console.log(error)
			})
        },        
    }
</script>