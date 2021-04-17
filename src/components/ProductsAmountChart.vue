<script>
import { Bar } from 'vue-chartjs'

export default {
	name: 'ProductsAmountChart',
	extends: Bar,
	props: {
		lists: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			chartdata: {
				labels: [],
				datasets: [
					{
						label: 'Bought products',
						backgroundColor: '#f87979',
						data: []
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	watch: {
		lists: {
			handler: function() {
				this.productsStats(), this.renderChart(this.chartdata, this.options)
			},
			deep: true
		}
	},
	methods: {
		productsStats() {
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
		}
	},
	mounted() {
		this.productsStats()
		this.renderChart(this.chartdata, this.options)
	}
}
</script>
