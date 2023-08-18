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

class Character {
    constructor(action, frame){
        this.frames = [
            {
                action:'run',
                frames:[
                    '000','001','002','003','004','005','006','007','008','009','010','011','012','013','014','015',
                    '016','017','018','019','020','021','022','023','024','025','026','027','028','029','030','031',
                    '032','033','034','035','036','037','038','039','040','041','042','043'
                ]
            }
        ];
        this.image = new Image();
        this.width = 40;
        this.height = 90;
        this.x = 0;
        this.y = 0;
        this.context = getCanvas().ctx;
        this.action = action;
        this.frame = frame;
    }

    draw(){
        this.image.src = `storage/main_web_character/${this.action}/${this.action}_${this.frame}.png`;
        this.image.onload = () => {
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    update(characterAction, characterFrame){
        this.action = characterAction;
        this.frame = characterFrame;
        this.draw();
    }
}

class AnimatedCharacter {
    constructor(x,y,width,heigh,characterAction, characterFrame) {
        this.width = width;
        this.height = heigh;
        this.x = x;
        this.y = y;
        this.character = new Character(characterAction, characterFrame);
        this.context = getCanvas().ctx;
    }

    draw(){
        this.character.draw();
    }

    handleFrame(direction){
        let frame = parseInt(this.character.frame);
        let action = this.character.action;
        let frames = this.character.frames.find(action => action.action === this.character.action).frames;
        frame = frame + direction;
        this.character.frame = frames[frame];
        this.character.update(action, frames[frame]);
    }

    updatePosition(){
        document.addEventListener('keydown', (event) => {
            getCanvas().ctx.clearRect(0, 0, getCanvas().canvasWidth, getCanvas().canvasHeight);
            console.log(event);
            switch (event.key) {
                case 'ArrowRight':
                    this.character.x = this.x + 1;
                    this.character.y = this.y;
                    parseInt(this.character.frame) < 42 ? this.handleFrame(+1) : this.character.frame = '000';
                    break;
                case 'ArrowLeft':
                    this.character.x = this.x - 1;
                    this.character.y = this.y;
                    parseInt(this.character.frame) < 42 ? this.handleFrame(-1) : this.character.frame = '000';
                    break;
                case 'ArrowUp':
                    this.character.x = this.x;
                    this.character.y > 0 ? this.y - 1 : this.y;
                    this.handleFrame(+1);
                    break;
            }
            this.draw();
        });
    }

    animate(){
        this.updatePosition();
        requestAnimationFrame(this.animate);
    }
}

export {getCanvas,Character,AnimatedCharacter };

