import { rosanaComponentProperties } from "./control.js";

let viewOptions = [
    "noscrollbar",
    "scrollxy",
    "scrollx",
    "scrolly",
    "top",
    "bottom",
    "left",
    "right",
    "horizontal",
    "vertical",
    "vcenter",
    "center",
    "fillxy",
    "fillx",
    "filly",
];

/**
 * Applies the provided options to the given HTML element by adding corresponding CSS classes.
 */
export const optionsApi = (element: HTMLElement, options: string) => {
    options
        .toLowerCase()
        .replace(/\s/g, "")
        .split(",")
        .forEach((option) => {
            if (viewOptions.includes(option)) {
                element.classList.add(option);
            } else {
                console.error(`Unknown option: ${option}`);
            }
        });
};

/**
 * Applies layout styles to the provided element based on the layout type and options.
 */
function layoutFitApi(layout: HTMLElement, type: string, options: string) {
    if (options) optionsApi(layout, options);

    const layoutTYPE = type.toLowerCase();

    switch (layoutTYPE) {
        case "linear":
            layout.classList.add("layout-linear");
            break;
        case "absolute":
            layout.classList.add("layout-absolute");
            break;
        case "frame":
            layout.classList.add("layout-frame");
            break;
        case "stack":
            const directionClass = options?.includes("vertical")
                ? "layout-stack-vertical"
                : "layout-stack-horizontal";
            layout.classList.add(directionClass);
            break;
        default:
            console.error("Unknown Layout", layoutTYPE);
    }
}

const $LayoutInitializer = class extends rosanaComponentProperties {
    type: string;
    /**
     * Creates a new layout element with the specified type and options.
     */
    constructor(type: string, options: string) {
        super();
        this.element = document.createElement("div");
        this.element.id = crypto.randomUUID();

        this.type = `layout-${type}`;
        type ? layoutFitApi(this.element, type, options) : null;
    }
};

const $Layout = {
    /**creates a linear layout with optional child alignment properties */
    Linear: function (childAlignmentProperties: string) {
        return new $LayoutInitializer("linear", childAlignmentProperties);
    },
    /**creates an absolute layout with optional child alignment properties */
    Absolute: function (childAlignmentProperties: string) {
        return new $LayoutInitializer("absolute", childAlignmentProperties);
    },
    /*creates a frame layout with optional child alignment properties. */
    Frame: function (childAlignmentProperties: string) {
        return new $LayoutInitializer("frame", childAlignmentProperties);
    },
    /**creates a stack layout, either horizontal or vertical, with optional child alignment properties. */
    Stacked: function (stackOrientation = "horizontal") {
        return new $LayoutInitializer("stack", stackOrientation);
    },
};

export default $Layout;
