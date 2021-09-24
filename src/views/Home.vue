<template>
	<div class="home">
		<h1>Fretboard utilities</h1>
		<p><router-link to="/all-notes">All Notes</router-link></p>
		<p><router-link to="/major-key">Major Keys</router-link></p>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "Home",
});
</script>
