<?php
define ('WWW_ROOT', dirname(__FILE__)); 
define ('DS', DIRECTORY_SEPARATOR);
require_once(WWW_ROOT.DS.'autoload.php');
use Core\Usuario;
use Classes\ValidarCampos;
session_start();
  
try{
    Usuario::verificarLogin(2);//Tem q estar logado

    $nomesCampos = array('senhaAntiga', 'novaSenha');// Nomes dos campos que receberei do formulario
    $validar = new ValidarCampos($nomesCampos, $_POST);//Verificar se eles existem, se nao existir estoura um erro

    $usuario = new Usuario();
    $usuario->setCodUsu($_SESSION['id_user']);             
    $usuario->setSenha($_POST['senhaAntiga']);        
    $usuario->updateSenha($_POST['novaSenha']);
    echo "<script> alert('Alteração realizada com sucesso');javascript:window.location='Templates/starter.php';</script>";
    
}catch (Exception $exc){
    $erro = $exc->getCode();   
    $mensagem = $exc->getMessage();  
    switch($erro){
        case 1://Erro ao fazer update        
            echo "<script> alert('$mensagem');javascript:window.location='./Templates/UpdateSenhaTemplate.php';</script>";
            break;
        case 2://Não esta logado  
            echo "<script> alert('$mensagem');javascript:window.location='./Templates/loginTemplate.php';</script>";
            break; 
        case 12://Mexeu no insprnsionar elemento  ou entrou pela url
            echo "<script> alert('$mensagem');javascript:window.location='./Templates/UpdateSenhaTemplate.php';</script>";
            break;       
        default: //Qualquer outro erro cai aqui
            echo "<script> alert('$mensagem');javascript:window.location='./Templates/UpdateSenhaTemplate.php';</script>";
    }   
}   
            
