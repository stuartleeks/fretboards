<template>
	<div>
		<h1>All Notes</h1>
		<FretboardComponent :instrument="instrument" :bubbles="bubbles" />
	</div>
</template>

<script>
// @ is an alias to /src
import FretboardComponent from "@/components/Fretboard.vue";
import {
	DefaultInstruments,
	GetBubblesForAllFrets,
	GetNoteNameSharp,
} from "@/fretboard";

const getNoteName = GetNoteNameSharp;

export default {
	name: "AllNotes",
	components: {
		FretboardComponent,
	},
	data() {
		const instrument = DefaultInstruments.ukulele;
		return {
			instrument: instrument,
		};
	},
	computed: {
		bubbles() {
			return GetBubblesForAllFrets(this.instrument, getNoteName);
		},
	},
};
</script>

<style>
#zapp {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
