<template>
  <div id="app">
    <Fretboard v-for="(fretboard, index) in fretboards" :instrument="fretboard.instrument" :bubbles="fretboard.bubbles" :key="index" />
  </div>
</template>

<script>
import Fretboard from "./components/Fretboard.vue";

const noteNames = {
  flat : {
      0: 'Ab',
      1: 'A',
      2: 'Bb',
      3: 'B',
      4: 'C',
      5: 'Db',
      6: 'D',
      7: 'Eb',
      8: 'E',
      9: 'F',
      10: 'Gb',
      11: 'G'
  },
  sharp : {
      0: 'G#',
      1: 'A',
      2: 'A#',
      3: 'B',
      4: 'C',
      5: 'C#',
      6: 'D',
      7: 'D#',
      8: 'E',
      9: 'F',
      10: 'F#',
      11: 'G'
  }
}

const instruments = {
    'ukulele': {
        numberOfFrets: 14,
        strings: [1, 8, 4, 11],
        fretMarks: {
            5: 'single',
            7: 'single',
            10: 'single',
            12: 'double',
        }
    },
    'guitar': {
        numberOfFrets: 16,
        strings: [8, 3, 11, 6, 1, 8],
        fretMarks: {
            5: 'single',
            7: 'single',
            9: 'single',
            12: 'double',
            15: 'single',
            19: 'single',
            21: 'single',
        }
    }
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

function getBubblesByMajorKey(keyNote, instrument, noteNames) {
  const keyNotes = getNotesForMajorKey(keyNote);
  const result = {};
  for (let stringIndex = 0; stringIndex < instrument.strings.length; stringIndex++) {
    const string = instrument.strings[stringIndex];
    const stringBubbles = {};
    for (let fretIndex = 0; fretIndex <= instrument.numberOfFrets; fretIndex++) {
          const fretNoteIndex = (fretIndex + string) % 12
          if (keyNotes.indexOf(fretNoteIndex) !== -1) {
            const fretNoteName = noteNames[fretNoteIndex];
            stringBubbles[fretIndex] = {
              text: fretNoteName,
              color: fretNoteIndex === keyNote ? 'orange' : 'yellow',
            }
          }
    }
    result[stringIndex+1] = stringBubbles;
  }
  return result;
}


function getNotesForMajorKey(keyNote) {
  const intervals = [2,2,1,2,2,2,1];
  const notes = [keyNote];
  let note = keyNote;
  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    note = (note + interval) % 12;
    notes.push(note);
  }
  return notes
}


export default {
  name: "App",
  components: {
    Fretboard,
  },
  data() {
    return {
      fretboards: [
        {
          instrument: instruments.guitar,
          // bubbles: {
          //   1 : {
          //     0: { text: 'O', color: 'white', textColor: 'black'},
          //     1: { text: '1'}
          //   }
          // }
          // bubbles: getBubblesByNote(4, instruments.guitar, noteNames.sharp),
          bubbles: getBubblesByMajorKey(1, instruments.guitar, noteNames.sharp),
        },
        {
          instrument: instruments.ukulele,
          // bubbles: getBubblesByNote(4, instruments.ukulele, noteNames.sharp),
          bubbles: getBubblesByMajorKey(1, instruments.ukulele, noteNames.sharp),
        },
        {
          instrument: instruments.ukulele,
          bubbles: getBubblesByMajorKey(6, instruments.ukulele, noteNames.sharp),
        },
        {
          instrument: instruments.ukulele,
          bubbles: getBubblesByMajorKey(8, instruments.ukulele, noteNames.sharp),
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
