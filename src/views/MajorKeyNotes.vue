<template>
	<div>
		<h1>Major Key Notes</h1>
		<div>
			<label for="instrument">Choose instrument:</label>
			<select v-model="instrument" id="instrument">
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
			<label for="key">Choose key:</label>
			<select v-model="majorKeyNote" id="key">
				<option v-for="note in notes" :value="note.note" :key="note.note">
					{{ note.noteName }}
				</option>
			</select>
		</div>
		<div>
			<input id="showScales" type="checkbox" v-model="showScales"/>
			<label for="showScales">Show individual scales</label>
			<input id="showCommonNotes" type="checkbox" v-model="showCommonNotes" />
			<label for="showCommonNotes">Show common notes</label>
		</div>
		<div v-if="showScales">
			<h2>{{ rootNoteName }} major scale</h2>
			<FretboardComponent :instrument="instrument" :bubbles="rootBubbles" />
			<h2>{{ fourthNoteName }} major scale</h2>
			<FretboardComponent :instrument="instrument" :bubbles="fourthBubbles" />
			<h2>{{ fifthNoteName }} major scale</h2>
			<FretboardComponent :instrument="instrument" :bubbles="fifthBubbles" />
		</div>
		<div v-if="showCommonNotes">
			<h2>Common notes</h2>
			<FretboardComponent :instrument="instrument" :bubbles="commonBubbles" />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import FretboardComponent from "@/components/Fretboard.vue";
import {
	DefaultInstruments,
	GetBubblesByMajorKey,
	GetBubblesByMajorKeyCommonNotes,
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
			instruments: DefaultInstruments,
			notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (n) {
				return { note: n, noteName: getNoteName(n) };
			}),
			majorKeyNote: 1,
			showScales: true,
			showCommonNotes: false
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
		commonBubbles() {
			return GetBubblesByMajorKeyCommonNotes(
				this.majorKeyNote,
				this.instrument,
				GetNoteNameSharp
			);
		},
	},
};
</script>

<style>
</style>
