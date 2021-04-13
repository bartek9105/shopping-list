<template>
	<v-navigation-drawer
		v-model="showSidebar"
		absolute
		right
		temporary
		class="pt-8 px-8"
		width="600"
	>
		<h1>Add new product</h1>
		<v-form v-model="valid" class="d-flex flex-column">
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-text-field
							v-model="product.name"
							label="Product name"
							required
						></v-text-field>
						<v-text-field
							v-model="product.description"
							label="Product description"
							required
						></v-text-field>
					</v-col>
					<v-select :items="categoriesName" label="Standard"></v-select>
				</v-row>
				<v-btn color="success">Add</v-btn>
			</v-container>
		</v-form>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'AddProductSidebar',
	props: {
		showSidebar: {
			required: true,
			type: Boolean
		},
		categories: {
			required: true,
			type: Array
		}
	},
	data() {
		return {
			product: {
				name: '',
				description: ''
			}
		}
	},
	computed: {
		categoriesName() {
			return this.categories.map((category) => category.name)
		}
	}
}
</script>
