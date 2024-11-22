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
  startPointerX: number;
  startPointerY: number;
  isPanning: boolean;
  // Pinch to zoom
  initialPinchDistance: number;
  initialTouchX: number;
  initialTouchY: number;
  imageElementScale: number;

  constructor(
    el: HTMLElement,
    options: ZoomOptions = {
      minZoom: 1,
      maxZoom: 15,
      zoomFactor: 1.2,
      restrictInsideParents: true,
    }
  ) {
    this.el = el;
    this.options = options;
    this.style = window.getComputedStyle(this.el);
    this.matrix = new DOMMatrix();
    this.startPointerX = 0;
    this.startPointerY = 0;
    this.isPanning = false;
    this.initialPinchDistance = 0;
    this.initialTouchX = 0;
    this.initialTouchY = 0;
    this.imageElementScale = 1;
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

  static getTouchDistance = (touch1: Touch, touch2: Touch) => {
    const deltaX = touch1.clientX - touch2.clientX;
    const deltaY = touch1.clientY - touch2.clientY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  static getTouchCenter = (touch1: Touch, touch2: Touch) => {
    const centerX = (touch1.clientX + touch2.clientX) / 2;
    const centerY = (touch1.clientY + touch2.clientY) / 2;
    return { x: centerX, y: centerY };
  };

  init() {
    // Panning

    const handlePointerDown = (event: PointerEvent) => {
      this.matrix = new DOMMatrix(this.style.transform);

      this.startPointerX = event.clientX;
      this.startPointerY = event.clientY;
      this.isPanning = true;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!this.isPanning) return;
      event.preventDefault();

      const deltaX = event.clientX - this.startPointerX;
      const deltaY = event.clientY - this.startPointerY;
      let newTranslationX = this.translationX + deltaX;
      let newTranslationY = this.translationY + deltaY;
      if (this.options.restrictInsideParents) {
        const elementScaled = this.el.getBoundingClientRect();
        newTranslationX = Zoom.restrictTranslationInsideParent(
          elementScaled.width,
          this.el.parentElement?.clientWidth || 0,
          newTranslationX
        );
        newTranslationY = Zoom.restrictTranslationInsideParent(
          elementScaled.height,
          this.el.parentElement?.clientHeight || 0,
          newTranslationY
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

    // Zooming with wheel

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      this.matrix = new DOMMatrix(this.style.transform);

      // Set the new scale
      let newScale;
      if (event.deltaY > 0) {
        newScale = this.scale / this.options.zoomFactor;
      } else {
        newScale = this.scale * this.options.zoomFactor;
      }
      if (newScale < this.options.minZoom) {
        newScale = this.options.minZoom;
      } else if (newScale > this.options.maxZoom) {
        newScale = this.options.maxZoom;
      }
      let scaleDelata = newScale / this.scale;

      // From the pointers coordinate (relative to document / page), subtract the offset of the element its parent (distance to the page borders because of padding, margin, border, navigation-bars, etc...)
      // and subtract half of the element size to get the pointer position relative to the center of the element
      const x =
        event.pageX -
        this.el.offsetLeft -
        (this.el.parentElement?.offsetLeft ?? 0) -
        this.el.clientWidth / 2;
      const y =
        event.pageY -
        this.el.offsetTop -
        (this.el.parentElement?.offsetTop ?? 0) -
        this.el.clientHeight / 2;
      let newTranslationX = x - (x - this.translationX) * scaleDelata;
      let newTranslationY = y - (y - this.translationY) * scaleDelata;

      if (this.options.restrictInsideParents) {
        const elementScaled = this.el.getBoundingClientRect();
        newTranslationX = Zoom.restrictTranslationInsideParent(
          elementScaled.width,
          this.el.parentElement?.clientWidth ?? 0,
          newTranslationX
        );
        newTranslationY = Zoom.restrictTranslationInsideParent(
          elementScaled.height,
          this.el.parentElement?.clientHeight ?? 0,
          newTranslationY
        );
      }

      // Apply scale and translate transform
      this.el.style.transform = new DOMMatrix([
        newScale,
        0,
        0,
        newScale,
        newTranslationX,
        newTranslationY,
      ]).toString();
    };

    // Zooming with pinch

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 2) return;
      event.preventDefault();

      const center = Zoom.getTouchCenter(event.touches[0], event.touches[1]);
      this.initialTouchX = center.x;
      this.initialTouchY = center.y;
      this.initialPinchDistance = Zoom.getTouchDistance(
        event.touches[0],
        event.touches[1]
      );
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        event.preventDefault();

        // Calculate the new scale
        const newPinchDistance = Zoom.getTouchDistance(
          event.touches[0],
          event.touches[1]
        );
        let newScale =
          (newPinchDistance / this.initialPinchDistance) * this.scale;
        if (newScale < this.options.minZoom) {
          newScale = this.options.minZoom;
        } else if (newScale > this.options.maxZoom) {
          newScale = this.options.maxZoom;
        }

        // Calculate the new translation
        const newCenter = Zoom.getTouchCenter(
          event.touches[0],
          event.touches[1]
        );
        const deltaX = newCenter.x - this.initialTouchX;
        const deltaY = newCenter.y - this.initialTouchY;
        const newTranslationX = this.translationX + deltaX;
        const newTranslationY = this.translationY + deltaY;

        console.log("newTranslationX", newTranslationX);
        const elementScaled = this.el.getBoundingClientRect();
        console.log(elementScaled.width);

        // Apply scale and translate transform
        this.el.style.transform = new DOMMatrix([
          newScale,
          0,
          0,
          newScale,
          newTranslationX,
          newTranslationY,
        ]).toString();

        /*if (this.options.restrictInsideParents) {
          const elementScaled = this.el.getBoundingClientRect();
          newTranslationX = Zoom.restrictTranslationInsideParent(
            elementScaled.width,
            this.el.parentElement?.clientWidth || 0,
            newTranslationX
          );
          newTranslationY = Zoom.restrictTranslationInsideParent(
            elementScaled.height,
            this.el.parentElement?.clientHeight || 0,
            newTranslationY
          );
        }*/
      }
    };

    // Events

    // Allow pan start only on the element
    this.el.onpointerdown = handlePointerDown;
    document.onpointermove = handlePointerMove;
    document.onpointerup = handlePointerUp;
    this.el.onwheel = handleWheel;

    this.el.addEventListener("touchstart", handleTouchStart);
    this.el.addEventListener("touchmove", handleTouchMove);

    // Fight browser defaults

    // Disable drag and drop start (pan the element instead)
    this.el.ondragstart = () => false;

    // Disable panning and pinching geastures for touch devices
    if (this.el.parentElement) {
      this.el.parentElement.style.touchAction = "none";
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
    const currentScale = this.scale;
    // Set the new scale
    let newScale =
      currentScale * (1 + direction * (this.options.zoomFactor - 1));
    if (newScale < this.options.minZoom) {
      newScale = this.options.minZoom;
    } else if (newScale > this.options.maxZoom) {
      newScale = this.options.maxZoom;
    }
    const scaleDelta = newScale / currentScale;

    // Get translation
    let currentTranslationX = this.translationX * scaleDelta;
    let currentTranslationY = this.translationY * scaleDelta;

    if (this.options.restrictInsideParents) {
      const elementScaled = this.el.getBoundingClientRect();
      currentTranslationX = Zoom.restrictTranslationInsideParent(
        elementScaled.width * scaleDelta,
        this.el.parentElement?.clientWidth || 0,
        currentTranslationX
      );
      currentTranslationY = Zoom.restrictTranslationInsideParent(
        elementScaled.height * scaleDelta,
        this.el.parentElement?.clientHeight || 0,
        currentTranslationY
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
    translate: number
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
