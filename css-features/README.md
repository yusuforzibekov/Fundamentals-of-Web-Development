# CSS Features

## CSS variables and functions, CSS validation

## Before we start

1.	This practical task is verified automatically with tests.
2.	Please put all your `HTML` code in the `src/index.html` file. If you use any other file, we will not be able to verify it.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

This task consists of two parts. First, change the existing CSS code to use CSS variables for commonly used colors. Second, please validate the CSS code and correct any mistakes.

Please note that you should add all CSS variables and CSS rules to the `src/style.css` file. The solution cannot be verified if you use a different file.

### Add CSS variables to the project
- Study given simple HTML page with styles. 
- Rework CSS file to use CSS variables for colors:   
    - The variable `--white` for the color `#ffffff`
    - The variable `--light-gray` for the color `#f0f0f0`
    - The variable `--dark` for the color `#343638`
    - The variable `--black` variable for the color `#000000`
    - The variable `--gray` for the color `#A4A4A4`
- The CSS variables should be global.


### Validate CSS
Now, validate the CSS file and correct any mistakes. There are two ways to do this:
1. Open [Web Validator] (https://jigsaw.w3.org/css-validator/#validate_by_upload) and upload style.css in the form.
2. If you are checking your solution locally, run the validation command "npm run validate-css" locally. You will get a list of errors in the console. The error format is:

    Object {
        "line": 190,
        "message": "only "0" can be a "unit." You must put a unit after your number",
    },

where "line" shows the number of the line in the file, and where an error is found, you will see "message" followed by an explanation of the error text.

Whatever option you choose, after validation, you should:
- Check all the issues found and correct any errors
- Validate the CSS file one more time to make sure that all errors were corrected
- Compare the results with the initial CSS file



