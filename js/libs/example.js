
var header,
    body,
    footer,
    logo = dom.img( {src: '/img/ink.png'} ),
    primary_buttons = dom.div(
      { className: 'primary button_container'},
      dom.button('Load'),
      dom.button('Save'),
      dom.button('Delete'),
      dom.button('Print')
    ),
    secondary_buttons = dom.div(
      { className: 'secondary button_container'},
      dom.button('Elements'),
      dom.button('Do Magic'),
      dom.button('Live Share')
    ),
    canvas = dom.div(
      {className: 'report'},
      header = dom.div( { className: 'header' } )(),
      body   = dom.div( { className: 'body' } )(),
      footer = dom.div( { className: 'footer' } )()
    );

var zoom = {
  init: function(){
    header.addEventListener('click' , this , false);
    body.addEventListener('click'   , this , false);
    footer.addEventListener('click' , this , false);

    header.addEventListener('touchstart' , this , false);
    body.addEventListener('touchstart'   , this , false);
    footer.addEventListener('touchstart' , this , false);
  },

  handleEvent: function(e){
    e.target.innerHTML += "<h4>you clicked me</h4>";
    console.log(e, this, e.target);
  }
};


var page = dom.div(
  { className: 'page' },
  logo(),
  primary_buttons(),
  canvas(),
  secondary_buttons()
);

var doit = function(){
  window.document.body.appendChild(page());
  zoom.init();
};

window.onload = doit;
