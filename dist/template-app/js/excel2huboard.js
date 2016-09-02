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

$(document).ready(function(){
    worksheet.forEach(function worksheetForEach(data, index) {
        $("#sheets").append("<option value="+ index +">"+ data.name +"</option>");
    })
    $("#sheets").change(function() {
        currentSheet = this.value
    })
})
