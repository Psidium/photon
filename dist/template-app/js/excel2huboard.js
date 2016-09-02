var remote = require('remote')
var xlsx = require('node-xlsx')
var dialog = remote.require('dialog')

try {
    var worksheet = xlsx.parse(localStorage.getItem("excelLocation"))
} catch (err) {
    dialog.showMessageBox({
        type: "error",
        buttons: ["OK"],
        title: "Error",
        message: err.message
    }, function redirectToBegin() {
        window.location = "index.html"
    })
}

if (!worksheet || worksheet.length <= 0) {
    dialog.showMessageBox({
        type: "error",
        buttons: ["OK"],
        title: "Error",
        message: "Can't read XLSX!"
    }, function redirectToBegin() {
        window.location = "index.html"
    })
}
var currentSheet = 0
var headerRow = 0
var headerConverter = ["Title", "Data Specific (issue content)", "Column", "Label"];
var selectHeaderFunctionHTML = "";
headerConverter.forEach(function populateHeaderConverter(data, index) {
    selectHeaderFunctionHTML += "<option value="+index+">"+data+"</option>\n"
})
selectHeaderFunctionHTML = selectHeaderFunctionHTML.replace(">Label</", " selected>Label</")

function updateHeaders() {
    $(".generated-data").remove()
    worksheet[currentSheet].data[headerRow].forEach(function forEachHeader(data, index) {
        $("#selectors").append(
            "<div class=\"selector-box generated-data\">\n"+
                "<h1 class=\"title\">"+data+"</h1>\n"+
                    "<select id=\"header"+index+"\" value=\""+index+"\" class=\"form-control\">\n"+
                        selectHeaderFunctionHTML +
                    "</select>\n"+
                "</h1>\n"+
            "</div>\n"
        )
    })
}

$(document).ready(function(){
    worksheet.forEach(function worksheetForEach(data, index) {
        $("#sheets").append("<option value="+ index +">"+ data.name +"</option>");
    })
    updateHeaders()
    $("#sheets").change(function() {
        currentSheet = this.value
        updateHeaders()
    })
})
