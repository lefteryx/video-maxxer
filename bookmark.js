javascript:(function(){
  alert('Bookmarklet started!');
  let video = document.querySelector('video');
  if (video) {
    let speedDisplay = document.getElementById('videoSpeedDisplayBookmarklet');
    if (!speedDisplay) {
      speedDisplay = document.createElement('div');
      speedDisplay.id = 'videoSpeedDisplayBookmarklet';
      speedDisplay.style.position = 'fixed';
      speedDisplay.style.top = '10px';
      speedDisplay.style.left = '10px';
      speedDisplay.style.padding = '5px 10px';
      speedDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
      speedDisplay.style.color = 'white';
      speedDisplay.style.borderRadius = '5px';
      speedDisplay.style.zIndex = '2147483647';
      speedDisplay.style.fontSize = '16px';
      speedDisplay.style.fontFamily = 'Arial, sans-serif';
      speedDisplay.style.opacity = '0';
      speedDisplay.style.transition = 'opacity 0.3s ease-in-out';
      document.body.appendChild(speedDisplay);
    }
    
    let displayTimeout;

    function showIndicator(message) {
      if (!speedDisplay) return;
      speedDisplay.textContent = message;
      speedDisplay.style.opacity = '1';
      clearTimeout(displayTimeout);
      displayTimeout = setTimeout(function() {
        speedDisplay.style.opacity = '0';
      }, (message.includes('Speed:')) ? 3000 : 1500);
    }

    document.removeEventListener('keydown', window._videoBookmarkletKeydownHandler);

    window._videoBookmarkletKeydownHandler = function(event) {
      if (!document.querySelector('video')) return;
      video = document.querySelector('video');

      const targetTagName = event.target.tagName.toLowerCase();
      const isContentEditable = event.target.isContentEditable;

      if ((event.key.toLowerCase() === 'z' || event.key.toLowerCase() === 'x' || event.key.toLowerCase() === 's' || event.key.toLowerCase() === 'd') && 
          (targetTagName === 'input' || targetTagName === 'textarea' || isContentEditable)) {
        return;
      }

      let newSpeed;
      switch (event.key.toLowerCase()) {
        case 's':
          event.preventDefault();
          newSpeed = Math.max(0.1, parseFloat((video.playbackRate - 0.1).toFixed(1)));
          if (video.playbackRate !== newSpeed) {
            video.playbackRate = newSpeed;
            showIndicator('Speed: ' + video.playbackRate.toFixed(1) + 'x');
            console.log('Playback rate: ' + video.playbackRate.toFixed(1));
          }
          break;
        case 'd':
          event.preventDefault();
          newSpeed = parseFloat((video.playbackRate + 0.1).toFixed(1));
           if (video.playbackRate !== newSpeed) {
            video.playbackRate = newSpeed;
            showIndicator('Speed: ' + video.playbackRate.toFixed(1) + 'x');
            console.log('Playback rate: ' + video.playbackRate.toFixed(1));
          }
          break;
        case 'z':
          event.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          showIndicator('-10s');
          console.log('Current time: ' + video.currentTime.toFixed(1));
          break;
        case 'x':
          event.preventDefault();
          video.currentTime = Math.min(video.duration || Infinity, video.currentTime + 10);
          showIndicator('+10s');
          console.log('Current time: ' + video.currentTime.toFixed(1));
          break;
      }
    };

    document.addEventListener('keydown', window._videoBookmarkletKeydownHandler);
    
    showIndicator('Controls: S/D Speed, Z/X Seek');

  } else {
    alert('No video found on this page.');
  }
})();
