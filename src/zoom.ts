interface ZoomOptions {
    minZoom: number;
    maxZoom: number;
    zoomFactor: number;
    restrictInsideParents: boolean;
}

export default class Zoom {

    img: HTMLImageElement;
    options: ZoomOptions;
    style: CSSStyleDeclaration;
    matrix: DOMMatrix;
    scale: number;
    currentTranslationX: number;
    currentTranslationY: number;
    startMouseX: number;
    startMouseY: number;
    panning: boolean;

    constructor(img: HTMLImageElement, options: ZoomOptions = {
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

        const handleMouseDown = function (event: MouseEvent) {
            handleDown(event.clientX, event.clientY);
        }

        const handlePointerDown = function (event: PointerEvent) {
            handleDown(event.clientX, event.clientY);
        }

        function handleDown(clientX: number, clientY: number) {
            self.matrix = new DOMMatrix(self.style.transform);
            self.scale = self.matrix.a;
            self.currentTranslationX = self.matrix.e;
            self.currentTranslationY = self.matrix.f;
            self.startMouseX = clientX - self.img.offsetLeft;
            self.startMouseY = clientY - self.img.offsetTop;
            self.panning = true;
        }

        const handleMouseMove = function (event: MouseEvent) {
            handleMove(event);
        }

        const handlePointerMove = function (event: PointerEvent) {
            handleMove(event);
        }

        function handleMove(event: MouseEvent | PointerEvent) {
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
                newTranslationX = Zoom.restrictTranslationInsideParent(imageScaled.width, self.img.parentElement?.clientWidth || 0, newTranslationX);
                newTranslationY = Zoom.restrictTranslationInsideParent(imageScaled.height, self.img.parentElement?.clientHeight || 0, newTranslationY);
            }
            self.img.style.transform = new DOMMatrix([self.scale, 0, 0, self.scale, newTranslationX, newTranslationY]).toString();
        }

        const handleTouchUp = function () {
            self.panning = false;
        }

        // Zooming

        function getPointInOriginal(clientX: number, clientY: number) {
            const mouseX = clientX - self.img.offsetLeft - (self.img.parentElement?.offsetLeft || 0);
            const mouseY = clientY - self.img.offsetTop - (self.img.parentElement?.offsetTop || 0);

            const imageWidthDelta = self.img.getBoundingClientRect().width - self.img.width;
            const imageHeightDelta = self.img.getBoundingClientRect().height - self.img.height;

            let mouseXScaled = mouseX + (imageWidthDelta / 2);
            let mouseYScaled = mouseY + (imageHeightDelta / 2);

            mouseXScaled -= self.matrix.e;
            mouseYScaled -= self.matrix.f;

            return { x: mouseXScaled, y: mouseYScaled };
        }

        const handleWheel = function (event: WheelEvent) {
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

            const currentCursorX = getPointInOriginal(event.clientX, event.clientY).x * scaleDelta;
            const currentCursorY = getPointInOriginal(event.clientX, event.clientY).y * scaleDelta;

            // Apply scale and translate transform
            self.img.style.transform = new DOMMatrix([newScale, 0, 0, newScale, currentTranslationX, currentTranslationY]).toString();
            self.matrix = new DOMMatrix(self.style.transform);

            const newCursorX = getPointInOriginal(event.clientX, event.clientY).x;
            const newCursorY = getPointInOriginal(event.clientX, event.clientY).y;

            let newTranslationX = currentTranslationX - (currentCursorX - newCursorX);
            let newTranslationY = currentTranslationY - (currentCursorY - newCursorY);

            if (self.options.restrictInsideParents) {
                const imageScaled = self.img.getBoundingClientRect();
                newTranslationX = Zoom.restrictTranslationInsideParent(imageScaled.width, self.img.parentElement?.clientWidth || 0, newTranslationX);
                newTranslationY = Zoom.restrictTranslationInsideParent(imageScaled.height, self.img.parentElement?.clientHeight || 0, newTranslationY);
            }

            self.img.style.transform = new DOMMatrix([newScale, 0, 0, newScale, newTranslationX, newTranslationY]).toString();
        };

        // Events

        // Allow pan start only on the image
        this.img.onmousedown = handleMouseDown;
        this.img.onpointerdown = handlePointerDown;

        document.onmousemove = handleMouseMove;
        document.onpointermove = handlePointerMove;
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

    zoom(direction: number) {
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
            currentTranslationX = Zoom.restrictTranslationInsideParent(imageScaled.width * scaleDelta, this.img.parentElement?.clientWidth || 0, currentTranslationX);
            currentTranslationY = Zoom.restrictTranslationInsideParent(imageScaled.height * scaleDelta, this.img.parentElement?.clientHeight || 0, currentTranslationY);
        }

        // Apply scale and translate transform
        this.img.style.transform = new DOMMatrix([newScale, 0, 0, newScale, currentTranslationX, currentTranslationY]).toString();
    }


    // Common functions

    static restrictTranslationInsideParent(imgLength: number, parentLength: number, translate: number) {
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