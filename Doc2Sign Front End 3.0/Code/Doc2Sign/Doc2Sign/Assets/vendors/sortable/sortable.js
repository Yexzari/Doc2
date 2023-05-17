    var _arrastrando = false;
    
    var _mouseX = 0;
    var _mouseY = 0;
    var _offset = null;

    var _difX = 0;
    var _difY = 0;

    var _lapag = null;

    //esto es para cuando ya cargó la página, entonces se ejecuta lo que sigue
    $(document).ready(function () {

        $("#caja").css({ position: 'absolute', zIndex: '9000' });
        $(".pag").css({ position: 'relative' });

        $("#caja").mousedown(function (e) {
            _arrastrando = true;


            _offset = $('#caja').offset();

            _difX = e.pageX - _offset.left;
            _difY = e.pageY - _offset.top;


            var posX = e.pageX - (_difX);
            var posY = e.pageY - (_difY);

            var element = $('#caja').detach();
            $(".visualizador").append(element);



            $("#caja").css({ top: posY, left: posX, position: 'absolute' });

        });


        function salir() {
            var element = $('#caja').detach();
            $(".fixed ul li:first").append(element);
            $("#caja").css({ top: 0, left: 0, position: 'absolute' });
        }


        $(document).mouseup(function (e) {


            if (!_arrastrando) {
                return;
            }

            _arrastrando = false;

            if (_lapag != null) {

                //posición de la página en el documento
                offsetdiv = $("#" + _lapag).offset();


                var element = $('#caja').detach();
                $("#" + _lapag).append(element);

                var posX = e.pageX - _difX;
                var posY = e.pageY - _difY;

                if (offsetdiv.left > posX) {
                    salir();
                    return;
                }

                if (offsetdiv.top > posY) {
                    salir();
                    return;
                }

                if ((offsetdiv.top + $("#" + _lapag).height()) < posY) {
                    salir();
                    return;
                }

                if ((offsetdiv.left + $("#" + _lapag).width()) < posX) {
                    salir();
                    return;
                }


                _mouseX = posX - (offsetdiv.left);
                _mouseY = posY - (offsetdiv.top);


                $("#caja").css({ top: _mouseY, left: _mouseX, position: 'absolute' });

            } else {
                salir();
            }

        });

        $(document).mousemove(function (e) {


            if (_arrastrando) {

                var posX = e.pageX - _difX;
                var posY = e.pageY - _difY;

                $("#caja").css({ top: posY, left: posX, position: 'absolute' });

                //console.log("X:" + _offset.left + ", Y:" + _offset.top);
                //console.log("Client X:" + _mouseX + ", Client Y:" + _mouseY);


            }
        });




        $("#contenedor").mouseover(function () {
            //_lapag = null;
        });

        $("#contenedor .pag").mouseover(function () {

            _lapag = $(this).attr("id");

            console.log(_lapag);
        });

    });





    (function ($) {
        $.fn.disableSelection = function () {
            return this.each(function () {
                if (typeof this.onselectstart != 'undefined') {
                    this.onselectstart = function () { return false; };
                } else if (typeof this.style.MozUserSelect != 'undefined') {
                    this.style.MozUserSelect = 'none';
                } else {
                    this.onmousedown = function () { return false; };
                }
            });
        };
    })(jQuery);

    $(document).ready(function () {
        $('label').disableSelection();

        // Or to make everything unselectable
        $('*').disableSelection();
    });