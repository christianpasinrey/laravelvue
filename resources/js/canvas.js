
const getCanvas = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //postion canvas on the bottom of the screen, full width
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    canvas.style.position = 'absolute';
    canvas.style.left = '0px';
    canvas.style.top = (window.innerHeight - canvasHeight) + 'px';
    canvas.style.zIndex = '1000';
    canvas.style.width = '100%';
    canvas.style.height = '200%';
    canvas.style.border = '1px solid red';

    return { canvas, ctx, canvasWidth, canvasHeight };
}

const character = new Image();
character.src = 'storage/canvas-vectors/character_rightside_neutral_position.png';

const drawCharacter = () => {
    //get canvas and context
    const { canvas, ctx, canvasWidth, canvasHeight } = getCanvas();
    //draw the character on the canvas
    character.onload = function () {
        ctx.drawImage(character, 0, 0, 40, 150);
    }
}

const moveCharacterWithArrowKeys = () => {
    //get canvas and context
    const { canvas, ctx } = getCanvas();

    const canvasWidth = canvas.width;

    const canvasHeight = canvas.height;

    //draw the character on the canvas
    character.onload = function () {
        ctx.drawImage(character, characterX, characterY, 40, 150);
    }

    //move character with arrow keys
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowRight') {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            characterX += 10;
            ctx.drawImage(character, characterX, characterY, 40, 150);
        }
        if (event.key === 'ArrowLeft') {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            characterX -= 10;
            ctx.drawImage(character, characterX, characterY, 40, 150);
        }
        if (event.key === 'ArrowUp') {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            characterY -= 10;
            ctx.drawImage(character, characterX, characterY, 40, 150);
        }
        if (event.key === 'ArrowDown') {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            characterY += 10;
            ctx.drawImage(character, characterX, characterY, 40, 150);
        }
    });
}
export { drawCharacter, moveCharacterWithArrowKeys };

