function popUpModal(list, index) {

  const items = $(".modal").toArray();

  items.forEach(function(item) {
    if (item.id == list - 1) {
      if ($(item).siblings("input[name='index']").attr("value") == index) {
        
        $(item).show();
        $(item).on("click", function(event) {
          if (event.target == item) {
            $(item).hide()
          }
        })
      }
    }
  })
}

const items = $("li.connected-items").toArray();

items.forEach(function(e) {
  e.addEventListener("click", function(item) {
    list = $(item.target).attr("data-item-sortable-id");
    index = $(item.target).children("input[name='index']").attr("value");
    popUpModal(list, index);
  })
})

