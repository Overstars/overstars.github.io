const abcStyle = `
.abcjs-inline-audio {
\theight: 26px;
\tpadding: 0 5px;
\tborder-radius: 3px;
\tbackground-color: #424242;
\tdisplay: flex;
\talign-items: center;
\tbox-sizing: border-box;
}

.abcjs-inline-audio .abcjs-btn {
\twidth: 28px;
\theight: 26px;
\tmargin-right: 2px;
\tpadding: 3px 4px;

\tbackground: none;
\tborder: 1px solid transparent;
\tbox-sizing: border-box;
}

.abcjs-btn g {
\tfill: #f4f4f4;
\tstroke: #f4f4f4;
}

.abcjs-inline-audio .abcjs-btn:hover g {
\tfill: #cccccc;
\tstroke: #cccccc;
}

.abcjs-inline-audio .abcjs-midi-selection.abcjs-pushed {
\tborder: 1px solid #cccccc;
\tbackground-color: #666666;
\tbox-sizing: border-box;
}

.abcjs-inline-audio .abcjs-midi-loop.abcjs-pushed {
\tborder: 1px solid #cccccc;
\tbackground-color: #666666;
\tbox-sizing: border-box;
}

.abcjs-inline-audio .abcjs-midi-reset.abcjs-pushed {
\tborder: 1px solid #cccccc;
\tbackground-color: #666666;
\tbox-sizing: border-box;
}

.abcjs-inline-audio .abcjs-midi-start .abcjs-pause-svg {
\tdisplay: none;
}

.abcjs-inline-audio .abcjs-midi-start .abcjs-loading-svg {
\tdisplay: none;
}

.abcjs-inline-audio .abcjs-midi-start.abcjs-pushed .abcjs-play-svg {
\tdisplay: none;
}

.abcjs-inline-audio .abcjs-midi-start.abcjs-loading .abcjs-play-svg {
\tdisplay: none;
}

.abcjs-inline-audio .abcjs-midi-start.abcjs-pushed .abcjs-pause-svg {
\tdisplay: inherit;
}

.abcjs-inline-audio .abcjs-midi-progress-background {
\tbackground-color: #424242;
\theight: 10px;
\tborder-radius: 5px;
\tborder: 2px solid #cccccc;
\tmargin: 0 8px 0 15px;
\tposition: relative;
\tflex: 1;
\tpadding: 0;
\tbox-sizing: border-box;
}

.abcjs-inline-audio .abcjs-midi-progress-indicator {
\twidth: 20px;
\tmargin-left: -10px; /* half of the width */
\theight: 14px;
\tbackground-color: #f4f4f4;
\tposition: absolute;
\tdisplay: inline-block;
\tborder-radius: 6px;
\ttop: -4px;
\tleft: 0;
\tbox-sizing: border-box;
}

.abcjs-inline-audio .abcjs-midi-clock {
\tmargin-left: 4px;
\tmargin-top: 1px;
\tmargin-right: 2px;
\tdisplay: inline-block;
\tfont-family: sans-serif;
\tfont-size: 16px;
\tbox-sizing: border-box;
\tcolor: #f4f4f4;
}

.abcjs-inline-audio .abcjs-tempo-wrapper {
\tfont-size: 10px;
\tcolor: #f4f4f4;
\tbox-sizing: border-box;
\tdisplay: flex;
\talign-items: center;
}

.abcjs-inline-audio .abcjs-midi-tempo {
\tborder-radius: 2px;
\tborder: none;
\tmargin: 0 2px 0 4px;
\twidth: 35px;
\tpadding-left: 2px;
\tbox-sizing: border-box;
}

.abcjs-inline-audio .abcjs-loading .abcjs-loading-svg {
\tdisplay: inherit;
}

.abcjs-inline-audio .abcjs-loading {
\toutline: none;
\tanimation-name: abcjs-spin;
\tanimation-duration: 1s;
\tanimation-iteration-count: infinite;
\tanimation-timing-function: linear;

}
.abcjs-inline-audio .abcjs-loading-svg circle {
\tstroke: #f4f4f4;
}

@keyframes abcjs-spin {
\tfrom {transform:rotate(0deg);}
\tto {transform:rotate(360deg);}
}

/* Adding the class "abcjs-large" will make the control easier on a touch device. */
.abcjs-large .abcjs-inline-audio {
\theight: 52px;
}
.abcjs-large .abcjs-btn {
\twidth: 56px;
\theight: 52px;
\tfont-size: 28px;
\tpadding: 6px 8px;
}
.abcjs-large .abcjs-midi-progress-background {
\theight: 20px;
\tborder: 4px solid #cccccc;
}
.abcjs-large .abcjs-midi-progress-indicator {
\theight: 28px;
\ttop: -8px;
\twidth: 40px;
}
.abcjs-large .abcjs-midi-clock {
\tfont-size: 32px;
\tmargin-right: 10px;
\tmargin-left: 10px;
\tmargin-top: -1px;
}
.abcjs-large .abcjs-midi-tempo {
\tfont-size: 20px;
\twidth: 50px;
}
.abcjs-large .abcjs-tempo-wrapper {
\tfont-size: 20px;
}
`;
document.querySelector('head').innerHTML += `<style type="text/css">${abcStyle}</style>`;

const reloadAudioControl = async (audioElement, visualObj) => {
    if (!audioElement.synthController) {
        audioElement.synthController = new ABCJS.synth.SynthController();
        audioElement.synthController.load(audioElement,
            {},
            {
                displayLoop: true,
                displayRestart: true,
                displayPlay: true,
                displayProgress: true,
                displayWarp: true
            }
        );
    }
    if (!audioElement.synth) {
        audioElement.synth = new ABCJS.synth.CreateSynth();
    }
    // audioElement.synth = new ABCJS.synth.CreateSynth();
    await audioElement.synth.init({visualObj});
    await audioElement.synthController.setTune(visualObj, false);
}

const findAndInitAbcObjs = async () => {
    const elements = document.querySelectorAll('pre[lang="abc"]')
    let newElementsCount = 0;
    for (const container of elements) {
        const codeMirror = container.querySelector('.CodeMirror');
        if (container.getAttribute('abc-init') || !codeMirror) {
            continue;
        } else {
            container.setAttribute('abc-init', true);
        }
        newElementsCount++;
        const text = codeMirror.innerText;
        const scoreElement = document.createElement('div');
        scoreElement.style['background'] = '#dfdfdf';
        scoreElement.style['color'] = '#000';
        const audioElement = document.createElement('div');
        const visualObj = ABCJS.renderAbc(scoreElement, text)[0];
        await reloadAudioControl(audioElement, visualObj);

        container.querySelector('textarea').addEventListener('keyup', async () => {
            const obj = ABCJS.renderAbc(scoreElement, container.querySelector('.CodeMirror').innerText)[0];
            await reloadAudioControl(audioElement, obj);
        });
        container.querySelector('textarea').addEventListener('change', async () => {
            const obj = ABCJS.renderAbc(scoreElement, container.querySelector('.CodeMirror').innerText)[0];
            await reloadAudioControl(audioElement, obj);
        });

        container.appendChild(scoreElement);
        container.appendChild(audioElement);
    }
    console.info('New ABC elements count: ', newElementsCount);
}

document.addEventListener('keyup', async () => await findAndInitAbcObjs());
document.querySelector('#write').addEventListener('DOMSubtreeModified', function () {
    if (arguments[0].target?.classList?.contains('CodeMirror-code')) {
        setTimeout(async () => await findAndInitAbcObjs());
    }
});