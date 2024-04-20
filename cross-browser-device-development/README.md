# Cross browser/device development

## Optimize a website for printing

## Before we start

1. This practical task is verified automatically with tests.
2. Please put all your `CSS` code in the `src/style.css` file. If you use any other file, we will not be able to verify it.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `src/index.html` in your browser to check it. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/blob/main/docs/VerifySolutionLocally.md).

## Task Requirements

Add styles for a print version of the site using a media query for print media.
 
Please note that you should edit the `src/style.css` file. Your solution can't be verified if you use a different file.

Please put all the styles inside the media query `@media print { ... }`. If you use a different one, it may cause problems when your solution is checked.

### Please update styles for the print version according to the requirements below:
1. **Print only data**
        Sometimes, only certain blocks should be visible when printing. The CSS class `print-only` has been added to them. Elements with this class should have the `display: none;` property by default. For print media, it should be changed to `display: block;`.
2. **`<body>` element**
    - Change the text color to `#000`.
    - Set `hyphens` to `auto`.
3. **Text color change**
    - Change the text color of elements with the CSS class `card` to `#000`.
    - Change the text color of the `<h1>` element to `#000`.
4. **Main image logo width**
    - Change the image logo width to `200px`. To find it, use the class `logo`.
5. **Sections headings**
    - To all `<h2>` elements inside `<section>`, apply the following styles:
        - The padding on the top and bottom should be `0`.
        - The padding on the left and right should be `var(--space-size)`.
        - The margin should be `0` on all sides.
6. **To the element with the class name `main-column`**:
    - Set the height to `auto`.
    - Set the padding on all sides to `0`.
    - Set the text color to `#000`.
7. **Hiding elements**
    - To hide an element, use the `display: none;` rule.
    - Hide all `<nav>` elements.
    - Hide `<img>` elements inside `<footer>` elements with any level of nesting.
    - Hide the element with the class `header_button`.
    - Hide the `<figure>` element inside an element with the class `title_section`.
    - Hide the element with the class `subtitle`.
8. **Layout changes**
    - For elements with class `title_section`, change `display` to `block`. Also, set the padding on all sides to `0`.
    - For elements that match the selector `main section div`, change `display` to `block`. Initially, it has `display: flex;`, so this change significantly updates the layout.
    - To the elements with the class `column`, set the padding and margin on all sides to `0`.
9. **Page footer updates**
    - To the `<address>` element inside the `<footer>` element:
        - `display: block`
        - `width: 100%`
        - Text size: `20px`
        - Align text to the left.
    - To `::after` pseudo-element of `<a>` elements inside this `<address>` element inside the `<footer>` (use selector: `footer address a::after`):
        - Put the value of the `href` attribute in the `<a>` link in a `content` CSS rule
        - Set the left margin to `5px`.
        - Set text-decoration to `underline`.
10. **@page styles**
    - Set the left margin to `2cm` for all printed pages.
