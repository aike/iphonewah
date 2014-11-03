//  This program is licensed under the MIT License.
//  Copyright 2014, aike (@aike1000)
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();

///////// Wah
var wah = ctx.createBiquadFilter();
wah.type = "bandpass";
wah.frequency.value = 350;
wah.Q.value = 4;
var wah_level = ctx.createGain();
wah_level.gain.value = 1.5;
wah.connect(wah_level);
var setWahPos = function(pos) {
    wah.frequency.value = 400 + 3000 * pos;
}
setWahPos(1.0);

///////// Distortion
var fuzz = ctx.createScriptProcessor(256, 1, 1);
var fuzz_drive = 6;
var fuzz_level = 1.0;
fuzz.onaudioprocess = function(event) {
    var sin = event.inputBuffer.getChannelData(0);
    var sout = event.outputBuffer.getChannelData(0);
    // クリップ
    var limit = 0.6;
    for (var i = 0; i < sin.length; i++) {
        var sig = sin[i] * 4;           // Boost
        if (sig >  limit) sig =  limit; // Clip
        if (sig < -limit) sig = -limit; // Clip
        sout[i] = sig;
    }
};

wah_level.connect(fuzz);
fuzz.connect(ctx.destination);

