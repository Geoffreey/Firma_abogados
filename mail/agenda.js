$(function () {
    $("#contactForm input, #contactForm select").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // Puedes manejar errores adicionales aquí si es necesario
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();

            // Capturando los valores del formulario
            var name = $("input#name").val();
            var phone = $("input#phone").val();
            var email = $("input#email").val();
            var date = $("input#date").val();
            var time = $("input#time").val();
            var service = $("select[name='service']").val();

            // Botón de envío deshabilitado temporalmente
            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            // Llamada AJAX para enviar los datos
            $.ajax({
                url: "https://legalycontableberak.com/mail/agenda.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    date: date,
                    time: time,
                    service: service
                },
                cache: false,
                success: function () {
                    // Mostrar mensaje de éxito
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success')
                        .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                        .append("<strong>¡Tu cita ha sido agendada exitosamente!</strong>")
                        .append('</div>');

                    // Reiniciar el formulario
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    // Mostrar mensaje de error
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger')
                        .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                        .append($("<strong>").text("Lo sentimos " + name + ", parece que nuestro servidor de correo no está respondiendo. Por favor, inténtalo más tarde."));
                    $('#success > .alert-danger').append('</div>');

                    // Reiniciar el formulario
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    // Rehabilitar el botón después de 1 segundo
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    // Manejo de pestañas si es necesario
    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// Borrar mensajes de éxito o error al enfocar el campo "name"
$('#name').focus(function () {
    $('#success').html('');
});