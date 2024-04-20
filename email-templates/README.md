# Email Templates

## Create an HTML Email Template

## Before we start

1. This practical task is verified automatically with tests. 
2. Please, put all your `HTML` code in the `email_from_scratch/index.html` and `mjml/index.mjml` files. If you use other files, we would not be able to verify your solution.
3. Please, don't change the page structure, it may affect tests.

## Development

While developing, you can open `email_from_scratch/index.html` and generated `mjml/index.html` in your browser to check your templates. However, we have prepared a more convenient way to run it locally, you can find the details here: [Local Development](./docs/LocalDevelopment.md).

## Check your solution before submitting it (OPTIONAL)

To be sure you submit a correct solution, you can verify it locally. This requires some local setup. Here are the instructions: [Verify your solution locally](./docs/VerifySolutionLocally.md).

## Task Requirements

This task consists of 2 required parts and 1 optional. In the first part you will create email template from scratch using table layout. In the second part you will use MJML framework to repeat the same email template. After all you can test both emails to see how they will look like at real devices in different email clients.

### Create Email template
Please, note you should edit the `email_from_scratch/index.html` file. We can't verify your solution if you use a different file.
1. **Add logo to the email header to meet mockup**

![Header](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/Email%20Templates/header.PNG)
   - Image sourse should be `https://res.cloudinary.com/dheck1ubc/image/upload/v1544153577/Email/Images/AnnouncementOffset/crofts-white.png`
   - Image style should be `border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;`
   - Add attributes `width="150"` and `height="auto"` to the image tag

2. **Add button "Book an Appointment"**
    - Button should be added below the `RSVP` button
    - Button style should match the `RSVP` button style
    - When user clicks button, `https://google.com` website should open in the new tab
    - Pay attention, that you need to add another `table > tbody > tr > td` for new button

!["Book an Appointment" button](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/Email%20Templates/button.PNG)

3. **Make your email template responsive**
    - Add media queries in `head` for `min-width: 480px` brakepoint
    - Make `width` to be `100%` for `.moz-text-html .mj-column-per-100`, `.mj-column-per-100` selectors.
    - Make `width` to be `50%` for `.moz-text-html .mj-column-per-50`, `.mj-column-per-50` selectors.
    - Make `max-width` to be `50%` for `.moz-text-html .mj-column-per-50` and `.mj-column-per-50` selectors
    - Make `max-width` to be `100%` for `.moz-text-html .mj-column-per-100` and `.mj-column-per-100` selectors

![Mobile view 1](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/Email%20Templates/mob-1.PNG)
![Mobile view 2](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/Email%20Templates/mob-2.PNG)

### Use MJML library for email template
Please, note you should edit the `mjml/index.mjml` file. We can't verify your solution if you use a different file.

1. **Install MJML library**
    - Follow the article [MJML installation](https://documentation.mjml.io/#installation) to install library.
    - Add `build` script to `package.json` to convert `src/mjml/index.mjml` to `src/mjml/index.html`. Use instruction from the article [MJML CLI](https://documentation.mjml.io/#command-line-interface).
    - Run `build` script and verify that `index.html` was created in `mjml` folder

2. **Include email header and footer in mjml layout**
    - Include email header, designed in `header.mjml` in the mjml email layout using `mj-include` tag
    - Include email footer, designed in `footer.mjml` in the mjml email layout using `mj-include` tag
    - Run `build` script to verify your solution

3. **Add button "Book an Appointment" in mjml layout**
    - Button should be added below the `RSVP` button
    - Button style should match the `RSVP` button style
    - When user clicks button, `https://google.com` website should open in the new tab
    - Run `build` script to verify your solution

4. **Add image section in mjml layout**
    - Add new section with 2 columns inside
    - Add `id="grid"` attribute to the section
    - Add attributes to style section the same way as it was implemented in `email_from_scratch/index.html`
    - Add 2 images with the same styles and attributes as it was implemented in `email_from_scratch/index.html` for the images `AnnouncementOffset/Image_1.png` and `AnnouncementOffset/Image_2.png`. 
    - Run `build` script to verify your solution

![Image section](https://gitlab.com/gap-bs-front-end-autocode-documents/autocode-documents/-/raw/main/Email%20Templates/img-section.PNG)

### Test your emails (OPTIONAL)
This is an optional task and will not be verified, but if you want to see how your html and mjml emails will look like in popular email applications, you can follow next steps:

1. Go to `putsmail.com`, click **Create test email** button and sign up.

2. Insert your html in the `HTML` window, add subject and recepient address (any address, where you can check your email) and click **Send email** button.

3. Observe how your email will look like on real devices in different email applications. Note, that you need to be signed in at `https://www.litmus.com/` for free trial. If you don't want to register at **Litmus**, you can check your mailbox and verify the email. Note, that usually it appears at **Spam** folder. You need to mark it as not a spam.

4. Try to test both: native html email and MJML generated. You will see, that we didn't care about cross-platform compatibility, therefore your native html email will be broken at Outlook and some other email clients. MJML generated template will look fine as the library adds code to verify cross-platform compatibility.
