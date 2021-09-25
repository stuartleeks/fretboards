export enum Note {
	Ab = 0,
	A,
	Bb,
	B,
	C,
	Db,
	D,
	Eb,
	E,
	F,
	Gb,
	G
}

export type GetNoteName =  (note: Note) => string

export function GetNoteNameFlat(note: Note) : string {
	switch (note) {
		case Note.Ab: return  "Ab";
		case Note.A: return  "A";
		case Note.Bb: return  "Bb";
		case Note.B: return  "B";
		case Note.C: return  "C";
		case Note.Db: return  "Db";
		case Note.D: return  "D";
		case Note.Eb: return  "Eb";
		case Note.E: return  "E";
		case Note.F: return  "F";
		case Note.Gb: return  "Gb";
		case Note.G: return  "G";
	}
} 
export function GetNoteNameSharp(note: Note) : string {
	switch (note) {
		case Note.Ab: return  "G#";
		case Note.A: return  "A";
		case Note.Bb: return  "A#";
		case Note.B: return  "B";
		case Note.C: return  "C";
		case Note.Db: return  "C#";
		case Note.D: return  "D";
		case Note.Eb: return  "D#";
		case Note.E: return  "E";
		case Note.F: return  "F";
		case Note.Gb: return  "F#";
		case Note.G: return  "G";
	}
} 

export enum FretMarkType {
	Single = 'single',
	Double = 'double'
}

export class Instrument {
	name: string;
	strings : Note[] = [];
	numberOfFrets : number = 0;
	fretMarks: Record<number, FretMarkType> = {};

	constructor(name: string, strings:Note[], numberOfFrets:number, fretMarks: Record<number, FretMarkType>)
	{
		this.name = name;
		this.strings = strings;
		this.numberOfFrets = numberOfFrets;
		this.fretMarks = fretMarks;
	}
}

export function TransposeNote(note: Note, interval: number) {
	note += interval;
	while (note < 0){
		note += 12;
	}
	return note % 12;
}

export function GetNotesForMajorKey(keyNote : Note) {
	const intervals = [2, 2, 1, 2, 2, 2, 1];
	const notes = [keyNote];
	let note = keyNote;
	for (let i = 0; i < intervals.length; i++) {
		const interval = intervals[i];
		note = TransposeNote(note, interval);
		notes.push(note);
	}
	return notes;
}

export class Bubble {
	text: string = ''; 
	color?: string | null = null;
}

export function GetBubblesByMajorKey(keyNote: Note, instrument : Instrument, getNoteName : GetNoteName) {
	const keyNotes = GetNotesForMajorKey(keyNote);
	const result : Record<number, Record<number, Bubble>> = {};
	for (
		let stringIndex = 0;
		stringIndex < instrument.strings.length;
		stringIndex++
	) {
		const string = instrument.strings[stringIndex];
		const stringBubbles :Record<number, Bubble> = {};
		for (
			let fretIndex = 0;
			fretIndex <= instrument.numberOfFrets;
			fretIndex++
		) {
			const fretNoteIndex = TransposeNote(string, fretIndex);
			if (keyNotes.indexOf(fretNoteIndex) !== -1) {
				const fretNoteName = getNoteName(fretNoteIndex);
				stringBubbles[fretIndex] = {
					text: fretNoteName,
					color: fretNoteIndex === keyNote ? "orange" : "yellow",
				};
			}
		}
		result[stringIndex + 1] = stringBubbles;
	}
	return result;
}
export function GetBubblesForAllFrets(instrument : Instrument, getNoteName : GetNoteName) {
	const result : Record<number, Record<number, Bubble>> = {};
	for (
		let stringIndex = 0;
		stringIndex < instrument.strings.length;
		stringIndex++
	) {
		const string = instrument.strings[stringIndex];
		const stringBubbles :Record<number, Bubble> = {};
		for (
			let fretIndex = 0;
			fretIndex <= instrument.numberOfFrets;
			fretIndex++
		) {
			const fretNoteIndex = TransposeNote(string, fretIndex);
			const fretNoteName = getNoteName(fretNoteIndex);
			stringBubbles[fretIndex] = {
				text: fretNoteName,
				color: 'white',
			};
		}
		result[stringIndex + 1] = stringBubbles;
	}
	return result;
}

// function getBubblesByNote(note, instrument, noteNames) {
//   const result = {};
//   for (let stringIndex = 0; stringIndex < instrument.strings.length; stringIndex++) {
//     const string = instrument.strings[stringIndex];
//     const stringBubbles = {};
//     for (let fretIndex = 0; fretIndex <= instrument.numberOfFrets; fretIndex++) {
//           const fretNoteIndex = (fretIndex + string) % 12
//           if (fretNoteIndex === note) {
//             const fretNoteName = noteNames[fretNoteIndex];
//             stringBubbles[fretIndex] = {
//               text: fretNoteName
//             }
//           }
//     }
//     result[stringIndex+1] = stringBubbles;
//   }
//   return result;
// }


export const DefaultInstruments = {
	ukulele: new Instrument(
		'Ukulele',
		[1, 8, 4, 11],
		14,
		{
			5: FretMarkType.Single,
			7: FretMarkType.Single,
			10: FretMarkType.Single,
			12: FretMarkType.Double,
		},
	),
	guitar: new Instrument (
		'guitar',
		[8, 3, 11, 6, 1, 8],
		16,
		{
			5: FretMarkType.Single,
			7: FretMarkType.Single,
			9: FretMarkType.Single,
			12: FretMarkType.Double,
			15: FretMarkType.Single,
			19: FretMarkType.Single,
			21: FretMarkType.Single,
		},
	),
};



