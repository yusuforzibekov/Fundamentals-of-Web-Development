# CSS Preprocessors

## Before we start

1. This practical task is verified automatically with tests.
2. Please put all your `CSS` code in the `src/style.css` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).


## Task Requirements

In this practical task, you will add Sass to a project and refactor existing CSS rules using Sass features. This is a two-part task. First, you will add SASS to the web page and write a script to compile .scss into .css. Then, you will style the page using nesting selectors, mixins, functions, and partials.


Please note that you MUST add all CSS rules to the `src/style.scss` file without changing the `src/index.html` file. Your solution cannot be verified if you use a different file. Also, you don't need to add additional selectors with rulesets to `src/style.css`. Please add the required properties to the existing rulesets.

### Add SASS to the project
   - Follow the instructions in the article to install the `node-sass` package. [node-sass package installation](https://www.npmjs.com/package/node-sass). You need to run the installation script only and verify that the `node-sass` package appears in the list of dependencies in package.json.
   - Add an empty `sass` script to `package.json` scripts.
   - Compose a `sass` script to take all `.scss` files from the `src` folder, compile them to `.css`, and put new file(s) into the `src/css` folder. Follow step 3 from the article [How to set up Sass in your project](https://dev.to/chrissiemhrk/how-to-setup-sass-in-your-project-2bo1). Please do not remove or change the existing scripts.
   - run `sass` script.
   - don't forget to upload ALL changes to repository (including `package.json`, `package.lock.json` and generated CSS files).
  ### Style the page

   #### Create variables
   - Change the name of the `_variables.css` file to `_variables.scss`.
   - Refactor the `_variables.css` file to match the "scss" syntaxis. Don't change the values or names of variables.
   - Change the name of the `style.css` file to `style.scss`.
   - Refactor `style.scss` to use Sass variables from the `_variables.scss` file. Don't forget to import `_variables.scss`.
   - After the `style.scss` file is changed, a new `style.css` file should appear in the `src/css` folder. Observe how your styles are compiled in CSS.
   #### Apply nesting selectors
   - Refactor `style.scss` using nesting selectors. For example `.block--small` will be `.block {&--small{/* your CSS rules here */}}`. Don't change the CSS rules for selectors.
   - Observe how your changes are compiled in `src/css/style.css`.
   #### Use @extend
   - create `_placeholders.scss` in the `src` folder.
   - Add the placeholder selector `%block` to `_placeholders.scss` with common rules for the `.block--small, .block--medium, .block--large` selectors.
   - Replace the common rules in `.block--small, .block--medium, .block--large` with the extension from `%block`.
   - The `.block__title, .block__title--green, .block__title--blue, .block__title--orange` selectors have common CSS rules. Replace them in the `.block__title--green, .block__title--blue, .block__title--orange` selectors with the extension from 
   `.block__title` class.
   - Observe how your changes are compiled in `src/css/style.css`.
   #### Use @mixin
   - Create the file `_mixins.scss` in the `src` folder.
   - In `style.scss`, you can see that the placeholder `%block` and the selector `main` use the same Flexbox properties (`display`, `flex-direction`, `justify-content`, and `align-items`) with different values. Create the mixin `flexible-box`, which will accept `$flex-direction, $justify-content, $align-items` arguments and create a ruleset for the `display`, `flex-direction`, `justify-content`, and `align-items` properties, where `display` is `flex`, `$flex-direction` is a value of the `flex-direction` property, `$justify-content` is a value of the `justify-content` property, and `$align-items` is a value of the `align-items` property. Please note that the order of the properties in the mixin should be `display, flex-direction, justify-content, align-items`.
   - Replace repeating rules in the `%block` and `main` selectors with the mixin and pass the expected arguments according to the existing styles.
   - Observe how your changes are compiled in `src/css/style.css`.
   #### Use functions
   - Create the file `_functions.scss` in the `src` folder.
   - Create the function `multiply`, which will accept two numbers (for example, `3` and `2`) and return a multiplied number (`3*2`).
   - Replace the `calc(6*$block-margin)` calculation part in the `main` width with `multiply(6, $block-margin)`.
   - Create the function `sum`, which will accept a list of numbers and return the sum of these numbers. For example, `sum(1, 3, 5)` should return `9`, `sum(2, 4)` should return `6`, and `sum(2, 4, 1, 12, 10, 1)` should return `30`.
   - Replace `width: calc($small+$medium+$large+multiply(6, $block-margin))` in `main` with the `count` function call. Please don't change the order of the arguments.
   - Observe how your changes are compiled in `src/css/style.css`.

   