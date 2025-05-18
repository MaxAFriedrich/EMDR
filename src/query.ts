
export class Params{
    static debug = false;

    static loadParams(){
        const params = new URLSearchParams(window.location.search);
        if (params.has("debug")) {
            Params.debug = true;
        }
    }

    static stringify(){
        return new URLSearchParams(window.location.search).toString();
    }
}
