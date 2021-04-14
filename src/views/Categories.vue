<template>
	<div>
		<form id="shopping-list">
			<h2>Categories List</h2>
			<table id="shopping-list-table" class="table table-condensed table-hover">
				<thead>
					<tr>
						<th>Category</th>
						<th>Action</th>
					</tr>
				</thead>
				<tr v-for="(item, index) in items" :key="index">
					<td>
						<span>{{ item.name }}</span>
					</td>
					<td>
						<button
							type="button"
							class="btn btn-danger"
							@click="removeItem(index)"
						>
							<i class="fa fa-remove"></i> Delete
						</button>
					</td>
				</tr>
			</table>

			<h4>Add new item</h4>
			<div class="row col-md-6">
				<div class="col-md-6 form-group">
					Name
					<select v-model="name">
						<option v-for="(categories, index) in itemCategories" :key="index">
							{{ categories.name }}
						</option>
					</select>
				</div>
				<button type="button" @click="addItem" class="btn btn-primary">
					<i class="fa fa-plus"></i> Add
				</button>
			</div>
		</form>
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
			const nameIN = this.name.trim()
			this.items.push({
				name: nameIN
			})
		},
		removeItem: function(index) {
			this.items.splice(index, 1)
		}
	}
}
</script>
