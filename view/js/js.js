jQuery(function($)
{
  function fechar(){
    $(".user-menu").css("width","0");
    $("body").css("overflow","auto")
  }
  
  $("#abrir").click(function()
  {
    
    var tela= $(document).width();
    if(tela<=480){
      $(".user-menu").css("width","100vw");
      $(window).resize(fechar);
    }else{
      $(".user-menu").css("width","450px");
      $(window).resize(fechar);
    }
    $("body").css("overflow","hidden")
  })
  $(".fechar").click(fechar);
  
  $("#deiLike").click(function(){
   var id = $("#IdPublis").val();
   var classe = $(this).find('i').attr("class");   
    $.ajax({
      url:"../CurtirPublicacao.php",
      type: "get",
      data: "ID="+id,
      success:function(result){
          if(result == 'NLogado'){ // Nao esta logado, redirecionar pra fazer login
            location.href="login.php";
            return false;
          }          
          if(classe =="icone-like-full"){
            $("#deiLike").find("i").attr("class","icone-like"); 
            $("#qtd_likes").text(result);      
          }else{
            $("#deiLike").find("i").attr("class","icone-like-full");         
            $("#qtd_likes").text(result);            
          }

      }
   })
   return false;
  })
 
})

jQuery(function($)
{
  
  var click = 0;
  $("#abrir-not").click(function(){
    
    $(".notificacoes").toggleClass('ativo');
    var banana= $(".notificacoes").attr("class");
    
    
    if(banana=='notificacoes ativo'){
      click++;
      $("#not-fechado").html(' fechou ' + click + 'vezes');
      $("body").css("overflow","auto");
      $("body").css("overflow","hidden");
    }else{
      $("body").css("overflow","auto");
    }
    return false;
    
  })
  
  $(window).resize(function(){
    $(".notificacoes").removeClass('ativo');
  })     
  
})


jQuery(function($) {
  
  $(document).ready(function(){
    /*ativar*/
    var leftPos, newWidth, $linha;
    
    $('.espacos').append("<li id='linha'></li>");//adiciona dentro das abas a seguinte tag
    $linha = $('#linha');
    $linha.width($('.ativo').width()) //pegar largura do elemento que esta ativo agora
    .css('left', $('.ativo a').position().left) // o valor da posição left vai ser o valor do a que esta ativo no nomento
    .data('origLeft', $linha.position().left)// armazenar os valores da position left do elemento que esta selecionado inicialmente
    .data('origWidth', $linha.width());// armazenar o valor da largura do elemento que esta selecionado inicialmente
    
    /* trocar cor do a ativo */
    $('.espacos li a').click(function() {
      var $this = $(this); //o elemento que vai ser clicado
      $this.parent().addClass('ativo').siblings().removeClass('ativo');// vai pegar o elemento pai do a que acabu de ser clicado e mandar a classe ativo para ele em seguida remover a classe ativo dos elementos que não estiver selecionado
      $linha
      .data('origLeft', $this.position().left) //armazena o valor da posição left elemento que esta sendo clicado
      .data('origWidth', $this.parent().width());//armazena o valor do width do elemento que esta sendo clicado
      //return false; // encerra
    });
    
    /*mudar a linha para o ativo*/
    
    $('.espacos li').find('a').click(function() { //econtrar o a dentro do li que estamos clicando e execultar a função
      var $thisBar = $(this); //this se refere ao <a>  confirmo execultando isso, alert($thisBar.attr('href'))
      leftPos = $thisBar.position().left; // a posição do elemento a que clicamos
      newWidth = $thisBar.parent().width();// a largura do elemento...
      $linha.css({ // posicionar no css a linha
        "left": leftPos,// daqui para baixo já sabemos...
        "width": newWidth
      });
    }, function() {
      $linha.css({
        "left": $linha.data('origLeft'),
        "width": $linha.data('origWidth')
      });
    });
  });
});


jQuery(function($){
  

  
  jQuery(document).on("click",".icone-3pontos", function(event){
    //alert("oi");
     var $this = $(this);
     $this.parent().toggleClass('mini-menu-item-ativo')
  })
})



