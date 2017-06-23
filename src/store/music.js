import Vue from 'vue'

export default {
    state: {
        song: {
  
            docid: "11445555600345734161",
            id: "200281279",
            mid: "001OX8be0AXHjl",
            name: "平凡之路",
            singer: "朴树"
        }
    },
    getters: {
        audioSrc: state => {
            return `http://ws.stream.qqmusic.qq.com/${state.song.id}.m4a?fromtag=46`
        }
    },
    mutations: {
        /**
         * 播放该歌曲
         * 
         * @param {Object} state
         * @param {Object} qjUser
         */
        PLAY(state, song) {
            state.song = song
        },
    },
    actions: {
        PLAY({commit}, song) {
            commit('PLAY', song)
        },
    }
}