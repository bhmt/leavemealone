import rain_base from '../assets/audio/rain/base.wav';
import rain_heavy_base from '../assets/audio/rain_heavy/base.wav';
import whitenoise_base from '../assets/audio/whitenoise/base.wav';

import thunder_base from '../assets/audio/thunder/base.wav';
import thunder_1 from '../assets/audio/thunder/thunder1.wav';
import thunder_2 from '../assets/audio/thunder/thunder2.wav';
import thunder_3 from '../assets/audio/thunder/thunder3.wav';
import thunder_4 from '../assets/audio/thunder/thunder4.wav';
import thunder_5 from '../assets/audio/thunder/thunder5.wav';
import thunder_6 from '../assets/audio/thunder/thunder6.wav';
import thunder_7 from '../assets/audio/thunder/thunder7.wav';
import thunder_8 from '../assets/audio/thunder/thunder8.wav';
import thunder_9 from '../assets/audio/thunder/thunder9.wav';

import office_base from '../assets/audio/office/base.wav';
import office_copier from '../assets/audio/office/copier.wav';
import office_keyboard_slow from '../assets/audio/office/keyboard_slow.wav';
import office_pam from '../assets/audio/office/pam.wav';
import office_paper from '../assets/audio/office/paper.wav';
import office_phone from '../assets/audio/office/phone.wav';

import Sound from './sound';
import AmbientEnum from './enums';


const s_rain = new Sound(rain_base, []);
const s_rain_heavy = new Sound(rain_heavy_base, []);
const s_whitenoise = new Sound(whitenoise_base, []);

const thunder_delay_short: [number, number] = [10, 20];
const thunder_delay_long: [number, number] = [20, 40];
const s_thunder = new Sound(thunder_base, [
    [thunder_1, thunder_delay_short],
    [thunder_2, thunder_delay_long],
    [thunder_3, thunder_delay_short],
    [thunder_4, thunder_delay_long],
    [thunder_5, thunder_delay_short],
    [thunder_6, thunder_delay_long],
    [thunder_7, thunder_delay_short],
    [thunder_8, thunder_delay_long],
    [thunder_9, thunder_delay_short],
]);

const s_office = new Sound(office_base, [
    [office_copier, [35, 40]],
    [office_keyboard_slow, [20, 30]],
    [office_paper, [60, 90]],
    [office_phone, [90, 120]],
    [office_pam, [500, 700]],
]);


class Soundboard {
    __current: AmbientEnum
    __sounds: Map<AmbientEnum, Sound>

    constructor() {
        this.__sounds = new Map();
        this.__sounds.set(AmbientEnum.RAIN, s_rain);
        this.__sounds.set(AmbientEnum.RAIN_H, s_rain_heavy);
        this.__sounds.set(AmbientEnum.THUNDER, s_thunder);
        this.__sounds.set(AmbientEnum.OFFICE, s_office);
        this.__sounds.set(AmbientEnum.NOISE_W, s_whitenoise);
        this.__current = AmbientEnum.RAIN;
    }

    __play(ambient: AmbientEnum) {
        const sound = this.__sounds.get(ambient) ?? s_rain;
        sound.play();
    };

    __pause(ambient: AmbientEnum) {
        const sound = this.__sounds.get(ambient) ?? s_rain;
        sound.pause();
    }

    switch(ambient: AmbientEnum, play: boolean) {
        this.__pause(this.__current);
        this.__current = ambient;
        if (play)
            this.__play(ambient);
    }
}

export default Soundboard;
