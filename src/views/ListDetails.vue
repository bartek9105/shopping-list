<template>
	<div>
		<v-row class="d-flex justify-center mt-8 px-4">
			<v-col xsm="12" lg="6">
				<div class="d-flex flex-column mb-8">
					<router-link :to="{ name: 'Lists' }">
						<v-btn small color="primary" class="mb-8">
							Back to shopping lists
						</v-btn>
					</router-link>
					<v-progress-circular
						indeterminate
						color="primary"
						v-if="loading"
					></v-progress-circular>
					<div v-else>
						<h1 class="mr-8 mb-4">Name: {{ list.name }}</h1>
						<v-chip color="success" outlined v-if="list.completed">
							Completed
						</v-chip>
						<v-chip color="error" outlined v-else>
							Not completed
						</v-chip>
					</div>
				</div>
				<div>
					<p>
						Created:
						{{ new Date(Date.parse(list.createdAt)).toDateString() }}
					</p>
				</div>
				<div>
					<h3 class="mb-4">
						Products on this list:
					</h3>
					<ul>
						<li v-for="product in list.products" :key="product.id">
							{{ product.name }}
						</li>
					</ul>
				</div>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'ListDetails',
	data() {
		return {
			list: {},
			loading: true
		}
	},
	methods: {
		fetchListData() {
			axios
				.get(
					`https://my.api.mockaroo.com/lists/${this.$route.params.id}.json?key=ff64ad20`
				)
				.then((listData) => {
					this.list = listData.data
					this.loading = false
				})
				.catch((err) => console.error(err))
		}
	},
	mounted() {
		this.fetchListData()
	}
}
</script>

<style></style>
