import Character from './character.js';

const getCanvas = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.left = '0px';
    canvas.style.bottom = '0px';
    canvas.style.zIndex = '10';
    canvas.style.border = '1px solid red';
    canvas.style.height = 100 + 'px';
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
        this.character.update( action, frames[frame], direction );
    }

    draw(){
        this.character.draw(1);
    }

    smoothScrollMove(targetX, duration){
        const startX = this.character.x;
        const distanceX = targetX - startX;
        let startTime = null;

       //change the position step by step using handleFrame and updating the character position
        const animation = (currentTime) => {
            if(startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.ease(timeElapsed, startX, distanceX, duration);
            this.character.x = run;
            this.draw();
            if(timeElapsed < duration) requestAnimationFrame(animation);
        }
        requestAnimationFrame(animation);
    }

    ease(t, b, c, d) {
        t /= d;
        return c*t*t*t + b;
    }

    update(){
        document.addEventListener('wheel', (event) => {
            if(event.deltaY > 0){
                const verticalScrollPercentage = window.scrollY / window.innerHeight;
                const maxXPosition = window.innerWidth - this.character.image.style.width;
                const targetX = (verticalScrollPercentage * maxXPosition) + this.character.image.style.width;
                this.character.x === window.innerWidth - this.character.image.width ?
                this.character.x = window.innerWidth - this.character.image.width :
                this.character.x = this.character.x + 2;
               /*  this.smoothScrollMove(targetX, 1000); */
                parseInt(this.character.frame) < 42 ?
                this.handleFrame(1) :
                this.character.frame = '000';
                this.character.draw(1);
            }else if(event.deltaY < 0){
                this.character.x <= 0 ?
                this.character.x = 0 :
                this.character.x = this.character.x -2;
                this.character.frame === '000' ?
                this.character.frame = '042' :
                this.handleFrame(-1);
                this.character.draw(-1);
            }
            return;
        });
        document.addEventListener('click', (event) => {
            const contactSection = document.getElementById('contact');
            if(event.target.id === 'scroll-to-contact-section' && window.scrollY < contactSection.offsetTop) {
                window.scrollTo({
                    top: contactSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }


}

export { getCanvas, Character, AnimatedCharacter };

