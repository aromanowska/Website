<html>
 <head>
  <title>
   Wyniki
  </title>
 </head>

 <body>
  Imię: <?php echo $_GET['imie']?><br>
  Nazwisko: <?php echo $_GET['nazwisko']?><br>
  Faktura: <?php echo ($_GET['faktura'] == 'on' ? 'Tak' : 'Nie')?><br>

  Zamówienie: <?php switch($_GET['zamow']){
   case "kola":
     echo "Coca-cola";
     break;
   case "fanta":
     echo "Fanta";
     break;
   case "sprite":
     echo "Sprite";
     break;
   }
?>
 </body>
</html>