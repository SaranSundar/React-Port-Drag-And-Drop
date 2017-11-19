import React, {Component} from 'react';
import '../css/box.css';

let OFFSET = 10;
let onRightEdge, onLeftEdge, onBottomEdge, onTopEdge;
let box;// = document.getElementById("box");
let text;// = document.getElementById("text");
let b, x, y, e;
let clicked = null;
let redraw = false;
let minWidth = 150;
let minHeight = 20;

function init(stateBox) {
    OFFSET = 10;
    box = stateBox;
    text = document.getElementById("text");
    clicked = null;
    redraw = false;
    minWidth = 150;
    minHeight = 20;

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", onUp);
    box.addEventListener("mousedown", onDown);

    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
    box.addEventListener("touchstart", handleTouchStart);

    animate();
}

function handleTouchStart(evt) {
    onDown(evt.touches[0]);
    evt.preventDefault();
}

function handleTouchMove(evt) {
    handleMove(evt.touches[0]);
    evt.preventDefault();
}

function handleTouchEnd(evt) {
    if (evt.touches.length === 0) {
        onUp(evt.changedTouches[0]);
    }
}


function onDown(evt) {
    calc(evt);
    let resizing = onTopEdge || onLeftEdge || onRightEdge || onBottomEdge;

    clicked = {
        x: x,
        y: y,
        cx: evt.clientX,
        cy: evt.clientY,
        w: b.width,
        h: b.height,
        isResizing: resizing,
        isMoving: !resizing,
        onTopEdge: onTopEdge,
        onBottomEdge: onBottomEdge,
        onLeftEdge: onLeftEdge,
        onRightEdge: onRightEdge
    }
}

function onUp(evt) {
    calc(evt);

    clicked = null;
}

function handleMove(evt) {
    calc(evt);
    e = evt;
}

function calc(evt) {
    b = box.getBoundingClientRect();
    x = evt.clientX - b.left;
    y = evt.clientY - b.top;

    onTopEdge = (y < OFFSET) && (evt.clientX > b.left - OFFSET) && (evt.clientX < b.left + b.width + OFFSET);
    onLeftEdge = (x < OFFSET) && (evt.clientY > b.top - OFFSET) && (evt.clientY < b.top + b.height + OFFSET);
    onRightEdge = (x > b.width - OFFSET) && (x < b.width + OFFSET) && (evt.clientY > b.top - OFFSET) && (evt.clientY < b.top + b.height + OFFSET);
    onBottomEdge = (y > b.height - OFFSET) && (y < b.height + OFFSET) && (evt.clientY > b.top - OFFSET) && (evt.clientY < b.top + b.height + OFFSET);
}

function animate() {
    window.requestAnimationFrame(animate);
    redraw = false;

    if (clicked && clicked.isResizing) {
        if (clicked.onRightEdge)
            box.style.width = Math.max(x, minWidth) + "px";
        if (clicked.onBottomEdge)
            box.style.height = Math.max(y, minHeight) + "px";
        if (clicked.onLeftEdge) {
            const currentWidth = Math.max(clicked.cx - e.clientX + clicked.w, minWidth);
            if (currentWidth > minWidth) {
                box.style.width = currentWidth + 'px';
                box.style.left = e.clientX + 'px';
            }
        }
        if (clicked.onTopEdge) {
            const currentHeight = Math.max(clicked.cy - e.clientY + clicked.h, minHeight);
            if (currentHeight > minHeight) {
                box.style.height = currentHeight + 'px';
                box.style.top = e.clientY + 'px';
            }
        }
    }

    if (clicked && clicked.isMoving) {
        box.style.top = (e.clientY - clicked.y) + 'px';
        box.style.left = (e.clientX - clicked.x) + 'px';
    }

    if ((onBottomEdge && onLeftEdge) || (onTopEdge && onRightEdge))
        box.style.cursor = "nesw-resize";
    else if ((onBottomEdge && onRightEdge) || (onTopEdge && onLeftEdge))
        box.style.cursor = "nwse-resize";
    else if (onLeftEdge || onRightEdge)
        box.style.cursor = "ew-resize";
    else if (onTopEdge || onBottomEdge)
        box.style.cursor = "ns-resize";
    else
        box.style.cursor = "default";
}

class Box extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        init(this.box);
    }


    render() {
        return (
            <div ref={elem => this.box = elem} className="box">{this.props.num}</div>
        );
    }
}


export default Box;

