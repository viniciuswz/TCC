<?php
session_start();
    require_once('../Config/Config.php');
    require_once(SITE_ROOT.DS.'autoload.php');   
    use Core\Usuario;
    
    try{        
        $tipoUsuPermi = array('Prefeitura');
        Usuario::verificarLogin(1,$tipoUsuPermi);  // Tem q estar logado         
        $usu = new Usuario(); 
        $usu->setCodUsu($_SESSION['id_user']);
        $resultado = $usu->getDadosUser();
        isset($_GET['pagina']) ?: $_GET['pagina'] = null;  
        $res = $usu->getDadosUsuByTipoUsu(array('Funcionario'),$_GET['pagina'],TRUE);
        //var_dump($res);             
        
        $quantidadePaginas = $usu->getQuantidadePaginas();
        $pagina = $usu->getPaginaAtual();
        if(empty($res)){
            echo 'Não há nenhuma denuncia para verificar<br>';
        }     
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
        <meta name="theme-color" content="#089E8E" />

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
    <body class="sempre-branco">
        <header>
            <a href="todasreclamacoes.php">
                <img src="imagens/logo_oficial.png" alt="logo">
            </a>   
            <i class="icone-pesquisa pesquisa-mobile" id="abrir-pesquisa"></i>
            <form action="pesquisa.php" method="get" id="form-pesquisa">
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
                if(isset($resultado) AND !empty($resultado)){ 
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

            <div class="tabelinha-admin" >
                    <table>
                        <tr>
                            <th>Usuário</th>
                            <th>E-mail</th>
                            <th>Data</th>
                        </tr>
                        <tr>
                                <td colspan="3" class="cad-adm"><div>+</div><p>Cadastrar</p></td>
                        </tr>    
                        <?php
                        $contador = 0;                        
                        while($contador < count($res)){
                            echo '<tr class="tabelinha-linha">';  
                                echo '<td>
                                <div class="mini-menu-adm">
                                        <ul>
                                            <li><a href="../ApagarUsuario.php?ID='.$res[$contador]['cod_usu'].'" class="remover-usuario">Remover Funcionário</a></li>                                            
                                        </ul>                                        
                                </div>                                
                                <p>'.$res[$contador]['nome_usu'].'</p></td>';                      
                                echo '<td><p>'.$res[$contador]['email_usu'].'</p></td>'; 
                                echo '<td><p>'.$res[$contador]['dataHora_cadastro_usu'].'</p></td>';                       
                                //echo '<td<p> <a href="'.$res[$contador]['LinkApagarUsu'].'">Remover Funcao</p></td>'; 
                            echo '</tr>';
                            $contador++;                            
                            }
                        ?>                           
                    </table>
            </div>      
        </div>
        <div class="modal-adicionar-user">
            <div class="modal-adicionar-user-fundo"></div>
            <div class="box-adicionar-user">
                <div>
                    <h1>Adicionar Funcionário</h1>
                    <span class="fechar-adicionar-user">&times;</span>
                </div>
               
                <form id="add-user-form" method="POST">

                    <div class="campo-texto-icone"  >
                        <label for="user" ><i class="icone-user"></i></label>
                        <input type="text" name="nome" id="user" placeholder="Nome">
                    </div>

                    <div class="campo-texto-icone"  >
                        <label for="email" ><i class="icone-mail"></i></label>
                        <input type="email" name="email" id="email" placeholder="E-mail">
                    </div>

                    <div class="campo-texto-icone">
                        <label for="senha"><i class="icone-senha"></i></label>
                        <input type="password" name="senha" id="senha" placeholder="Senha">
                    </div>

                    <div class="opcoes-user">
                        <div>
                            
                            <input type="radio" value='Funcionario' name="tipo" id="moderador-input" checked>
                            <label for="moderador-input">Funcionário</label>
                        </div>                      
                        
                    </div>

                    <div class="aviso-form-inicial">
                        <p>O campo tal e pa</p>
                    </div>

                    <button type="submit">Cadastrar</button>
                </form>
                
            </div>
        </div>
        <ul class="paginacao">
            <?php
                if($quantidadePaginas != 1){
                    $contador = 1;
                    while($contador <= $quantidadePaginas){
                        if(isset($pagina) AND $pagina == $contador){
                            echo '<li class="jaca"><a href="prefeitura-admin.php">'.$contador.'</a></li>'  ;  
                        }else{
                            echo '<li><a href="prefeitura-admin.php?pagina='.$contador.'">'.$contador.'</a></li>'  ;
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
    $erro = $exc->getCode();   
    $mensagem = $exc->getMessage();  
    switch($erro){
        case 2://Nao esta logado    
            echo "<script>javascript:window.location='login.php';</script>";
            break;
        case 6://Não é usuario prefeitura ou func  
            echo "<script>javascript:window.location='index.php';</script>";
            break; 
        case 9://Não foi possivel achar a publicacao  
            echo "<script> alert('$mensagem');javascript:window.location='todasreclamacoes.php';</script>";
            break; 
        default: //Qualquer outro erro cai aqui
            echo "<script> alert('$mensagem');javascript:window.location='todasreclamacoes.php';</script>";
    }   
}
?>
