<!DOCTYPE html>
<html>
<head>
    <title>Seleziona Valuta</title>
</head>
<body>
    <form method="POST" action="do_action.php">
        <label for="name">Importo:</label>
        <input type="number" name="name" id="name" required />

        <label for="valuta">Valuta:</label>
        <select name="valuta" id="valuta" required>
            <?php
            $json = file_get_contents("valute.json");
            $costanti = json_decode($json, true);

            if (!empty($costanti)) {
                foreach ($costanti as $valuta => $cambio) {
                    echo "<option value=\"$valuta\">$valuta</option>";
                }
            } else {
                echo "<option value=\"\">Nessuna valuta disponibile</option>";
            }
            ?>
        </select>

        <button type="submit">Converti</button>
    </form>
</body>
</html>