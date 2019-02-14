<?php
    if(!file_exists('Config/Config.php')){        
        echo "<script>javascript:window.location='todasreclamacoes';</script>";       
    }
    session_start();    
    require_once('Config/Config.php');
    require_once(SITE_ROOT.DS.'autoload.php');
    
    use Core\Usuario;
    use Classes\ValidarCampos;
    try{        
        Usuario::verificarLogin(0);  // Vai estourar um erro se ele ja estiver logado, ou se ele nao for adm
        $dadosUrl = explode('/',$_GET['url']);        
        if(isset($dadosUrl[1])){
            throw new \Exception('Mais paramentro do que esperado',9);
        }
?>
<!DOCTYPE html>
<html lang=pt-br>
    <head>
        <title>Recuperar Senha</title>

        <meta charset=UTF-8> <!-- ISO-8859-1 -->
        <meta name=viewport content="width=device-width, initial-scale=1.0">
        <meta name=description content="Essa pagina é apara agradecer pelo cadastro de você, usuário ;)">
        <meta name=keywords content="Reclamação, Barueri, Agradecer"> <!-- Opcional -->
        <meta name=author content='equipe 4 INI3A'>
        <meta name="theme-color" content="#089E8E" />

        <!-- favicon, arquivo de imagem podendo ser 8x8 - 16x16 - 32x32px com extensão .ico -->
        <link rel="shortcut icon" href="view/imagens/favicon.ico" type="image/x-icon">

        <!-- CSS PADRÃO -->
        <link href="view/css/default.css" rel=stylesheet>

        <!-- Telas Responsivas -->
        <link rel=stylesheet media="screen and (max-width:480px)" href="view/css/style480.css">
        <link rel=stylesheet media="screen and (min-width:481px) and (max-width:768px)" href="view/css/style768.css">
        <link rel=stylesheet media="screen and (min-width:769px) and (max-width:1024px)" href="view/css/style1024.css">
        <link rel=stylesheet media="screen and (min-width:1025px)" href="view/css/style1025.css">

        <!-- JS-->

        <script src="view/lib/_jquery/jquery.js"></script>
        <script src="view/js/js.js"></script>

    </head>
    <body>
        <form method="post" action="PedidoRecuperarSenha.php">
            <input type="text" name="email" placeholder="digite seu email">
            <input type="submit" value="enviar">
        </form>        
    </body>
</html>
<?php
}catch (Exception $exc){
    $erro = $exc->getCode();   
    $mensagem = $exc->getMessage();
    switch($erro){        
        case 6://Ja esta logado 
            echo "<script>javascript:window.location='todasreclamacoes';</script>";
            break;
        case 11:// Erro no comentario
        case 12://Mexeu no insprnsionar elemento ou nao submeteu o formulario      
            echo "<script>javascript:window.location='todasreclamacoes';</script>";
            break;             
        case 45://Digitou um numero maior de parametros 
            unset($dadosUrl[0]);
            $contador = 1;
            $voltar = "";
            while($contador <= count($dadosUrl)){
                $voltar .= "../";
                $contador++;
            }
            echo "<script>javascript:window.location='".$voltar."recuperar';</script>";
        break;
        default: //Qualquer outro erro cai aqui
            echo "<script> alert('$mensagem');javascript:window.location='todasreclamacoes';</script>";
    } 
}