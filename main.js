
new Vue({
    el: "#app",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [
                {
                    name: "Kuch To Hai",
                    artist: "Armaan Malik",
                    cover: "https://c.saavncdn.com/677/Do-Lafzon-Ki-Kahani-Hindi-2016-500x500.jpg",
                    source: "https://pagalsong.in/uploads/systemuploads/mp3/Do%20Lafzon%20Ki%20Kahani/Kuch%20Toh%20Hai%20128%20Kbps.mp3 ",
                    url: "https://www.youtube.com/watch?v=Jis04VOZyEU&ab_channel=T-Series",
                    favorited: false
                },
                {
                    name: "Tay Hai",
                    artist: "Ankit Tiwari",
                    cover: "https://c.saavncdn.com/221/Rustom-Hindi-2018-20191029174008-500x500.jpg",
                    source: "https://m.99jani.com/mp3/go.php?id=Mojud%20Hai%20Har%20Saans%20Mein%20Song%20Download.mp3",
                    url: "https://www.youtube.com/watch?v=ROHb66fl0SY&ab_channel=ZeeMusicCompany",
                    favorited: true
                },
                {
                    name: "Tere Hawaale",
                    artist: "Arijit singh",
                    cover: "https://c.saavncdn.com/119/Tere-Hawaale-From-Laal-Singh-Chaddha-Hindi-2022-20220804093945-500x500.jpg",
                    source: "https://www.pagalworld.com.se/files/download/id/6793",
                    url: "https://www.youtube.com/watch?v=KUpwupYj_tY&ab_channel=T-Series",
                    favorited: false
                },
                {
                    name: "Choo Lo {Aalas ka pedh}",
                    artist: "The Local Train",
                    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfDFS0XKroCwJ2YW4PZAH7w8YUr9g6YzYClm03FQT6xZZXjmUjpR4NttCogryTbYYQk-E&usqp=CAU",
                    source: "https://hindi.djpunjab.app/load/1SURK_iO5wuydCPwqZKlIQ==/Choo%20Lo.mp3",
                    url: "https://www.youtube.com/watch?v=sFMRqxCexDk&ab_channel=TheLocalTrain",
                    favorited: false
                },
                {
                    name: "Kho Gaye Hum Kahan",
                    artist: "Prateek kuhad",
                    cover: "https://i2.wp.com/musicbunch.com/wp-content/uploads/2018/09/Kho-Gaye-Hum-Kahan-Lyrics.jpg?ssl=1",
                    source: "https://pwdown.info/11053/02%20Kho%20Gaye%20Hum%20Kahan%20-%20Baar%20Baar%20Dekho%20320Kbps.mp3",
                    url: "https://www.youtube.com/watch?v=vt4jX0iRgCg&ab_channel=ZeeMusicCompany",
                    favorited: true
                },
                {
                    name: "Baarishein",
                    artist: "Anuv Jain",
                    cover: "https://i1.sndcdn.com/artworks-GcfPSyEk854Tog9W-Ab39gw-t500x500.jpg",
                    source: "https://paglasongs.com/files/download/id/13169",
                    url: "https://www.youtube.com/watch?v=PJWemSzExXs&ab_channel=AnuvJain",
                    favorited: false
                },
                {
                    name: "Kho Gaye",
                    artist: "Taaruk Raina",
                    cover: "https://tellyflight.com/wp-content/uploads/2022/11/kho-gye-song-1016x1024.jpg",
                    source: "https://pagalworldl.com/files/download/id/14235",
                    url: "https://www.youtube.com/watch?v=lmhKXQBgEQU&ab_channel=NetflixIndia",
                    favorited: true
                },
                {
                    name: "Gul",
                    artist: "Anuv Jain",
                    cover: "https://lastfm.freetls.fastly.net/i/u/ar0/0ad7721ec911ed1e86c02492baddeb2e.jpg",
                    source: "https://paglasongs.com/files/download/id/13347",
                    url: "https://www.youtube.com/watch?v=SmaY7RfBgas&ab_channel=AnuvJain",
                    favorited: true
                },

            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },

    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },

        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },

        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },

        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },

        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },

        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },

        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if (this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },

        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
            ].favorited;
        }
    },

    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function () {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function () {
            vm.generateTime();
        };
        this.audio.onended = function () {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };


        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});
