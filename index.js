class Excel{
    constructor(content){
        this.content=content;
    }
    header(){
        return this.content[0];
    }
    rows(){
        return this.content.slice(1,this.content.length);
    }

}

const excelInput = document.getElementById("excel-input");

excelInput.addEventListener('change',async function(){

    const content = await readXlsxFile(excelInput.files[0]);

    const excel = new Excel(content);

    console.log(excel.header());
    console.log(excel.rows());

})

const ti = [2, 9, 8, 7, 6, 5, 40, 4, 39, 38, 37, 36,35,34,33,32,31,30,3,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10];
const t = [17, 47, 14, 32, 48,23, 13, 37, 24, 4, 25, 34,26,38,15,31,42,21,45,43,36,22,49,18,39,27,46,16,30,44,35,20,50,19,33,41,28,40,29];
const tCopia = [...t];
let T = new Array(ti.length);
let E = new Array(ti.length);
let I = new Array(ti.length);
let promT = 0;
let promE = 0;
let promI = 0;
//roundRobin(ti, t);

function roundRobin(ti, t) {
    let tf = new Array(ti.length).fill(null);
    let clock = 0;
    let acum = 0;
    const q = 4;

    do {
        flag = false;

        // Aplicando Round Robin
        for (let i = 0; i < ti.length; i++) {
            if (ti[i] <= clock && tf[i] == null) {
                if (t[i] > q) {
                    t[i] -= q;
                    clock += q;
                } else {
                    for (t[i]; t[i] > 0; t[i]--) {
                        clock++;
                    }
                    tf[i] = clock;
                }
            } else {
                acum++;
            }
        }

        if (acum == ti.length) {
            clock++;
        }
        acum = 0;

        // Comprobando condición de terminación
        for (let i = 0; i < tf.length; i++) {
            if (tf[i] == null) {
                flag = true;
            }
        }
    } while (flag);

    console.log("---ti---t---tf---T---E---I");

    for (let i = 0; i < ti.length; i++) {
        T[i] = tf[i] - ti[i];
        E[i] = T[i] - tCopia[i];
        I[i] = tCopia[i] / T[i];

        promT += T[i];
        promE += E[i];
        promI += I[i];
        if(i+1==ti.length){

            promT /= ti.length;
            promE /= ti.length;
            promI /= ti.length;

        }

        console.log(
            `${ti[i].toString().padStart(2)}   ${tCopia[i].toString().padStart(2)}   ${tf[i].toString().padStart(2)}   ${T[i].toString().padStart(2)}   ${E[i].toString().padStart(2)}   ${I[i].toFixed(2).padStart(5)}`
        );
    }

    // Línea con promedios
    console.log("Promedios:");
    console.log(
        `${promT.toFixed(2).padStart(8)}   ${promE.toFixed(2).padStart(8)}   ${promI.toFixed(2).padStart(8)}`
    );
}


