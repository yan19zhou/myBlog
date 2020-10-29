newGuid() {
    //生成6-32位GUID
    var guid = "";
    var len = Math.floor(Math.random() * 22) + 6;
    for (var i = 1; i <= len; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if (i == 4 || i == 10 || i == 15 || i == 19) guid += "-";
    }
    return guid;
  }