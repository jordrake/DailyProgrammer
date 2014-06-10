define(function () {
  return {
    create: function (file) {
        var request = new XMLHttpRequest();
        request.open("get", file, false);
        request.send();
        if (request.status === 200) {
          return request.responseText.split("\n");
        } else {
          throw new Error("Could not load dictionary file!");
        }
      }
  };
});