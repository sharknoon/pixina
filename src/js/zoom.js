export default class Zoom {
    constructor(img, options = {
        minZoom: 1,
        maxZoom: 15,
        zoomFactor: 0.2,
        restrictInsideParents: true
    }) {
        this.img = img;
        this.options = options;
        this.style = window.getComputedStyle(this.img);
        this.matrix = new DOMMatrix();
        this.scale = 1;
        this.currentTranslationX = 0;
        this.currentTranslationY = 0;
        this.startMouseX = 0;
        this.startMouseY = 0;
        this.panning = false;
        this.init();
    }

    init() {
        const self = this;

        // Panning

        const handleTouchDown = function (event) {
            self.matrix = new DOMMatrix(self.style.transform);
            self.scale = self.matrix.a;
            self.currentTranslationX = self.matrix.e;
            self.currentTranslationY = self.matrix.f;
            self.startMouseX = event.clientX - self.img.offsetLeft;
            self.startMouseY = event.clientY - self.img.offsetTop;
            self.panning = true;
        }

        const handlePan = function (event) {
            if (!self.panning) return;
            event.preventDefault();
            const currentMouseX = event.clientX - self.img.offsetLeft;
            const currentMouseY = event.clientY - self.img.offsetTop;
            const deltaX = (currentMouseX - self.startMouseX);
            const deltaY = (currentMouseY - self.startMouseY);
            let newTranslationX = self.currentTranslationX + deltaX;
            let newTranslationY = self.currentTranslationY + deltaY;
            if (self.options.restrictInsideParents) {
                const imageScaled = self.img.getBoundingClientRect();
                newTranslationX = Zoom.restrictTranslationInsideParent(imageScaled.width, self.img.parentElement.clientWidth, newTranslationX);
                newTranslationY = Zoom.restrictTranslationInsideParent(imageScaled.height, self.img.parentElement.clientHeight, newTranslationY);
            }
            self.img.style.transform = new DOMMatrix([self.scale, 0, 0, self.scale, newTranslationX, newTranslationY]);
        }

        const handleTouchUp = function () {
            self.panning = false;
        }

        // Zooming

        function getPointInOriginal(event) {
            const mouseX = event.clientX - self.img.offsetLeft - self.img.parentElement.offsetLeft;
            const mouseY = event.clientY - self.img.offsetTop - self.img.parentElement.offsetTop;

            const imageWidthDelta = self.img.getBoundingClientRect().width - self.img.width;
            const imageHeightDelta = self.img.getBoundingClientRect().height - self.img.height;

            let mouseXScaled = mouseX + (imageWidthDelta / 2);
            let mouseYScaled = mouseY + (imageHeightDelta / 2);

            mouseXScaled -= self.matrix.e;
            mouseYScaled -= self.matrix.f;

            return { x: mouseXScaled, y: mouseYScaled };
        }

        const handleWheel = function (event) {
            event.preventDefault();

            self.matrix = new DOMMatrix(self.style.transform);

            // Get old scale
            const currentScale = self.matrix.a;
            // Set the new scale
            const direction = event.deltaY > 0 ? -1 : 1;
            let newScale = currentScale * (1 + (direction * self.options.zoomFactor));
            if (newScale < self.options.minZoom) {
                newScale = self.options.minZoom;
            } else if (newScale > self.options.maxZoom) {
                newScale = self.options.maxZoom;
            }
            const scaleDelta = newScale / currentScale;
            // Get translation
            const currentTranslationX = self.matrix.e * scaleDelta;
            const currentTranslationY = self.matrix.f * scaleDelta;

            const currentCursorX = getPointInOriginal(event).x * scaleDelta;
            const currentCursorY = getPointInOriginal(event).y * scaleDelta;

            // Apply scale and translate transform
            self.img.style.transform = new DOMMatrix([newScale, 0, 0, newScale, currentTranslationX, currentTranslationY]);
            self.matrix = new DOMMatrix(self.style.transform);

            const newCursorX = getPointInOriginal(event).x;
            const newCursorY = getPointInOriginal(event).y;

            let newTranslationX = currentTranslationX - (currentCursorX - newCursorX);
            let newTranslationY = currentTranslationY - (currentCursorY - newCursorY);

            if (self.options.restrictInsideParents) {
                const imageScaled = self.img.getBoundingClientRect();
                newTranslationX = Zoom.restrictTranslationInsideParent(imageScaled.width, self.img.parentElement.clientWidth, newTranslationX);
                newTranslationY = Zoom.restrictTranslationInsideParent(imageScaled.height, self.img.parentElement.clientHeight, newTranslationY);
            }

            self.img.style.transform = new DOMMatrix([newScale, 0, 0, newScale, newTranslationX, newTranslationY]);
        };

        // Events

        // Allow pan start only on the image
        this.img.onmousedown = handleTouchDown;
        this.img.onpointerdown = handleTouchDown;

        document.onmousemove = handlePan;
        document.onpointermove = handlePan;
        // Stop panning everywhere
        document.onmouseup = handleTouchUp;
        document.onpointerup = handleTouchUp;

        this.img.onwheel = handleWheel;

        // Fight browser defaults

        // Disable drag start (pan the image instead)
        this.img.ondragstart = function () {
            return false;
        }

        //document.addEventListener('gesturestart', function (e) {
        //    e.preventDefault();
        //});

    }

    zoom(direction) {
        this.matrix = new DOMMatrix(this.style.transform);

        // Get old scale
        const currentScale = this.matrix.a;
        // Set the new scale
        let newScale = currentScale * (1 + (direction * this.options.zoomFactor));
        if (newScale < this.options.minZoom) {
            newScale = this.options.minZoom;
        } else if (newScale > this.options.maxZoom) {
            newScale = this.options.maxZoom;
        }
        const scaleDelta = newScale / currentScale;
        // Get translation
        let currentTranslationX = this.matrix.e * scaleDelta;
        let currentTranslationY = this.matrix.f * scaleDelta;

        if (this.options.restrictInsideParents) {
            const imageScaled = this.img.getBoundingClientRect();
            currentTranslationX = Zoom.restrictTranslationInsideParent(imageScaled.width * scaleDelta, this.img.parentElement.clientWidth, currentTranslationX);
            currentTranslationY = Zoom.restrictTranslationInsideParent(imageScaled.height * scaleDelta, this.img.parentElement.clientHeight, currentTranslationY);
        }

        // Apply scale and translate transform
        this.img.style.transform = new DOMMatrix([newScale, 0, 0, newScale, currentTranslationX, currentTranslationY]);
    }


    // Common functions

    static restrictTranslationInsideParent(imgLength, parentLength, translate) {
        // "overflow" left / right or top / bottom of image relative to its parent
        // Divide by 2 to get one bar out of the two
        const overflow = (imgLength - parentLength) / 2;
        // Max prevents negative values (if image is smaller than parent)
        const maxTranslate = Math.max(0, overflow);
        // Min prevents positive values (if image is smaller than parent)
        const minTranslate = Math.min(0, -overflow);
        if (translate < minTranslate) {
            return minTranslate;
        } else if (translate > maxTranslate) {
            return maxTranslate;
        }
        return translate;
    }
}