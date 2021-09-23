<template>
	<div>
		<h1>Major Key Notes</h1>
		<div>
			Choose key: 
			<select v-model="majorKeyNote">
				<option v-for="note in notes" :value="note.note" :key="note.note">
					{{ note.noteName }}
				</option>
			</select>
		</div>
		<h2>{{ rootNoteName }} major scale</h2>
		<FretboardComponent :instrument="instrument" :bubbles="rootBubbles" />
		<h2>{{ fourthNoteName }} major scale</h2>
		<FretboardComponent :instrument="instrument" :bubbles="fourthBubbles" />
		<h2>{{ fifthNoteName }} major scale</h2>
		<FretboardComponent :instrument="instrument" :bubbles="fifthBubbles" />
	</div>
</template>

<script>
// @ is an alias to /src
import FretboardComponent from "@/components/Fretboard.vue";
import {
	DefaultInstruments,
	GetBubblesByMajorKey,
	GetNoteNameSharp,
	TransposeNote,
} from "@/fretboard";

const getNoteName = GetNoteNameSharp;

export default {
	name: "MajorKeyNotes",
	components: {
		FretboardComponent,
	},
	data() {
		const instrument = DefaultInstruments.ukulele;
		return {
			instrument: instrument,
			notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (n) {
				return { note: n, noteName: getNoteName(n) };
			}),
			majorKeyNote: 1,
		};
	},
	computed: {
		rootNoteName() {
			return getNoteName(this.majorKeyNote);
		},
		rootBubbles() {
			return GetBubblesByMajorKey(
				this.majorKeyNote,
				this.instrument,
				GetNoteNameSharp
			);
		},
		fourthNote() {
			return TransposeNote(this.majorKeyNote, 5);
		},
		fourthNoteName() {
			return getNoteName(this.fourthNote);
		},
		fourthBubbles() {
			return GetBubblesByMajorKey(
				this.fourthNote,
				this.instrument,
				GetNoteNameSharp
			);
		},
		fifthNote() {
			return TransposeNote(this.majorKeyNote, 7);
		},
		fifthNoteName() {
			return getNoteName(this.fifthNote);
		},
		fifthBubbles() {
			return GetBubblesByMajorKey(
				this.fifthNote,
				this.instrument,
				GetNoteNameSharp
			);
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
