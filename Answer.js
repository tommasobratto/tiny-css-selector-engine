var $ = function (selector) {
  var elements = [];

  if (selector.includes("#")) {
    idFinder(selector, elements);
  } else {
    tagFinder(selector, elements);
  }

  // console.log(elements);
  return elements;
}

function idFinder(selector, elements) {
  var i, parts, element;

  parts = selector.split(/#/);

  for (i = 0; i < parts.length; i++) {
    element = document.getElementById(parts[i]);

    if (element) {
      elements.push(element);
    }
  }
}

function tagFinder(selector, elements) {
  // answer to A
  var i, elementsFound;

  elementsFound = document.getElementsByTagName(selector);

  for (i = 0; i < elementsFound.length; i++) {
    elements.push(elementsFound[i]);
  }
}
