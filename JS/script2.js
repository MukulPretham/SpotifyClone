
function getSongs() {
    let url1 = "https://pagalfree.com/musics/128-Kissik%20-%20Pushpa%202%20The%20Rule%20128%20Kbps.mp3"
    let url2 = "https://pagalfree.com/musics/128-Bhool%20Bhulaiyaa%203%20-%20Title%20Track%20(Feat.%20Pitbull)%20-%20Bhool%20Bhulaiyaa%203%20128%20Kbps.mp3"
    let url3 = "https://pagalfree.com/musics/128-Aaj%20Ki%20Raat%20-%20Stree%202%20128%20Kbps.mp3"
    let url4 = "https://pagalfree.com/musics/128-Aayi%20Nai%20-%20Stree%202%20128%20Kbps.mp3"
    let url5 = "https://pagalfree.com/musics/128-Mere%20Mehboob%20Mere%20Sanam%20-%20Bad%20Newz%20128%20Kbps.mp3"
    let links = [url1,url2,url3,url4,url5];
    let songs = [];
    for (const element of links) {
        songs.push(element.split("128-")[1].replaceAll("%20"," ").split("128 Kbps.mp3")[0]);
        // songs.push(element.href);
    }
    return songs;
}

//Returns array, consisting .mp3 links of the songs.
function getSONGS() {
    let url1 = "https://pagalfree.com/musics/128-Kissik%20-%20Pushpa%202%20The%20Rule%20128%20Kbps.mp3"
    let url2 = "https://pagalfree.com/musics/128-Bhool%20Bhulaiyaa%203%20-%20Title%20Track%20(Feat.%20Pitbull)%20-%20Bhool%20Bhulaiyaa%203%20128%20Kbps.mp3"
    let url3 = "https://pagalfree.com/musics/128-Aaj%20Ki%20Raat%20-%20Stree%202%20128%20Kbps.mp3"
    let url4 = "https://pagalfree.com/musics/128-Aayi%20Nai%20-%20Stree%202%20128%20Kbps.mp3"
    let url5 = "https://pagalfree.com/musics/128-Mere%20Mehboob%20Mere%20Sanam%20-%20Bad%20Newz%20128%20Kbps.mp3"
    let links = [url1,url2,url3,url4,url5];
    let SONGS = [];
    for (const element of links) {
        SONGS.push(element);
    }
    return SONGS;
}



