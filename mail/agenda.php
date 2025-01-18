<?php
if(empty($_POST['name']) || empty($_POST['phone']) || empty($_POST['email']) || 
   empty($_POST['date']) || empty($_POST['time']) || empty($_POST['service']) || 
   !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    exit("Error: Todos los campos son obligatorios.");
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$date = strip_tags(htmlspecialchars($_POST['date']));
$time = strip_tags(htmlspecialchars($_POST['time']));
$service = strip_tags(htmlspecialchars($_POST['service']));

// Opcional: Mapea los servicios a sus nombres
$servicesMap = [
    "1" => "Servicios contables",
    "2" => "Derecho de familia",
    "3" => "Derecho mercantil",
    "4" => "Femicidio"
];
$serviceName = $servicesMap[$service] ?? "Servicio desconocido";

// Configuración del correo
$to = "licdablanco@legalycontableberak.com";
$subject = "Nueva cita: $name";
$body = "Ha recibido una nueva cita desde el formulario web.\n\n";
$body .= "Detalles:\n";
$body .= "Nombre: $name\n";
$body .= "Telefono: $phone\n";
$body .= "Correo: $email\n";
$body .= "Fecha: $date\n";
$body .= "Hora: $time\n";
$body .= "Servicio: $serviceName\n";
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

if(!mail($to, $subject, $body, $headers)) {
    http_response_code(500);
    exit("Error al enviar el correo.");
}

http_response_code(200);
echo "Cita enviada con éxito.";
?>
