<script>
import { Pie } from 'vue-chartjs'

export default {
	name: 'CategoriesAmountChart',
	extends: Pie,
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
						backgroundColor: [
							'#542e71',
							'#fb3640',
							'#fdca40',
							'#a799b7',
							'#f39189',
							'#78c4d4',
							'#025955',
							'#4a47a3',
							'#da723c'
						],
						data: [50, 34, 34]
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	computed: {
		listCompleted() {
			return this.lists.map((list) => list.completed)
		}
	},
	watch: {
		listCompleted: {
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
						const categoryName = product.category[0].name
						categoriesCounter[categoryName]
							? categoriesCounter[categoryName]++
							: (categoriesCounter[categoryName] = 1)
					})
				}
			})
			this.chartdata.labels = Object.keys(categoriesCounter)
			const total = Object.values(categoriesCounter).reduce((a, b) => a + b, 0)
			this.chartdata.datasets[0].data = Object.values(
				categoriesCounter
			).map((value) => ((value / total) * 100).toFixed(1))
		}
	},
	mounted() {
		this.categoriesStats()
		this.renderChart(this.chartdata, this.options)
	}
}
</script>
