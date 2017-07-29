const lists = sortable("#scroller");

function renameFiles(order) {
  console.log("Renaming the lists");
  console.log(order);
  temp = $(order).siblings("form.update-all").toArray()
  newOrder = []
  
  temp.forEach(function(e) {
    newOrder.push($(e).attr("data-order"))
  })
  
  $.ajax({
    url: "http://localhost:9393/lists/reorder",
    method: "post",
    data: {"new_order": newOrder}
  })
}

lists[0].addEventListener("sortupdate", function(e) {
  list = $("form.rename-list").toArray()
  renameFiles(list)
})

function submitWithAjax(form) {
  var $form = $(form);
  var data = $form.serializeArray();

  $.ajax({
    url: $form.attr("action"),
    method: $form.attr("method"),
    data: data
  })
}

const sortedContainers = sortable(".js-sortable-items", {
  forcePlaceholderSize: true,
  connectWith: "connected-items"
});

sortedContainers[0].addEventListener("sortupdate", function(e) {
  console.log("Event for Sort Update occured")
  var startList = $(e.detail.startparent);
  var startForm = startList.parents("form");
  submitWithAjax(startForm);

  var currentList = $(e.detail.endparent);
  var currentForm = currentList.parents("form");
  submitWithAjax(currentForm);
});

$(".js-add-list").click(function() {
  $(".add-list-inputs").removeClass("hidden");
  $("input:text").focus();
  $(".add-a-list").addClass("hidden");
})

$(".list-name-input").focusout(function() {
  $(".add-list-inputs").addClass("hidden");
  $(".add-a-list").removeClass("hidden");
})

const rename = $(".list-header-container").toArray();

rename.forEach(function(e) {
  e.addEventListener("click", function(header) {
    form = $(header.target).parents("form").siblings("form.rename-list")
    form.removeClass("hidden");
    $(header.target).addClass("hidden");

    $(header.target).parents("form").siblings("form.rename-list").children().focus()
  
    form.focusout(function() {
      form.addClass("hidden");
      $(header.target).removeClass("hidden");
    });
  });
});