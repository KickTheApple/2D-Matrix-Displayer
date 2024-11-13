const html = document.querySelector("html");
html.addEventListener("drop", async (e) => {
    e.preventDefault();

    const t = await e.dataTransfer.files.item(0).text();

    document.getElementById("paragrahpnic").innerHTML += " (točno na tak način!)";

    posodobljencek(t);

});
html.addEventListener("dragover", (e) => {
    e.preventDefault();

});

const polovicaX = document.querySelector("canvas").width / 2;
const polovicaY = document.querySelector("canvas").height / 2;
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.style.border = "1px solid black";

const DISPLAYMATRIX = [

    [polovicaX,       0,       polovicaX],
    [    0,      -polovicaY,   polovicaY],
    [    0,           0,           1    ],

];

function mnozenjeMatrik(transMatrika, vektor) {

    let noviVektor = [0, 0, 0];

    for (let j = 0; j < transMatrika.length; j++) {

        let sum = 0;

        for (let i = 0; i < transMatrika[0].length; i++) {

            sum += transMatrika[j][i] * vektor[i];

        }

        noviVektor[j] = sum;

    }

    return noviVektor;

}

function ustvaritevMatrik(transformacija) {

    const tipMatrike = transformacija["type"];

    let matrikec = [

        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]

    ];

    if (tipMatrike === "scale") {

        const potrebniPodatki = transformacija["factor"];

        matrikec[0][0] = matrikec[0][0] * potrebniPodatki[0];
        matrikec[1][1] = matrikec[1][1] * potrebniPodatki[1];

    } else if (tipMatrike === "rotate") {

        const potrebniPodatki = transformacija["angle"];

        matrikec[0][0] = Math.cos(potrebniPodatki);
        matrikec[0][1] = -Math.sin(potrebniPodatki);
        matrikec[1][0] = Math.sin(potrebniPodatki);
        matrikec[1][1] = Math.cos(potrebniPodatki);

    } else if (tipMatrike === "translate") {

        const potrebniPodatki = transformacija["vector"];

        matrikec[0][2] = potrebniPodatki[0];
        matrikec[1][2] = potrebniPodatki[1];

    }

    return matrikec;

}

async function posodobljencek(text) {

    const celota = JSON.parse(text);

    const modeli = celota["models"];
    const objekti = celota["scene"];

    for (let objekt of objekti) {

        let trenutniModel = structuredClone(modeli[objekt["model"]]);
        let arrayTransformacij = objekt["transforms"];


        for (let transformacija of arrayTransformacij) {

            let trenutnik = ustvaritevMatrik(transformacija)

            for (let j = 0; j < trenutniModel.length; j++) {

                for (let i = 0; i < trenutniModel[i].length; i++) {

                    trenutniModel[j][i] = mnozenjeMatrik(trenutnik, [trenutniModel[j][i][0], trenutniModel[j][i][1], 1]);

                }

            }

        }

        for (let j = 0; j < trenutniModel.length; j++) {

            for (let i = 0; i < trenutniModel[i].length; i++) {

                trenutniModel[j][i] = mnozenjeMatrik(DISPLAYMATRIX, [trenutniModel[j][i][0], trenutniModel[j][i][1], 1]);

            }

        }


        for (let crta of trenutniModel) {

            context.beginPath();
            context.lineWidth = 1;

            context.moveTo(crta[0][0], crta[0][1]);
            context.lineTo(crta[1][0], crta[1][1]);

            context.stroke();

            context.closePath();

        }

    }

}