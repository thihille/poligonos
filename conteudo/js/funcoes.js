		// INFOGRAFICO
	
		var abelha = {
			personagem: $(".abelha"),
			frente: $(".aninFrente"),
			lado: $(".aninLado"),
			aponta: $(".aninAponta"),
			skin: {
				map: ["aninFrente","aninLado","aninAponta"],
			},
			movimento: {
				steps: ["aninPlay1","aninPlay2","aninPlay3","aninPlay4","aninPlay5","aninPlay6","aninPlay8"]
			}
		}
		var baloes = {
			fala1: $(".balao1"),
			fala2: $(".balao2"),
			fala3: $(".balao3"),
			fala4: $(".balao4"),
			fala5: $(".balao5"),
			fala6: $(".balao6"),
			fala7: $(".balao7")
		}
		var navegacao = {
			botaoProximo: $(".btnProx"),
			botaoVoltar: $(".btnPrev"),
			botaoReiniciar: $(".btnRefresh"),
			fechaFeed: $(".btnFechar"),
			botoes:{
				fase1:$("#fase1 li"),
				fase2:$("#fase2 li")
			},
			tooltip: {
				abreTexto: $(".baloes a"),
				fechaTexto: $(".close-infTool"),
				botao: $(".tooltip")
			},
			retorno:function(descricao){
				
				if(descricao != null){
					stage.tela.feed.fadeIn(100);
					stage.tela.feedText.html(descricao);
				}else{
					stage.tela.feed.fadeOut(100);
				}
			}
		}
		var stage = {
			progresso: 0,
			tela:{
				fase1: $("#fase1"),
				fase2: $("#fase2"),
				feed: $("#feedEscolha, .ovFeed"),
				feedText: $("#feedEscolha p")
			},
			itens: {
				fase1: $.shuffle(["poligono obj1","poligono obj2","poligono obj3","poligono obj4","poligono obj5","poligono obj6","poligono obj7","poligono obj8","errado obj9","errado obj10",]),
				fase2: $.shuffle(["errado obj1","errado obj2","errado obj3","errado obj4","errado obj5","errado obj6","poligono obj7","errado obj8 "]), /* OBJ 7 Colméia */
				constroiFase1:function(){
					for(var a = 0; a < stage.itens.fase1.length; a++){
						$("ul#fase1 li:eq("+a+")").attr("class", stage.itens.fase1[a]).show().addClass("animated bounceInDown");
					}				
				},
				constroiFase2:function(){
					for(var b = 0; b < stage.itens.fase2.length; b++){
						$("ul#fase2 li:eq("+b+")").attr("class", stage.itens.fase2[b]).show().addClass("animated bounceInUp");
					}
				}
			},
			next: {
				previous:function(){
					navegacao.botaoVoltar.fadeOut(100).removeClass("animated bounce");
					navegacao.botaoProximo.removeClass("animated bounce");
					baloes.fala2.fadeOut(300,function(){
						navegacao.botaoProximo.addClass("animated bounce");
						baloes.fala1.fadeIn(300);
						stage.progresso--
					});
				},
				next:function(){
					stage.itens.constroiFase1();
					navegacao.botaoProximo.removeClass("animated bounce");
					baloes.fala1.fadeOut(300,function(){
						navegacao.botaoProximo.addClass("animated bounce");
						navegacao.botaoVoltar.fadeIn(100).addClass("animated bounce");
						baloes.fala2.fadeIn(300);
						stage.progresso++
					});
				},
				game:function(){
					navegacao.botaoProximo.fadeOut(500);
					navegacao.botaoVoltar.fadeOut(500);
					
					baloes.fala2.fadeOut(700,function(){
						abelha.personagem
							.removeClass(abelha.movimento.steps[0])
							.addClass(abelha.movimento.steps[1]);
						setTimeout(function(){
							stage.tela.fase1.show().addClass("animated slideInLeft");
						},500);
						setTimeout(function(){
							narracao1.stop().play("texto3");
							baloes.fala3.fadeIn(300)
						},2000);
					});
				},
				game2:function(){
					if(stage.progresso == 6){
						abelha.personagem.show();
						$(".aninAponta").hide();
						abelha.personagem
							.removeClass(abelha.movimento.steps[2])
							.addClass(abelha.movimento.steps[4]);
						baloes.fala4.fadeOut(300).removeClass("animated fadeInUp");
						setTimeout(function(){
							abelha.personagem.hide();
							$(".aninAponta").show();
						},1000);
					}else if(stage.progresso == 10){
						$(".ovFeed2").show();
						setTimeout(function(){
							stage.itens.constroiFase2();
							baloes.fala4.fadeOut(600).removeClass("animated fadeInUp");
							$("#feedEscolha").css({height:"80px"});
							setTimeout(function(){
								stage.tela.fase1.removeClass("slideInLeft");
								stage.tela.fase1.addClass("slideOutRight");
								setTimeout(function(){
									stage.tela.fase1.remove();
									setTimeout(function(){
										stage.tela.fase2.show().addClass("animated slideInLeft");
										baloes.fala5.fadeIn(300);
										narracao1.stop().play("texto7");
										setTimeout(function(){
											$(".ovFeed2").hide();
										},1000);
									},1300);
								},1000)
							},1000);
						},3000);
					}
				},
				final:function(){
					setTimeout(function(){
						baloes.fala6.addClass("animated bounceOut");
						setTimeout(function(){
							abelha.personagem
								.removeClass(abelha.movimento.steps[4])
								.addClass(abelha.movimento.steps[5]);
							abelha.personagem.show();
							$(".aninAponta").hide();
							$(".alveoloFinal").addClass("aninPlay7");
							setTimeout(function(){
								$(".obj7active").hide();
								setTimeout(function(){
									$(".alveoloFoto").fadeIn(500);
									$(".alveoloFinal").fadeOut(500);
									$(".ovFeed2").hide();
									setTimeout(function(){
										$(".poligonos").fadeIn(1300);
										$(".alveoloFoto").animate({left:"395px"},1000);
										abelha.personagem
											.removeClass(abelha.movimento.steps[5])
											.addClass(abelha.movimento.steps[6])
										
									},1000);
								},1600);
							},1800);
						},1000);
					},5600);
				}
			}
		}
		
		abelha.personagem.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
			 if($(this).hasClass(abelha.movimento.steps[0])){
				baloes.fala1.fadeIn(200);
				navegacao.botaoProximo.fadeIn(100).addClass("animated bounce");
				stage.progresso++;
				narracao1.stop().play("texto1");
			 }else if($(this).hasClass(abelha.movimento.steps[1])){
				abelha.personagem
					.removeClass(abelha.skin.map[0])
					.removeClass(abelha.movimento.steps[1])
					.addClass(abelha.skin.map[1])
					.addClass(abelha.movimento.steps[2]);
					
			}else if($(this).hasClass(abelha.movimento.steps[2])){
				abelha.personagem.hide();
				$(".aninAponta").show();
				$(".aninAponta").css("z-index","70");
				$(".aninFrente").css("z-index","70");
				$(".aninLado").css("z-index","70");
					
			}else if($(this).hasClass(abelha.movimento.steps[6])){
				abelha.personagem
					.removeClass(abelha.skin.map[1])
					.addClass(abelha.skin.map[0]);
				baloes.fala7.show().addClass("animated bounceIn");
				narracao1.stop().play("final");
				$(".btnRefresh").show().addClass("animated bounceInUp");
			}else {
				
			}
		});
		
		navegacao.botaoProximo.on("click",function(){
			switch(stage.progresso) {
				case 1: stage.next.next(); narracao1.stop().play("texto2");
				break;
				
				case 2: stage.next.game(); narracao1.stop();
				break;
				
				default:
				
			}
		});
		navegacao.botaoVoltar.on("click",function(){
			switch(stage.progresso) {
				case 2: stage.next.previous(); narracao1.stop().play("texto1");
				break;
				
				//case 2: stage.next.game();
				//break;
				
				default:
				//nenhuma funcao
			}
		});
		
		navegacao.botoes.fase1.on("click",function(){
			if($(this).hasClass("poligono")){
				stage.progresso++
				narracao1.stop().play("acertoFase1");
				$(this).off("click");
				baloes.fala3.addClass("animated fadeOutUp");
				setTimeout(function(){
					baloes.fala3.hide().removeClass("animated fadeOutUp");
					baloes.fala4.show().addClass("animated fadeInUp");
				},500);
				
				if($(this).hasClass("obj1")){
					$(this).removeClass("bounceInDown obj1").addClass("obj1active bounce");
				}else if($(this).hasClass("obj2")){
					$(this).removeClass("bounceInDown obj2").addClass("obj2active bounce");
				}else if($(this).hasClass("obj3")){
					$(this).removeClass("bounceInDown obj3").addClass("obj3active bounce");
				}else if($(this).hasClass("obj4")){
					$(this).removeClass("bounceInDown obj4").addClass("obj4active bounce");
				}else if($(this).hasClass("obj5")){
					$(this).removeClass("bounceInDown obj5").addClass("obj5active bounce");
				}else if($(this).hasClass("obj6")){
					$(this).removeClass("bounceInDown obj6").addClass("obj6active bounce");
				}else if($(this).hasClass("obj7")){
					$(this).removeClass("bounceInDown obj7").addClass("obj7active bounce");
				}else if($(this).hasClass("obj8")){
					$(this).removeClass("bounceInDown obj8").addClass("obj8active bounce");
				}
				stage.next.game2();
			}else {
				$(this).off("click");
				if($(this).hasClass("obj9")){
					$(this).removeClass("bounceInDown obj9").addClass("obj9active bounce");
				}else if($(this).hasClass("obj10")){
					$(this).removeClass("bounceInDown obj10").addClass("obj10active bounce");
				}
				narracao1.stop().play("erroFase1");
				baloes.fala3.show().addClass("animated fadeInUp");
				baloes.fala4.hide().removeClass("animated fadeInUp");
				navegacao.retorno("Figura incorreta. Lembre-se de que os polígonos são formados por pelo menos três linhas que se encontram, mas não se cruzam. Tente outra vez!");
			}
		});
		
		navegacao.botoes.fase2.on("click",function(){
			if($(this).hasClass("poligono")){
				stage.progresso++
				narracao1.stop().play("acertoFase2");
				$(this).off("click");
				$(".ovFeed2").show();
				baloes.fala5.addClass("animated fadeOutUp");
				setTimeout(function(){
					baloes.fala5.hide().removeClass("animated fadeOutUp");
					baloes.fala6.show().addClass("animated bounceIn");
				},500);
				$(this).removeClass("bounceInDown obj7").addClass("obj7active bounce");
				$(".errado").addClass("animated bounceOut");
				$(this).animate({top:"128px",left:"304px"}, 2000);
				stage.next.final();
			}else {
				$(this).off("click");
				narracao1.stop().play("erroFase2");
				if($(this).hasClass("obj1")){
					$(this).removeClass("bounceInDown obj1").addClass("obj1active2 bounce");
				}else if($(this).hasClass("obj2")){
					$(this).removeClass("bounceInDown obj2").addClass("obj2active2 bounce");
				}else if($(this).hasClass("obj3")){
					$(this).removeClass("bounceInDown obj3").addClass("obj3active2 bounce");
				}else if($(this).hasClass("obj4")){
					$(this).removeClass("bounceInDown obj4").addClass("obj4active2 bounce");
				}else if($(this).hasClass("obj5")){
					$(this).removeClass("bounceInDown obj5").addClass("obj5active2 bounce");
				}else if($(this).hasClass("obj6")){
					$(this).removeClass("bounceInDown obj6").addClass("obj6active2 bounce");
				}else if($(this).hasClass("obj8")){
					$(this).removeClass("bounceInDown obj8").addClass("obj8active2 bounce");
				}
				baloes.fala5.show().addClass("animated fadeInUp");
				baloes.fala6.hide().removeClass("animated bounceIn");
				navegacao.retorno("Você escolheu o formato incorreto. Tente outra vez!");
			}
		});
		
		navegacao.tooltip.botao.on("click",function(){
			if($(this).hasClass("stool1")){
				narracao1.stop();
				tooltip.stop().play("stool1");
			}else if($(this).hasClass("stool2")){
				narracao1.stop();
				tooltip.stop().play("stool2");
			}else if($(this).hasClass("stool3")){
				narracao1.stop();
				tooltip.stop().play("stool3");
			}else if($(this).hasClass("stool4")){
				narracao1.stop();
				tooltip.stop().play("stool4");
			}else{
				tooltip.stop();
			}
		});
	
		navegacao.tooltip.abreTexto.on("click",function(){
			$(this).children("span").fadeIn(300).addClass("ativo");
			$(".close-infTool").show();
		});
		
		navegacao.tooltip.fechaTexto.on("click",function(){
			$(this).hide();
			if($(".infTool").hasClass("ativo")){
				tooltip.stop();
				$("span").fadeOut(300);
			}
		});
		
		navegacao.botaoReiniciar.on("click",function(){
			//location.href = "index.html";
			sessionStorage.setItem('reiniciar_oed', 'sim');
		});
		
		navegacao.fechaFeed.on("click",function(){
			navegacao.retorno();
			narracao1.stop();
		});
		
		
		
