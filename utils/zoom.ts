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

  constructor(
    img: HTMLImageElement,
    options: ZoomOptions = {
      minZoom: 1,
      maxZoom: 15,
      zoomFactor: 0.2,
      restrictInsideParents: true,
    },
  ) {
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
    // Panning

    const handlePointerDown = (event: PointerEvent) => {
      this.matrix = new DOMMatrix(this.style.transform);
      this.scale = this.matrix.a;
      this.currentTranslationX = this.matrix.e;
      this.currentTranslationY = this.matrix.f;
      this.startMouseX = event.clientX - this.img.offsetLeft;
      this.startMouseY = event.clientY - this.img.offsetTop;
      this.panning = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!this.panning) return;
      event.preventDefault();
      const currentMouseX = event.clientX - this.img.offsetLeft;
      const currentMouseY = event.clientY - this.img.offsetTop;
      const deltaX = currentMouseX - this.startMouseX;
      const deltaY = currentMouseY - this.startMouseY;
      let newTranslationX = this.currentTranslationX + deltaX;
      let newTranslationY = this.currentTranslationY + deltaY;
      if (this.options.restrictInsideParents) {
        const imageScaled = this.img.getBoundingClientRect();
        newTranslationX = Zoom.restrictTranslationInsideParent(
          imageScaled.width,
          this.img.parentElement?.clientWidth || 0,
          newTranslationX,
        );
        newTranslationY = Zoom.restrictTranslationInsideParent(
          imageScaled.height,
          this.img.parentElement?.clientHeight || 0,
          newTranslationY,
        );
      }
      this.img.style.transform = new DOMMatrix([
        this.scale,
        0,
        0,
        this.scale,
        newTranslationX,
        newTranslationY,
      ]).toString();
    };

    const handlePointerUp = () => {
      this.panning = false;
    };

    // Zooming

    const getPointInOriginal = (clientX: number, clientY: number) => {
      const mouseX =
        clientX -
        this.img.offsetLeft -
        (this.img.parentElement?.offsetLeft || 0);
      const mouseY =
        clientY - this.img.offsetTop - (this.img.parentElement?.offsetTop || 0);

      const imageWidthDelta =
        this.img.getBoundingClientRect().width - this.img.width;
      const imageHeightDelta =
        this.img.getBoundingClientRect().height - this.img.height;

      let mouseXScaled = mouseX + imageWidthDelta / 2;
      let mouseYScaled = mouseY + imageHeightDelta / 2;

      mouseXScaled -= this.matrix.e;
      mouseYScaled -= this.matrix.f;

      return { x: mouseXScaled, y: mouseYScaled };
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      this.matrix = new DOMMatrix(this.style.transform);

      // Get old scale
      const currentScale = this.matrix.a;
      // Set the new scale
      const direction = event.deltaY > 0 ? -1 : 1;
      let newScale = currentScale * (1 + direction * this.options.zoomFactor);
      if (newScale < this.options.minZoom) {
        newScale = this.options.minZoom;
      } else if (newScale > this.options.maxZoom) {
        newScale = this.options.maxZoom;
      }
      const scaleDelta = newScale / currentScale;
      // Get translation
      const currentTranslationX = this.matrix.e * scaleDelta;
      const currentTranslationY = this.matrix.f * scaleDelta;

      const currentCursorX =
        getPointInOriginal(event.clientX, event.clientY).x * scaleDelta;
      const currentCursorY =
        getPointInOriginal(event.clientX, event.clientY).y * scaleDelta;

      // Apply scale and translate transform
      this.img.style.transform = new DOMMatrix([
        newScale,
        0,
        0,
        newScale,
        currentTranslationX,
        currentTranslationY,
      ]).toString();
      this.matrix = new DOMMatrix(this.style.transform);

      const newCursorX = getPointInOriginal(event.clientX, event.clientY).x;
      const newCursorY = getPointInOriginal(event.clientX, event.clientY).y;

      let newTranslationX = currentTranslationX - (currentCursorX - newCursorX);
      let newTranslationY = currentTranslationY - (currentCursorY - newCursorY);

      if (this.options.restrictInsideParents) {
        const imageScaled = this.img.getBoundingClientRect();
        newTranslationX = Zoom.restrictTranslationInsideParent(
          imageScaled.width,
          this.img.parentElement?.clientWidth || 0,
          newTranslationX,
        );
        newTranslationY = Zoom.restrictTranslationInsideParent(
          imageScaled.height,
          this.img.parentElement?.clientHeight || 0,
          newTranslationY,
        );
      }

      this.img.style.transform = new DOMMatrix([
        newScale,
        0,
        0,
        newScale,
        newTranslationX,
        newTranslationY,
      ]).toString();
    };

    // Events

    // Allow pan start only on the image
    this.img.onpointerdown = handlePointerDown;

    document.onpointermove = handlePointerMove;
    // Stop panning everywhere
    document.onpointerup = handlePointerUp;

    this.img.onwheel = handleWheel;

    // Fight browser defaults

    // Disable drag start (pan the image instead)
    this.img.ondragstart = () => false;
  }

  zoomIn() {
    this.zoom(1);
  }

  zoomOut() {
    this.zoom(-1);
  }

  zoom(direction: 1 | -1) {
    this.matrix = new DOMMatrix(this.style.transform);

    // Get old scale
    const currentScale = this.matrix.a;
    // Set the new scale
    let newScale = currentScale * (1 + direction * this.options.zoomFactor);
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
      currentTranslationX = Zoom.restrictTranslationInsideParent(
        imageScaled.width * scaleDelta,
        this.img.parentElement?.clientWidth || 0,
        currentTranslationX,
      );
      currentTranslationY = Zoom.restrictTranslationInsideParent(
        imageScaled.height * scaleDelta,
        this.img.parentElement?.clientHeight || 0,
        currentTranslationY,
      );
    }

    // Apply scale and translate transform
    this.img.style.transform = new DOMMatrix([
      newScale,
      0,
      0,
      newScale,
      currentTranslationX,
      currentTranslationY,
    ]).toString();
  }

  // Common functions

  static restrictTranslationInsideParent(
    elementLength: number,
    parentElementLength: number,
    translate: number,
  ): number {
    // "overflow" left / right or top / bottom of element relative to its parent
    // Divide by 2 to get one bar out of the two
    const overflow = (elementLength - parentElementLength) / 2;
    // Prevents negative values (if element is smaller than parent)
    const maxTranslate = Math.max(0, overflow);
    // Prevents positive values (if element is smaller than parent)
    const minTranslate = Math.min(0, -overflow);
    if (translate < minTranslate) {
      return minTranslate;
    } else if (translate > maxTranslate) {
      return maxTranslate;
    }
    return translate;
  }
}
