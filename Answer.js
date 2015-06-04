var $ = function (selector) {
  var elements = [];
  var parts = [];
  var result;

  if (selector.includes("#") && !selector.includes(".")) {

    parts = selector.replace("#", " #").match(/\S+/g);
    elements = cssEngine.getElementById(parts);

  } else if (selector.includes(".") && !selector.includes("#")) {

    parts = selector.replace(".", " .").match(/\S+/g);

  } else if (selector.includes("#") && selector.includes(".")) {

    parts = selector.replace("#", " #").replace(".", " .").match(/\S+/g);;

  } else {

    parts.push(selector);
    elements = cssEngine.getElementsByTag(parts);
  }

  // console.log(elements);
  return elements;
}

cssEngine = function() {
  var tagName, idName, className;

  function getElementsByTag(selector) {
    tagName = getTagName(selector);
    var result = document.getElementsByTagName(tagName);

    return [].slice.call(result);
  }

  function getElementById(parts) {  
    var result = [];
    tagName = getTagName(parts);
    idName = getIdName(parts);

    var element = document.getElementById(idName);

    if (!tagName || (tagName.toUpperCase() === element.tagName)) {
      result.push(element);
    }
    return result;
  }

  function getTagName(parts) {
    tagName = parts.filter(function(token) {
      if (!token.includes("#") && !token.includes(".")) {
        return token;
      }
    });

    return tagName[0];
  }

  function getIdName(parts) {
    idName = parts.filter(function(token) {
      if (token.includes("#")) {
       return token;
      }
    });

    return idName[0].replace("#", "");
  }

  function getClassName(parts) {
    className = parts.filter(function(token) {
      if (token.includes(".")) {
        return token;
      }
    });
    return className;
  }

  return {
    getElementsByTag: getElementsByTag,
    getElementById: getElementById
  }
}();
