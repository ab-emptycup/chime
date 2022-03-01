
class Routine {

    constructor(intervals, bell, loop, volume, debug, roundGap) {
        this._volume = volume ? volume: 0.6;
        this._loop = loop;
        this._debug = debug;
        this._defaultBell = new Howl({src: bell, volume: this._volume})

        this._rounds = 0;
        this._bells = 0;

        this._DURATION = roundGap;
        this._intervals = intervals;

        this._intervals.forEach((I, i) => {
            I.sound = new Howl({src: I.mp3, volume: this._volume});
            this._DURATION += I.duration;
        });
    }

    start() {
        this._ringBell('Starting routine...');
        this._playRound();

        if (this._loop)
            this._player = setInterval(() => this._playRound(), this._DURATION);
    }

    // TODO: Cannot resume now. Just stops the routine.
    stop() {
        this._intervals.forEach((I, i) => {
            if (I.bell)
                clearTimeout(I.bell);
        });

        if (this._player)
            clearInterval(this._player);

        this._log('Stopped routine...')
    }

    _playRound() {
        var total = 0;
        this._intervals.forEach((I, i) => {
            I.bell = setTimeout(() => this._ringBell(I.message, I.sound), total + I.duration);
            total += I.duration;
        });

        this._rounds++;
        this._log('Round ' + this._rounds);
    }

    _ringBell(msg, sound) {
        if (msg)
            this._log(' ! - ' + new Date().toLocaleTimeString() + ' - ' + msg);

        sound = sound ? sound : this._defaultBell;
        sound.play()
        this._bells++;
    }

    _log(msg) {
        if (!this._debug)
            return;
        console.log(msg);
    }

}