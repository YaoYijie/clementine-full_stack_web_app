(function() {
  var addBtn = document.querySelector('.btn-add');
  var deleteBtn = document.querySelector('.btn-delete');
  var cllickNbr = document.querySelector('#click-nbr');
  var apiUrl = 'http://localhost:3000/api/clicks';

  function ready(fn) {
    if (typeof fn !== 'function') {
      return;
    }

    if (document.readyState === 'complete') {
      return fc();
    }

    document.addEventListener('DOMContentLoaded', fn, false);
  }

  function ajaxRequest(method, url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        console.log(xmlhttp.status);
        callback(xmlhttp.response);
      }
    };

    xmlhttp.open(method, url, true);
    xmlhttp.send();
  }

  function updateClickCount(data) {
    var clicksObject = JSON.parse(data);
    // console.log(clicksObject);

    cllickNbr.innerHTML = clicksObject[0].clicks;
  }

  ready(ajaxRequest('GET', apiUrl, updateClickCount));

  addBtn.addEventListener('click', function() {
    ajaxRequest('POST', apiUrl, function(res) {
      // console.log(res);
      var clicksObject = JSON.parse(res);
      cllickNbr.innerHTML = clicksObject.value.clicks;
    });
  }, false);

  deleteBtn.addEventListener('click', function() {
    ajaxRequest('DELETE', apiUrl, function() {
      ajaxRequest('GET', apiUrl, updateClickCount);
    });
  });
})();
