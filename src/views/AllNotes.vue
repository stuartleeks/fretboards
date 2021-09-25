<template>
	<div>
		<h1>All Notes</h1>
		<div id="options">
			<div>
				Choose instrument:
				<select v-model="instrument">
					<option
						v-for="instrument in instruments"
						:value="instrument"
						:key="instrument.name"
					>
						{{ instrument.name }}
					</option>
				</select>
			</div>
			<div>
				<label for="noteName">Accidentals:</label>
				<select v-model="getNoteName" id="noteName">
					<option
						v-for="nameFunc in noteNameFuncs"
						:value="nameFunc.func"
						:key="nameFunc.name"
					>
						{{ nameFunc.name }}
					</option>
				</select>
			</div>
		</div>
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
	GetNoteNameFlat,
} from "@/fretboard";

export default {
	name: "AllNotes",
	components: {
		FretboardComponent,
	},
	data() {
		const instrument = DefaultInstruments.ukulele;
		return {
			instrument: instrument,
			instruments: DefaultInstruments,
			getNoteName: GetNoteNameSharp,
			noteNameFuncs: [
				{ name: "Sharps", func: GetNoteNameSharp },
				{ name: "Flats", func: GetNoteNameFlat },
			],
		};
	},
	computed: {
		bubbles() {
			return GetBubblesForAllFrets(this.instrument, this.getNoteName);
		},
	},
};
</script>

<style>
#options {
	margin-bottom: 1em;
}
#options > div {
	padding-top: 0.5em;
}
</style>
