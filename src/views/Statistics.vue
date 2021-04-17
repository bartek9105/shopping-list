<script>
import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
	name: 'Statistics',
	extends: Line,
	data() {
		return {
			chartdata: {
				labels: [],
				datasets: [
					{
						label: 'Amount bought',
						backgroundColor: '#f87979',
						data: []
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false
			},
			lists: []
		}
	},
	methods: {
		async fetchLists() {
			const listsData = await axios.get(
				'https://my.api.mockaroo.com/lists.json?key=ff64ad20'
			)
			this.lists = listsData.data
		},
		async productsStats() {
			try {
				await this.fetchLists()
				const productsCounter = {}
				this.lists.map((list) => {
					if (list.completed) {
						list.products.map((product) => {
							productsCounter[product.name]
								? productsCounter[product.name]++
								: (productsCounter[product.name] = 1)
						})
					}
				})
				this.chartdata.labels = Object.keys(productsCounter)
				this.chartdata.datasets[0].data = Object.values(productsCounter)
			} catch (error) {
				console.log(error)
			}
		}
	},
	mounted() {
		this.productsStats()
		this.renderChart(this.chartdata, this.options)
	}
}
</script>

<style></style>
