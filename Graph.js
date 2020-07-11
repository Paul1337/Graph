class Graph {

    constructor(width, height, place = document.body) {
        this.canvas = document.createElement('canvas');
        let ratio = window.devicePixelRatio;
        if (ratio == undefined) ratio = 1;

        this.canvas.width = width * ratio;
        this.canvas.height = height * ratio;

        this.width = width;
        this.height = height;

        var ctx = this.canvas.getContext('2d');

        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";

        var scale = window.devicePixelRatio;
        ctx.scale(ratio, ratio);

        this.place = place;
        if (typeof place.appendChild === 'function') {
            place.appendChild(this.canvas);
        } else place[0].appendChild(this.canvas);
        this.context = this.canvas.getContext('2d');

        this.fontSize = 20;
        this.fontFamily = 'sans-serif';
        this.fontWeight = 'normal';

        this.updateFont();

        this.loadedImages = {};

        this.stroke('black');
        this.fill('gray');

        this.animations = []
    }

    resize(width, height) {
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
        this.width = width
        this.height = height
        let ratio = window.devicePixelRatio;
        if (ratio == undefined) ratio = 1;

        this.canvas.width = width * ratio;
        this.canvas.height = height * ratio;

        let scale = window.devicePixelRatio;
        this.context.scale(ratio, ratio);
    }

    destroy() {
        if (typeof this.place.removeChild === 'function') {
            this.place.removeChild(this.canvas);
        } else this.place[0].removeChild(this.canvas);
    }

    on(eventName, callback) {
        this.canvas.addEventListener(eventName, callback);
    }

    off(eventName, callback) {
        this.canvas.removeEventListener(eventName, callback);
    }

    setLineDash(param) {
        this.context.setLineDash(param);
    }

    roundRect(x, y, w, h, clear = false, noBorders = false) {

    }

    clearRoundRect(x, y, w, h) {

    }

    ellipse(x, y, w, h, clear = false, noBorders = false) {
        this.beginPath();
        this.context.ellipse(x, y, w / 2, h / 2, 0, 0, 2 * Math.PI);
        if (!clear) this.context.fill();
        if (!noBorders) this.context.stroke();
        this.closePath();
    }

    clearEllipse(x, y, w, h) {
        this.ellipse(x, y, w, h, true);
    }

    rotatedEllipse(x, y, w, h, angle, inWhat = 'deg') {
        let a = angle;
        if (inWhat == 'deg') a = angle / 180 * Math.PI;
        this.context.ellipse(x, y, w / 2, h / 2, a, 0, 2 * Math.PI);
    }

    createLinearGradient(x, y, x2, y2) {
        return this.context.createLinearGradient(x, y, x2, y2);
    }

    createRadialGradient(x0, y0, r0, x, y, r) {
        return this.context.createRadialGradient(x0, y0, r0, x, y, r);
    }

    quadCurve(x1, y1, cpx, cpy, x, y, fill = false) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.quadraticCurveTo(cpx, cpy, x, y);
        this.context.stroke();
        if (fill) this.context.fill();
        this.context.closePath();
    }

    curve(x1, y1, cp1x, cp1y, cp2x, cp2y, x, y, fill = false) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        this.context.stroke();
        if (fill) this.context.fill();
        this.context.closePath();
    }

    beginPath() {
        this.context.beginPath();
    }

    closePath() {
        this.context.closePath();
    }

    moveTo(x, y) {
        this.context.moveTo(x, y);
    }

    border(style) {
        let prevStyle = this.context.fillStyle;
        this.stroke(style);
        this.rect(0, 0, this.width - this.context.lineWidth / 2, this.height - this.context.lineWidth / 2, true, false);
        this.stroke(prevStyle);
    }

    borderRGB(r, g, b, a) {
        this.border(Graph.rgb(r, g, b, a));
    }

    background(style) {
        let prevStyle = this.context.fillStyle;
        this.fill(style);
        this.rect(0, 0, this.width, this.height, false, true);
        this.fill(prevStyle);
    }

    backgroundRGB(r, g, b, a) {
        this.background(Graph.rgb(r, g, b, a));
    }

    line(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
        this.context.closePath();
    }

    lineTo(x2, y2) {
        this.context.lineTo(x2, y2)
    }

    clearCircle(x, y, r = 20) {
        this.circle(x, y, r, true);
    }

    clearRect(x, y, w, h) {
        this.rect(x, y, w, h, true);
    }

    polygon(...coords) {
        let x, y;

        this.context.beginPath();
        this.context.moveTo(coords[0], coords[1]);

        let end = coords.length;
        let noFill = false;
        let noBorders = false;

        if (typeof coords[coords.length - 2] == 'boolean' && typeof coords[coords.length - 1] == 'boolean') {
            end--;
            noBorders = coords[coords.length - 1];
            noFill = coords[coords.length - 2];
        } else if (typeof coords[coords.length - 1] == 'boolean') {
            end--;
            noFill = coords[coords.length - 1];
        }

        for (let i = 2; i < end; i++) {
            if (i % 2 == 0) {
                x = coords[i];
            } else {
                y = coords[i];
                this.context.lineTo(x, y);
            }
        }

        this.context.closePath();

        if (!noFill) this.context.fill();
        if (!noBorders) this.context.stroke();
        this.context.closePath();

    }

    triangle(x1, y1, x2, y2, x3, y3, clear = false, noBorders = false) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x3, y3);
        this.context.closePath();
        if (clear == false) this.context.fill();
        if (noBorders == false) this.context.stroke();
        this.context.closePath();
    }

    clearTriangle(x1, y1, x2, y2, x3, y3) {
        this.triangle(x1, y1, x2, y2, x3, y3, true);
    }

    circle(x, y, r = 20, clear = false, noBorders = false) {
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2 * Math.PI);
        if (!noBorders) this.context.stroke();
        if (!clear)
            this.context.fill();
        this.context.closePath();
    }

    rect(x, y, w, h, clear = false, noBorders = false) {
        if (!clear) this.context.fillRect(x, y, w, h);
        if (!noBorders) this.context.strokeRect(x, y, w, h);
    }

    text(value, x, y, maxWidth) {
        this.context.fillText(value, x, y, maxWidth);
    }

    setFontSize(size) {
        this.fontSize = size;
        this.updateFont();
    }

    setFontColor(color) {
        this.fontColor = color;
        this.updateFont();
    }

    setFontWeight(weight) {
        this.fontWeight = weight;
        this.updateFont();
    }

    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        this.updateFont();
    }

    fill(style) {
        this.context.fillStyle = style;
    }

    fillRGB(r, g, b, a) {
        this.fill(Graph.rgb(r, g, b, a));
    }

    stroke(style) {
        this.context.strokeStyle = style;
    }

    strokeRGB(r, g, b, a) {
        this.stroke(Graph.rgb(r, g, b, a));
    }

    setLineWidth(width) {
        this.context.lineWidth = width;
    }

    updateFont() {
        let s = `${this.fontWeight} ${this.fontSize}px ${this.fontFamily} `;
        this.context.font = s;
    }

    image(param, x, y, w, h, x2, y2, w2, h2) {

        if (typeof param == 'string') {
            let url = param
            if (this.loadedImages[url] == undefined) {
                this.loadImage(url, () => {
                    let img = this.loadedImages[url];
                    if (x2 !== undefined && y2 !== undefined && w2 !== undefined && h2 !== undefined)
                        this.context.drawImage(img, x2, y2, w2, h2, x, y, w, h);
                    else
                        this.context.drawImage(img, x, y, w, h);
                });
            } else {
                let img = this.loadedImages[url];
                if (x2 !== undefined && y2 !== undefined && w2 !== undefined && h2 !== undefined)
                    this.context.drawImage(img, x2, y2, w2, h2, x, y, w, h);
                else
                    this.context.drawImage(img, x, y, w, h);
            }
        } else if (typeof param == 'object') {
            let img = param
            if (x2 !== undefined && y2 !== undefined && w2 !== undefined && h2 !== undefined)
                this.context.drawImage(img, x2, y2, w2, h2, x, y, w, h);
            else
                this.context.drawImage(img, x, y, w, h);
        }


    }

    loadImage(url, callback) {
        let img = new Image();
        img.onload = () => {
            this.loadedImages[url] = img;
            if (callback !== undefined)
                callback();
        };
        img.src = url;
    }

    loadImages(imageUrls, done) {
        let counter = imageUrls.length

        imageUrls.forEach(imageUrl => {
            if (this.loadedImages[imageUrl] == undefined) {
                this.loadImage(imageUrl, () => {
                    counter--
                })
            } else
                counter--
        })
    }

    rotateAround(x, y, val, inWhat = 'rad') {
        // this.save();
        this.translate(x, y);
        this.rotate(val, inWhat);
        this.translate(-x, -y);
    }

    restore() {
        this.context.restore();
    }

    save() {
        this.context.save();
    }

    translate(x, y) {
        this.context.translate(x, y);
    }

    rotate(val, inWhat = 'rad') {
        if (inWhat == 'deg') {
            this.context.rotate(val * Math.PI / 180);
        } else {
            this.context.rotate(val);
        }
    }

    static loop(repeatFunc) {
        requestAnimationFrame(() => {
            this.loop(repeatFunc);
            repeatFunc();
        })
    }

    static rgb(r, g, b, a = 1) {
        return `rgb(${r},${g},${b},${a})`;
    }

    static createImage(url, loaded) {
        let img = new Image()
        img.src = url
        if (loaded !== undefined) {
            img.onload = loaded
        }
        return img
    }

    createAnimation(x, y, w, h, options, callback) {

        if (options.loaded !== undefined && options.loaded == false) {
            if (options.urls !== undefined) {
                this.loadImages(options.urls, () => {
                    let animaion = new Animation(x, y, w, h, options)
                    this.animations.push(animation)
                    return callback(animation)
                })
            }
        } else {
            let animaion = new Animation(x, y, w, h, options)
            this.animations.push(animation)
            return animation
        }
    }

    runAnimation(animation) {
        this.runAnimations([animation])
    }

    runAnimations(animations) {
        animations.forEach(animation => {
            animation.run()
        })
    }

    updateAllAnimations() {
        this.animations.forEach(anim => {
            anim.update(this)
        })
    }

    updateAnimation(anim) {
        this.updateAnimations([anim])
    }

    updateAnimations(anims) {
        anims.forEach((a) => {
            a.update(this)
        })
    }
}

