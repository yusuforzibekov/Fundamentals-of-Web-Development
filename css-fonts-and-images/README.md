# CSS Fonts and Images

## Before we start

1.	This practical task is verified automatically with tests.
2.	Please put all your `HTML` code in the `src/index.html` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

This task consists of two parts. First, you will change the standard CSS fonts. Then, you will fix the images' style to correspond to the mock-up.

Please note that you MUST add all CSS rules to the `src/style.css` file. The solution cannot be verified if you use a different file.

### Add fonts to the project
In this part of the task, you will add fonts to a web page. 
- Open the fonts' folders and study the font files and their licenses.
- In the `src/style.css` file, add the following fonts with `@font-face` at-rule:
    - Add a font with `font-family` Gantari for normal, italic, bold, and bold+italic fonts with generic-family `sans-serif`. Note that the format of the font file is `truetype`; don't forget to specify the format in your `@font-face` at-rule.
    - Add a font with `font-family` DancingScript for a normal font with generic-family `cursive`. Note that the format of the font file is `truetype`; don't forget to specify the format in your `@font-face` at-rule.
- Apply the Gantari font to all HTML pages, and check the page in the browser to be sure that the proper fonts are applied for all the elements on the page.
- Apply DancingScript for the element with the class `logo`.
- Apply DancingScript for the element with the class `content_caption`.
- Check the page in the browser to be sure that the proper font is applied for specific elements.


### Style images
In the second part, you will practice using the CSS rules for formatting images. You will style images in the "Read some of our featured articles" section. Note: You are not allowed to change the `src/index.html` file in any way! To write a proper selector for images, use pseudo-classes for the selector.
- Make all four pictures of the `content_article` section fit into the parent element so that they fill all the space in the element.
- Position the first picture in the section in the top-right corner so that the plant in the picture is always visible.
- Position the second picture in the section in the bottom-right corner.
- Position the third picture in the section in the top-left corner and add a filter to rotate the hue of the initial image by 90 degrees.
- Position the fourth picture in the section in the top-left corner and apply a filter to invert the initial image completely.
- Compare your results with the mock-up.
![mockup for images section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/CSS%20Fonts%20and%20Images/images/result.PNG)

