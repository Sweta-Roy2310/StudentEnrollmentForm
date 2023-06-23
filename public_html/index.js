/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
const jpdbBaseURL = "http://api.login2explore.com:5577";
const jpdbIRL = "/api/irl";
const jpdbIML = "/api/iml";
const studDBName = "Student";
const studRelName = "Student-Rel";
const connToken = "90933106|-31949318596849299|90951238";
$("#roll").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);
}

function getEmpIdAsJsonObj(){
    var roll = $("#roll").val();
    var jsonStr = {
        roll: roll
    };
    return JSON.stringify(jsonStr);
}

function validateAndGetFormData() {
    var rollVar = $("#roll").val();
    if (rollVar === "") {
        alert("Employee ID Required Value");
        $("#roll").focus();
        return "";
    }
    var nameVar = $("#name").val();
    if (nameVar === "") {
        alert("Employee Name is Required Value");
        $("#name").focus();
        return "";
    }
    var classVar = $("#class").val();
    if (classVar === "") {
        alert("Employee Email is Required Value");
        $("#class").focus();
        return "";
    }
    var dobVar = $("#dob").val();
    if (dobVar === "") {
        alert("Employee Email is Required Value");
        $("#dob").focus();
        return "";
    }
    var addressVar = $("#address").val();
    if (addressVar === "") {
        alert("Employee Email is Required Value");
        $("#address").focus();
        return "";
    }
    var edVar = $("#ed").val();
    if (edVar === "") {
        alert("Employee Email is Required Value");
        $("#ed").focus();
        return "";
    }
    var jsonStrObj = {
        roll: rollVar,
        name: nameVar,
        class: classVar,
        dob: dobVar,
        address: addressVar,
        enrollment: edVar
    };
    return JSON.stringify(jsonStrObj);
}
function resetForm() {
    $("#roll").val("");
    $("#name").val("");
    $("#class").val("");
    $("#dob").val("");
    $("#address").val("");
    $("#ed").val("");
    $("#roll").prop('disabled', false);
    $("#save").prop('disabled', true);
    $("#change").prop('disabled', true);
    $("#reset").prop('disabled', true);
    $("#roll").focus();
}
function saveData() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(connToken,
            jsonStr, studDBName, studRelName);
//    alert(putReqStr);
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
            jpdbBaseURL, jpdbIML);
//    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#roll").focus();
}
            
function changeData(){
    $("#change").prop('disabled', true);
    jsonChg = validateAndGetFormData();
    
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, studDBName, studRelName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(updateRequest,
            jpdbBaseURL, jpdbIML);
//    alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#roll").focus();
}

function fillData(jsonObj){
//    alert(JSON.stringify(jsonObj));
    saveRecNo2LS(jsonObj);
    var data = JSON.parse(jsonObj.data).record;
    $("#name").val(data.name);
    $("#class").val(data.class);
    $("#dob").val(data.dob);
    $("#address").val(data.address);
    $("#ed").val(data.enrollment);
}

function getEmp(){
//    alert(1);
    var rollJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, studDBName, studRelName, rollJsonObj);
    jQuery.ajaxSetup({async: false});
    var resultJsonObj = executeCommandAtGivenBaseUrl(getRequest,
            jpdbBaseURL, jpdbIRL);
//    alert(JSON.stringify(resultJsonObj));
    jQuery.ajaxSetup({async: true});
    if(resultJsonObj.status === 400){
        $("#save").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#name").focus();
    }else if(resultJsonObj.status === 200){
        $("#roll").prop('disabled', true);
        fillData(resultJsonObj);
        
        $("#change").prop('disabled', false);
        $("#reset").prop('disabled', false);
        $("#name").focus();
    }
}