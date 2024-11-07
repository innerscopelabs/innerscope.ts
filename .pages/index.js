import { $localize, $suspense, $layout, $component, $setLanguage } from "reckt";

export const homePage = $layout("linear", "fillxy, vcenter");

let button = $component("button", homePage);
button.css`
    border: 2px solid #6200ea;
    color: #6200ea;
    background-color: transparent; 
    font-family: "Archivo", sans-serif;
    font-weight: 500; 
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem 1rem; 
    transition: background-color 0.3s, color 0.3s;
    
    &:hover {
        background-color: #6200ea; 
        color: white; 
    }

    &:active {
        background-color: #3700b3; 
        border-color: #3700b3; 
    }
`.on("click", () => {
    $setLanguage("fr");
});

let loaderPage = $layout("linear", "fillxy, vcenter");
let loaderImage = $component("img", loaderPage);
loaderImage.element.src = "../favicon.ico";
loaderImage.css`
    width: 100%;
    height: auto;
    border-radius: 4px;
`;

$suspense(loadAppData, loaderPage, homePage).effects(() => {
    button.localizedText("greeting", { name: "Oarabile" });
});

async function loadAppData() {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
        await $localize(
            "en",
            "https://raw.githubusercontent.com/oarabiledev/metro/main/translations.json"
        );
    } catch (e) {
        console.error("Localization failed:", e);
    }
}
