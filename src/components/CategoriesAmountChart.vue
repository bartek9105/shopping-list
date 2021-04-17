<script>
import { Line } from 'vue-chartjs'

export default {
	name: 'CategoriesAmountChart',
	extends: Line,
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
						label: 'Bought categories',
						backgroundColor: '#51c4d3',
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
				this.categoriesStats(), this.renderChart(this.chartdata, this.options)
			},
			deep: true
		}
	},
	methods: {
		categoriesStats() {
			const categoriesCounter = {}
			this.lists.map((list) => {
				if (list.completed) {
					list.products.map((product) => {
						const categoryName = JSON.parse(product.category)[0].name
						categoriesCounter[categoryName]
							? categoriesCounter[categoryName]++
							: (categoriesCounter[categoryName] = 1)
					})
				}
			})
			this.chartdata.labels = Object.keys(categoriesCounter)
			this.chartdata.datasets[0].data = Object.values(categoriesCounter)
		}
	},
	mounted() {
		this.categoriesStats()
		this.renderChart(this.chartdata, this.options)
	}
}
</script>
