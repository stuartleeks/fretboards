<template>
	<div>
		<h1>Major Key Notes</h1>
		<div id="options">
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
		<div>
			<input id="showScales" type="checkbox" v-model="showScales" />
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
	GetNoteNameFlat,
	GetNoteNameSharp,
	TransposeNote,
} from "@/fretboard";

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
			majorKeyNote: 1,
			showScales: true,
			showCommonNotes: false,
			getNoteName: GetNoteNameSharp,
			noteNameFuncs: [
				{ name: "Sharps", func: GetNoteNameSharp },
				{ name: "Flats", func: GetNoteNameFlat },
			],
		};
	},
	computed: {
		notes() {
			const noteNameFunc = this.getNoteName;
			const result = [];
			for (let n = 0; n < 12; n++) {
				result.push({ note: n, noteName: noteNameFunc(n) });
			}
			return result;
		},
		rootNoteName() {
			return this.getNoteName(this.majorKeyNote);
		},
		rootBubbles() {
			return GetBubblesByMajorKey(
				this.majorKeyNote,
				this.instrument,
				this.getNoteName
			);
		},
		fourthNote() {
			return TransposeNote(this.majorKeyNote, 5);
		},
		fourthNoteName() {
			return this.getNoteName(this.fourthNote);
		},
		fourthBubbles() {
			return GetBubblesByMajorKey(
				this.fourthNote,
				this.instrument,
				this.getNoteName
			);
		},
		fifthNote() {
			return TransposeNote(this.majorKeyNote, 7);
		},
		fifthNoteName() {
			return this.getNoteName(this.fifthNote);
		},
		fifthBubbles() {
			return GetBubblesByMajorKey(
				this.fifthNote,
				this.instrument,
				this.getNoteName
			);
		},
		commonBubbles() {
			return GetBubblesByMajorKeyCommonNotes(
				this.majorKeyNote,
				this.instrument,
				this.getNoteName
			);
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
