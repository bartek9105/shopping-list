<template>
	<form id="shopping-list">
		<h2>Products List</h2>
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
			<div class="form-check">
				<input type="text" v-model="name" class="checkbox" />
			</div>

			<button type="button" @click="addItem" class="btn btn-primary">
				<i class="fa fa-plus"></i> Add
			</button>
		</div>
	</form>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Products',
	data() {
		return {
			name: '',
			itemCategories: [],
			items: []
		}
	},
	mounted: function() {
		axios
			.get('https://my.api.mockaroo.com/categories.json?key=ff64ad20')
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
			var nameIN = this.name.trim()
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

<style></style>
