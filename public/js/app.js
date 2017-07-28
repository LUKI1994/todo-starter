sortable("#scroller");


const sortedContainers = sortable(".js-sortable-items", {
  forcePlaceholderSize: true,
  connectWith: "connected-items"
});

$("form.update-all").on("submit", function(event) {
  event.preventDefault();
  console.log("Prevent ", event.target, " from submitting");

  var $form = $(event.target);
  var data = $form.serializeArray();

  $.ajax ({
    url: $form.attr("action"),
    method: $form.attr("method"),
    data: data
  })
})

sortedContainers.forEach(function(element) {
  element.addEventListener("sortupdate", function(e) {
    var startList = $(e.detail.startparent);
    var startForm = startList.parents("form");
    console.log("$ Start Form:", startForm)
    startForm.submit();


    var currentList = $(e.detail.endparent);
    var currentForm = currentList.parents("form");
    console.log("$ End form", currentForm);
    currentForm.submit();


    /*

    This event is triggered when the user stopped sorting and the DOM position has changed.

    e.detail.item contains the current dragged element.
    e.detail.index contains the new index of the dragged element (considering only list items)
    e.detail.oldindex contains the old index of the dragged element (considering only list items)
    e.detail.elementIndex contains the new index of the dragged element (considering all items within sortable)
    e.detail.oldElementIndex contains the old index of the dragged element (considering all items within sortable)
    e.detail.startparent contains the element that the dragged item comes from
    e.detail.endparent contains the element that the dragged item was added to (new parent)
    e.detail.newEndList contains all elements in the list the dragged item was dragged to
    e.detail.newStartList contains all elements in the list the dragged item was dragged from
    e.detail.oldStartList contains all elements in the list the dragged item was dragged from BEFORE it was dragged from it
    */
  });
});

// Show/Hide add a list
$(".js-add-list").click(function() {
  $(".add-list-inputs").removeClass("hidden");
  $("input:text").focus();
  $(".add-a-list").addClass("hidden");
})

$(".list-name-input").focusout(function() {
  $(".add-list-inputs").addClass("hidden");
  $(".add-a-list").removeClass("hidden");
})