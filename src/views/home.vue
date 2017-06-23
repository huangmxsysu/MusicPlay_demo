<template>
	<div id="main">
		<header class="header" :class="{headerBg: true}">
			<!-- <img src="../assets/images/music.png" class="music btn"> -->
			<input type="text" class="searchInput" placeholder="搜索音乐、歌手、歌词" 
				v-model.trim="searchParams.key"
				@focus="search">
			<img src="../assets/images/cancel.png" class="cancel btn"
				@click="cancel" 
				v-show="searchList.length > 0">
		</header>
		<ul class="searchList" v-show="searchList.length > 0">
			<li class="searchItem" v-for="item in searchList" @click="play(item)">
				<div class="song searchContent">{{item.name}}</div>
				<div class="singer searchContent">{{item.singer}}</div>
			</li>
		</ul>
		<div id="playerContainer">
			<div class="player" 
				:class="{playerPaused: !isPlaying, playerRunning: isPlaying}"
				@click="pause"></div>
			<img src="../assets/images/stick.png" class="stick" :class="{stickUp: !isPlaying}">
		</div>
		<audio id="audio" :src="audioSrc" controls autoplay loop></audio>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default {
		data() {
			return {
				// 搜索参数
				searchParams: {
					key: '',
					g_tk:5381,
					loginUin:0,
					hostUin:0,
					format:'jsonp',
					inCharset:'utf8',
					outCharset:'utf-8',
					notice:0,
					platform:'yqq',
					needNewCode:0,
				},
				searchList: [],			// 搜索结果
				isPlaying: true,		// 是否正在播放
			}
		},

		computed: {
			...mapState(['music']),
			...mapGetters(['audioSrc'])
		},

		watch: {
			'searchParams.key': function(newVal, oldVal) {
				if (newVal) {
					this.search()
				} else {
					this.searchList = []
				}
			}
		},

		methods: {
			// 搜索歌曲
			search() {
				this.$http.jsonp('http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', {params: this.searchParams, jsonp: 'jsonpCallback'}).then((response) => {
					if (response.data.code === 0) {
						this.searchList = response.data.data.song.itemlist
					}
				})
			},

			// 取消
			cancel() {
				this.searchList = []
				this.searchParams.key = ''
			},

			// 暂停歌曲
			pause() {
				const audio = document.getElementById('audio')
				if (audio.paused) {
					audio.play()
					this.isPlaying = true
				} else {
					audio.pause()
					this.isPlaying = false
				}
			},

			// 播放该歌曲
			play(item) {
				this.PLAY(item)
				console.log(item)
				this.searchList = []
			},

			...mapActions(['PLAY'])
		}
	}
</script>

<style lang="less" scoped>
	#main{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-top: 1.466667rem;
		background-color: #fff;
	}

	.header{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 1.466667rem;
		background-color: #d43c33;

		.searchInput{
			position: absolute;
			width: 5.413333rem;
			height: 0.92rem;
			top: 50%;
			left: 50%;
			padding-left: 1.2rem;
			background: url(../assets/images/search.png) 0.533333rem center no-repeat;
			background-size: 0.4rem;
			background-color: #fff;
			transform: translate3d(-50%, -50%, 0);
			border-radius: 0.066667rem;
			border: none;
			outline: none;
			// color: #d1d1d3;
		}

		.btn{
			position: absolute;
			width: 0.666667rem;
			top: 50%;
			transform: translate3d(0, -50%, 0);
			// pointer-events: none;
		}

		.music{
			left: 0.413333rem;
		}

		.search, .cancel{
			right: 0.413333rem;
		}
	}

	.headerBg{
		background-color: #000;
	}

	.searchList{
		position: fixed;
		top: 1.466667rem;
		left: 50%;
		transform: translate3d(-50%, 0 , 0);
		z-index: 999;
		width: 100%;
		background-color: #fff;

		.searchItem{

			border-bottom: 1px solid #d1d1d3;
			padding: 0.066667rem 0.4rem;
		}

		.searchContent{
			width: 100%;
			padding: 0.133333rem 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.song{
			color: #000;
			font-size: 0.48rem;
			font-weight: bold;
		}

		.singer{
			color: #454646;
			font-size: 0.346667rem;
		}
	}

	#playerContainer{
		position: relative;
		width: 100%;
		height: 100%;
		background: linear-gradient(top, #000, #bebebe, #000);

		.player{
			position: absolute;
			width: 4.266667rem;
			height: 4.266667rem;
			left: 50%;
			top: 50%;
			margin-left: -3.013335rem;
			margin-top: -3.013335rem;
			border: 0.88rem solid #242424;
			border-radius: 50%;
			background: url(../assets/images/cover.jpeg) center no-repeat;
			background-size: 5rem;
			animation: circle 2s infinite linear;
		}

		.playerPaused{
			-webkit-animation-play-state: paused;
		}

		.playerRunning{
			-webkit-animation-play-state: running;
		}

		.stick{
			position: absolute;
			top: 18%;
			left: 46%;
			width: 2.0rem;
			transform-origin: 0 0;
			transition: all .5s;
		}
	}

	.stickUp{
		transform: rotate(-15deg);
	}

	@-webkit-keyframes circle{
		0%{transform: rotate(0deg);}
		100%{transform: rotate(-360deg);}
	}

	#audio{
		display: none;
	}

	.title{
		width: 100%;
		height: 1.333333rem;
		line-height: 1.333333rem;
		text-indent: 1.066667rem;
		font-size: 0.4rem;
		background: url(../assets/images/hot.png) 0.333333rem center no-repeat;
		background-size: 0.533333rem;
	}

	.hotList{
		width: 9.386667rem;
		margin: 0 auto;
		padding-bottom: 0.266667rem;
		font-size: 0;

		.hot{
			display: inline-block;
			margin-top: 0.133333rem;
			&:not(:nth-child(3n)){
				margin-right: 0.12rem;
			}

			img{
				width: 2.986667rem;
				height: 2.986667rem;
			}
		}
	}
</style>