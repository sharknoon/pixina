interface ZoomOptions {
  minZoom: number;
  maxZoom: number;
  zoomFactor: number;
  restrictInsideParents: boolean;
}

export default class Zoom {
  el: HTMLElement;
  options: ZoomOptions;
  style: CSSStyleDeclaration;
  // 2D Matrix
  // Since we are not using any skewing or rotation, we can simplify this assigment like this:
  // a = scale x
  // b = 0
  // c = 0
  // d = scale y
  // e = translation x
  // f = translation y
  matrix: DOMMatrix;
  startPointerXRelativeToEl: number;
  startPointerYRelativeToEl: number;
  isPanning: boolean;

  constructor(
    el: HTMLElement,
    options: ZoomOptions = {
      minZoom: 1,
      maxZoom: 15,
      zoomFactor: 0.2,
      restrictInsideParents: true,
    },
  ) {
    this.el = el;
    this.options = options;
    this.style = window.getComputedStyle(this.el);
    this.matrix = new DOMMatrix();
    this.startPointerXRelativeToEl = 0;
    this.startPointerYRelativeToEl = 0;
    this.isPanning = false;
    this.init();
  }

  get scale(): number {
    return this.matrix.a;
  }

  get translationX(): number {
    return this.matrix.e;
  }

  get translationY(): number {
    return this.matrix.f;
  }

  init() {
    // Panning

    const handlePointerDown = (event: PointerEvent) => {
      this.matrix = new DOMMatrix(this.style.transform);
      this.startPointerXRelativeToEl = event.clientX - this.el.offsetLeft;
      this.startPointerYRelativeToEl = event.clientY - this.el.offsetTop;
      this.isPanning = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!this.isPanning) return;
      event.preventDefault();
      const pointerXRelativeToEl = event.clientX - this.el.offsetLeft;
      const pointerYRelativeToEl = event.clientY - this.el.offsetTop;
      const deltaX = pointerXRelativeToEl - this.startPointerXRelativeToEl;
      const deltaY = pointerYRelativeToEl - this.startPointerYRelativeToEl;
      let newTranslationX = this.translationX + deltaX;
      let newTranslationY = this.translationY + deltaY;
      if (this.options.restrictInsideParents) {
        const elementScaled = this.el.getBoundingClientRect();
        newTranslationX = Zoom.restrictTranslationInsideParent(
          elementScaled.width,
          this.el.parentElement?.clientWidth || 0,
          newTranslationX,
        );
        newTranslationY = Zoom.restrictTranslationInsideParent(
          elementScaled.height,
          this.el.parentElement?.clientHeight || 0,
          newTranslationY,
        );
      }
      this.el.style.transform = new DOMMatrix([
        this.scale,
        0,
        0,
        this.scale,
        newTranslationX,
        newTranslationY,
      ]).toString();
    };

    const handlePointerUp = () => {
      this.isPanning = false;
    };

    // Zooming

    const getPointInOriginal = (clientX: number, clientY: number) => {
      const pointerX =
        clientX -
        this.el.offsetLeft -
        (this.el.parentElement?.offsetLeft || 0);
      const pointerY =
        clientY - this.el.offsetTop - (this.el.parentElement?.offsetTop || 0);

      const elementWidthDelta =
        this.el.getBoundingClientRect().width - this.el.clientWidth;
      const elementHeightDelta =
        this.el.getBoundingClientRect().height - this.el.clientHeight;

      let pointerXScaled = pointerX + elementWidthDelta / 2;
      let pointerYScaled = pointerY + elementHeightDelta / 2;

      pointerXScaled -= this.matrix.e;
      pointerYScaled -= this.matrix.f;

      return { x: pointerXScaled, y: pointerYScaled };
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
      this.el.style.transform = new DOMMatrix([
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
        const elementScaled = this.el.getBoundingClientRect();
        newTranslationX = Zoom.restrictTranslationInsideParent(
          elementScaled.width,
          this.el.parentElement?.clientWidth || 0,
          newTranslationX,
        );
        newTranslationY = Zoom.restrictTranslationInsideParent(
          elementScaled.height,
          this.el.parentElement?.clientHeight || 0,
          newTranslationY,
        );
      }

      this.el.style.transform = new DOMMatrix([
        newScale,
        0,
        0,
        newScale,
        newTranslationX,
        newTranslationY,
      ]).toString();
    };

    // Events

    // Allow pan start only on the element
    this.el.onpointerdown = handlePointerDown;
    document.onpointermove = handlePointerMove;
    document.onpointerup = handlePointerUp;
    this.el.onwheel = handleWheel;

    // Fight browser defaults

    // Disable drag and drop start (pan the element instead)
    this.el.ondragstart = () => false;

    // Disable panning and pinching geastures for touch devices
    if (this.el.parentElement) {
      this.el.parentElement.style.touchAction = 'none';
    }
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
      const elementScaled = this.el.getBoundingClientRect();
      currentTranslationX = Zoom.restrictTranslationInsideParent(
        elementScaled.width * scaleDelta,
        this.el.parentElement?.clientWidth || 0,
        currentTranslationX,
      );
      currentTranslationY = Zoom.restrictTranslationInsideParent(
        elementScaled.height * scaleDelta,
        this.el.parentElement?.clientHeight || 0,
        currentTranslationY,
      );
    }

    // Apply scale and translate transform
    this.el.style.transform = new DOMMatrix([
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
