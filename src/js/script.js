document.addEventListener('DOMContentLoaded', function() {

  var main = document.getElementById('main');
  var button = document.createElement('button');
  var para = document.getElementById('paragraph');

  button.innerHTML = "Display status";
  para.style.backgroundColor = "#e74c3c";
  para.style.color = "white";

  button.addEventListener("click", function() {
    if(para.className === 'hidden') {
      para.classList.remove('hidden');
      para.classList.add('d-block');
    } else if(para.className === 'd-block') {
      para.classList.add('hidden');
      para.classList.remove('d-block');
    }
  });

  main.appendChild(button);
});