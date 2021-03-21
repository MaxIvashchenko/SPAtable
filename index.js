
const addBtn = document.getElementById("inputSubmit");
const inputName = document.getElementById("inputName");
const inputTel = document.getElementById("inputTel");
const deleteBtns = document.getElementsByClassName("fa-trash");
const editBtns = document.getElementsByClassName("fa-edit");
const completeBtns = document.getElementsByClassName("fa-check");
const form = document.getElementById("form");

const telReg = /^[\+]?[0-9]+[-\]?[0-9]+$/;
const nameReg = /[а-яА-ЯёЁa-zA-Z]+/;

addBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = inputName.value;
    const tel = inputTel.value;
    const isNameValid = nameReg.test(name)
    const isTelValid = telReg.test(tel)

    if (isNameValid && isTelValid) {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdTel = document.createElement("td");

        const tdBtnEdit = createButtonTd('edit');
        const tdBtnDelete = createButtonTd('trash');

        tdName.append(name);
        tdTel.append(tel);
        tr.append(tdName, tdTel, tdBtnEdit, tdBtnDelete);

        tableBody.appendChild(tr);
        inputName.value = "";
        inputTel.value = "";
        updateHandler();
    } else {
        showErrorText();
    }
})

function createButtonTd(type) {
    const td = document.createElement("td");
    const btn = document.createElement("button");
    btn.classList.add('btn', 'fa', `fa-${type}`);
    td.append(btn);

    return td;
}

function showErrorText() {
    const errorText = `Not valid input`;
    const p = document.createElement("p");
    p.append(errorText);
    form.appendChild(p);
    setTimeout(() => {
        p.remove();
    }, 2000);
}

function deleteHandler(e) {
    const btn = e.target;
    btn.closest('tr').remove();
    e.stopPropagation();
}

function createInputs(e) {
    const btn = e.target;
    btnToggleClass(btn);
    const tr = btn.closest('tr');
    const nameTd = tr.cells[0];
    const telTd = tr.cells[1];

    const inputNameEditor = document.createElement("input");
    const inputTelEditor = document.createElement("input");

    inputNameEditor.value = nameTd.textContent;
    inputNameEditor.type = 'text';
    inputNameEditor.id = "inputNameEditor";
    nameTd.innerHTML = "";
    nameTd.appendChild(inputNameEditor)

    inputTelEditor.value = telTd.textContent;
    inputTelEditor.type = 'text';
    inputTelEditor.id = "inputTelEditor";
    telTd.innerHTML = "";
    telTd.appendChild(inputTelEditor);

    btn.removeEventListener("click", createInputs);
    btn.addEventListener("click", updateRow);

    updateHandler();
    e.stopPropagation();
}

function btnToggleClass(btn) {
    btn.classList.toggle('fa-check');
    btn.classList.toggle('fa-edit');
}

function updateRow(e) {
    const btn = e.target;

    const inputNameEditor = document.getElementById("inputNameEditor");
    const inputTelEditor = document.getElementById("inputTelEditor");

    const name = inputNameEditor.value;
    const tel = inputTelEditor.value;
    const isNameValid = nameReg.test(name);
    const isTelValid = telReg.test(tel);

    if (isNameValid && isTelValid) {
        const tr = btn.closest('tr');
        btnToggleClass(btn);

        const nameTd = tr.cells[0];
        nameTd.innerHTML = name;

        const telTd = tr.cells[1];
        telTd.innerHTML = tel;


        btn.removeEventListener("click", updateRow);
        updateHandler();
    } else {
        showErrorText();
    }
}

function updateHandler() {
    for (let btn of editBtns) {
        btn.addEventListener("click", createInputs);
    }
    for (let btn of completeBtns) {
        btn.addEventListener("click", updateRow);
    }
    for (let btn of deleteBtns) {
        btn.addEventListener("click", deleteHandler);
    }
}