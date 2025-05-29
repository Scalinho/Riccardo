<?php

function sayHello($valore, $idValuta) {
    $json = file_get_contents("../valute.json");
    $costanti = json_decode($json, true);

    if (!array_key_exists($idValuta, $costanti)) {
        return "Errore: Valuta non supportata.";
    }

    $valoreConvertito = number_format($valore * $costanti[$idValuta], 2);

    return "Conversione in {$idValuta}: {$valoreConvertito}";
}

$server = new SoapServer("test.wsdl");

$server->addFunction("sayHello");

$server->handle();
?>