//VERIFICAÇÃO DOS FORM
jQuery(function(){
  $(".formulario").submit(function(){
    
    var titulo = $("#titulo").val();
    
    if( titulo === ""){
      $("#titulo").parent().find('p').text("este campo não pode ser vazio");
      $("#titulo").parent().find('span').addClass('verificar');
      $("#titulo").css("background" , 'rgba(256,000,000,.1)' )
      return false;
    }else{
      $("#titulo").parent().find('p').text("");
      $("#titulo").parent().find('span').removeClass('verificar');
      $("#titulo").css("background" , 'white' )
    }
  });
  $(".formulario").submit(function(){
    
    var tema = $("#tema").val();
    
    if( tema === ""){
      $("#tema").parent().find('p').text("este campo não pode ser vazio ");
      $("#tema").parent().find('span').addClass('verificar');
      $("#tema").css("background" , 'rgba(256,000,000,.1)' )
      return false;
    }else{
      $("#tema").parent().find('p').text("");
      $("#tema").parent().find('span').removeClass('verificar');
      $("#tema").css("background" , 'white' )
    }
    
  });
  
  $(".formulario ele-nao").submit(function(){
    var imgDebate = $("#imagemDebateInput").val();
    
    if(imgDebate == ""){
      $(".imagem").find('p:last-child').text("eae");
      return false;
    }
  })
  
  $(".formulario").submit(function(){
    
    var id = $(this).attr('id');
    if(id == "elenao"){
      
    }else{
      
      var imgDebate = $("#imagemDebateInput").val();
      if(imgDebate == ""){
        $(".imagem").find('p:last-child').text("uma imagem é obrigatoria");
        return false;
      }
    }
    
  })
  
  // $(document).on("change", "#imagemDebateInput", function(){
  //   var InputData = document.getElementById('imagemDebateInput');
  //   var caminhoImagem = InputData.value;
  //   // verificando a extensão
  //   var extensao = caminhoImagem.substring(
  //     caminhoImagem.lastIndexOf('.') + 1).toLowerCase();
  //     //verificando se é uma img
  //     if (extensao == "gif" || extensao == "png"  || extensao == "webp" || extensao == "bmp"
  //     || extensao == "jpeg" || extensao == "jpg") {
  //       // vai mostrar no preview
  //       if (InputData.files && InputData.files[0]) {
  //         var reader = new FileReader();
  //         reader.onload = function(e) {
  //           $('#imgPreview').attr('src', e.target.result);
  //           $(".imagem").find('p:last-child').text("");
  //         }
  //         reader.readAsDataURL(InputData.files[0]);
  //       }
  //     } 
  //     //se não for uma imagem
  //     else {
  //       $('#imagemDebateInput').val("");
  //       $(".imagem").find('p:last-child').text("esse formato não é valido");
  //       return false;
  //     }
  //   })
  
  
  $(".formulario").submit(function(){
    
    var sobre = $("#sobre").val();
    
    if( sobre === ""){
      $("#sobre").parent().find('p').text("este campo não pode ser vazio ");
      $("#sobre").css("background" , 'rgba(256,000,000,.1)' )
      return false;
    }else{
      $("#sobre").parent().find('p').text("");
      $("#sobre").css("background" , 'white' )
      
    }
    
  });
  
  $(".formulario").submit(function(){
    
    if($('input[name=categoria]:checked').length<=0)
    {
      $(".categorias").find('p').text("Escolha uma catgoria")
    }else{
      $(".categorias").find('p').text("")
    }
    
  });
  
  
  $(".formulario").submit(function(){
    
    //Nova variável "cep" somente com dígitos.
    var CEP = $("#cep").val().replace(/\D/g, '');
    
    
    if( CEP === ""){
      $("#cep").parent().find('p').text("O CEP é obrigatorio");
      $("#cep").parent().find('span').addClass('verificar');
      $("#cep").css("background" , 'rgba(256,000,000,.1)' )
      return false;
      
    }else{
      
      
      
      
      
      $("#cep").parent().find('p').text("");
      $("#cep").parent().find('span').removeClass('verificar');
      $("#cep").css("background" , 'white' )
      $("#cep").val(CEP.replace('-',''))
      
      
    }
    
  });
  
  $(document).ready(function(){
    $("#cep").mask("99999-999");
  });
  
  $("#cep").blur(function(){
    
    function limpa_formulário_cep() {
      // Limpa valores do formulário de cep.
      $("#local").val("");
      $("#bairro").val("");
    }
    
    //Nova variável "cep" somente com dígitos.
    var CEP = $("#cep").val().replace(/\D/g, '');
    //Nova variável "cep" somente com dígitos.
    var cep = CEP;
    
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;
      
      //Valida o formato do CEP.
      if(validacep.test(cep)) {
        
        //Preenche os campos com "..." enquanto consulta webservice.
        $("#local").val("...");
        $("#bairro").val("...");
        
        
        //Consulta o webservice viacep.com.br/
        $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {
        
        if (!("erro" in dados)) {
          //Atualiza os campos com os valores da consulta.
          $("#local").val(dados.logradouro);
          $("#bairro").val(dados.bairro);
          
        } //end if.
        else {
          //CEP pesquisado não foi encontrado.
          limpa_formulário_cep();
          $("#cep").parent().find('p').text("CEP não encontrado");
          $("#cep").parent().find('span').addClass('verificar');
          $("#cep").css("background" , 'rgba(256,000,000,.1)' )
          
          $("#bairro").parent().find('p').text("CEP não encontrado");
          $("#bairro").parent().find('span').addClass('verificar');
          $("#bairro").css("background" , 'rgba(256,000,000,.1)' )
          
          $("#local").parent().find('p').text("CEP não encontrado");
          $("#local").parent().find('span').addClass('verificar');
          $("#local").css("background" , 'rgba(256,000,000,.1)' )
        }
      });
    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      $("#cep").parent().find('p').text(" o CEP é invalido");
      $("#cep").parent().find('span').addClass('verificar');
      $("#cep").css("background" , 'rgba(256,000,000,.1)' )
      
    }
  } //end if.
  
})

$(".formulario").submit(function(){
  
  var local = $("#local").val();
  
  if( local === "" ){
    $("#local").parent().find('p').text("este campo não pode ser vazio ");
    $("#local").parent().find('span').addClass('verificar');
    $("#local").css("background" , 'rgba(256,000,000,.1)' )
    return false;
  }else{
    $("#local").parent().find('p').text("");
    $("#local").parent().find('span').removeClass('verificar');
    $("#local").css("background" , 'white' )
    
  }
  
});

$(".formulario").submit(function(){
  
  var bairro = $("#bairro").val();
  
  if( bairro === "" ){
    $("#bairro").parent().find('p').text("este campo não pode ser vazio ");
    $("#bairro").parent().find('span').addClass('verificar');
    $("#bairro").css("background" , 'rgba(256,000,000,.1)' )
    return false;
  }else{
    $("#bairro").parent().find('p').text("");
    $("#bairro").parent().find('span').removeClass('verificar');
    $("#bairro").css("background" , 'white' )
    
  }
  
});

$(".formulario").submit(function(){
  var imgDebate = $("#fotoReclamacao").val();
  
  if(imgDebate == ""){
    $(".imagem").find('p:last-child').text("uma imagem é obrigatoria");
  }
})

// $(document).on("change", "#fotoReclamacao", function(){
//   var InputData = document.getElementById('fotoReclamacao');
//   var caminhoImagem = InputData.value;
//   // verificando a extensão
//   var extensao = caminhoImagem.substring(
//     caminhoImagem.lastIndexOf('.') + 1).toLowerCase();
//     //verificando se é uma img
//     if (extensao == "gif" || extensao == "png"  || extensao == "webp" || extensao == "bmp"
//     || extensao == "jpeg" || extensao == "jpg") {
//       // vai mostrar no preview
//       if (InputData.files && InputData.files[0]) {
//         var reader = new FileReader();
//         reader.onload = function(e) {
//           $('#imgPreview').attr('src', e.target.result);
//           $(".imagem").find('p:last-child').text("");
//         }
//         reader.readAsDataURL(InputData.files[0]);
//       }
//     } 
//     //se não for uma imagem
//     else {
//       $('#imagem').val("");
//       $(".imagem").find('p:last-child').text("esse formato não é valido");
//       return false;
//     }
//   })





})

