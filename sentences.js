// color generator from http://stackoverflow.com/a/1484514
function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

var elements = document.querySelectorAll('div', 'p', 'ul');

// for (var i = 0; i < elements.length; i++) {
//   if (elements[i].firstChild.nodeType)
// }

// Function for wrapping nodes in jason tags
function wrapNodes(node) {
  // Keep running this script as long as we have nodes
  while (node !== null) {
    console.log('node: ', node);
    // Split nodes at sentence breaks
    var sentences = node.innerText.split(regex);

    // If we have at least one sentence
    if (sentences.length) {
      // Initialize cutoff point to zero
      // and counter for child nodes to zero
      var cutoff = 0;
      var childNodeCount = 0;

      for (var sentCount = 0; sentCount < sentences.length; sentCount++) {
        // save current child node
        var currentChildNode = node.childNodes[childNodeCount];
        console.log('cutoff: ', cutoff);
        console.log('childNodeCount: ', childNodeCount);
        console.log('sentCount: ', sentCount);

        if (currentChildNode !== undefined && currentChildNode.nodeType === 3) {
          console.log('current childNode: ', currentChildNode);
          // console.log('current childNode content: ', currentChildNode.innerText);
          // console.log(/\S/.test(currentChildNode.innerText));

          // set cutoff point to length of current sentence
          cutoff = sentences[sentCount].length;

          if (cutoff < currentChildNode.textContent.length) {
            // split current child node at cutoff point
            currentChildNode.splitText(cutoff);

            // create span with text content of current child node
            var newSpan = document.createElement('jason');
            var content = document.createTextNode(currentChildNode.textContent);
            newSpan.appendChild(content);
            newSpan.style.color = getRandomColor();

            console.log('newSpan: ', newSpan);

            // replace child node with new span
            node.replaceChild(newSpan, currentChildNode);
          }
        }

        // increment child count
        childNodeCount++;
      }

    } else {
      node.style.color = getRandomColor();
    }

    node = nodeIterator.nextNode();
  }
  
}

var nodeIterator = document.createNodeIterator(
  // Use body node as root
  document.getElementsByTagName('body')[0],

  // Only consider nodes that are element nodes
  NodeFilter.SHOW_ELEMENT,

  // Object containing the function to use for the acceptNode method
  // of the NodeFilter
    { acceptNode: function(node) {
      // Only accept nodes that have content other than whitespace
      // and do not have tags named body, script, or jason.
      // Our script dynamically creates jason elements from existing text.
      // (If we did not reject these elements, the NodeIterator
      // would add them to the list of nodes to traverse,
      // and as a result, we would have an infinite loop.)
      if (!/^\s*$/.test(node.data) && /\S/.test(node.innerText) &&
        (node.tagName === "P" || node.tagName === "DIV") &&
        node.firstChild.nodeType === 3) {
        return NodeFilter.FILTER_ACCEPT;
      } else {
        return NodeFilter.FILTER_REJECT;
      }
    }
  },
  false
);

// Regular expression for filtering sentences
var regex = /[\.?!]+ /g;

// Initialize node to the first node in our NodeIterator
var startNode = nodeIterator.nextNode();

// Call wrap nodes on startNode
wrapNodes(startNode);


    // save indices of ends of sentences
    // split current text node at current index
    // for (var sentCount = 0; sentCount < sentences.length - 1; sentCount++) {

    //   console.log('cutoff: ', cutoff);
    //   console.log('nodeCount: ', nodeCount);
    //   console.log('sentCount: ', sentCount);
    //   console.log('childNodes length: ', node.childNodes.length);

    //   cutoff += sentences[sentCount].length;
    //   node.childNodes[nodeCount].splitText(cutoff);

    //   nodeCount++;
    // }


      // create span element
      // var newSpan = document.createElement('span');
      // var content = document.createTextNode(node.childNodes[j]);
      // newSpan.appendChild(content);
      // newSpan.style.color = getRandomColor();
      // node.replaceChild(newSpan, node.childNodes[j]);

    // save indices of ends of sentences
    // for (var j = 0; j < sentences.length - 1; j++) {
    //   fromStart += sentences[j].length;
    //   indices.push(fromStart);
    // }

    // iterate through node text backwards
    // split text at indices
    // for (var j = indices.length; j > 0; j--) {
    //   console.log(indices[j]);
    //   console.log(node.firstChild.length);
    //   node.firstChild.splitText(indices[j]);
    // }

    // var start = 0;

    // for (var i = 0; i < node.childNodes.length; i++) {
    //   var newSpan = document.createElement('span');
    //   var content = document.createTextNode(node.childNodes[i]);
    //   newSpan.appendChild(content);
    //   newSpan.style.color = getRandomColor();
    //   node.replaceChild(newSpan, node.childNodes[i]);
    // }
// var regex = /[\w\d'\n;,:\=/_" ]+[\.?!]?(?!>)/g;

// var p = document.getElementsByTagName('p')[0]
// document.getElementsByTagName('p')[0].firstChild.splitText(10)

// for (var i = 0; i < p.childNodes.length; i++) {
//   var div = document.createElement('div');
//   var content = document.createTextNode(p.childNodes[i].textContent);
//   div.appendChild(content);
//   div.style.color = 'red';
//   p.replaceChild(div, p.childNodes[i]);
// }

// var node = document.getElementsByTagName('p')[0];
// var regex = /[\.?!]+ /g;
// var sentences = node.innerText.split(regex);
// var indices = [];
// var cutoff = 0;
// var nodeCount = 0;

// // save indices of ends of sentences
// // split current text node at current index
// for (var sentCount = 0; sentCount < sentences.length; sentCount++) {

//   console.log('cutoff: ', cutoff);
//   console.log('nodeCount: ', nodeCount);
//   console.log('sentCount: ', sentCount);
//   console.log('childNodes length: ', node.childNodes.length);

//   cutoff = sentences[sentCount].length;
//   node.childNodes[nodeCount].splitText(cutoff);

//   var newSpan = document.createElement('span');
//   var content = document.createTextNode(node.childNodes[nodeCount].textContent);
//   newSpan.appendChild(content);
//   newSpan.style.color = getRandomColor();
//   node.replaceChild(newSpan, node.childNodes[nodeCount]);

//   nodeCount++;
// }