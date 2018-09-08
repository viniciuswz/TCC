<?php
session_start();
    require_once('../Config/Config.php');
    require_once(SITE_ROOT.DS.'autoload.php');
    
    use Core\Usuario;
    use Core\Publicacao;
    
    try{
        //Usuario::verificarLogin(1);  // Vai estourar um erro se ele ja estiver logado
        $publi = new Publicacao();        
        if(isset($_SESSION['id_user']) AND !empty($_SESSION['id_user'])){
            $publi->setCodUsu($_SESSION['id_user']);
            $tipoUsu = $_SESSION['tipo_usu'];
            $dados = new Usuario();
            $dados->setCodUsu($_SESSION['id_user']);
            $resultado = $dados->getDadosUser();
        }    
        isset($_GET['pagina']) ?: $_GET['pagina'] = null;    
                   
        $resposta = $publi->ListFromALL($_GET['pagina']);        
        $quantidadePaginas = $publi->getQuantidadePaginas();
        $pagina = $publi->getPaginaAtual();
        
        
?>

<!DOCTYPE html>
<html lang=pt-br>
    <head>
        <title>S.O.S Cidadão</title>

        <meta charset=UTF-8> <!-- ISO-8859-1 -->
        <meta name=viewport content="width=device-width, initial-scale=1.0">
        <meta name=description content="Site de reclamações para a cidade de Barueri">
        <meta name=keywords content="Reclamação, Barueri"> <!-- Opcional -->
        <meta name=author content='equipe 4 INI3A'>

        <!-- favicon, arquivo de imagem podendo ser 8x8 - 16x16 - 32x32px com extensão .ico -->
        <link rel="shortcut icon" href="imagens/favicon.ico" type="image/x-icon">

        <!-- CSS PADRÃO -->
        <link href="css/default.css" rel=stylesheet>

        <!-- Telas Responsivas -->
        <link rel=stylesheet media="screen and (max-width:480px)" href="css/style480.css">
        <link rel=stylesheet media="screen and (min-width:481px) and (max-width:768px)" href="css/style768.css">
        <link rel=stylesheet media="screen and (min-width:769px) and (max-width:1024px)" href="css/style1024.css">
        <link rel=stylesheet media="screen and (min-width:1025px)" href="css/style1025.css">

        <!-- JS-->

        <script src="lib/_jquery/jquery.js"></script>
        <script src="js/js.js"></script>
        <script src="../teste.js"></script>
    </head>
    <body>
        <header>
            <img src="imagens/Ativo2.png" alt="logo">
            <form>
                <input type="text" name="pesquisa" id="pesquisa" placeholder="Pesquisar">
                <button type="submit"><i class="icone-pesquisa"></i></button>
            </form>
            <nav class="menu">
                <ul>
                    <li><nav class="notificacoes">
                        <h3>notificações<span id="not-fechado"></span></h3>
                        <ul id="menu23">
                            
                            <li>
                        </ul>
                    </nav><a href="#" id="abrir-not"><i class="icone-notificacao" id="noti"></i>Notificações</a></li>
                    <li><a href="todasreclamacoes.php"><i class="icone-reclamacao"></i>Reclamações</a></li>
                    <li><a href="todosdebates.php"><i class="icone-debate"></i>Debates</a></li>
                </ul>
            </nav>
            <?php
                if(!isset($resultado)){
                    echo '<a href="login.php"><i class="icone-user" id="abrir"></i></a>';
                }else{
                    echo '<i class="icone-user" id="abrir"></i>';
                }
            ?>
            
        </header>
        <?php
                if(isset($resultado)){   
        ?>
        <div class="user-menu">
           
            <a href="javascript:void(0)" class="fechar">&times;</a>            
            <div class="mini-perfil">
                <div>    
                    <img src="../Img/perfil/<?php echo $resultado[0]['img_perfil_usu'] ?>" alt="perfil">
                </div>    
                    <img src="../Img/capa/<?php echo $resultado[0]['img_capa_usu'] ?>" alt="capa">
                    <p><?php echo $resultado[0]['nome_usu'] ?></p>
            </div>
           
            <nav>
                <ul>
                    <?php
                       require_once('opcoes.php');                        
                    ?>
                </ul>
            </nav>
            
        </div>       
        <?php
            }
        ?>

        <div id="container">
           
            <section class="criar-publicacao">
                <div>
                   <i class="icone-edit"></i><p>  Gostaria de fazer uma reclamação?</p>
                    <a href="Formulario-reclamacao.php">Fazer Reclamação</a>
                </div>
            </section>  
            <section class="alinha-item">
            <?php
                $contador = 0;
                while($contador < count($resposta)){                
            ?>  
                <div class="item-publicacao">
                
                    <div class="item-topo">
                        <a href="#">
                        <div>
                            <img src="../Img/perfil/<?php echo $resposta[$contador]['img_perfil_usu']?>">
                        </div>
                        <p><span class="negrito"><?php echo $resposta[$contador]['nome_usu']?></a></span><time><?php echo $resposta[$contador]['dataHora_publi']?></time></p>
                        <div class="mini-menu-item mini-menu-item-ativo">
                            <i class="icone-3pontos"></i>
                            <div>
                                <ul>
                                <?php
                                        if(isset($resposta[$contador]['indDenunPubli']) AND $resposta[$contador]['indDenunPubli'] == TRUE){ // Aparecer quando o user ja denunciou            
                                            echo '<li><i class="icone-bandeira"></i><b>Denunciado</b></li>';        
                                        }else if(isset($_SESSION['id_user']) AND $_SESSION['id_user'] != $resposta[$contador]['cod_usu']){ // Aparecer apenas naspublicaçoes q nao é do usuario
                                            if($tipoUsu == 'Comum' or $tipoUsu == 'Prefeitura' or $tipoUsu == 'Funcionario'){
                                                echo '<li><a href="../Templates/DenunciarPublicacaoTemplate.php?ID='.$resposta[$contador]['cod_publi'].'"><i class="icone-bandeira"></i>Denunciar</a></li>';                                                        
                                            }                    
                                        }else if(!isset($_SESSION['id_user'])){ // aparecer parar os usuario nao logado
                                                 echo '<li><a href="../Templates/DenunciarPublicacaoTemplate.php?ID='.$resposta[$contador]['cod_publi'].'"><i class="icone-bandeira"></i>Denunciar</a></li>';
                                        } 
                                ?>
                                <?php
                                        if(isset($_SESSION['id_user']) AND $_SESSION['id_user'] == $resposta[$contador]['cod_usu']){
                                            echo '<li><a href="../ApagarPublicacao.php?ID='.$resposta[$contador]['cod_publi'].'"><i class="icone-fechar"></i></i>Remover</a></li>';
                                            echo '<li><a href="../Templates/UpdatePublicacaoTemplate.php?ID='.$resposta[$contador]['cod_publi'].'"><i class="icone-edit-full"></i></i>Alterar</a></li>';                                                    
                                        }else if(isset($tipoUsu) AND ($tipoUsu == 'Adm' or $tipoUsu == 'Moderador')){
                                            echo '<li><a href="../ApagarPublicacao.php?ID='.$resposta[$contador]['cod_publi'].'"><i class="icone-fechar"></i></i>Remover</a></li>';
                                            // Icone para apagar usuaario
                                            //echo '<a href="../ApagarUsuario.php?ID='.$resposta[0]['cod_usu'].'">Apagar Usuario</a>';                                                       
                                            echo '<li><a href="../Templates/UpdatePublicacaoTemplate.php?ID='.$resposta[$contador]['cod_publi'].'"><i class="icone-edit-full"></i></i>Alterar</a></li>';                                                    
                                        }
                                ?> 
                                </ul>
                            </div>
                        </div>
                    </div>
                    <a href="reclamacao.php?ID=<?php echo $resposta[$contador]['cod_publi'] ?>">
                    <?php
                        if(!empty($resposta[$contador]['img_publi'])){
                    ?>  
                        <figure>
                            <img src="../Img/publicacao/<?php echo $resposta[$contador]['img_publi']?>">
                        </figure> 
                    <?php
                        }
                    ?>                        
                        <p><?php echo $resposta[$contador]['titulo_publi']?></p>
                        </a>
                        <div class="item-baixo">   
                            <i class="icone-local"></i><p><?php echo $resposta[$contador]['endereco_organizado_fechado']?></p>
                            <div>    
                                <span><?php echo $resposta[$contador]['quantidade_curtidas']?></span><i class="icone-like"></i>
                                <span><?php echo $resposta[$contador]['quantidade_comen']?></span><i class="icone-comentario"></i>
                            </div>
                        </div>
                          
                </div>  
                <?php                  
                    $contador++;
                    }
                ?>                 
            </section>
            </div>
        </div>
        <ul>
        <?php
            if($quantidadePaginas != 1){
                $contador = 1;
                while($contador <= $quantidadePaginas){
                    if(isset($pagina) AND $pagina == $contador){
                        echo '<li class="jaca"><a href="todasreclamacoes.php?pagina='.$contador.'">Pagina'.$contador.'</a></li>'  ;  
                    }else{
                        echo '<li><a href="todasreclamacoes.php?pagina='.$contador.'">Pagina'.$contador.'</a></li>'  ;
                    }
                    
                    $contador++;        
                }
            }
            
        ?>
        </ul>
    </body>
</html>
<?php
}catch (Exception $exc){
         
}

?>