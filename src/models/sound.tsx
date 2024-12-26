export default class Sound {
    __base: HTMLAudioElement
    __others: Array<[HTMLAudioElement, [number, number]]>
    __active_ids: Set<number>
    __eventListeners: Map<HTMLAudioElement, () => void>
    __lock: boolean


    constructor(base: string, others: Array<[string, [number, number]]>) {
        this.__base = new Audio(base);
        this.__base.loop = true;

        this.__others = []
        others.forEach(element => {
            const [src, delay] = element;
            this.__others.push([new Audio(src), delay]);
        });

        this.__active_ids = new Set();
        this.__eventListeners = new Map();
        this.__lock = true;
    }

    __delay(range: [number, number]) {
        const [min, max] = range;
        return Math.random() * (max - min) + min;
    }

    __play_delayed(element: [HTMLAudioElement, [number, number]]) {
        if (this.__lock) return;
        const [audio, delay] = element;

        const __replay = () => {
            if (this.__lock ) return;
            audio.play();

            const callback = () => {
                const id = setTimeout(
                    () => __replay(),
                    this.__delay(delay) * 1000,
                );
                this.__active_ids.add(id);
            }

            this.__eventListeners.set(audio, callback);
            audio.addEventListener("ended", callback);
        };

        __replay()
    };

    __pause_delayed(element: [HTMLAudioElement, [number, number]]) {
        const [audio, _] = element;
        audio.pause();

        const callback = this.__eventListeners.get(audio);
        if (callback) {
            audio.removeEventListener("ended", callback);
            this.__eventListeners.delete(audio);
        };
    };

    play() {
        this.__lock = false;
        this.__base.play();
        this.__others.forEach(element => this.__play_delayed(element));
    };

    pause() {
        this.__lock = true;
        this.__base.pause();

        this.__active_ids.forEach(id => {
            console.log(`clear ${id}`)
            clearTimeout(id);
        })
        this.__active_ids.clear();
        this.__others.forEach(element => this.__pause_delayed(element));
    };
};
