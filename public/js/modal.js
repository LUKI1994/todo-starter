function popUpModal(list, index) {
  console.log("List Number: ", list)
  console.log("Index Number: ", index)

  const listNumber = "#" + (list - 1)
  console.log(listNumber)

  const item = "input[name='index']"
  console.log(item)

  const itemNumber = $(listNumber).siblings(item)
  console.log(itemNumber)
}

const items = $("li.connected-items").toArray();

items.forEach(function(e) {
  e.addEventListener("click", function(item) {
    list = $(item.target).attr("data-item-sortable-id");
    index = $(item.target).children("input[name='index']").attr("value");
    popUpModal(list, index);
  })
})

