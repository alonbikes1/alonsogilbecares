/*
	Spectral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#page-wrapper'),
		$banner = $('#banner'),
		$header = $('#header');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500,
				offset: $header.outerHeight()
			});

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right',
				target: $body,
				visibleClass: 'is-menu-visible'
			});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight() + 1,
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

})(jQuery);

//Funcion que carga Muuri
const muuri = document.querySelector('.grid');
const isMuuri = muuri?.classList.contains('grid');
if (isMuuri) {
	const grid = new Muuri('.grid', {
	layout: {
		rounding: false
	}
	});


window.addEventListener('load', () => {
  grid.refreshItems().layout();
  //Mostrar las imagenes cuando esten listas
  document.querySelector('.grid').classList.add('grid-imagenes-cargadas');

  //Filtrado de imagenes por categoria
  const enlaces = document.querySelectorAll('.categorias a');
  enlaces.forEach(element => {
    element.addEventListener('click', event => {
      event.preventDefault();
      //Eliminar el activo de un enlace y colocarlo en el enlace clikeado
      enlaces.forEach(enlace => {
        enlace.classList.remove('activo');
      });
      event.target.classList.add('activo');
      //Obtener el html del enlace
      const categoria = event.target.innerHTML.toLowerCase();
      //Usando el metodo de filtrado de Muuri
      categoria === 'todos'
        ? grid.filter('[data-categoria]')
        : grid.filter(`[data-categoria="${categoria}"]`);
    });
  });

  //Agregamos el listener para la barra de busqueda
  /*
  document.querySelector('#barra-busqueda').addEventListener('input', event => {
    const busqueda = event.target.value;
    grid.filter(item => item.getElement().dataset.etiquetas.includes(busqueda));
  });
  */
});
}

function changeImage(event) {
  const elems = document.querySelectorAll('.show');
  [].forEach.call(elems, function (el) {
      el.className = el.className.replace(' show', '');
  });

  const photo = event.target;
  if (photo.matches(':hover')) {
		const rect = photo.parentElement.getBoundingClientRect();
		      const x = (event.clientX - rect.x) % 240;

      const ele = event.currentTarget.children[0];
      const eleStyle = window.getComputedStyle(ele);
      const width = parseInt(eleStyle.width, 10);

      const line = event.currentTarget.children[6];
      line.style.left = x + 'px';

      const init = parseInt(6 * x / width) + 1;
      const i = (init <= 6) ? init : 6;

      const element = event.currentTarget.children[i-1];
      element.className += ' show';
  }
}

let filas=document.getElementsByClassName('item');

for(let i=0;i< filas.length; i++) {
  filas[i].addEventListener('click', function () {
    let url=filas[i].getAttribute('data-href');
    window.location = url;
  });
}



const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every .scroller on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within .scroller-inner
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the .scroller-inner
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
