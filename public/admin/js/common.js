function serializeToJson(form) {
    var result = {};
    var arr = form.serializeArray();
    arr.forEach(function (item) {
        //    result.email
        result[item.name] = item.value;
    })
    return result;
}