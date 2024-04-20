const path = require('path');

const { readTextFile } = require('../../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../../test-utils/waitBrowserEvent');
const { getFirstMediaQueryInner } = require('../../test-utils/getFirstMediaQueryInner');
const { trimSpaces } = require('../../test-utils/trimSpaces');

const { JSDOM } = require('jsdom');
const { expect } = require('@jest/globals');

describe('Email template from scratch', () => {
    let htmlString;

    let dom;
    let document;

    beforeEach(async () => {
        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);

        // Create fake DOM
        dom = new JSDOM(htmlString, {
            resources: 'usable'
        });
        document = dom.window.document;
    });

    it('Should have have image in email header', () => {
        const image = document.querySelector('img[src="https://res.cloudinary.com/dheck1ubc/image/upload/v1544153577/Email/Images/AnnouncementOffset/crofts-white.png"]');
        
        expect(image).toBeDefined();
    });

    it('Image should be styled properly', async () => {
        await waitBrowserLoadEvent(document);

        const image = document.querySelector(' img[src="https://res.cloudinary.com/dheck1ubc/image/upload/v1544153577/Email/Images/AnnouncementOffset/crofts-white.png"]');
        const imageStyles = dom.window.getComputedStyle(image);

        expect(imageStyles.display).toBe("block");
        expect(imageStyles.border).toBe("0px");
        expect(imageStyles.height).toBe("auto");
        expect(imageStyles.width).toBe("100%");
    });

    it('Image should have proper attributes', () => {
        const image = document.querySelector(' img[src="https://res.cloudinary.com/dheck1ubc/image/upload/v1544153577/Email/Images/AnnouncementOffset/crofts-white.png"]');
        const width = image.getAttribute("width");
        const height = image.getAttribute("height");

        expect(width).toBe("150");
        expect(height).toBe("auto");
    });

    it('Should have "Book an Appointment" button', () => {
        const button = document.querySelector('a[href="https://google.com"]');

        expect(button).toBeDefined();
    });

    it('Should open link in a new tab when user clicks "Book an Appointment" button', () => {
        const button = document.querySelector('a[href="https://google.com"]');
        const target = button.getAttribute("target");
        
        expect(target).toBe("_blank");
    });

    it('Button should be styled properly', async () => {
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

    it('should be responsive for screens with max-width 480px', () => {
        const mediaQueryString = trimSpaces(getFirstMediaQueryInner(htmlString));
        const isBreakpointValid = mediaQueryString.includes("@mediaonlyscreenand(min-width:480px)");
        
        expect(isBreakpointValid).toBe(true);
    });
});
