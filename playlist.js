var playlistGenerator = function() {
  "use strict";
  function _generateRandomPlaylist(seed) {
    var random = null;
    if (typeof alea === 'function') {
      random = alea(seed);
    } else {
      random = Math.random;
    }
    var playlist = [];
    for(var trackIndex = 0; trackIndex < _playlistOptions.length; trackIndex++) {
      var track = _playlistOptions[trackIndex];
      var trackVersions = track.versions;
      var randomNumber = random();
      var randomIndex = Math.floor(randomNumber * trackVersions.length);
      var chosenVersion = trackVersions[randomIndex];
      var trackInfo = {
        title: chosenVersion.title || track.title,
        file: chosenVersion.file
      }
      playlist.push(trackInfo)
    }
    return playlist;
  }
  function _generateAudioSourceElement(track, trackIndex) {
    var element = document.createElement("source");
    element.setAttribute("src", track.file);
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
    trackTitleLink.textContent = track.title;
    
    trackTitle.appendChild(trackTitleLink);

    row.appendChild(smallToggle);
    row.appendChild(trackNumberElement);
    row.appendChild(trackTitle);

    return row;
  }
  function _setAudioPlaylist(tracks) {
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
  function _generateShareableUrl(seed) {
    var shareableUrl = window.location.href;
    if(!validSeedFromWindowHash()) {
      if(shareableUrl.indexOf('#') < 0) {
        shareableUrl += '#'
      }
      shareableUrl += seed;
    }
    document.querySelector('.share-play-list').textContent = shareableUrl;
  }
  var initPlaylist = function() {
    var seed = playlistRandomSeed;
    var playlist = _generateRandomPlaylist(seed);
    _setAudioPlaylist(playlist);
    _generateShareableUrl(seed);
    document.querySelector('#debug').textContent = JSON.stringify(playlist, null, 2);
  }
  return {
    initPlaylist: initPlaylist
  };
};

(function() {
  var generator = new playlistGenerator();

  generator.initPlaylist();
})();
