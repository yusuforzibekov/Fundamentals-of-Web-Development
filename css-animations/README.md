# CSS Animations

## Before we start

1. This practical task is verified automatically with tests.
2. Please put all your `CSS` code in the `src/style.css` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

In this task, you will be asked to apply animation properties to different HTML elements on a page. Carefully read which properties should be applied to each element. Be sure not to add unnecessary ones. 

Please note that you MUST add all CSS rules in the `src/style.css` file without changing the `src/index.html` file. Your solution cannot be checked if you use a different file.

On the index.html page, you can see 10 blocks. On each of these blocks, you should apply the proper animation CSS properties as listed below. Please do not use the animation shorthand property; write each animation property separately:
1. Create an animation called `bgcolor` and bind it to the first block. This animation should last for 5 seconds and gradually change the background color of the block from `#ff5733` to `#3393ff`.
2. Create an animation called `bgcolor2` and bind it to the second block. This animation should last for 4 seconds and gradually change the background color of the block according to the following rules:
    0% color `#3393ff`
    50% animation color `#33ff42`
    100% color `#30b851`
3. Create an animation called `blockmove` and bind it to the third block. This animation should last 6 seconds and gradually change the position of the block according to the following rules:
    0% position - top = 0, left = 0
    25% animation position - left = 320px top = 0px
    50% animation position - left = 320px top = 320px
    75% animation position - left = 0 top = 320px
    100% animation position - left = 0 top = 0
4. Create an animation called `blockcolormove` and bind it to the fourth block. This animation should last 5 seconds, start with a 300 ms delay, repeat the animation steps five times, and gradually change the position and background color of the block according to the following rules:
    Start background color - `#33fffc`; position - top = 0, left = 0
    50% background color - `#30b851`; animation position - left = 300px top = 300px
    100% background color - `#33fffc`; position - top = 0, left = 0  
5. Create an animation called `showhide` and bind it to the fifth block. This animation should last 1 second, repeat continuously, and change the opacity property from 1 to 0.
6. Bind the `blockmove` animation to the sixth block. It should last 5 seconds and then run again in reverse.
7. Bind the `blockcolormove` animation to the seventh block. It should last 2 seconds, run an infinite number of times, and run backward first and then forward.
8. Create an animation called `moveleft` and bind it to the eighth block. It should last 5 seconds and change the position left property from 0 to 300 px.
9. Bind the `moveleft` animation to the ninth block. It should last 5 seconds and run with the same speed from start to finish.
10. Bind the `moveleft` animation to the tenth block. It should last 5 seconds and end slowly so that the block retains the style value set by the last keyframe.
