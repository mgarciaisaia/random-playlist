var playlistGenerator = function() {
  "use strict";
  var _playlistOptions = [
    [
      "audios/track01-version01.mp3",
      "audios/track01-version02.mp3",
      "audios/track01-version03.mp3"
    ],
    [
      "audios/track02-version01.mp3",
      "audios/track02-version02.mp3",
      "audios/track02-version03.mp3",
      "audios/track02-version04.mp3"
    ],
    [
      "audios/track03-version01.mp3",
      "audios/track03-version02.mp3"
    ]
  ];
  function _generateRandomPlaylist() {
    var playlist = [];
    for(var trackIndex = 0; trackIndex < _playlistOptions.length; trackIndex++) {
      var trackVersions = _playlistOptions[trackIndex];
      var chosenVersion = trackVersions[Math.floor(Math.random() * trackVersions.length)];
      playlist.push(chosenVersion)
    }
    return playlist;
  }
  function _generateAudioSourceElement(track, trackIndex) {
    var element = document.createElement("source");
    element.setAttribute("src", track);
    element.dataset.trackNumber = trackIndex + 1;
    return element;
  }
  function _generatePlaylistRowElement(track, trackIndex) {
    var trackNumber = trackIndex + 1;
    var row = document.createElement("div");
    row.classList.add("play-list-row");
    row.dataset.trackRow = trackNumber;

    var smallToggle = document.createElement("div");
    smallToggle.classList.add("small-toggle-btn");

    var smallPlayButton = document.createElement("i");
    smallPlayButton.classList.add("small-play-btn");

    var smallToggleScreenReader = document.createElement("span");
    smallToggleScreenReader.classList.add("screen-reader-text");
    smallToggleScreenReader.textContent = "Small toggle button";

    smallPlayButton.appendChild(smallToggleScreenReader);
    smallToggle.appendChild(smallPlayButton);

    var trackNumberElement = document.createElement("div");
    trackNumberElement.classList.add("track-number");
    trackNumberElement.textContent = "" + trackNumber + ". ";

    var trackTitle = document.createElement("div");
    trackTitle.classList.add("track-title");

    var trackTitleLink = document.createElement("a");
    trackTitleLink.classList.add("playlist-track");
    trackTitleLink.href = "#";
    trackTitleLink.dataset.playTrack = trackNumber;
    trackTitleLink.textContent = track; // FIXME: extract title from track object
    
    trackTitle.appendChild(trackTitleLink);

    row.appendChild(smallToggle);
    row.appendChild(trackNumberElement);
    row.appendChild(trackTitle);

    return row;
  }
  function setAudioPlaylist(tracks) {
    var player = document.querySelector('#audio');
    var playlist = document.querySelector('.play-list');
    for(var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
      var track = tracks[trackIndex];
      var audioSource = _generateAudioSourceElement(track, trackIndex);
      player.appendChild(audioSource);
      var playlistRowElement = _generatePlaylistRowElement(track, trackIndex);
      playlist.appendChild(playlistRowElement);
    }
  }
  var initPlaylist = function() {
    var playlist = _generateRandomPlaylist();
    setAudioPlaylist(playlist);
    document.querySelector('#debug').textContent = playlist.join("\n")
  }
  return {
    initPlaylist: initPlaylist
  };
};

(function() {
  var generator = new playlistGenerator();

  generator.initPlaylist();
})();
