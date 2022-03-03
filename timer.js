class Timer {

    constructor(secs, sound, volume) {
        this._sound = new Sound(sound, volume);
        this._start = new Date().getTime() / 1000;
        this._total = secs;

        this._timeout = setTimeout(() => this._sound.play(), secs * 1000);
        this._status = 'running';
    }

    cancel() {
        clearTimeout(this._timeout);
        this._status = 'stopped';
    }

    await() {
        if (this._status == 'running')
            return this._start + this._total - new Date().getTime() / 1000;
        // return undefined;
    }
}

class Sound extends Howl {
    constructor(secs, sound, volume) {
        sound = sound ? sound : 'bell.mp3';
        volume = volume ? volume : 0.6;
        super({
            src: [sound],
            volume: volume
        });
    }
}

function setTimer(secs, sound) {
    return new Timer(secs, sound);
}