<?php
    if(!file_exists('Config/Config.php')){        
        echo "<script>javascript:window.location='todasreclamacoes';</script>";       
    }
    session_start();    
    require_once('Config/Config.php');
    require_once(SITE_ROOT.DS.'autoload.php');
    
    use Core\RecuperarSenha;
    use Classes\ValidarCampos;
    try{        
        $dadosUrl = explode('/',$_GET['url']); 
        if(!isset($dadosUrl[1])){
            throw new \Exception('Faltando codigo',65);
        }else if(isset($dadosUrl[2])){
            throw new \Exception('Muitos parametros',45);
        }
        $hash = $dadosUrl[1];        

        $recuperarSenha = new RecuperarSenha(); 
        $recuperarSenha->verificarHash($hash);
        
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
        <link rel="shortcut icon" href="../view/imagens/favicon.ico" type="image/x-icon">

        <!-- CSS PADRÃO -->
        <link href="../view/css/default.css" rel=stylesheet>

        <!-- Telas Responsivas -->
        <link rel=stylesheet media="screen and (max-width:480px)" href="../view/css/style480.css">
        <link rel=stylesheet media="screen and (min-width:481px) and (max-width:768px)" href="../view/css/style768.css">
        <link rel=stylesheet media="screen and (min-width:769px) and (max-width:1024px)" href="../view/css/style1024.css">
        <link rel=stylesheet media="screen and (min-width:1025px)" href="../view/css/style1025.css">

        <!-- JS-->

        <script src="../view/lib/_jquery/jquery.js"></script>
        <script src="../view/js/js.js"></script>

    </head>
    <body>
        <!-- <form method="post" action="../RecuperarSenha.php">
            <input type="text" name="senha1" placeholder="digite sua nova senha">
            <input type="text" name="senha2" placeholder="confirme sua nova senha">
            <input type="hidden" name="codigo" value="<?php echo $hash?>">
            <input type="hidden" name="id" value="<?php echo $id?>">
            <input type="submit" value="enviar">
        </form>     -->
        
        <div id="container">
        <div class="form-cad" style="background-color:#009688">
                 <form action="" id="" method="POST">
                 <div class="tit-txt">
                        <h3 style="width:100%">Redefinir senha</h3>
                        <p>Digite sua nova senha e confirme!</p>
                    </div>
                     
                     <div class="campo-texto-icone">
                             <label for="senha"><i class="icone-senha"></i></label>
                             <input type="password" name="senha1" id="senha" placeholder="Nova senha">
                     </div>
                     <div class="campo-texto-icone">
                             <label for="senhaC"><i class="icone-senha"></i> </label>
                             <input type="password" name="senha2" id="senhaC" placeholder="Confirmar nova senha">
                     </div>
                     <div class="aviso-form-inicial">
                         <p>O campo tal e pa</p>
                     </div>
                    <input type="hidden" name="codigo" value="<?php echo $hash?>">
                    <input type="hidden" name="id" value="<?php echo $id?>">
                     <button type="submit">Alterar senha</button>
                     
                 </form>
        </div>

     </div>
    </body>
</html>
<?php
}catch (Exception $exc){
    $erro = $exc->getCode();   
    $mensagem = $exc->getMessage();
    switch($erro){
        case 65:
            echo "<script>javascript:window.location='todasreclamacoes';</script>";
            break;        
        case 6://Ja esta logado 
            echo "<script>javascript:window.location='todasreclamacoes';</script>";
            break;
        // case 11:// Erro no comentario
        // case 12://Mexeu no insprnsionar elemento ou nao submeteu o formulario      
        //     echo "<script>javascript:window.location='todasreclamacoes';</script>";
        //     break;             
        case 45://Digitou um numero maior de parametros 
            unset($dadosUrl[0]);
            $contador = 1;
            $voltar = "";
            while($contador <= count($dadosUrl)){
                $voltar .= "../";
                $contador++;
            }
            echo "<script>javascript:window.location='".$voltar."todasreclamacoes';</script>";
        break;
        case 130:
            echo "<script>javascript:window.location='../enviar-redefinir';</script>";
            $_SESSION['codigo_invalido'] = 1;
            break;
        default: //Qualquer outro erro cai aqui
            echo "<script> alert('$mensagem');javascript:window.location='todasreclamacoes';</script>";
    } 
}