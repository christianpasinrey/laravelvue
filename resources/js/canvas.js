import Character from './character.js';

const getCanvas = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.left = '0px';
    canvas.style.bottom = '0px';
    canvas.style.zIndex = '1000';
    canvas.style.border = '1px solid red';
    canvas.style.height = 285 + 'px';
    canvas.style.width = 100 + '%';

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    return {canvas, ctx, canvasWidth, canvasHeight};
};


class AnimatedCharacter {
    constructor( characterAction, characterFrame ) {
        this.character = new Character( characterAction, characterFrame );
        //position the character
        this.x = this.character.x;
        this.y = this.character.y;

        this.context = getCanvas().ctx;
    }

    handleFrame( direction ){
        let frame = parseInt(this.character.frame);
        let action = this.character.action;
        let frames = this.character.frames.find(
            action =>
                action.action === this.character.action
        ).frames;
        frame = frame + direction;
        this.character.update(action, frames[frame]);
    }

    draw(){
        this.character.draw();
    }

    update(){
        document.addEventListener('wheel', (event) => {
            if(event.deltaY > 0){
                this.character.x === getCanvas().canvasWidth ?
                this.character.x = 0 :
                this.character.x = this.character.x +2;
                parseInt(this.character.frame) < 42 ?
                this.handleFrame(1) :
                this.character.frame = '000';

            }else if(event.deltaY < 0){
                this.character.x === 0 ?
                this.character.x = 0 :
                this.character.x = this.character.x -2;
                this.character.frame === '000' ?
                this.character.frame = '042' :
                this.handleFrame(-1);
            }
            this.character.draw();
        });
    }
}

export { getCanvas, Character, AnimatedCharacter };

