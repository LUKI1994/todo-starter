var modal = document.getElementById('myModal');

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

const items = $("li.connected-items").toArray();

items.forEach(function(e) {
  e.addEventListener("click", function(popUpModal) {
    console.log(popUpModal.target.attributes[1])
  })
})

