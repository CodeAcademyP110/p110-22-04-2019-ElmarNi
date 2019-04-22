"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

window.onload = function () {
  if (localStorage.getItem("basket") === null) {
    localStorage.setItem("basket", JSON.stringify([]));
  }

  UpdateBasketIcon();
  var productButtons = document.querySelectorAll('.btn-product');
  var basket = JSON.parse(localStorage.getItem("basket"));

  _toConsumableArray(productButtons).forEach(function (pro) {
    pro.onclick = function (e) {
      e.preventDefault();
      var proId = this.parentElement.getAttribute("data-id");
      var basketElement = basket.find(function (el) {
        return el.id === proId;
      });

      if (basketElement === undefined) {
        basket.push({
          id: proId,
          count: 1,
          name: pro.previousElementSibling.previousElementSibling.innerText,
          image: pro.parentElement.previousElementSibling.getAttribute("src")
        });
      } else {
        basketElement.count++;
      } //update localstorage to include new product


      localStorage.setItem("basket", JSON.stringify(basket));
      UpdateBasketIcon();
    };
  });

  basket.forEach(function (el) {
    var tr = document.createElement('tr');
    var proImgTd = document.createElement('td');
    var proImg = document.createElement('img');
    var proNameTd = document.createElement('td');
    var proCount = document.createElement('td');
    proCount.innerText = el.count;
    proImg.src = el.image;
    proImgTd.appendChild(proImg);
    proNameTd.innerText = el.name;
    tr.appendChild(proImgTd);
    tr.appendChild(proNameTd);
    tr.appendChild(proCount);
    document.querySelector('.table').lastElementChild.appendChild(tr);
  });
};

function UpdateBasketIcon() {
  var basket = JSON.parse(localStorage.getItem("basket"));
  document.querySelector('#basket-count').innerText = basket.length; // document.querySelector('#basket-count').innerText = basket.reduce((t, p) => t + p.count, 0);
}