jQuery(function($){
  $("#abrir-debate-info").click(function(){
    $(".usuarios-debate-info").addClass("usuarios-debate-info-ativo")
    $(".mini-menu-item").removeClass("mini-menu-item-ativo")
  })
  
  $("#fechar-debate-info").click(function(){
    $(".usuarios-debate-info").removeClass("usuarios-debate-info-ativo")
  })
})

jQuery(function($){
  $("#abrir-contatos").click(function(){
    $(".contatos").addClass("contatos-ativo");
    $(".mini-menu-item").removeClass("mini-menu-item-ativo")
  })
  $("#fechar-contatos").click(function(){
    $(".contatos").removeClass("contatos-ativo")
  })
})

jQuery(function($){
  $(".icone-filtro").click(function(){
    $(this).parent().find("form").addClass("filtro-ativo")
  })
  $("#fechar-filtro").click(function(){
    $(this).parent().removeClass("filtro-ativo")
  })
})


jQuery(function($){

  jQuery(document).on("click",".tabelinha-linha", function(event){
  //$(".tabelinha-linha").click(function(){
    var $this = $(this);
    var classe = $this.attr('class');
    var motivo = $this.find('div.motivo').attr("class");
    
    
    /*criar uma rotina para remover os outros menu aberto */
    
    if(motivo == "motivo motivo-ativo"){ /* verificar de o motivo ta ativo, se for verdade ele não abre o mini menu */
    }else{
      if(classe == "mini-menu-adm"){/* se não se, se a classe or igual a: execulta */
        
        $(this).find("td:nth-child(1)").find("div").toggleClass("mini-menu-adm-ativo");
      }else{ /* se não isso */
        $(this).siblings().find("td:nth-child(1) div").removeClass("mini-menu-adm-ativo"); /* pegar os elementos que não corresponde aesse que esta sendo clicado, e remover a class*/
        $(this).find("td:nth-child(1) div").toggleClass("mini-menu-adm-ativo"); /*  */
        
        
      }
    }
    
    
  })

  jQuery(document).on("click",".mini-menu-adm", function(event){
  //$(".mini-menu-adm").click(function(){
    $(this).find("td:nth-child(1)").find("div").removeClass("mini-menu-adm-ativo")
  })
})


jQuery(function($){
  
  /*ativar quando clicar e remover tag de ativar */
  jQuery(document).on("click",".motivo-ativar", function(event){
  //$(".motivo-ativar").click(function(){
    
    $(this).parents(":eq(3)").find("div.motivo").addClass("motivo-ativo");
    $(this).parents(":eq(4)").removeClass("tabelinha-linha");
    $(this).promise().then(function(){
      var $this = $(this);
      var alturatela = $this.parents(":eq(3)").find('div.motivo').height();
      var alturabox = $this.parents(":eq(3)").find('.motivo-box').height();
      //alert(alturabox + " " + alturatela)
      
      if( alturabox > alturatela){
        
        $this.parents(":eq(3)").find('div.motivo .motivo-box').css({"top":"0%","transform":"translateX(-50%) translateY(-0%)"})
      }else{
        $this.parents(":eq(3)").find('div.motivo .motivo-box').css({"top":"50%","transform":"translateX(-50%) translateY(-50%)"})
      }
    });
    $("body").css("overflow","hidden");
  })
  
  
  /*fechar quando clicar e colocar de novo tag de ativar*/
  jQuery(document).on("click",".fechar-motivo", function(event){
  //$(".fechar-motivo").click(function(){
    $(this).parents(":eq(2)").removeClass("motivo-ativo");
    $(this).parents(":eq(4)").addClass("tabelinha-linha")
    $("body").css("overflow","auto");
  })
  /*fechar quando clicar fora e adicionar class de ativar */
  jQuery(document).on("click",".motivo-fundo", function(event){
  //$(".motivo-fundo").click(function(){
    $(this).parent().removeClass("motivo-ativo");
    $(this).parents(":eq(2)").addClass("tabelinha-linha")
    $("body").css("overflow","auto");
  })
})
//ajustando altura do motivo


/* denuncia */
jQuery(function($){
  /* abrir quando */
  jQuery(document).on("click",".denunciar-item", function(event){
  //$(".denunciar-item").click(function(){
    
    $(this).parents(":eq(2)").find("div.modal-denunciar").addClass("modal-denunciar-ativo");
    $("body").css("overflow","hidden")
  })
  /* fechar quando clicar fora*/
  jQuery(document).on("click",".modal-denunciar-fundo", function(event){
  //$(".modal-denunciar-fundo").click(function(){
    $(this).parent().removeClass("modal-denunciar-ativo");
    $("body").css("overflow","auto")
  })
  /* fechar quando clicar no X*/
  jQuery(document).on("click",".fechar-denuncia", function(event){
 // $(".fechar-denuncia").click(function(){
    $(this).parents(":eq(2)").removeClass("modal-denunciar-ativo");
    $("body").css("overflow","auto")
  })
})

/* modal editar comentario */
jQuery(function($){
  /* abrir quando */
  jQuery(document).on("click",".editar-comentario", function(event){
 // $(".editar-comentario").click(function(){
    $(this).parents(":eq(2)").find("div.modal-editar-comentario").addClass("modal-editar-comentario-ativo");
  })
  /* fechar quando clicar fora*/
  jQuery(document).on("click",".modal-editar-comentario-fundo", function(event){
//$(".modal-editar-comentario-fundo").click(function(){
    $(this).parent().removeClass("modal-editar-comentario-ativo");
  })
  /* fechar quando clicar no X*/
  jQuery(document).on("click",".fechar-editar-comentario", function(event){
  //$(".fechar-editar-comentario").click(function(){
    $(this).parents(":eq(2)").removeClass("modal-editar-comentario-ativo");
  })
})

/* modal desativar */

jQuery(function($){
  
  $(".desativar-btn").click(function(){
    $(".modal-desativar").addClass("modal-desativar-ativo");
    $("body").css("overflow","hidden")
  })
  /* fechar quando clicar fora*/
  $(".modal-desativar-fundo").click(function(){
    $(this).parent().removeClass("modal-desativar-ativo");
    $("body").css("overflow","auto")
  })
  /* fechar quando clicar no X*/
  $(".fechar-desativar").click(function(){
    $(this).parents(":eq(2)").removeClass("modal-desativar-ativo");
    $("body").css("overflow","auto")
  })
})

