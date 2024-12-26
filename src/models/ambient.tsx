import img_office from '../assets/img/office.jpg';
import img_rain from '../assets/img/rain.jpg';
import img_noise_w from '../assets/img/whitenoise.jpg';

import AmbientEnum from './enums';


class Ambient {
    io: boolean;
    ambient: AmbientEnum;
    img: string;

    constructor() {
        this.io = false;
        this.ambient = AmbientEnum.RAIN;
        this.img = img_rain;
    }

    __set_ambient(ambient: AmbientEnum, img: string) {
        this.ambient = ambient;
        this.img = img;
    }

    set_ambient(ambient: AmbientEnum) {
        switch (ambient) {

            case AmbientEnum.RAIN:
                this.__set_ambient(AmbientEnum.RAIN, img_rain);
                break;

            case AmbientEnum.RAIN_H:
                this.__set_ambient(AmbientEnum.RAIN_H, img_rain);
                break;

            case AmbientEnum.THUNDER:
                this.__set_ambient(AmbientEnum.THUNDER, img_rain);
                break;

            case AmbientEnum.OFFICE:
                this.__set_ambient(AmbientEnum.OFFICE, img_office);
            break;

            case AmbientEnum.NOISE_W:
                this.__set_ambient(AmbientEnum.NOISE_W, img_noise_w);
                break;

            default:
                this.__set_ambient(AmbientEnum.RAIN, img_rain);
            }
    }

    toggle() {
        this.io = !this.io
    }
}


export default Ambient;
