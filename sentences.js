// color generator from http://stackoverflow.com/a/1484514
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

var nodeIterator = document.createNodeIterator(
  // Node to use as root
  document.getElementsByTagName('body')[0],

  // Only consider nodes that are text nodes (nodeType 3)
  NodeFilter.SHOW_ELEMENT,

  // Object containing the function to use for the acceptNode method
  // of the NodeFilter
    { acceptNode: function(node) {
      // Logic to determine whether to accept, reject or skip node
      // In this case, only accept nodes that have content
      // other than whitespace
      if ( ! /^\s*$/.test(node.data) ) {
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  },
  false
);

// Show the content of every non-empty text node that is a child of root

// var parser = new DOMParser();

var regex = /[\.?!]+ /g;

while ((node = nodeIterator.nextNode())) {
  // split node text
  var sentences = node.innerText.split(regex);

  if (sentences.length !== null) {
    var indices = [];

    var fromStart = 0;
    // save indices of ends of sentences
    for (var j = 0; j < sentences.length - 1; j++) {
      fromStart += sentences[j].length;
      indices.push(fromStart);
    }

    // iterate through node text backwards
    // split text at indices
    for (var j = indices.length; j > 0; j--) {
      console.log(indices[j]);
      console.log(node.firstChild.length);
      node.firstChild.splitText(indices[j]);
    }

    var start = 0;

    for (var i = 0; i < node.childNodes.length; i++) {
      var newSpan = document.createElement('span');
      var content = document.createTextNode(node.childNodes[i]);
      newSpan.appendChild(content);
      newSpan.style.color = getRandomColor();
      node.replaceChild(newSpan, node.childNodes[i]);
    }
  } else {
    node.style.color = getRandomColor();
  }
}

// var regex = /[\w\d'\n;,:\=/_" ]+[\.?!]?(?!>)/g;

var p = document.getElementsByTagName('p')[0]
document.getElementsByTagName('p')[0].firstChild.splitText(10)

for (var i = 0; i < p.childNodes.length; i++) {
  var div = document.createElement('div');
  var content = document.createTextNode(p.childNodes[i].textContent);
  div.appendChild(content);
  div.style.color = 'red';
  p.replaceChild(div, p.childNodes[i]);
}