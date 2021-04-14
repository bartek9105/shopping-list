<template>
	<v-navigation-drawer
		v-model="sidebar"
		absolute
		right
		temporary
		class="pt-8 px-8"
		width="600"
	>
		<h1 class="mb-4">Add new product</h1>
		<v-form class="d-flex flex-column">
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
						<v-select
							:items="categoriesName"
							label="Category"
							v-model="product.category[0].name"
						></v-select>
					</v-col>
				</v-row>
				<v-btn color="success" class="mt-4 mr-4" @click="addNewProduct"
					>Add</v-btn
				>
				<v-btn color="white" class="mt-4" @click="sidebar = false"
					>Cancel</v-btn
				>
			</v-container>
		</v-form>
	</v-navigation-drawer>
</template>

<script>
export default {
	name: 'AddProductSidebar',
	props: {
		categories: {
			required: true,
			type: Array
		}
	},
	data() {
		return {
			product: {
				name: '',
				description: '',
				category: [
					{
						name: ''
					}
				]
			},
			sidebar: true
		}
	},
	methods: {
		addNewProduct() {
			this.$emit('newProduct', this.product)
			this.product = { category: [{ name: '' }] }
		}
	},
	computed: {
		categoriesName() {
			return this.categories.map((category) => category.name)
		}
	},
	watch: {
		sidebar() {
			this.$emit('closeSidebar')
		}
	}
}
</script>
