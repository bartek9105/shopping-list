<template>
	<div>
		<v-row class="justify-center mt-4 px-4">
			<v-col xs="12" sm="8" md="6">
				<div class="d-flex justify-space-between align-center">
					<div class="d-flex align-items">
						<h2 class="mr-4">Your categories ({{ itemCategories.length }})</h2>
					</div>
				</div>
				<form id="shopping-list" @submit.prevent>
					<div class="d-flex align-center">
						<div class="col-md-12 form-group">
							<v-text-field v-model="name" label="Add category"></v-text-field>
							<v-btn color="success" @click="addItem()">
								Add extra category
							</v-btn>
						</div>
					</div>
				</form>
				<v-progress-circular
					indeterminate
					color="primary"
					class="mt-4"
					v-if="loading"
				></v-progress-circular>
				<v-simple-table id="shopping-list-table" class="py-6" v-else>
					<template v-slot:default>
						<thead>
							<tr>
								<th>Category</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(categories, index) in itemCategories" :key="index">
								<td>
									<span>{{ categories.name }}</span>
								</td>
								<td>
									<v-btn small color="primary" dark @click="removeItem(index)">
										Delete
									</v-btn>
									<i class="fa fa-remove"></i>
								</td>
							</tr>
						</tbody>
					</template>
				</v-simple-table>
			</v-col>
		</v-row>
		<v-snackbar v-model="showSnackbar" timeout="2000">
			{{ snackbarText }}
		</v-snackbar>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Categories',
	data() {
		return {
			name: '',
			itemCategories: [],
			items: [],
			loading: true,
			showSnackbar: false,
			snackbarText: ''
		}
	},
	mounted: function() {
		axios
			.get('https://my.api.mockaroo.com/categories.json?key=ff64ad20')
			.then((response) => {
				this.itemCategories = response.data
				this.loading = false
			})
			.catch((error) => {
				console.log(error)
			})
	},
	methods: {
		addItem: function() {
			if (!this.name == '') {
				const nameIN = this.name.trim()
				this.itemCategories.push({
					name: nameIN
				})
				this.snackbarText = 'Category added'
				this.showSnackbar = true
			}
			this.name = ''
		},
		removeItem: function(index) {
			this.itemCategories.splice(index, 1)
			this.snackbarText = 'Category removed'
			this.showSnackbar = true
		}
	}
}
</script>
