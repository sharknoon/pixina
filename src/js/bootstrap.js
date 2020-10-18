///////////////////////////////////////////
//              Bootstrap                //
///////////////////////////////////////////

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//popper.js
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[data-toggle="tooltip"]').forEach(
      dth => dth.tooltip()
    )
  })