var remote = require('remote')
var Menu = remote.require('menu')
var MenuItem = remote.require('menu-item')
var dialog = remote.require('dialog')

// Build our new menu
var menu = new Menu()
menu.append(new MenuItem({
  label: 'Delete',
  click: function() {
    // Trigger an alert when menu item is clicked
    alert('Deleted')
  }
}))
menu.append(new MenuItem({
  label: 'More Info...',
  click: function() {
    // Trigger an alert when menu item is clicked
    alert('Here is more information')
  }
}))

// Add the listener
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.js-context-menu').addEventListener('click', function (event) {
    menu.popup(remote.getCurrentWindow());
  })
})

function didFireLoadFromHuboard() {
    dialog.showMessageBox({
        type: "error",
        buttons: ["OK"],
        message: "not implemented yet"
    })
}

function didFireLoadExcel() {
    dialog.showOpenDialog({properties: ['openFile']})
}
