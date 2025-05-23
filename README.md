# video-maxxer

A simple browser bookmarklet to control the playback speed and seek time of HTML5 videos using keyboard shortcuts. Get on-screen feedback for your actions.

## Features

* **Adjust Playback Speed:**
    * Increase speed by 0.1x increments.
    * Decrease speed by 0.1x increments (minimum 0.1x).
* **Seek Through Video:**
    * Go forward 10 seconds.
    * Go backward 10 seconds.
* **On-Screen Display:**
    * Temporarily shows the current playback speed in the top-left corner when changed.
    * Temporarily shows the seek action (e.g., "+10s" or "-10s") in the top-left corner.
* **Input Field Aware:**
    * Keyboard shortcuts are automatically disabled if you are typing in an input field, textarea, or a contenteditable area, preventing interference with typing.
* **Idempotent:** Clicking the bookmarklet multiple times on the same page won't stack event listeners or create duplicate display elements.

## Installation & Usage

1.  **Create a New Bookmark:**
    * In your browser (e.g., Chrome, Firefox, Edge), right-click on your bookmarks bar and select "Add Page..." or "Add Bookmark...".
    * Alternatively, go to your Bookmark Manager and choose to add a new bookmark.

2.  **Name the Bookmark:**
    * Give it a name, like "Video-Maxxer" or "Video Controls".

3.  **Copy the Code:**
    * In the "URL", "Address", or "Location" field for the bookmark, **delete any existing content** and then paste the **entire JavaScript code** provided below:

    ```javascript
    javascript:(function(){alert('Bookmarklet started!');let video=document.querySelector('video');if(video){let speedDisplay=document.getElementById('videoSpeedDisplayBookmarklet');if(!speedDisplay){speedDisplay=document.createElement('div');speedDisplay.id='videoSpeedDisplayBookmarklet';speedDisplay.style.position='fixed';speedDisplay.style.top='10px';speedDisplay.style.left='10px';speedDisplay.style.padding='5px 10px';speedDisplay.style.backgroundColor='rgba(0,0,0,0.75)';speedDisplay.style.color='white';speedDisplay.style.borderRadius='5px';speedDisplay.style.zIndex='2147483647';speedDisplay.style.fontSize='16px';speedDisplay.style.fontFamily='Arial,sans-serif';speedDisplay.style.opacity='0';speedDisplay.style.transition='opacity 0.3s ease-in-out';document.body.appendChild(speedDisplay)}let displayTimeout;function showIndicator(message){if(!speedDisplay)return;speedDisplay.textContent=message;speedDisplay.style.opacity='1';clearTimeout(displayTimeout);displayTimeout=setTimeout(function(){speedDisplay.style.opacity='0'},(message.includes('Speed:'))?3000:1500)}document.removeEventListener('keydown',window._videoBookmarkletKeydownHandler);window._videoBookmarkletKeydownHandler=function(event){if(!document.querySelector('video'))return;video=document.querySelector('video');const targetTagName=event.target.tagName.toLowerCase();const isContentEditable=event.target.isContentEditable;if((event.key.toLowerCase()==='z'||event.key.toLowerCase()==='x'||event.key.toLowerCase()==='s'||event.key.toLowerCase()==='d')&&(targetTagName==='input'||targetTagName==='textarea'||isContentEditable)){return}let newSpeed;switch(event.key.toLowerCase()){case's':event.preventDefault();newSpeed=Math.max(0.1,parseFloat((video.playbackRate-0.1).toFixed(1)));if(video.playbackRate!==newSpeed){video.playbackRate=newSpeed;showIndicator('Speed: '+video.playbackRate.toFixed(1)+'x');console.log('Playback rate: '+video.playbackRate.toFixed(1))}break;case'd':event.preventDefault();newSpeed=parseFloat((video.playbackRate+0.1).toFixed(1));if(video.playbackRate!==newSpeed){video.playbackRate=newSpeed;showIndicator('Speed: '+video.playbackRate.toFixed(1)+'x');console.log('Playback rate: '+video.playbackRate.toFixed(1))}break;case'z':event.preventDefault();video.currentTime=Math.max(0,video.currentTime-10);showIndicator('-10s');console.log('Current time: '+video.currentTime.toFixed(1));break;case'x':event.preventDefault();video.currentTime=Math.min(video.duration||Infinity,video.currentTime+10);showIndicator('+10s');console.log('Current time: '+video.currentTime.toFixed(1));break}};document.addEventListener('keydown',window._videoBookmarkletKeydownHandler);showIndicator('Controls: S/D Speed, Z/X Seek')}else{alert('No video found on this page.')}})();
    ```
    * **Important:** Ensure the *entire code* starting with `javascript:` and ending with `})();` is copied. Incomplete copying will result in a syntax error (often "Unexpected end of input"). It's recommended to paste this into a plain text editor first to ensure its integrity, then copy from the text editor into the bookmark's URL field.

4.  **Save the Bookmark.**

5.  **Activate on a Page:**
    * Navigate to any webpage that contains an HTML5 video.
    * Click the "Video Controls" (or whatever you named it) bookmarklet from your bookmarks bar or menu.
    * You should see an initial alert "Bookmarklet started!" followed by an on-screen message "Controls: S/D Speed, Z/X Seek" in the top-left corner if a video is found.

## Key Bindings

Once the bookmarklet is active on a page with a video:

* **`S`**: Decrease playback speed by 0.1x.
* **`D`**: Increase playback speed by 0.1x.
* **`Z`**: Seek backward by 10 seconds.
* **`X`**: Seek forward by 10 seconds.

The current speed or seek action will be briefly displayed in the top-left corner of the screen. Speed changes are also logged to the browser's developer console.

## How It Works

The bookmarklet injects JavaScript into the current page.
1.  It looks for the first `<video>` element.
2.  It creates a `<div>` element to display speed/seek status and styles it to appear in the top-left corner.
3.  It adds a `keydown` event listener to the document.
4.  When registered keys (S, D, Z, X) are pressed:
    * It checks if the event target is an input field to avoid interfering with typing.
    * It modifies the `video.playbackRate` or `video.currentTime` properties accordingly.
    * It updates the on-screen display element.
5.  The script attempts to remove any previously added listeners from itself if the bookmarklet is clicked multiple times, ensuring it doesn't cause stacked actions.

## Troubleshooting & Notes

* **"No video found on this page."**: If you see this alert, the bookmarklet could not detect an HTML5 `<video>` element on the page when it was activated.
* **Focus**: For the key presses to be detected, the main browser window or the video player itself usually needs to be in focus.
* **First Video Only**: The script currently controls only the *first* video element found on the page (`document.querySelector('video')`). If a page has multiple videos, it will only affect the first one.
* **Website Overrides**: Some websites might have complex JavaScript or their own keyboard shortcuts that could potentially interfere with this bookmarklet.
* **Console Logs**: Speed changes and current time after seeking are logged to the browser's developer console. This can be helpful for debugging.

## License

This project is open source and available under the [MIT License](LICENSE).
Feel free to modify and use as you see fit!
