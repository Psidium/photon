var remote = require('remote')
var Menu = remote.require('menu')
var MenuItem = remote.require('menu-item')
var dialog = remote.require('dialog')


function didFireLoadFromHuboard() {
    dialog.showMessageBox({
        type: "error",
        buttons: ["OK"],
        message: "not implemented yet"
    })
}

function didFireLoadExcel() {
    localStorage.setItem("excelLocation", dialog.showOpenDialog({properties: ['openFile']}))
    window.location = "excel2huboard.html"
}
