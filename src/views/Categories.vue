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
				<v-simple-table id="shopping-list-table" class="py-6">
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
			items: []
		}
	},
	mounted: function() {
		axios
			.get('categories.json')
			.then((response) => {
				this.itemCategories = response.data
				console.log(response)
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
			}
			this.name = ''
		},
		removeItem: function(index) {
			this.itemCategories.splice(index, 1)
		}
	}
}
</script>
