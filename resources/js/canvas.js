import Character from './character.js';

const getCanvas = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //postion canvas on the bottom of the screen, full width
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    canvas.style.position = 'absolute';
    canvas.style.left = '0px';
    canvas.style.bottom = '0px';
    canvas.style.zIndex = '1000';
    canvas.style.border = '1px solid red';
    canvas.style.height = 285 + 'px';

    return {canvas, ctx, canvasWidth, canvasHeight};
};


class AnimatedCharacter {
    constructor(width,heigh,characterAction, characterFrame) {
        this.width = width;
        this.height = heigh;
        this.character = new Character(characterAction, characterFrame);
        this.x = this.character.x;
        this.y = this.character.y;

        this.context = getCanvas().ctx;
    }

    handleFrame(direction){
        let frame = parseInt(this.character.frame);
        let action = this.character.action;
        let frames = this.character.frames.find(action => action.action === this.character.action).frames;
        frame = frame + direction;
        this.character.frame = frames[frame] === undefined ? '000' : frames[frame];
        this.character.update(action, frames[frame]);
    }

    draw(){
        this.character.draw();
    }

    update(){
        document.addEventListener('keydown', (event) => {
            getCanvas().ctx.clearRect(0, 0, getCanvas().canvasWidth, getCanvas().canvasHeight);
            switch (event.key) {
                case 'ArrowRight':
                    this.character.image.style.transform === 'scaleX(-1)' ?
                    this.character.image.style.transform = 'scaleX(1)' :
                    this.character.image.style.transform = 'scaleX(-1)';
                    this.character.x === getCanvas().canvasWidth ?
                    this.character.x = 0 :
                    this.character.x++;
                    parseInt(this.character.frame) < 42 ?
                    this.handleFrame(+1) :
                    this.character.frame = '000';
                    break;
                case 'ArrowLeft':
                    this.character.image.style.transform === 'scaleX(-1)' ?
                    this.character.image.style.transform = 'scaleX(1)' :
                    this.character.image.style.transform = 'scaleX(-1)';
                    this.character.x === 0 ?
                    this.character.x = 0 :
                    this.character.x--;
                    parseInt(this.character.frame) < 42 && this.character.frame !== '000' ?
                    this.handleFrame(-1) :
                    this.character.frame = '000';
                    break;
                case 'ArrowUp':
                    this.character.x = this.x;
                    this.character.y > 0 ?
                    this.character.y-- :
                    this.character.y;
                    this.handleFrame(+1);
                    break;
                case 'e':
                    //draw a text box on the top side of the character
                    this.context.fillStyle = 'rgba(0,0,0,0.5)';
                    this.context.fillRect(this.character.x +35, this.character.y, 100, 30);
                    //put text inside the text box
                    this.context.font = '8px Arial';
                    this.context.fillStyle = 'white';
                    this.character.text = '¿En qué puedo ayudarte?';
                    this.context.fillText(this.character.text, this.character.x + 38, this.character.y + 18);
                    break;
            }
            this.character.draw();
        });
    }
}

export {getCanvas,Character,AnimatedCharacter };

