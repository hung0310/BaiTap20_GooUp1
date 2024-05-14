var tableList = document.getElementById('table_list_student');

let studentList = [];
let Student_ID = 0;
let id = -1;

function RenderList() {
    var tablebody = tableList.querySelector('tbody');
    tablebody.innerHTML = '';

    studentList.forEach(student => {
        var row = document.createElement('tr');
        var ID_cell = document.createElement('td');
        var Ten_cell = document.createElement('td');
        var NS_cell = document.createElement('td');
        var GT_cell = document.createElement('td');
        var CN_cell = document.createElement('td');
        var btn_update_cell = document.createElement('td');
        var btn_delete_cell = document.createElement('td');
 
        ID_cell.textContent = student.id;
        Ten_cell.textContent = student.ten;
        NS_cell.textContent = student.ns;
        GT_cell.textContent = student.gt;
        CN_cell.textContent = student.cn;

        var update_btn = document.createElement('button');
        update_btn.textContent = 'Cập nhật';
        update_btn.classList.add('border', 'border-gray-700', 'rounded-lg', 'bg-emerald-300', 'hover:bg-emerald-500', 'hover:text-white', 'w-20', 'h-6');
        update_btn.onclick = function() {
            updateInfo(student.id, student.ten, student.ns, student.gt);
        };
        btn_update_cell.appendChild(update_btn);

        var delete_btn = document.createElement('button');
        delete_btn.textContent = 'Xóa';
        delete_btn.classList.add('border', 'border-gray-700', 'rounded-lg', 'bg-red-300', 'hover:bg-red-600', 'hover:text-white', 'w-20', 'h-6');
        delete_btn.onclick = function(event) {
            event.preventDefault();
            document.getElementById('modal_delete').classList.remove('hidden');
            document.getElementById('delete_btn_md').onclick = function() {
                DeleteInfo(student.id);
                document.getElementById('modal_delete').classList.add('hidden');
                resetDeleteModalEvents();
            };
            document.getElementById('cancel_btn_md').onclick = function() {
                document.getElementById('modal_delete').classList.add('hidden');
                resetDeleteModalEvents();
            };
            document.getElementById('close_modal').onclick = function() {
                document.getElementById('modal_delete').classList.add('hidden');
                resetDeleteModalEvents();
            };
        };
        btn_delete_cell.appendChild(delete_btn);

        row.appendChild(ID_cell);
        row.appendChild(Ten_cell);
        row.appendChild(NS_cell);
        row.appendChild(GT_cell);
        row.appendChild(CN_cell);
        row.appendChild(btn_update_cell);
        row.appendChild(btn_delete_cell);

        tablebody.appendChild(row);
    });
}

function resetDeleteModalEvents() {
    document.getElementById('delete_btn_md').onclick = null;
    document.getElementById('cancel_btn_md').onclick = null;
    document.getElementById('close_modal').onclick = null;
}

RenderList();

function ShowInfo(event) {
    event.preventDefault();

    var ten = document.getElementById('ten').value;
    var chuyennganh = document.getElementById('chuyennganh');
    var rdNam = document.getElementById('rd_nam');
    var rdNu = document.getElementById('rd_nu');
    var ns = document.getElementById('dtpk').value;

    var selectedIndex = chuyennganh.selectedIndex;
    var cn = chuyennganh.options[selectedIndex].textContent;
    var gt;

    if (rdNam.checked) {
        gt = rdNam.nextElementSibling.textContent;
    }
    if (rdNu.checked) {
        gt = rdNu.nextElementSibling.textContent;
    }

    if (ten && ns && gt && cn) {
        ++id;
        var newStudent = {id, ten, ns, gt, cn};

        studentList.push(newStudent);
        RenderList();

        document.getElementById('ten').value = '';
        rdNam.checked = false;
        rdNu.checked = false;
        document.getElementById('dtpk').value = '';
    } else {
        alert('Nhập đủ thông tin');
    }
}

function updateInfo(id, ten, ns, gt) {
    var form_update = document.getElementById('form_update');
    form_update.style.display = 'flex';
    var form_info = document.getElementById('form_info');
    form_info.style.display = 'none';

    var t = document.getElementById('ten_update');
    var rd_nam = document.getElementById('rd_nam_update');
    var rd_nu = document.getElementById('rd_nu_update');
    var dtpk = document.getElementById('dtpk_update');
    Student_ID = id;
    t.value = ten;
    if (gt == "Nam")
        rd_nam.checked = true;
    if (gt == "Nữ")
        rd_nu.checked = true;

    dtpk.value = ns;
}

function UpdateInFo(event) {
    event.preventDefault();

    var ten = document.getElementById('ten_update').value;
    var chuyennganh = document.getElementById('chuyennganh_update');
    var rdNam = document.getElementById('rd_nam_update');
    var rdNu = document.getElementById('rd_nu_update');
    var ns = document.getElementById('dtpk_update').value;

    var selectedIndex = chuyennganh.selectedIndex;
    var cn = chuyennganh.options[selectedIndex].textContent;
    var gt;

    if (rdNam.checked) {
        gt = rdNam.nextElementSibling.textContent;
    }
    if (rdNu.checked) {
        gt = rdNu.nextElementSibling.textContent;
    }

    var studentInfo = studentList.find(student => student.id === Student_ID);
    if (studentInfo) {
        if (ten && ns && gt && cn) {
            studentInfo.ten = ten;
            studentInfo.gt = gt;
            studentInfo.cn = cn;
            studentInfo.ns = ns;

            RenderList();
        } else {
            alert('Nhập đủ thông tin');
        }
    }

    var form_update = document.getElementById('form_update');
    form_update.style.display = 'none';
    var form_info = document.getElementById('form_info');
    form_info.style.display = 'flex';
}

function DeleteInfo(idsv) {
    Student_ID = idsv;
    var studentIndex = studentList.findIndex(student => student.id === Student_ID);
    if (studentIndex > -1) {
        studentList.splice(studentIndex, 1);
        RenderList();
    }
}