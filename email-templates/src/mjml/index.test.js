const path = require('path');

const { readTextFile } = require('../../test-utils/readTextFile');
const { trimSpaces } = require('../../test-utils/trimSpaces');
const { waitBrowserLoadEvent } = require('../../test-utils/waitBrowserEvent');

const { JSDOM } = require('jsdom');
const { expect } = require('@jest/globals');

describe('HTML media', () => {
    let htmlString;
    let mjmlString;

    let dom;
    let document;

    beforeEach(async () => {
        htmlString = await readTextFile(path.join(__dirname, 'index.html'));
        mjmlString = trimSpaces(await readTextFile(path.join(__dirname, 'index.mjml')));

        // Create fake DOM
        dom = new JSDOM(htmlString, {
            resources: 'usable'
        });
        document = dom.window.document;
    });

    it('should convert mjml to html', () => {
        expect(htmlString).toBeDefined();
    });

    it('should include header in mjml file', () => {
        const isIncluded = mjmlString.includes("<mj-includepath=\"./header.mjml\"/>") || mjmlString.includes("<mj-includepath=\"header.mjml\"/>");

        expect(isIncluded).toBe(true);
    });

    it('should include footer in mjml file', () => {
        const isIncluded = mjmlString.includes("<mj-includepath=\"./footer.mjml\"/>") || mjmlString.includes("<mj-includepath=\"footer.mjml\"/>");

        expect(isIncluded).toBe(true);
    });

    it('should add Book an Appointment button im mjml', () => {
        const isIncluded = [...mjmlString.matchAll(/<mj-button/g)];

        expect(isIncluded.length).toBe(2);
    });

    it('Should have "Book an Appointment" button in auto generated html', () => {
        const button = document.querySelector('a[href="https://google.com"]');

        expect(button).toBeDefined();
    });

    it('Should open link in a new tab when user clicks "Book an Appointment" button in auto generated html', () => {
        const button = document.querySelector('a[href="https://google.com"]');
        const target = button.getAttribute("target");
        
        expect(target).toBe("_blank");
    });

    it('Button should be styled properly in auto generated html', async () => {
        await waitBrowserLoadEvent(document);

        const button = document.querySelector('a[href="https://google.com"]');
        const buttonStyles = dom.window.getComputedStyle(button);

        expect(buttonStyles.display).toBe("inline-block");
        expect(buttonStyles.background).toBe("rgb(94, 110, 191)");
        expect(buttonStyles.color).toBe("rgb(255, 255, 255)");
        expect(buttonStyles.width).toBe("250px");
        expect(buttonStyles["font-size"]).toBe("17px");
        expect(buttonStyles["font-weight"]).toBe("bold");
        expect(buttonStyles["text-decoration"]).toBe("none");
        expect(buttonStyles["border-radius"]).toBe("3px");
    });

    it('Button should be placed inside table in auto generated html', () => {
        const button = document.querySelector('a[href="https://google.com"]');
        const td = button.parentNode;
        const tr = td.parentNode;
        const tbody = tr.parentNode;
        const table = tbody.parentNode;

        expect(td.tagName.toLowerCase()).toBe('td');
        expect(tr.tagName.toLowerCase()).toBe('tr');
        expect(tbody.tagName.toLowerCase()).toBe('tbody');
        expect(table.tagName.toLowerCase()).toBe('table');
    });

    it('Should include image section in mjml', () => {
        const isIncluded = mjmlString.includes("<mj-sectionid=\"grid\"");

        expect(isIncluded).toBe(true);
    });

    it('Should make image section 2-column', () => {
        const isIncluded = [...mjmlString.matchAll(/<mj-columnwidth="50%">/g)];

        expect(isIncluded.length).toBe(2);
    });

    it('Button should be placed inside table', () => {
        const button = document.querySelector('a[href="https://google.com"]');
        const td = button.parentNode;
        const tr = td.parentNode;
        const tbody = tr.parentNode;
        const table = tbody.parentNode;

        expect(td.tagName.toLowerCase()).toBe('td');
        expect(tr.tagName.toLowerCase()).toBe('tr');
        expect(tbody.tagName.toLowerCase()).toBe('tbody');
        expect(table.tagName.toLowerCase()).toBe('table');
    });

    it('should render images in auto generated html', () => {
        const firstImage = document.querySelector('img[src="https://res.cloudinary.com/dheck1ubc/image/upload/v1544153577/Email/Images/AnnouncementOffset/Image_1.png"]');
        const secondImage = document.querySelector('img[src="https://res.cloudinary.com/dheck1ubc/image/upload/v1544153578/Email/Images/AnnouncementOffset/Image_2.png"]');

        expect(firstImage).toBeDefined();
        expect(secondImage).toBeDefined();
    });

    it('should place images in td > table > tr > td in auto generated html', () => {
        const image = document.querySelector('img[src="https://res.cloudinary.com/dheck1ubc/image/upload/v1544153577/Email/Images/AnnouncementOffset/Image_1.png"]');
        const td = image.parentNode;
        const tr = td.parentNode;
        const tbody = tr.parentNode;
        const table = tbody.parentNode;
        const parentTd = table.parentNode;

        expect(td.tagName.toLowerCase()).toBe('td');
        expect(tr.tagName.toLowerCase()).toBe('tr');
        expect(tbody.tagName.toLowerCase()).toBe('tbody');
        expect(table.tagName.toLowerCase()).toBe('table');
        expect(parentTd.tagName.toLowerCase()).toBe('td');
    });
});
