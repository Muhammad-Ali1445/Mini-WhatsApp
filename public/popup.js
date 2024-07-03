$(document).ready(function () {
  $(".delete-form").on("submit", function (e) {
    var confirmed = confirm("Are you sure you want to delete this chat?");
    if (!confirmed) {
      e.preventDefault();
    }
  });
});
