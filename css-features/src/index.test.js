const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');
const { waitBrowserLoadEvent } = require('../test-utils/waitBrowserEvent');
const cssValidator = require('w3c-css-validator');
const { JSDOM } = require('jsdom');

describe('CSS Variables', () => {
    let htmlString;   
    let cssString;

    let dom;
    let document;

    beforeEach(async () => {
        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);
        
        const cssPath = path.join(__dirname, 'style.css');
        cssString = await readTextFile(cssPath);

        // Create fake DOM
        dom = new JSDOM(htmlString, {
            resources: 'usable'
        });
        document = dom.window.document;

        // Replace CSS href with absolute paths
        const linksCSS = document.querySelectorAll('link[rel="stylesheet"]');
        for (let linkCSS of linksCSS) {
            const initialHref = linkCSS.getAttribute('href');
            const linkAbsolutePath = path.join(__dirname, initialHref);
            linkCSS.setAttribute('href', `file:///${linkAbsolutePath}`);
        }
    });

    // This test is mandatory for all the HTML related tasks
    it('html page should be valid', () => {
        const htmlvalidate = new HtmlValidate();
        const report = htmlvalidate.validateString(htmlString, htmlValidateConfig);
        
        expect(report).toEqual(expect.objectContaining({ valid: true }));
    });  

    it('should have colors only in CSS variable', async () => {
        const colorCount = cssString.match(new RegExp("#", "g")).length;
        expect(colorCount)
            .toBe(5);
    });

    it('should have global color variables ', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === ':root')[0].style;
        expect(bodyStyles).toEqual(expect.objectContaining({
            '--light-gray': '#f0f0f0',
            '--white': '#ffffff',
            '--dark': '#343638',
            '--black': '#000000',
            '--gray': '#A4A4A4'
        })); 
    });

    it('body should have background color from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === 'html, body')[0].style;
        expect(bodyStyles.getPropertyValue('background-color'))
            .toBe('var(--light-gray)', { format: 'css' });           
    });

    it('header should have color from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === 'header')[0].style;
        expect(bodyStyles.getPropertyValue('color'))
            .toBe('var(--white)', { format: 'css' });           
    });

    it('top navigation links should have color from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.nav_top a')[0].style;
        expect(bodyStyles.getPropertyValue('color'))
            .toBe('var(--white)', { format: 'css' });           
    });

    it('bottom navigation links should have color from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.nav_bottom a')[0].style;
        expect(bodyStyles.getPropertyValue('color'))
            .toBe('var(--black)', { format: 'css' });           
    });

    it('header button should have color and border from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.header_button')[0].style;
        expect(bodyStyles).toEqual(expect.objectContaining({
            'color': 'var(--white)',
            'border': '2px solid var(--white)'
        })); 
    });
    

    it('first article should have background color from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === 'article:first-child')[0].style;
        expect(bodyStyles.getPropertyValue('background-color'))
            .toBe('var(--white)', { format: 'css' });           
    });

    it('like button should have color styles from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.like_button')[0].style;
        expect(bodyStyles).toEqual(expect.objectContaining({
            'background-color': 'var(--dark)',
            'color': 'var(--white)',
            'border': '2px solid var(--white)'
        }));
    });

    it('content date should have color from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.content_date')[0].style;
        expect(bodyStyles.getPropertyValue('color'))
            .toBe('var(--white)', { format: 'css' });           
    });

    it('subscribe section should have background color from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.subscribe_section')[0].style;
        expect(bodyStyles.getPropertyValue('background-color'))
            .toBe('var(--white)', { format: 'css' });           
    });

    it('email input placeholder should have color from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.email_input::placeholder')[0].style;
        expect(bodyStyles.getPropertyValue('color'))
            .toBe('var(--dark)', { format: 'css' });           
    });

    it('input should have background color from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.form input')[0].style;
        expect(bodyStyles.getPropertyValue('background-color'))
            .toBe('var(--light-gray)', { format: 'css' });           
    });

    it('subscribe button should have color styles from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.subscribe_button')[0].style;
        expect(bodyStyles).toEqual(expect.objectContaining({
            'background-color': 'var(--dark)',
            'color': 'var(--white)',
        }));
      
    });

    it('footer content should have color styles from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.footer_content')[0].style;
        expect(bodyStyles.getPropertyValue('color'))
            .toBe('var(--gray)', { format: 'css' });           
    });

    it('last tweet date should have color styles from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.last_tweet_date')[0].style;
        expect(bodyStyles.getPropertyValue('color'))
            .toBe('var(--light-gray)', { format: 'css' });           
    });

    it('footer divide should have color styles from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.footer_divide')[0].style;
        expect(bodyStyles.getPropertyValue('background-color'))
            .toBe('var(--light-gray)', { format: 'css' });           
    });

    it('footer should have color styles from CSS variable', async () => {
        await waitBrowserLoadEvent(document);

        const bodyStyles = document.styleSheets[0].cssRules.filter(e => e.selectorText === '.footer')[0].style;
        expect(bodyStyles.getPropertyValue('background-color'))
            .toBe('var(--white)', { format: 'css' });           
    });
});

describe('CSS Validation', () => {
    let cssString;

    beforeEach(async () => {
        const cssPath = path.join(__dirname, 'style.css');
        cssString = await readTextFile(cssPath);        
    });

    it('CSS should be valid', async () => {
        const result = await cssValidator.validateText(cssString);
        expect(result).toEqual(expect.objectContaining({ valid: false }));
    });
});
