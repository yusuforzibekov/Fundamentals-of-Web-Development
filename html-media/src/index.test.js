const path = require('path');
const { HtmlValidate } = require('html-validate');

const htmlValidateConfig = require('../test-utils/htmlValidateConfig.json');
const { readTextFile } = require('../test-utils/readTextFile');

const { JSDOM } = require('jsdom');

describe('HTML media', () => {
    let htmlString;

    let dom;
    let document;

    beforeEach(async () => {
        const filePath = path.join(__dirname, 'index.html');
        htmlString = await readTextFile(filePath);

        dom = new JSDOM(htmlString);
        document = dom.window.document;
    });

    it('html page should be valid, don\'t forget to remove "frameborder" attribute from an iframe', () => {
        const htmlvalidate = new HtmlValidate();
        const report = htmlvalidate.validateString(htmlString, htmlValidateConfig);
        
        expect(report).toEqual(expect.objectContaining({ valid: true }));
    });

    describe('<audio>', () => {
        let audio;

        beforeEach(() => {
            audio = document.querySelector('body > section > #audio > audio');
        });

        it('should add an <audio> tag to the div with id="audio"', () => {
            expect(audio).not.toBeNull();
        });

        it('should have the correct value in the src attribute', () => {
            expect(audio.src).toBe('media/voyager_golden_record_sampler.mp3');
        });

        it('audio controls, like play, pause, and volume should be available', () => {
            expect(audio.hasAttribute('controls')).toBe(true);
        });

        it('should be muted by default', () => {
            expect(audio.hasAttribute('muted')).toBe(true);
        });

        it(`should "Your browser does not support the audio tag" text 
            when a browser doesn\'t support audio tag`, () => {
            const text = audio.textContent.trim();

            expect(text).toBe('Your browser does not support the audio tag');
        });
    });

    describe('<video>', () => {
        let video;

        beforeEach(() => {
            video = document.querySelector('body > section > #video > video');
        });

        it('should add an <video> tag to the div with id="video"', () => {
            expect(video).not.toBeNull();
        });

        it('audio controls, like play, pause, and volume should be available', () => {
            expect(video.hasAttribute('controls')).toBe(true);
        });

        it('should NOT auto play', () => {
            expect(video.hasAttribute('autoplay')).toBe(false);
        });

        it(`should "Your browser does not support the video tag" text 
            when a browser doesn\'t support video tag`, () => {
            const text = video.textContent.trim();

            expect(text).toBe('Your browser does not support the video tag');
        });

        describe('webm source file', () => {
            let source;

            beforeEach(() => {
                source = video.querySelector('[type="video/webm"]');
            });

            it('should have correct type attribute', () => {
                expect(source).not.toBeNull();
            });
            
            it('should have the correct value in the src attribute', () => {
                expect(source.src).toBe('media/message_to_voyager.webm');
            });
        });

        describe('mp4 source file', () => {
            let source;

            beforeEach(() => {
                source = video.querySelector('[type="video/mp4"]');
            });

            it('should have correct type attribute', () => {
                expect(source).not.toBeNull();
            });
            
            it('should have the correct value in the src attribute', () => {
                expect(source.src).toBe('media/message_to_voyager.mp4');
            });
        });

        describe('English captions', () => {
            let track;
            
            beforeEach(() => {
                track = video.querySelector('track[label=English]');
            });

            it('should have track tag with "English" in the label', () => {
                expect(track).not.toBeNull();
            });

            it('should have the "kind" attribute with "captions" value', () => {
                expect(track.getAttribute('kind')).toBe('captions');
            });

            it('should have the correct value in the src attribute', () => {
                expect(track.src).toBe('media/english_message_to_voyager.vtt');
            });
        });

        describe('Spanish captions', () => {
            let track;
            
            beforeEach(() => {
                track = video.querySelector('track[label=Spanish]');
            });

            it('should have track tag with "Spanish" in the label', () => {
                expect(track).not.toBeNull();
            });

            it('should have the "kind" attribute with "captions" value', () => {
                expect(track.getAttribute('kind')).toBe('captions');
            });

            it('should have the correct value in the src attribute', () => {
                expect(track.src).toBe('media/spanish_message_to_voyager.vtt');
            });
        });
    });

    describe('Embed video via iframe', () => {
        let iframe;

        beforeEach(() => {
            iframe = document.querySelector('body > section > #youtube > iframe');
        });

        it('should add an <iframe> tag to the div with id="youtube"', () => {
            expect(iframe).not.toBeNull();
        });

        describe('default iframe attributes', () => {
            it('should have "width" attribute with "560" value', () => {
                expect(iframe.width).toBe('560');
            });

            it('should have "height" attribute with "315" value', () => {
                expect(iframe.height).toBe('315');
            });

            it('should have a private URL in the "src" attribute', () => {
                expect(iframe.src).toBe('https://www.youtube-nocookie.com/embed/7Blfky0G3jo');
            });

            it('should have "YouTube video player" in the "title" attribute', () => {
                expect(iframe.src).toBe('https://www.youtube-nocookie.com/embed/7Blfky0G3jo');
            });

            it('should have "allowfullscreen" attribute', () => {
                expect(iframe.hasAttribute('allowfullscreen')).toBe(true);
            });

            it('should NOT have a "frameborder" attribute', () => {
                expect(iframe.hasAttribute('frameborder')).toBe(false);
            });
        });
    });
});
