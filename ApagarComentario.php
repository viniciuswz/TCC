<?php
require_once('Config/Config.php');
require_once(SITE_ROOT.DS.'autoload.php');
use Core\Comentario;
use Core\Usuario;
use Classes\ValidarCampos;
session_start();
  
try{                     

    $tipoUsuPermi = array('Comum','Moderador','Adm');
    Usuario::verificarLogin(1,$tipoUsuPermi);  // Tem q estar logado 
         
    $nomesCampos = array('ID');// Nomes dos campos que receberei da URL    
    $validar = new ValidarCampos($nomesCampos, $_GET);
    $validar->verificarTipoInt(array('ID'),$_GET); // Verificar se é um numero
    
    $publi = new Comentario();   
    $publi->setCodComen($_GET['ID']);
    $publi->setCodUsu($_SESSION['id_user']); 
    $publi->updateStatusComen('I');
    if(isset($_GET['tipo'])){
        echo "<script> alert('Comentário Removido');javascript:window.location='./view/admin-denuncia.php?tipo[]=Comen&tipo[]=Debate&tipo[]=Publi';</script>";
    }else{
        echo $publi->quantidadeTotalPubli();
    }
    
        
}catch(Exception $exc){  
    $erro = $exc->getCode();   
    $mensagem = $exc->getMessage();
    switch($erro){
        case 2://Nao esta logado    
            echo "<script> alert('$mensagem');javascript:window.location='./view/login.php';</script>";
            break;
        case 6://Não é usuario comum, prefeitura ou func
            echo "<script> alert('$mensagem');javascript:window.location='./view/index.php';</script>";
            break;
        case 12://Mexeu no insprnsionar elemento, ou nao tem valores validos
        case 9://Erro no ao fazer a insercao
            echo "<script> alert('$mensagem');javascript:window.location='./view/todasreclamacoes.php';</script>";
            break;        
        default: //Qualquer outro erro cai aqui
            echo "<script> alert('$mensagem');javascript:window.location='./view/index.php';</script>";
    }    
}    



