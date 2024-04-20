# HTML Media

## Add media to the page dedicated to the NASA Voyager program

## Before we start

1.	This practical task is verified automatically with tests.
2.	Please put all your `HTML` code in the `src/index.html` and `src/gallery.html` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

Add media files to the page dedicated to the `NASA Voyager program`.

`The Voyager program` is an American scientific program that employs two robotic interstellar probes, `Voyager 1` and `Voyager 2`. You can read more about it on the [Voyager program Wikipedia page](https://en.wikipedia.org/wiki/Voyager_program).

The task consists of three parts. In the first part, you will need to add an audio file to a web page. In the second part, you will need to do the same with a video file. The third part of the task will require you to embed a `YouTube` video in the page. Please pay attention to the requirements for the multimedia presentation.

All the required files are already stored in the `src/media` folder.

Please, note you should edit the `src/index.html` file. We can't verify your solution if you use a different file.

### Please, add to the page:

1. **Add an audio file to the web page:**
    - Use the `<audio>` tag to add an audio file to the `div` element with `id="audio"`.
    - It should have the source `media/voyager_golden_record_sampler.mp3`.
    - Audio controls should be available (play, pause, volume, etc.).
    - The audio file should be muted.
    - When a browser does not support an `<audio>` tag, the following text should be displayed: `Your browser does not support the audio tag`.

2. **Add a video file to the page:**
    - Using the `<video> `tag, add a video file to the `div` element with `id="video"`.
    - It should have two source video files: 
        - `media/message_to_voyager.webm` (Please use the appropriate `type` attribute for this video format.)
        - `media/message_to_voyager.mp4` (Please use the appropriate` type` attribute for this video format.)
    - Add English captions with an `English` label and source: `media/english_message_to_voyager.vtt`.
    - Add Spanish captions with a `Spanish` label and source: `media/spanish_message_to_voyager.vtt`.
    - Video controls should be available (play, pause, volume, etc.).
    - The video file should NOT start playing automatically.
    - When a browser does not support the `<video>` tag, the following text should be displayed: `Your browser does not support the video tag`.

3. **Add a YouTube video to the page using `<iframe>`:**
    - Video to Embed - https://www.youtube.com/watch?v=7Blfky0G3jo 
    - Add the video inside the `div` element with `id=" youtube"`.
    - You can generate the `<iframe>` by going to `Share => Embed` for this video.
    - Please check `"Show player controls"` and "`Enable privacy-enhanced mode"` when generating the `<iframe>`, which is required for the page to pass testing.
    - Please remove the frameborder attribute from the `<iframe>`.