// modal add user
jQuery(function($){
  
  $(".cad-adm").click(function(){
    
    $(".modal-adicionar-user").addClass("modal-adicionar-user-ativo");
    $("body").css("overflow","hidden")
  })
  /* fechar quando clicar fora*/
  $(".modal-adicionar-user-fundo").click(function(){
    $(this).parent().removeClass("modal-adicionar-user-ativo");
    $("body").css("overflow","auto")
  })
  /* fechar quando clicar no X*/
  $(".fechar-adicionar-user").click(function(){
    $(this).parents(":eq(2)").removeClass("modal-adicionar-user-ativo");
    $("body").css("overflow","auto")
  })
})

/* modal erro php */

jQuery(function($){
  
  /* fechar quando clicar fora*/
  jQuery(document).on("click",".modal-erro-fundo", function(event){
  //$(".modal-erro-fundo").click(function(){
    $(this).parent().remove();
  })
  /* fechar quando clicar no X*/
  jQuery(document).on("click",".fechar-erro", function(event){
 // $(".fechar-erro").click(function(){
    $(this).parents(":eq(2)").remove();
  })
})

/* alterar capa */

jQuery(function($){
  /* abrir quando clicar */
  $("#trocar-capa").click(function(){
    $("body").css("overflow","hidden")
    $(".modal-troca-foto").addClass("modal-troca-foto-ativo");
    $(document).on("change", "#fotoCapa", function(){
      var InputData = document.getElementById('fotoCapa');
      var caminhoImagem = InputData.value;
      // verificando a extensão
      var extensao = caminhoImagem.substring(
        caminhoImagem.lastIndexOf('.') + 1).toLowerCase();
        //verificando se é uma img
        if (extensao == "gif" || extensao == "png"  || extensao == "webp" || extensao == "bmp"
        || extensao == "jpeg" || extensao == "jpg") {
          $(".box-troca-foto").find(".aviso-form-inicial").css("display","none")
          // vai mostrar no preview
          if (InputData.files && InputData.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
              // $('.img-capa-corta').attr('src', e.target.result);
              var caminhoprev = $(".img-capa-corta").attr('src');
              //$(".imagem").find('p:last-child').text("");
              //trocar toda vez que uma nova foto for colocada
              $uploadCrop.croppie('bind', {
                url: e.target.result
              }).then(function(){
                console.log('jQuery bind complete');
              });
            }
            reader.readAsDataURL(InputData.files[0]);
          }  
        } 
        //se não for uma imagem
        else {
          $('#fotoCapa').val("");
          $uploadCrop.croppie('destroy');
          $uploadCrop.croppie({             
            enableExif: true,
            enforceBoundary:true,
            enableOrientation:true,
            enableResize:false,
            viewport: {
              width: 320,
              height: 150,
              
            },
            boundary: {
              width: tela,
              height: 200
            },
          });
          
          
          $(".box-troca-foto").find(".aviso-form-inicial").css("display","block")
          $(".box-troca-foto").find(".aviso-form-inicial").find("p").text("Isso não é uma imagem")
          
          return false;
        }
      })
    })
    /* fechar quando clicar fora*/
    $(".modal-troca-foto-fundo").click(function(){
      $("body").css("overflow","auto");
      $(this).parent().removeClass("modal-troca-foto-ativo");
    })
    /* fechar quando clicar no X*/
    $(".fechar-troca-foto").click(function(){
      $("body").css("overflow","auto");
      $(this).parents(":eq(2)").removeClass("modal-troca-foto-ativo");
    })
    
    $("#cortar").click(function (){
      var InputData = document.getElementById('fotoCapa');
      var caminhoImagem = InputData.value;
      if(caminhoImagem == ""){
        $(".box-troca-foto").find(".aviso-form-inicial").css("display","block")
        $(".box-troca-foto").find(".aviso-form-inicial").find("p").text("Selecione uma imagem")
      }else{
        cortar();
      }
    })
    
    function cortar(){
      
      $(".modal-troca-foto").css("opacity", "0");
      
      $('.img-capa-corta').croppie('result', { type: 'html', size: 'original', format: 'png' }).then(function (result) {
        
        
        $('.img-capa-corta').croppie('result', { type: 'canvas', size: { width: 720, height: 350 }, format: 'png' }).then(function (result) {
          $(".modal-troca-foto-previa").addClass("modal-troca-foto-previa-ativo");
          $('.previewCapa').attr('src', result);
          
        });
      });
      
    }
    jQuery(function($){
      /* fechar quando clicar fora*/
      $(".modal-troca-foto-previa-fundo").click(function(){
        $(this).parent().removeClass("modal-troca-foto-previa-ativo");
        $(".modal-troca-foto").css("opacity", "1");
      })
      /* fechar quando clicar no X*/
      $(".fechar-troca-foto-previa").click(function(){
        
        $(".modal-troca-foto-previa").removeClass("modal-troca-foto-previa-ativo");
        $(".modal-troca-foto").css("opacity", "1");
      })
      //fechar quando escolher outra capa
      $(".outra-capa").click(function(){
        $(".modal-troca-foto").css("opacity", "1");
        $(".modal-troca-foto-previa").removeClass("modal-troca-foto-previa-ativo");
      })
    })
  });
  jQuery(function($){
    $(".alterar-capa").click(function (){
      $('.img-capa-corta').croppie('result', { type: 'canvas', size: { width: 1000, height: 467 }, format: 'png' }).then(function (result) {
      
        $("#base64FotoCapa").val(result);
        $(".perfil").find("img").attr("src",result);
        $(".mini-perfil").find("img:last").attr("src",result);
        //alert("blzCAPA")
         $(".modal-troca-foto").removeClass("modal-troca-foto-ativo");
          
         $(".modal-troca-foto-previa").removeClass("modal-troca-foto-previa-ativo");
         $(".modal-troca-foto").css("opacity", "1");
          $("body").css("overflow","auto")
         $("#trocarcapa").submit();
      });

      $("#trocarcapa").submit(function(){
        var img = $("#base64FotoCapa").val();
        $.ajax({
          url:"../UpdateImagem.php",
          type: "post",
          data: "tipo=capa"+"&imagem="+img,
          success:function(result){
           // alert(result);
            
          }
       })
      // alert("dasdasadsdas");       
        return false
        
      });
      
    })
  });
  
  //trocar foto perfil
  
  jQuery(function($){
    /* abrir quando clicar */
    $("#trocar-perfil").click(function(){
      $("body").css("overflow","hidden")
      $(".modal-troca-foto-perfil").addClass("modal-troca-foto-perfil-ativo");
      $(document).on("change", "#fotoPerfil", function(){
        var InputData = document.getElementById('fotoPerfil');
        var caminhoImagem = InputData.value;
        // verificando a extensão
        var extensao = caminhoImagem.substring(
          caminhoImagem.lastIndexOf('.') + 1).toLowerCase();
          //verificando se é uma img
          if (extensao == "gif" || extensao == "png"  || extensao == "webp" || extensao == "bmp"
          || extensao == "jpeg" || extensao == "jpg") {
            $(".box-troca-foto-perfil").find(".aviso-form-inicial").css("display","none")
            // vai mostrar no preview
            if (InputData.files && InputData.files[0]) {
              var reader = new FileReader();
              reader.onload = function(e) {
                // $('.img-capa-corta').attr('src', e.target.result);
                var caminhoprev = $(".img-perfil-corta").attr('src');
                //$(".imagem").find('p:last-child').text("");
                //trocar toda vez que uma nova foto for colocada
                $uploadCropPerfil.croppie('bind', {
                  url: e.target.result
                }).then(function(){
                  console.log('jQuery bind complete');
                });
              }
              reader.readAsDataURL(InputData.files[0]);
            }  
          } 
          //se não for uma imagem
          else {
            $('#fotoPerfil').val("");
            $uploadCropPerfil.croppie('destroy');
            $uploadCropPerfil.croppie({             
              enableExif: true,
              enforceBoundary:true,
              enableOrientation:true,
              enableResize:false,
              viewport: {
                width: 200,
                height: 200,
                type: 'circle'
                
              },
              boundary: {
                width: tela,
                height: 300
              },
            });
            $(".box-troca-foto-perfil").find(".aviso-form-inicial").css("display","block")
            $(".box-troca-foto-perfil").find(".aviso-form-inicial").find("p").text("Isso não é uma imagem")
            
            return false;
          }
        })
      })
      /* fechar quando clicar fora*/
      $(".modal-troca-foto-perfil-fundo").click(function(){
        $("body").css("overflow","auto")
        $(this).parent().removeClass("modal-troca-foto-perfil-ativo");
        
      })
      /* fechar quando clicar no X*/
      $(".fechar-troca-foto-perfil").click(function(){
        $("body").css("overflow","auto")
        $(this).parents(":eq(2)").removeClass("modal-troca-foto-perfil-ativo");
      })
      
      $("#cortarPerfil").click(function (){
        var InputData = document.getElementById('fotoPerfil');
        var caminhoImagem = InputData.value;
        if(caminhoImagem == ""){
          $(".box-troca-foto-perfil").find(".aviso-form-inicial").css("display","block")
          $(".box-troca-foto-perfil").find(".aviso-form-inicial").find("p").text("Selecione uma imagem")
        }else{
          cortarP();
        }
      })
      
      function cortarP(){
        
        $(".modal-troca-foto-perfil").css("opacity", "0");
        
        $('.img-perfil-corta').croppie('result', { type: 'html', size: 'original', format: 'png' }).then(function (result) {
          
          
          $('.img-perfil-corta').croppie('result', { type: 'canvas', size: { width: 180, height: 180 }, format: 'png' }).then(function (result) {
            $(".modal-troca-foto-perfil-previa").addClass("modal-troca-foto-perfil-previa-ativo");
            $('.previewPerfil').attr('src', result);
            
          });
        });
        
      }
      jQuery(function($){
        /* fechar quando clicar fora*/
        $(".modal-troca-foto-perfil-previa-fundo").click(function(){
          
          $(".modal-troca-foto-perfil modal-troca-foto-perfil-ativo").css("opacity", "0");
          $(this).parent().removeClass("modal-troca-foto-previa-perfil-ativo");
        })
        /* fechar quando clicar no X*/
        $(".fechar-troca-foto-perfil-previa").click(function(){
          
          
          $(".modal-troca-foto-perfil-previa").removeClass("modal-troca-foto-perfil-previa-ativo");
          $(".modal-troca-foto-perfil").css("opacity", "1");
        })
        //fechar quando escolher outra foto
        $(".outra-perfil").click(function(){
          
          
          $(".modal-troca-foto-perfil-previa").removeClass("modal-troca-foto-perfil-previa-ativo");
          $(".modal-troca-foto-perfil").css("opacity", "1");
        })
      })
    });
    jQuery(function($){
      $(".alterar-perfil").click(function (){
        $('.img-perfil-corta').croppie('result', { type: 'canvas', size: { width: 200, height: 200 }, format: 'png', circle:false }).then(function (result) {
          $("#base64FotoPerfil").val(result);
          $(".perfil-info").find("img").attr("src",result);
          $(".item-topo").find("img").attr("src",result);
          $(".mini-perfil").find("img:first-child").attr("src",result);
          
            
             $(".modal-troca-foto-perfil").removeClass("modal-troca-foto-perfil-ativo");
             $(".modal-troca-foto-perfil-previa").removeClass("modal-troca-foto-perfil-previa-ativo");
             $(".modal-troca-foto-perfil").css("opacity", "1");
             $("body").css("overflow","auto")
           

             $("#trocarperfil").submit();
      $("#baconP").click(function(){
        //alert($("#base64FotoPerfil").val());
        
        
      })

    
      })
      

    
  })

  $("#trocarperfil").submit(function(){
    
    var img = $("#base64FotoPerfil").val();
   // alert('asa');
    $.ajax({
      
      url:"../UpdateImagem.php",
      type: "post",
      data: "tipo=perfil"+"&imagem="+img,
      success:function(result){
        
        //alert("asas");
      }
    })
    
    

  //alert("blza")
  return false;
  });
    });
    //trocar foto reclamacao
    
    jQuery(function($){
      function recriarReclama (){
        $uploadCropReclamacao.croppie('destroy');
        $uploadCropReclamacao.croppie({             
          enableExif: true,
          enforceBoundary:true,
          enableOrientation:true,
          enableResize:false,
          viewport: {
            width: 200,
            height: 200,
            
            
          },
          boundary: {
            width: tela,
            height: 300
          },
        });
      }
      /* abrir quando clicar */
      $("#colocar-foto-reclamacao").click(function(){
        $("body").css("overflow","hidden")
        $(".modal-troca-foto-reclamacao").addClass("modal-troca-foto-reclamacao-ativo");
        $(document).on("change", "#fotoReclamacao", function(){
          var InputData = document.getElementById('fotoReclamacao');
          var caminhoImagem = InputData.value;
          // verificando a extensão
          var extensao = caminhoImagem.substring(
            caminhoImagem.lastIndexOf('.') + 1).toLowerCase();
            //verificando se é uma img
            if (extensao == "gif" || extensao == "png"  || extensao == "webp" || extensao == "bmp"
            || extensao == "jpeg" || extensao == "jpg") {
              $(".box-troca-foto-reclamacao").find(".aviso-form-inicial").css("display","none")
              // vai mostrar no preview
              if (InputData.files && InputData.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                  // $('.img-capa-corta').attr('src', e.target.result);
                  var caminhoprev = $(".img-reclamacao-corta").attr('src');
                  //$(".imagem").find('p:last-child').text("");
                  //trocar toda vez que uma nova foto for colocada
                  $uploadCropReclamacao.croppie('bind', {
                    url: e.target.result
                  }).then(function(){
                    console.log('jQuery bind complete');
                  });
                }
                reader.readAsDataURL(InputData.files[0]);
              }  
            } 
            //se não for uma imagem
            else {
              $('#fotoReclamacao').val("");
              recriarReclama();
              $(".box-troca-foto-reclamacao").find(".aviso-form-inicial").css("display","block")
              $(".box-troca-foto-reclamacao").find(".aviso-form-inicial").find("p").text("Isso não é uma imagem")
              
              return false;
            }
          })
        })
        /* fechar quando clicar fora*/
        $(".modal-troca-foto-reclamacao-fundo").click(function(){
          $("body").css("overflow","auto")
          $(this).parent().removeClass("modal-troca-foto-reclamacao-ativo");
          $('#fotoReclamacao').val("");
          recriarReclama();
        })
        /* fechar quando clicar no X*/
        $(".fechar-troca-foto-reclamacao").click(function(){
          $("body").css("overflow","auto")
          $(this).parents(":eq(2)").removeClass("modal-troca-foto-reclamacao-ativo");
          $('#fotoReclamacao').val("");
          recriarReclama();
        })
        
        $("#cortarReclamacao").click(function (){
          var InputData = document.getElementById('fotoReclamacao');
          var caminhoImagem = InputData.value;
          if(caminhoImagem == ""){
            $(".box-troca-foto-reclamacao").find(".aviso-form-inicial").css("display","block")
            $(".box-troca-foto-reclamacao").find(".aviso-form-inicial").find("p").text("Selecione uma imagem")
          }else{
            cortarR();
          }
        })
        
        function cortarR(){
          
          $(".modal-troca-foto-reclamacao").css("opacity", "0");
          
          $('.img-reclamacao-corta').croppie('result', { type: 'html', size: 'original', format: 'png' }).then(function (result) {
            
            
            $('.img-reclamacao-corta').croppie('result', { type: 'canvas', size: { width: 500, height: 350 }, format: 'png' }).then(function (result) {
              $(".modal-troca-foto-reclamacao-previa").addClass("modal-troca-foto-reclamacao-previa-ativo");
              $('.previewReclamacao').attr('src', result);
              
            });
          });
          
        }
        jQuery(function($){
          /* fechar quando clicar fora*/
          $(".modal-troca-foto-reclamacao-previa-fundo").click(function(){
            
            $(".modal-troca-foto-reclamacao modal-troca-foto-reclamacao-ativo").css("opacity", "0");
            $(this).parent().removeClass("modal-troca-foto-previa-reclamacao-ativo");
          })
          /* fechar quando clicar no X*/
          $(".fechar-troca-foto-reclamacao-previa").click(function(){
            
            
            $(".modal-troca-foto-reclamacao-previa").removeClass("modal-troca-foto-reclamacao-previa-ativo");
            $(".modal-troca-foto-reclamacao").css("opacity", "1");
          })
          //fechar quando escolher outra foto
          $(".outra-reclamacao").click(function(){
            
            
            $(".modal-troca-foto-reclamacao-previa").removeClass("modal-troca-foto-reclamacao-previa-ativo");
            $(".modal-troca-foto-reclamacao").css("opacity", "1");
          })
        })
      });
      jQuery(function($){
        $(".alterar-reclamacao").click(function (){
          $('.img-reclamacao-corta').croppie('result', { type: 'canvas', size: { width: 500, height: 350 }, format: 'png' }).then(function (result) {
            //$("#fotoReclamacao").attr("value", result)
            $("#base64").val(result);
            $('#imgPreview').attr('src',result);
            $(".imagem").find('p:last-child').text("");
            $(".modal-troca-foto-reclamacao-previa").removeClass("modal-troca-foto-reclamacao-previa-ativo");
            $(".modal-troca-foto-reclamacao").css("opacity", "1");
            $(".modal-troca-foto-reclamacao").removeClass("modal-troca-foto-reclamacao-ativo");
            $("body").css("overflow","auto")
          });
          
        })
        
        jQuery(function($){
          
          
         // $("#bacon").click(function(){
          //  alert($("#base64").val());
            
            
          //})
        })
      });
      
      //trocar foto debate
      
      jQuery(function($){
        function recriaDb(){
          $uploadCropReclamacao.croppie('destroy');
          $uploadCropReclamacao.croppie({             
            enableExif: true,
            enforceBoundary:true,
            enableOrientation:true,
            enableResize:false,
            viewport: {
              width: 200,
              height: 200,
              
              
            },
            boundary: {
              width: tela,
              height: 300
            },
          });
        }
        
        /* abrir quando clicar */
        $("#abrir-cortar").click(function(){
          $("body").css("overflow","hidden")
          $(".modal-troca-foto-reclamacao").addClass("modal-troca-foto-reclamacao-ativo");
          $(document).on("change", "#imagemDebateInput", function(){
            var InputData = document.getElementById('imagemDebateInput');
            var caminhoImagem = InputData.value;
            // verificando a extensão
            var extensao = caminhoImagem.substring(
              caminhoImagem.lastIndexOf('.') + 1).toLowerCase();
              //verificando se é uma img
              if (extensao == "gif" || extensao == "png"  || extensao == "webp" || extensao == "bmp"
              || extensao == "jpeg" || extensao == "jpg") {
                $(".box-troca-foto-reclamacao").find(".aviso-form-inicial").css("display","none")
                // vai mostrar no preview
                if (InputData.files && InputData.files[0]) {
                  var reader = new FileReader();
                  reader.onload = function(e) {
                    // $('.img-capa-corta').attr('src', e.target.result);
                    var caminhoprev = $(".img-reclamacao-corta").attr('src');
                    //$(".imagem").find('p:last-child').text("");
                    //trocar toda vez que uma nova foto for colocada
                    $uploadCropReclamacao.croppie('bind', {
                      url: e.target.result
                    }).then(function(){
                      console.log('jQuery bind complete');
                    });
                  }
                  reader.readAsDataURL(InputData.files[0]);
                }  
              } 
              //se não for uma imagem
              else {
                $('#fotoReclamacao').val("");
                recriaDb();
                $(".box-troca-foto-reclamacao").find(".aviso-form-inicial").css("display","block")
                $(".box-troca-foto-reclamacao").find(".aviso-form-inicial").find("p").text("Isso não é uma imagem")
                
                return false;
              }
            })
          })
          /* fechar quando clicar fora*/
          $(".modal-troca-foto-reclamacao-fundo").click(function(){
            $("body").css("overflow","auto")
            $(this).parent().removeClass("modal-troca-foto-reclamacao-ativo");
            
          })
          /* fechar quando clicar no X*/
          $(".fechar-troca-foto-reclamacao").click(function(){
            $("body").css("overflow","auto")
            $(this).parents(":eq(2)").removeClass("modal-troca-foto-reclamacao-ativo");
          })
          
          $("#cortarDebate").click(function (){
            var InputData = document.getElementById('imagemDebateInput');
            var caminhoImagem = InputData.value;
            if(caminhoImagem == ""){
              $(".box-troca-foto-reclamacao").find(".aviso-form-inicial").css("display","block")
              $(".box-troca-foto-reclamacao").find(".aviso-form-inicial").find("p").text("Selecione uma imagem")
            }else{
              cortarD();
            }
          })
          
          function cortarD(){
            
            $(".modal-troca-foto-reclamacao").css("opacity", "0");
            
            $('.img-reclamacao-corta').croppie('result', { type: 'html', size: 'original', format: 'png' }).then(function (result) {
              
              
              $('.img-reclamacao-corta').croppie('result', { type: 'canvas', size: { width: 500, height: 350 }, format: 'png' }).then(function (result) {
                $(".modal-troca-foto-reclamacao-previa").addClass("modal-troca-foto-reclamacao-previa-ativo");
                $('.previewReclamacao').attr('src', result);
                
              });
            });
            
          }
          jQuery(function($){
            /* fechar quando clicar fora*/
            $(".modal-troca-foto-reclamacao-previa-fundo").click(function(){
              
              $(".modal-troca-foto-reclamacao modal-troca-foto-reclamacao-ativo").css("opacity", "0");
              $(this).parent().removeClass("modal-troca-foto-previa-reclamacao-ativo");
            })
            /* fechar quando clicar no X*/
            $(".fechar-troca-foto-reclamacao-previa").click(function(){
              
              
              $(".modal-troca-foto-reclamacao-previa").removeClass("modal-troca-foto-reclamacao-previa-ativo");
              $(".modal-troca-foto-reclamacao").css("opacity", "1");
            })
            //fechar quando escolher outra foto
            $(".outra-reclamacao").click(function(){
              
              
              $(".modal-troca-foto-reclamacao-previa").removeClass("modal-troca-foto-reclamacao-previa-ativo");
              $(".modal-troca-foto-reclamacao").css("opacity", "1");
            })
          })
        });
        jQuery(function($){
          $(".alterar-reclamacao").click(function (){
            $('.img-reclamacao-corta').croppie('result', { type: 'canvas', size: { width: 500, height: 350 }, format: 'png' }).then(function (result) {
              $("#base64").val(result);
              $('#imagemDebateInput').attr('src',result);
              //alert(result)
              $(".imagem").find('p:last-child').text("");
              $(".modal-troca-foto-reclamacao-previa").removeClass("modal-troca-foto-reclamacao-previa-ativo");
              $(".modal-troca-foto-reclamacao").css("opacity", "1");
              $(".modal-troca-foto-reclamacao").removeClass("modal-troca-foto-reclamacao-ativo");
              $("body").css("overflow","auto")
            });
            
          })
          
        });
        
        
        
        
        
        /* verificação login */
        
        jQuery(function($){
          $("#login").submit(function(){
            var senha = $("#senha").val();
            if( senha === ""){
              $("#senha").parent().find("label").css("background-color" , 'rgba(256,000,000)');
              $("#senha").css("border-color" , 'rgba(256,000,000)');
              $("#senha").focus();
              return false;
            }else{
              $("#senha").parent().find("label").css("background-color" , 'dodgerblue' );
              $("#senha").css("border-color" , 'dodgerblue');
            }
          });
          
          $("#login").submit(function(){
            var email = $("#email").val();
            if( email === ""){
              $("#email").parent().find("label").css("background-color" , 'rgba(256,000,000)');
              $("#email").css("border-color" , 'rgba(256,000,000)');
              $("#email").focus();
              return false;
            }else{
              $("#email").parent().find("label").css("background-color" , 'dodgerblue' );
              $("#email").css("border-color" , 'dodgerblue');
            }
          });
          
          
          $("#login").submit(function(){
            var email = $("#email").val();
            var senha = $("#senha").val();
            
            if( email === "" && senha === ""){
              $(".aviso-form-inicial").show();
              $(".aviso-form-inicial").find("p").text("O email e a senha então vazios")
              return false;
            }else if( senha === ""){
              $(".aviso-form-inicial").show();
              $(".aviso-form-inicial").find("p").text("você precisa digitar um senha")
              return false;
            }else if(email === ""){
              $(".aviso-form-inicial").show();
              $(".aviso-form-inicial").find("p").text("você precisa digitar uma E-mail")
              return false;
            }else{ // se tudo estiver preenchido executa o ajax      
              /* AJAX DE FAZER LOGIN */                                     
                $.ajax({
                    url:"../Login.php",
                    type: "post",
                    data: "email="+email+"&senha="+senha,
                    success:function(result){
                        if(result=="1"){
                            location.href="index.php"
                        }else{
                            $(".aviso-form-inicial").show();
                            $(".aviso-form-inicial").find("p").text(result)
                        }
                    }  
              });
              return false;
            }
          });      
        });      
    
        
        /* verificação cadastro */
        
        jQuery(function($){
          
          
          $("#cadastro").submit(function(){
            var senhaC = $("#senhaC").val();
            if( senhaC === ""){
              $("#senhaC").parent().find("label").css("background-color" , 'rgba(256,000,000)');
              $("#senhaC").css("border-color" , 'rgba(256,000,000)');
              $("#senhaC").focus();
              return false;
            }else{
              $("#senhaC").parent().find("label").css("background-color" , 'dodgerblue' );
              $("#senhaC").css("border-color" , 'dodgerblue');
            }
          });
          $("#cadastro").submit(function(){
            var senha = $("#senha").val();
            if( senha === ""){
              $("#senha").parent().find("label").css("background-color" , 'rgba(256,000,000)');
              $("#senha").css("border-color" , 'rgba(256,000,000)');
              $("#senha").focus();
              return false;
            }else{
              $("#senha").parent().find("label").css("background-color" , 'dodgerblue' );
              $("#senha").css("border-color" , 'dodgerblue');
            }
          });
          $("#cadastro").submit(function(){
            var email = $("#email").val();
            if( email === ""){
              $("#email").parent().find("label").css("background-color" , 'rgba(256,000,000)');
              $("#email").css("border-color" , 'rgba(256,000,000)');
              $("#email").focus();
              return false;
            }else{
              $("#email").parent().find("label").css("background-color" , 'dodgerblue' );
              $("#email").css("border-color" , 'dodgerblue');
            }
          });
          $("#cadastro").submit(function(){
            var user = $("#user").val();
            if( user === ""){
              $("#user").parent().find("label").css("background-color" , 'rgba(256,000,000)');
              $("#user").css("border-color" , 'rgba(256,000,000)');
              $("#user").focus();
              return false;
            }else{
              $("#user").parent().find("label").css("background-color" , 'dodgerblue' );
              $("#user").css("border-color" , 'dodgerblue');
            }
          });
          $("#cadastro").submit(function(){
            var user = $("#user").val();
            var email = $("#email").val();
            var senha = $("#senha").val();
            var senhaC = $("#senhaC").val();
            if(senhaC !== senha && senhaC !==""){
              $(".aviso-form-inicial").show();
              $(".aviso-form-inicial").find("p").text("confirmar senha não esta igual a senha, tente de novo");
              return false;
            }else{
              if( user === ""){
                $(".aviso-form-inicial").show();
                $(".aviso-form-inicial").find("p").text("você precisa preencher o nome de usuário")
              }else if( email === ""){
                $(".aviso-form-inicial").show();
                $(".aviso-form-inicial").find("p").text("você precisa digitar um E-mail")
              }else if( senha === ""){
                $(".aviso-form-inicial").show();
                $(".aviso-form-inicial").find("p").text("você precisa digitar um senha")
              }else if(senhaC === ""){
                $(".aviso-form-inicial").show();
                $(".aviso-form-inicial").find("p").text("você precisa comfirmar a senha")
              }else{ // AJAX CADASTRAR
                /* AJAX CADASTRAR */
                $.ajax({
                  url:"../CadastrarUser.php",
                  type: "post",
                  data: "email="+email+"&senha="+senha+"&nome="+user,
                  success:function(result){
                      if(result=="1"){
                          location.href="Pagina-agradecimento.php";
                      }else{
                          $(".aviso-form-inicial").show();
                          $(".aviso-form-inicial").find("p").text(result)
                      }
                  }  
                });
                  return false;
              }
              
            }
          })
        })
        
        jQuery(function($){
          $(".item-participante").click(function(){
            
            var $this = $(this);
            $this.find(".mini-menu-item").toggleClass("mini-menu-item-ativo")
            
          })
        })
        
        // verficação add user
        
        /* verificação login */
        
        jQuery(function($){
          
          $("#add-user-form").submit(function(){
            
            if($('input[name=categoria]:checked').length<=0)
            {
              $(".categorias").find('p').text("Escolha uma catgoria")
            }else{
              $(".categorias").find('p').text("")
            }
            
          });
          
          $("#add-user-form").submit(function(){
            var senha = $("#senha").val();
            if( senha === ""){
              $("#senha").parent().find("label").css("background-color" , 'rgba(256,000,000)');
              $("#senha").css("border-color" , 'rgba(256,000,000)');
              $("#senha").focus();
              return false;
            }else{
              $("#senha").parent().find("label").css("background-color" , 'dodgerblue' );
              $("#senha").css("border-color" , 'dodgerblue');
            }
          });
          
          $("#add-user-form").submit(function(){
            var email = $("#email").val();
            if( email === ""){
              $("#email").parent().find("label").css("background-color" , 'rgba(256,000,000)');
              $("#email").css("border-color" , 'rgba(256,000,000)');
              $("#email").focus();
              return false;
            }else{
              $("#email").parent().find("label").css("background-color" , 'dodgerblue' );
              $("#email").css("border-color" , 'dodgerblue');
            }
          });
          
          
          $("#add-user-form").submit(function(){
            var email = $("#email").val();
            var senha = $("#senha").val();
            
            if( email === "" && senha === ""){
              $(".aviso-form-inicial").show();
              $(".aviso-form-inicial").find("p").text("O email e a senha então vazios")
            }else if( senha === ""){
              $(".aviso-form-inicial").show();
              $(".aviso-form-inicial").find("p").text("você precisa digitar um senha")
            }else if(email === ""){
              $(".aviso-form-inicial").show();
              $(".aviso-form-inicial").find("p").text("você precisa digitar uma E-mail")
            }
          })
        })
        Visualizado
        
