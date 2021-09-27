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
	font-family: Lato, sans-serif;
}
* {
	margin: 0;
	padding: 0;
}

.fretboard {
	--string-height: 10;
	--fretboard-height: 300;
	display: flex;
	flex-direction: column;
	width: fit-content;
	min-width: 100%;
	height: calc(var(--fretboard-height) * 1px);
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
	z-index: 1;
	position: absolute;
	top: calc(var(--string-top) * 1px);
}
.string-fret {
	display: flex;
	flex: 1;
	justify-content: center;
	align-items: center;
	position: relative;
}

.string-fret:first-child {
	min-width: 76px;
	border-right: 12px solid;
	flex-grow: 0;
	flex-shrink: 0;
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
	position: absolute;
}

.single-fretmark::after,
.double-fretmark::before,
.double-fretmark::after {
	content: "";
	position: absolute;
	height: 20px;
	width: 20px;
	border-radius: 50%;
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

@media print {
	.fretboard {
		--fretboard-height: 150;
	}
	.string:first-child {
		border-top: grey;
		border-top-width: 2px;
		border-top-style: solid;
	}
	.string:last-child {
		border-bottom: grey;
		border-bottom-width: 2px;
		border-bottom-style: solid;
	}
	.string {
		border-left: grey 3px solid;
	}
	.string::before {
		background: linear-gradient(#000, #000);
		height: 3px;
	}
	.string-fret {
		display: flex;
		flex: 1;
		border-right: 8px solid;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.bubble {
		color: black !important;
		background-color: white !important;
		border: grey 1px solid;
		opacity: 1;
		width: 16px;
		height: 16px;
		line-height: 16px;
		font-size:66%
	}

	.string-fret:first-child {
		background-color: lightgrey;
	}
	.single-fretmark::after,
	.double-fretmark::before,
	.double-fretmark::after {
		background-color: darkgrey;
		height: 10px;
		width: 10px;
	}
}

@media screen {
	.fretboard {
		background-color: #be975b;
	}
	.string {
		border: none;
	}
	.string::before {
		height: calc(var(--string-height) * 1px);
		background: linear-gradient(rgb(245, 244, 244), #999);
		box-shadow: 76px 3px 10px #8d6d3d;
	}
	.string-fret {
		border-right: 8px solid;
		border-image: linear-gradient(to left, #777, #bbb, #777) 1 100%;
	}
	.string-fret:first-child {
		background-color: #171717;
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
		background-color: #806233;
	}
}
</style>
