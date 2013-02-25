(function(o){

  var isFunction    = function(e)     { return typeof e === 'function'; };
  var isObject      = function(e)     { return typeof e === 'object'; };

  var shiftIfObject = function(array) {
    var ele = array[0];
    if( isObject(ele) && !isFunction(ele.appendChild) ) {
      return array.shift();
    }
  };

  var partialFunction = function(func){
    return function(){ func.call(arguments); };
  };

  var createEle = function(tag) {
    var base_funct = function(){
      var args = Array.prototype.slice.call(arguments);
      opts =(shiftIfObject(args) || {});

      var el = document.createElement(escape(tag));
      addAttributes(el, opts);
      addChildNodes(el, args);

      var builder = function(){
        var extra_args = Array.prototype.slice.call(arguments);
        extra_opts =(shiftIfObject(extra_args) || {});

        addAttributes(el, extra_opts);
        addChildNodes(el, extra_args);

        return el;
      };

      return builder;
    };

    return base_funct;
  };

  var addChildNodes = function(el, children){
    for(var i in children){ addChildNode(el, children[i]);}
  };

  var addChildNode = function(el, child){
    var node;
    switch(typeof child){
      case 'number':
      case 'string':
        node = document.createTextNode(child);
      break;
      case 'function':
        addChildNode(el,child());
      break;

      default:
        node = child;
    }
    if(node !== undefined){ el.appendChild(node); }
  };

  var addAttributes = function(el, opts){
    for(var i in opts){ addAttribute(el, i, opts[i]);}
  };

  var addAttribute = function(el, key, value){
    if(key === 'className'){
      key = 'class';
      if( el.getAttribute('class')){
        value += " " + el.getAttribute('class');
      }
    }
    if( typeof value === 'string' ){ el.setAttribute(key,value);}
  };

  var tags = [
    "a","abbr","acronym","address","applet","area","article","aside","audio",
    "b","base","basefont","bdi","bdo","big","blockquote","body","br","button",
    "canvas","caption","center","cite","code","col","colgroup","command",
    "datalist","dd","del","details","dfn","dir","div","dl","dt",
    "em","embed",
    "fieldset","figcaption","figure","font","footer","form","frame","frameset",
    "h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html",
    "i","iframe","img","input","ins",
    "keygen","kbd",
    "label","legend","li","link",
    "map","mark","menu","meta","meter",
    "nav","noframes","noscript",
    "object","ol","optgroup","option","output",
    "p","param","pre","progress","q",
    "rp","rt","ruby",
    "s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup",
    "table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt",
    "u","ul",
    "var","video",
    "wbr" ];

  o.dom = {};
  tags.forEach(function(tag){o.dom[tag] = createEle(tag);});
})(this);

