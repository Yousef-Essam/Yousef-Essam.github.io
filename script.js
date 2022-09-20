var matInt = document.getElementById('matrix'),
    start = document.getElementById('start'),
    reset = document.getElementById('reset'),
    rowInp = document.getElementById('rows'),
    colInp = document.getElementById('columns'),
    solve;

start.onclick = function () {
    var rowNum = Number(rowInp.value),
        colNum = Number(colInp.value);

    for (let i = 0; i < rowNum; i++) {
        let tr = document.createElement('tr');
        for (let m = 0; m < colNum; m++) {
            let td = document.createElement('td'),
                inp = document.createElement('input'),
                span = document.createElement('span');
            
            if (m === colNum - 1) {
                span.textContent = 'x' + (m + 1);
            } else {
                span.textContent = 'x' + (m + 1) + ' + ';
            }
            td.appendChild(inp);
            td.appendChild(span);
            tr.appendChild(td);
        }
        let tdl = document.createElement('td'),
            span = document.createElement('span'),
            inp = document.createElement('input');

        span.textContent = ' = ';
        tdl.appendChild(span);
        tdl.appendChild(inp);
        tr.appendChild(tdl);
        matInt.appendChild(tr);
    }
    document.getElementsByTagName('input')[2].focus();
    solve = document.createElement('button');
    solve.textContent = 'Solve';
    document.getElementById('window').appendChild(solve);

    solve.onclick = function () {
        var mat = [],
            rowN = Number(matInt.childNodes.length),
            colN = Number(matInt.childNodes[0].childNodes.length);
        for (let i = 0; i < matInt.childNodes.length; i++) {
            let trc = matInt.childNodes[i],
                arr = [];
            for (let s = 0; s < trc.childNodes.length; s++) {
                arr.push(Number(trc.childNodes[s].getElementsByTagName('input')[0].value));
            }
            mat.push(arr);
        }
    
        var sys = new LinearSystem(rowN, colN, mat);
        if (sys.consistent) {
            if (sys.unique) {
                alert(sys.solution);
            } else {
                alert('This system has infinitely many solutions');
            }
        } else {
            alert('This system has no solution');
        }
    };
};

reset.onclick = function () {
    for (let i = 0; i <= matInt.childNodes.length;) {
        if (matInt.childNodes.length === 0) break;
        matInt.removeChild(matInt.childNodes[i]);
    }
    rowInp.value = '';
    colInp.value = '';
    rowInp.focus();
};

document.onkeypress = function (e) {
    var newInpInd = focusedInp() + 1;
    if (e.key === 'Enter' && newInpInd < document.getElementsByTagName('input').length) {
        document.getElementsByTagName('input')[newInpInd].focus();
    }
};

function focusedInp() {
    var inps = [...document.getElementsByTagName('input')];
    for (let i = 0; i < inps.length; i++) {
        if (document.activeElement === inps[i]) return i;
    }
    return -1;
}
