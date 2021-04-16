<template>
	<v-app>
		<app-navbar />
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import AppNavbar from '@/components/AppNavbar'

export default {
	name: 'App',
	components: {
		AppNavbar,
	}
}
</script>
