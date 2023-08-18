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

export default class Character {
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
        this.y = 60;
        this.context = getCanvas().ctx;
        this.action = action;
        this.frame = frame;
        this.text = '';
    }

    draw(){
        this.image.src = `storage/main_web_character/${this.action}/${this.action}_${this.frame}.png`;
        this.image.onload = () => {
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        this.text !== '' ? this.drawText() : null;
    }

    drawText(){
        this.context.fillStyle = 'rgba(0,0,0,0.5)';
        this.context.fillRect(this.x +35, this.y, 100, 30);
        //put text inside the text box
        this.context.font = '8px Arial';
        this.context.fillStyle = 'white';
        this.context.fillText(this.text, this.x + 38, this.y + 18);
    }

    update(characterAction, characterFrame){
        this.action = characterAction;
        this.frame = characterFrame;
        this.draw();
    }
}
