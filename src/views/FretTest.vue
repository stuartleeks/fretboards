<template>
	<div>
		<FretboardComponent
			v-for="(fretboard, index) in fretboards"
			:instrument="fretboard.instrument"
			:bubbles="fretboard.bubbles"
			:key="index"
		/>
	</div>
</template>

<script>
// @ is an alias to /src
import FretboardComponent from "@/components/Fretboard.vue";
import { DefaultInstruments, GetBubblesByMajorKey, GetNoteNameSharp } from '@/fretboard';


export default {
	name: "App",
	components: {
		FretboardComponent,
	},
	data() {
		return {
			fretboards: [
				{
					instrument: DefaultInstruments.guitar,
					// bubbles: {
					//   1 : {
					//     0: { text: 'O', color: 'white', textColor: 'black'},
					//     1: { text: '1'}
					//   }
					// }
					// bubbles: getBubblesByNote(4, instruments.guitar, noteNames.sharp),
					bubbles: GetBubblesByMajorKey(1, DefaultInstruments.guitar, GetNoteNameSharp),
				},
				{
					instrument: DefaultInstruments.ukulele,
					bubbles: GetBubblesByMajorKey(
						1,
						DefaultInstruments.ukulele,
						GetNoteNameSharp
					),
				},
				{
					instrument: DefaultInstruments.ukulele,
					bubbles: GetBubblesByMajorKey(
						6,
						DefaultInstruments.ukulele,
						GetNoteNameSharp
					),
				},
				{
					instrument: DefaultInstruments.ukulele,
					bubbles: GetBubblesByMajorKey(
						8,
						DefaultInstruments.ukulele,
						GetNoteNameSharp
					),
				},
			],
		};
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
