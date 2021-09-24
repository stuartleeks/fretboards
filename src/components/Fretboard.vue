<template>
	<div class="fretboard" :style="fretboardStyle">
		<div
			v-for="(string, stringIndex) in instrument.strings"
			class="string"
			:key="stringIndex"
		>
			<div
				v-for="(_, fretIndex) in instrument.numberOfFrets + 1"
				:key="fretIndex"
				class="string-fret"
				:class="{
					'single-fretmark':
						stringIndex === 0 && instrument.fretMarks[fretIndex] === 'single',
				}"
				:data-notex="getBubbleText(stringIndex, fretIndex)"
			>
				<span
					v-if="getBubbleText(stringIndex, fretIndex)"
					class="bubble"
					:style="{
						color: getBubbleTextColor(stringIndex, fretIndex),
						backgroundColor: getBubbleColor(stringIndex, fretIndex),
					}"
				>
					{{ getBubbleText(stringIndex, fretIndex) }}
				</span>
				<div
					v-if="
						stringIndex === 0 && instrument.fretMarks[fretIndex] === 'double'
					"
					class="double-fretmark"
				></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		instrument:
			Object /* TODO create ctor function for stronger typing: https://vuejs.org/v2/guide/components-props.html#Type-Checks */,
		bubbles: Object /* key on string _number_ then fret _number_ */,
	},
	methods: {
		getBubble(stringIndex, fretIndex) {
			if (!this.bubbles) {
				return null;
			}
			const stringBubbles = this.bubbles[stringIndex + 1]; // keyed on string number
			if (!stringBubbles) {
				return null;
			}
			return stringBubbles[fretIndex]; //keyed on fret number (starting at zero), i.e. fret index
		},
		getBubbleText(stringIndex, fretIndex) {
			return this.getBubble(stringIndex, fretIndex)?.text;
		},
		getBubbleColor(stringIndex, fretIndex) {
			const bubble = this.getBubble(stringIndex, fretIndex);
			if (!bubble) {
				return null;
			}
			return bubble.color ?? "yellow";
		},
		getBubbleTextColor(stringIndex, fretIndex) {
			const bubble = this.getBubble(stringIndex, fretIndex);
			if (!bubble) {
				return null;
			}
			return bubble.textColor ?? "black";
		},
	},
	computed: {
		fretboardStyle() {
			return {
				"--string-count": this.instrument.strings.length,
				"--fretboard-height": 300,
				"--string-height": 10,
				"--string-top":
					"calc(((var(--fretboard-height) - var(--string-height))/ var(--string-count)) / 2 - 2)",
			};
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato:100,300,400");

body {
	background-color: aqua;
	font-family: Lato, sans-serif;
}

* {
	margin: 0;
	padding: 0;
}

.fretboard {
	display: flex;
	flex-direction: column;
	background-color: #be975b;
	width: fit-content;
	min-width: 100%;
	height: calc(var(--fretboard-height) * 1px);
	margin-top: 50px;
	overflow: hidden; /* prevent offset box shadow from string overflowing*/
}

.string {
	width: 100%;
	height: 100%;
	display: flex;
	position: relative;
}

.string::before {
	content: "";
	width: 100%;
	height: calc(var(--string-height) * 1px);
	background: linear-gradient(rgb(245, 244, 244), #999);
	box-shadow: 76px 3px 10px #8d6d3d;
	z-index: 1;
	position: absolute;
	top: calc(var(--string-top) * 1px);
}

.string-fret {
	display: flex;
	flex: 1;
	border-right: 8px solid;
	border-image: linear-gradient(to left, #777, #bbb, #777) 1 100%;
	justify-content: center;
	align-items: center;
	position: relative;
}

.string-fret:first-child {
	background-color: #171717;
	min-width: 76px;
	border-right: 12px solid;
	flex-grow: 0;
	flex-shrink: 0;
	border-image: linear-gradient(to left, #777, #fff, #bbb) 1 100%;
}

.string-fret::before,
.string-fret:first-child::before {
	content: attr(data-note);
	width: 33px;
	height: 33px;
	border-radius: 50%;
	line-height: 33px;
	text-align: center;
	z-index: 3;
	color: lightgray;
	opacity: 0.8;
}
.bubble {
	width: 33px;
	height: 33px;
	border-radius: 50%;
	line-height: 33px;
	text-align: center;
	z-index: 3;
	color: gray;
	background-color: yellow;
	position: absolute;
	opacity: 0.8;
}

.single-fretmark::after,
.double-fretmark::before,
.double-fretmark::after {
	content: "";
	position: absolute;
	height: 20px;
	width: 20px;
	border-radius: 50%;
	background-color: #806233;
}

.single-fretmark::after {
	top: calc(var(--fretboard-height) / 2 * 1px);
	transform: translate(0, -50%);
}

.double-fretmark::before {
	top: calc(var(--fretboard-height) * 1 / 3 * 1px);
	transform: translate(-140%, -50%);
}

.double-fretmark::after {
	top: calc(var(--fretboard-height) * 2 / 3 * 1px);
	transform: translate(-140%, -50%);
}
</style>