async function main() {
    //Getting the songs.
    let songs = getSongs();
    console.log(songs);
    let SONGS = getSONGS();
    console.log(SONGS);
    // let BGS = getBGS();
    // console.log(BGS);

    //Adding songs to playlist.
    for (const element of songs) {
        let songOL = document.querySelector(".songList").getElementsByTagName("ol")[0];
        songOL.innerHTML = songOL.innerHTML + `<div class="playNow">
                        <li>${element}</li>
                        <img class="hover" src="./logos/play-song.svg" alt="">
                    </div>`;
    }

    let buttons = document.querySelectorAll(".playNow img");
    let currentAudio = null;
    let playing = false;
    let currentIndex = null;
    let seekBar = document.querySelector(".seekBar");
    let volSeek = document.querySelector(".volSeek");
    buttons.forEach((button,index)=>{
        //Playing Song.
        button.addEventListener("click",()=>{
            currentIndex = index;
            if(currentAudio){
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            let info = document.querySelector(".song-info");
            info.innerHTML = songs[currentIndex];
            currentAudio = new Audio(SONGS[currentIndex]);
            currentAudio.play();
            playing = true;
            if(playing){
                let play = document.querySelector(".PLAY").getElementsByTagName("img")[0];
                play.src = "./logos/pause.svg";
            }

            //Adding background image of the current song.
            // let bg = document.querySelector(".song-img");
            // bg.style.backgroundImage = `url(${BGS[currentIndex]})`;
            // bg.style.backgroundSize = "cover";

            //Seekbar max value is set as the songs loads.
            currentAudio.addEventListener("loadedmetadata", () => {
                if (currentAudio) {
                    seekBar.max = currentAudio.duration;
                }
            });

            //seekbar starts at 0 when every play btn pressed.
            currentAudio.addEventListener("timeupdate", () => {
                if (currentAudio) {
                    seekBar.value = currentAudio.currentTime;
                }
            });

            volSeek.value = 10;

        })
    })

    let play = document.querySelector(".play-btn");
    play.addEventListener("click",()=>{
        if(playing){
            currentAudio.pause();
            playing = false;
            let play = document.querySelector(".PLAY").getElementsByTagName("img")[0];
            play.src = "./logos/play.svg";
        }else{
            currentAudio.play();
            playing = true;
            let play = document.querySelector(".PLAY").getElementsByTagName("img")[0];
            play.src = "./logos/pause.svg";
        }
    })

    let next = document.querySelector(".next");
    next.addEventListener("click",()=>{
        if(currentIndex == SONGS.length-1){
            currentIndex = 0;
        }else{
            currentIndex++;
        }
        if(currentAudio){
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = new Audio(SONGS[currentIndex]);
        currentAudio.play();

        let info = document.querySelector(".song-info");
        info.innerHTML = songs[currentIndex];

        currentAudio.addEventListener("loadedmetadata", () => {
            if (currentAudio) {
                seekBar.max = currentAudio.duration;
            }
        });

        //seekbar starts at 0 when every play btn pressed.
        currentAudio.addEventListener("timeupdate", () => {
            if (currentAudio) {
                seekBar.value = currentAudio.currentTime;
            }
        });

        volSeek.value = 10;

        // let bg = document.querySelector(".song-img");
        // bg.style.backgroundImage = `url(${BGS[currentIndex]})`;
        // bg.style.backgroundSize = "cover";
    })

    let prev = document.querySelector(".prev");
    prev.addEventListener("click",()=>{
        if(currentIndex == 0){
            currentIndex = SONGS.length - 1;
        }else{
            currentIndex--;
        }
        if(currentAudio){
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        currentAudio = new Audio(SONGS[currentIndex]);
        currentAudio.play();

        let info = document.querySelector(".song-info");
        info.innerHTML = songs[currentIndex];

        currentAudio.addEventListener("loadedmetadata", () => {
            if (currentAudio) {
                seekBar.max = currentAudio.duration;
            }
        });

        //seekbar starts at 0 when every play btn pressed.
        currentAudio.addEventListener("timeupdate", () => {
            if (currentAudio) {
                seekBar.value = currentAudio.currentTime;
            }
        });

        volSeek.value = 10;

        // let bg = document.querySelector(".song-img");
        // bg.style.backgroundImage = `url(${BGS[currentIndex]})`;
        // bg.style.backgroundSize = "cover";
    })
    
    // we can change the currentTime of the song by draging
    seekBar.addEventListener("input", (e) => {
        if (currentAudio) {
            currentAudio.currentTime = e.target.value;
        }
    });

    // Evey time the time updates 
    if (currentAudio) {
        currentAudio.addEventListener("timeupdate", () => {
            if (currentAudio) {
                seekBar.value = currentAudio.currentTime;
            }
        });
    }


    //Volume adjusting.

    volSeek.addEventListener("input",(e)=>{
        if(currentAudio){
            currentAudio.volume = (e.target.value)/10;
        }
    })

    setInterval(()=>{
        if (currentAudio.currentTime >= currentAudio.duration) {
            document.querySelector(".next").click();
            currentAudio.play();
        }
    },100)

}
main();

let ham = false;
//setting up hamburger feature
let hamBurger = document.querySelector(".hamburger");
let aside = document.getElementsByTagName("aside")[0];
hamBurger.addEventListener("click",()=>{
    if( aside.style.left == "-100%"){
        aside.style.left = "0";
        ham = true;
        let hamLogo = document.querySelector(".hamburger");
        hamLogo.src = "./logos/hamClose.svg"
    }else{
        aside.style.left = "-100%";
        ham = false;
        let hamLogo = document.querySelector(".hamburger");
        hamLogo.src = "./logos/hamburger.svg"
    }
})
//auto next.
