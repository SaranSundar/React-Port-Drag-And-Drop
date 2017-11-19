import * as React from 'react';
import * as PIXI from 'pixi.js';
import spriteImage from '../assets/bunny.png'
import '../css/gameview.css'

// function setupPIXI(canvas){
//     var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
//     canvas.appendChild(app.view);
//
// // create a new Sprite from an image path
//     var bunny = new PIXI.Sprite.fromImage(spriteImage);
//     // bunny.width = 100;
//     // bunny.height = 100;
//     console.log(bunny);
//
// // center the sprite's anchor point
//     bunny.anchor.set(0.5);
//
// // move the sprite to the center of the screen
//     bunny.x = 100;//app.renderer.width / 2;
//     bunny.y = 100;//app.renderer.height / 2;
//
//     app.stage.addChild(bunny);
//
// // Listen for animate update
//     app.ticker.add(function(delta) {
//         // just for fun, let's rotate mr rabbit a little
//         // delta is 1 if running at 100% performance
//         // creates frame-independent tranformation
//         bunny.rotation += 0.1 * delta;
//     });
//
// }

export default class PixiComponent extends React.Component {
    app;//: Pixi.Application;
    gameCanvas;//: HTMLDivElement;

    constructor() {
        super();
    }

    /**
     * After mounting, add the Pixi Renderer to the div and start the Application.
     */
    componentDidMount() {
        this.app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
        this.gameCanvas.appendChild(this.app.view);
        let bunny = PIXI.Sprite.fromImage(spriteImage);
        // center the sprite's anchor point
        bunny.anchor.set(0.5);

        // move the sprite to the center of the screen
        bunny.x = this.app.renderer.width / 2;
        bunny.y = this.app.renderer.height / 2;
        console.log(bunny);
        this.app.stage.addChild(bunny);

        // Listen for animate update
        this.app.ticker.add(function (delta) {
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent tranformation
            bunny.rotation += 0.1 * delta;
        });

        this.app.start();
        //setupPIXI(this.gameCanvas);
    }

    /**
     * Stop the Application when unmounting.
     */
    componentWillUnmount() {
        this.app.stop();
    }

    /**
     * Simply render the div that will contain the Pixi Renderer.
     */
    render() {
        let component = this;
        return (
            <div ref={(thisDiv) => {
                component.gameCanvas = thisDiv
            }}/>
        );
    }
}