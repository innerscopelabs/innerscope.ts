import type { Component } from "./types";

/** * showIF method allows you to hide or show an element if the restingParameter is truthy */
const showIF = function (restingParameter: boolean, onTruthyElement: Component, onFalseyElement: Component) {
    if (onTruthyElement === undefined || onFalseyElement === undefined) {
        console.error(`showIF not called, one of the elements is undefined`);
        return;
    }
    restingParameter ? onTruthyElement.Show() : onTruthyElement.Hide();
    !restingParameter ? onFalseyElement.Show() : onFalseyElement.Hide();
};

export default showIF;