class Animation {

    constructor(x, y, w, h, options) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h

        this.delay = options.delay
        if (this.delay == undefined)
            delay = 3
        this.time = 0

        this.frames = 0
        this.animationType = -1

        let urls = options.urls
        let images = options.images

        if (urls !== undefined) {
            this.urls = urls
            this.animationType = 1
            this.frames = this.urls.length
        } else if (images !== undefined) {
            this.images = images
            this.frames = this.images.length
            this.animationType = 2
        } else {
            throw 'You must pass images or urls to animate'
        }

        this.frame = 0
        this.loadedImages = loadedImages

        this.running = false
        this.loopable = options.loopable
        if (this.loopable == undefined)
            this.loopable = false
    }

    run() {
        this.running = true
        this.time = 0
    }

    stop() {
        this.running = false
    }

    reset() {
        this.time = 0
        this.frame = 0
    }

    update(gr) {
        if (!this.running)
            return

        if (this.time < this.delay) {
            this.time++
            return
        } else
            this.time = 0

        if (this.animationType == 1) {
            gr.image(this.urls[this.frame], this.x, this.y, this.w, this.h)
        } else if (this.animationType == 2) {
            gr.image(this.images[this.frame], this.x, this.y, this.w, this.h)
        }

        if (this.frame == this.frames - 1) {
            this.frame = 0

            if (this.loopable == false) {
                this.running = false
            }
        } else {
            this.frame++
        }
    }

}

// example usage
// 1:
// let animation = gr.createAnimation(x, y, w, h, { urls: ['1.png', '2.png', '3.png'], loaded: false }, (animation) => {
//     animation.animate()  
// })
//
// 2:
// let urls = ['1.png', '2.png', '3.png']
// gr.loadImages(urls, () => {
//    let animation = gr.createAnimation(x, y, w, h, { urls: urls }) or let animation = new Animation(x, y, w, h, { urls: urls })
//    animation.animate()
// })
//
// To play animation:
// animation.run() or gr.runAnimation(animation)
// multiple animations:
// animations.forEach(gr.runAnimation) or gr.runAnimations(animations) 
//  
// you have to update animations permanently
// gr.updateAllAnimations() - will update all animations you've created using Graph::createAnimation(x, y, w, h, options, callback)
// gr.updateAnimation(anim) or anim.update(gr) - will update particular animation
// gr.updateAnimations([a1, a2, a3]) - will update multiple animations
//
// And you can also run animation with its own loop (coming soon)
// To do that:
// animation.startLoop(gr) or gr.startAnimationLoop(animation)
//
//
//
//
//