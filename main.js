Object.defineProperty(Array.prototype, "allBut", {
  value: function (index) {
    return this.filter((v, i, a) => a[i] !== index);
  },
});

window.addEventListener("DOMContentLoaded", () => {
  
  document.querySelector("#stream1").src =
    document.querySelector("#stream1").src + "?nocache=" + new Date().getTime();
  document.querySelector("#stream2").src =
    document.querySelector("#stream2").src + "?nocache=" + new Date().getTime();

  const stations = Array.from(document.body.querySelectorAll(".station"));

  stations.slice(1, stations.length).forEach((el) => {
    el.classList.add("hidden");
  });
  
  const datalist = document.querySelector('#stations');
  datalist.innerHTML = stations.map((el, index) => `<option>${index+1}</option>`).join('');

  const dial = document.body.querySelector(".dial");
  
  dial.setAttribute('max', stations.length);
  dial.value = 1;
  
  
  dial.addEventListener("input", (event) => {
    const stationIndex = event.target.value - 1;

    const streamUrl = stations[stationIndex].getAttribute("data-url");
    const audioNode = document.body.querySelector("audio");

    Array.from(audioNode.children).forEach((sourceEl) => {
      sourceEl.setAttribute("src", streamUrl+ "?nocache=" + new Date().getTime());
      audioNode.load();
    });

    stations.allBut(stationIndex).forEach((el) => {
      el.classList.add("hidden");
    });
    stations[stationIndex].classList.remove("hidden");
  });

  dial.classList.remove("hidden");
});

const player = new Plyr("audio", {
  controls: ["play-large", "play", "mute", "volume", "airplay"],
});

player.on('loadstart', (event) => {
  document.querySelectorAll('.station').forEach((el) => {
    el.classList.add('loading');
  })
});
          
player.on('playing', (event) => {
  document.querySelectorAll('.station').forEach((el) => {
    el.classList.remove('loading');
  })
});

window.player = player;
