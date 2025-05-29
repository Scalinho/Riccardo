<?php

$wsdl_url = "http://127.0.0.1/sgiusto/server/test.wsdl";

if (isset($_POST['name']) && !empty($_POST['name']) && isset($_POST['valuta'])) { 
    try {
        $client = new SoapClient($wsdl_url, ["location" => "http://127.0.0.1/sgiusto/server/"]);

        $number = htmlentities($_POST['name']);
        $valuta = htmlentities($_POST['valuta']);

        $risposta = $client->sayHello($number, $valuta);

        echo "Risultato: " . $risposta;

    } catch (SoapFault $e) {
        echo '<br>Errore nel client SOAP: ' . $e->getMessage();
    }
}

?>