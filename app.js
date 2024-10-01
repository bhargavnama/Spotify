let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongInfo = document.getElementById("masterSongInfo");


let songs = [
    { songName: "Salam-e-Ishq1", filePath: "./songs/1.mp3", coverPath: "./covers/10.jpg" },
    { songName: "Salam-e-Ishq2", filePath: "./songs/2.mp3", coverPath: "./covers/9.jpg" },
    { songName: "Salam-e-Ishq3", filePath: "./songs/3.mp3", coverPath: "./covers/8.jpg" },
    { songName: "Salam-e-Ishq4", filePath: "./songs/4.mp3", coverPath: "./covers/7.jpg" },
    { songName: "Salam-e-Ishq5", filePath: "./songs/5.mp3", coverPath: "./covers/6.jpg" },
    { songName: "Salam-e-Ishq6", filePath: "./songs/6.mp3", coverPath: "./covers/5.jpg" },
    { songName: "Salam-e-Ishq7", filePath: "./songs/7.mp3", coverPath: "./covers/4.jpg" },
    { songName: "Salam-e-Ishq8", filePath: "./songs/8.mp3", coverPath: "./covers/3.jpg" },
    { songName: "Salam-e-Ishq9", filePath: "./songs/9.mp3", coverPath: "./covers/2.jpg" },
    { songName: "Salam-e-Ishq10", filePath: "./songs/10.mp3", coverPath: "./covers/1.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//handle play/pause click
masterPlay.addEventListener('click', () => {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove("fa-circle-play");
        songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add("fa-circle-pause");
        masterSongInfo.innerText = songs[songIndex].songName;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to events
audioElement.addEventListener("timeupdate", () => {
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    progressBar.value = progress;
})

progressBar.addEventListener("change", () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
    element.addEventListener("click", (e) => {
        makeAllPlays();
        audioElement.src = `./songs/${i+1}.mp3`;
        songIndex = i; // update songIndex
        if(audioElement.paused || audioElement.currentTime <= 0){   
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            masterSongInfo.innerText = songs[i].songName;
            gif.style.opacity = 1;
        }
        else{
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            audioElement.pause();
            gif.style.opacity = 0;
        }
    })
})

document.getElementById("prev").addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    makeAllPlays();
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove("fa-circle-play");
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add("fa-circle-pause");
    masterSongInfo.innerText = songs[songIndex].songName;
})

document.getElementById("next").addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    makeAllPlays();
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.remove("fa-circle-play");
    songItems[songIndex].getElementsByClassName("songItemPlay")[0].classList.add("fa-circle-pause");
    masterSongInfo.innerText = songs[songIndex].songName;
})