import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, CameraView } from "expo-camera";
import styles from './StyleGaleriaR';
import firebaseService from '../../services/firebaseService';

const GaleriaRoteiro: React.FC<{ cidade: string | null }> = ({ cidade }) => {
    if (!cidade) return null;

    const [confirmarCheckListVisible, setConfirmarChecklistVisible] = useState(false);
    const [qrCodeScannerVisible, setQrCodeScannerVisible] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [scanned, setScanned] = useState(false);
    const [stampInfo, setStampInfo] = useState({
        cidade: '',
        nome: '',
        historia: '',
        data: '',
        dia: '',
        hora: '',
        latitude: '',
        longitude: '',
        url: '',
        qrCode: ''
    });

    const obterNomeDia = (diaSemana: number) => {
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        return diasSemana[diaSemana];
    };

    const handleAbrirModalConfirmarChecklist = (nome: string, historia: string, latitude: string, longitude: string, url: any, qrCode: string) => {
        setConfirmarChecklistVisible(true);
        const dataAtual = new Date();
        const horaAtual = dataAtual.getHours();
        const minutosAtuais = dataAtual.getMinutes();
        const horaFormatada = `${horaAtual < 10 ? '0' + horaAtual : horaAtual}:${minutosAtuais < 10 ? '0' + minutosAtuais : minutosAtuais}`;

        const imageUrl = Image.resolveAssetSource(url).uri;

        setStampInfo({
            cidade,
            nome,
            historia,
            data: `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`,
            dia: obterNomeDia(dataAtual.getDay()),
            hora: horaFormatada,
            latitude,
            longitude,
            url: imageUrl,
            qrCode,
        });
    };

    const handleConfirmarVisita = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            setConfirmarChecklistVisible(false);
            setQrCodeScannerVisible(true);
        } else {
            Alert.alert('Aviso', 'Permissão para usar a câmera foi negada.');
        }
    };

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getCameraPermissions();
    }, []);
 
    const handleBarCodeScanned = async ({ data }: any) => {
        setScanned(true);
        if (data === stampInfo.qrCode) {
            Alert.alert("Check-in salvo com sucesso!");
            setQrCodeScannerVisible(false);
            setConfirmarChecklistVisible(false);

            try {
                const stampData = {
                    cidade: stampInfo.cidade,
                    nome: stampInfo.nome,
                    historia: stampInfo.historia,
                    data: stampInfo.data,
                    hora: stampInfo.hora,
                    latitude: stampInfo.latitude,
                    longitude: stampInfo.longitude,
                    url: stampInfo.url,
                    qrCode: stampInfo.qrCode,
                };
                await firebaseService.saveStamp(stampData);
            } catch (error) {
                console.error('Error saving stamp to Firestore:', error);
            }
        } else {
            Alert.alert("Erro", "O QR code escaneado não corresponde ao local selecionado.");
            setQrCodeScannerVisible(false);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const handleFecharModalConfirmarChecklist = () => {
        setConfirmarChecklistVisible(false);
    };

    const handleCloseCamera = () => {
        setQrCodeScannerVisible(false);
    };

    const chunkArray = (array: any, chunkSize: number) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };

    let imagens: { url: any; nome: string; historia: string; latitude: string; longitude: string; qrCode: string }[] = [];
    if (cidade === 'Araruna') {
        imagens = [
            { url: require('../../../assets/img/galeria/araruna/igreja de santo antonio.jpg'), nome: 'Igreja de Santo\n Antônio', historia: '" A antiga Igreja Matriz de Nossa Senhora da Conceição, atual Igrejinha de Santo Antônio, marcou o início da urbanização de Araruna. Por volta de 1845, Feliciano Soares do Nascimento, vindo de Jacu dos Órfãos no Rio Grande do Norte, prometeu construir uma capela no alto da Serra de Araruna em homenagem à Imaculada Conceição se sua graça fosse concedida, uma tarefa difícil devido ao isolamento do local na época. "', latitude: '-6.529377771633931', longitude: '-35.74113353207702', qrCode: 'https://me-qr.com/LwMrSY6r' },
            { url: require('../../../assets/img/galeria/araruna/Igreja-Nossa-Senhora-da-Conceicao.jpg'), nome: 'Igreja Nossa\n Senhora da Conceição', historia: '" A grandiosa matriz de Araruna, diferente das típicas igrejinhas em cidades pequenas, é a segunda maior igreja católica na Paraíba, conforme a Arquidiocese, perdendo apenas para a Matriz de Nossa Senhora das Neves em João Pessoa. Desde o início de sua construção em 1876, tem sido palco de várias manifestações históricas para o município e a região. "', latitude: '-6.527934402004274', longitude: '-35.74002979423094', qrCode: 'https://me-qr.com/5w0aDWmr' },
            { url: require('../../../assets/img/galeria/araruna/fazenda maquine.jpg'), nome: 'Fazenda Maquiné', historia: '" A Fazenda Maquiné, onde antes existia o Engenho Maquiné de Targino Pereira da Costa, é um conjunto histórico com casa-grande, capela, armazém, senzala e casa dos moradores. A capela, a edificação mais antiga, foi construída em 1897 por Francisco Targino da Costa, filho de Dona Jesuína Paula d-Assunpção. Padre Targino, como era conhecido, foi vigário de Araruna entre 1906 e 1919. "', latitude: '-6.5561173786495655', longitude: '-35.74121476091263', qrCode: 'https://me-qr.com/cUVpdgGz' },
            { url: require('../../../assets/img/galeria/araruna/Mercado-Cultural.jpg'), nome: 'Mercado Cultural', historia: '" Após um período de pouca movimentação, o centro de cultura de Araruna foi reaberto e reapresentado à população como um espaço para apresentações culturais e artísticas. Nomeado Mercado Cultural, o local visa aliar sua grande história e importância para a vida urbana e social da cidade. Desde 2017, sob a gestão do prefeito Vital Costa, o Mercado Cultural tem se consolidado como um centro cultural ativo, onde todos os finais de semana acontece o evento "Domingo no Mercado – Cultura com Lazer. "', latitude: '-6.5282968303455595', longitude: '-35.74044821858501', qrCode: 'https://me-qr.com/fnmPsHna' },
            { url: require('../../../assets/img/galeria/araruna/Santuario nossa senhora de Fatima.jpeg'), nome: 'Santuário Nossa \nSenhora de Fátima ', historia: '" O Santuário, construído no Parque Estadual Ecológico da Pedra da Boca, foi idealizado pelo governador José Maranhão. No local, também foi projetado o Memorial da Pedra do Letreiro, conhecido por suas inscrições rupestres. A obra inclui um amplo espaço aberto com arquibancadas e instalações para lojas de artesanato e artigos religiosos. "', latitude: '-6.4521852759904', longitude: '-35.680088093981084', qrCode: 'https://me-qr.com/4y52Yufq' },
            { url: require('../../../assets/img/galeria/araruna/pedra da Caveira.jpg'), nome: 'Pedra da Caveira', historia: '" A Pedra da Caveira é parte de um complexo rochoso de composição granítica porfirítica, com vestígios de gnaisses e quartzitos, apresentando faces arredondadas como as outras rochas do parque. Seus formatos distintos impressionam os visitantes. Originalmente conhecida como "Pedra do Anselmo" pelos moradores de Araruna e arredores, a rocha recebeu esse nome em referência a um senhor chamado Anselmo, que morava na Água Fria e frequentava o local. "', latitude: '-6.452053358568516', longitude: '-35.67621235350527', qrCode: 'https://me-qr.com/1CXzTfTz' },
            { url: require('../../../assets/img/galeria/araruna/Pedra-da-Boca.01.jpg'), nome: 'Parque Estadual \nda Pedra da Boca', historia: '" O Parque Estadual da Pedra da Boca é uma reserva ecológica e ambiental na zona rural de Araruna, com cerca de 160 hectares. Reconhecido como um dos mais importantes patrimônios geológicos da Paraíba e do Brasil, o parque também abriga a povoação rural de Água Fria e encanta visitantes com suas diversas belezas naturais. "', latitude: '-6.456680027878244', longitude: '-35.67503210138972', qrCode: 'https://me-qr.com/lQ4dCDZj' },
            { url: require('../../../assets/img/galeria/araruna/pedra da macambira.jpg'), nome: 'Pedra da Macambira', historia: '" A Pedra da Macambira é um grande bloco granítico localizado no norte de Araruna, no Vale do Rio Calabouço, uma área rica em grutas, nascentes de água e inscrições rupestres. Está situada em uma propriedade privada chamada "Sítio Macambira". No local, cresce naturalmente a planta macambira (Bromelia laciniosa), comum na vegetação nordestina do Brasil e usada para alimentar o gado durante secas. "', latitude: '-6.484471748807796', longitude: '-35.77503662466876', qrCode: 'https://me-qr.com/RBJJbyZ8' },
        ];
    } else if (cidade === 'Areia') {
        imagens = [
            { url: require('../../../assets/img/galeria/areia/Artesanato A Talha.jpg'), nome: 'Artesanato Atalha', historia: '" É um lugar muito charmoso na cidade de Areia, as cores e decoração já chamam logo a atenção dos visitantes que se encantam com cada parte do ambiente. A Talha partilha de um espaço dedicado para peças de artesanato e para as refeições com variedade de doce, salgado, quente ou gelado, para todos os gostos. "', latitude:'-6.966116' , longitude: '-35.714789', qrCode: 'https://me-qr.com/2LIsRVoK' },
            { url: require('../../../assets/img/galeria/areia/CASARAO-JOSE-RUFINO.jpg'), nome: 'Casarão José Rufino', historia: '" Erguido no ano de 1818 pelo Marinheiro Jorge Torres, vindo de Portugal. Este solar está próximo de fazer duzentos anos e durante este tempo passou por vários proprietários e nos mais variados usos. Além do que construiu, destaca-se outra figura de cunho importante da cidade, o José Rufino de Almeida, o qual o solar toma seu nome atualmente. "', latitude:'-6.9653' , longitude: '-35.7105', qrCode: 'https://me-qr.com/GqJrMkw8' },
            { url: require('../../../assets/img/galeria/areia/ENGENHO-IPUEIRA.jpg'), nome: 'Engenho Ipueira', historia: '"  Clima ameno e geografia acidentada, mas de visual panorâmico privilegiado, o Engenho Ipueira emprega mais de 30 paraibanos residentes em Areia, famosa por sediar uma das mais importantes Faculdades de Agronomia. A moagem da cana de açúcar, como visto, resulta na fabricação da Cachaça Ipueira, a mais procurada da região. "', latitude:'-6.973528' , longitude: '-35.706932', qrCode: 'https://me-qr.com/BhOCJd7J' },
            { url: require('../../../assets/img/galeria/areia/ENGENHO-TRIUNFO.jpg'), nome: 'Engenho Triunfo', historia: '" A visita ao Engenho faz com que você deseje permanecer durante todo o dia no espaço: todas as áreas são aconchegantes, preparadas e pensadas em receber o turista para uma experiência incrível. O aprendizado constante fez com que o Engenho Triunfo venha a ser esta grande referência do turismo em Areia. "', latitude:'-6.9710' , longitude: '-35.6935', qrCode: 'https://me-qr.com/KllY6jIu' },
            { url: require('../../../assets/img/galeria/areia/Engenho-Vaca-Brava-Areia.png'), nome: 'Engenho Vaca Brava', historia: '" Conhecer o Vaca Brava é adentrar num mundo de coisas, fazeres e saberes seculares. Seja na casa grande, cujas paredes foram erguidas há mais de 140 anos e que, dentre outros personagens, abrigou o escritor José Américo de Almeida; seja por sua moenda a vapor, importada da França em 1884, construída pela mesma empresa que instalou os elevadores da Torre Eiffel, ou pelas histórias choradas e sorridas pelos personagens que viveram e trabalharam sobre suas terras. "', latitude:'-6.9735' , longitude: '-35.6916', qrCode: 'https://me-qr.com/S7RhC0sj' },
            { url: require('../../../assets/img/galeria/areia/ENGENHO-TURMALINA-DA-SERRA.jpg'), nome: 'Engenho Turmalina \nda Serra', historia: '" Um lugar encantador que desperta o desejo de ir logo conhecer e desfruta.Impressiona pelas paisagens, e pela união do lazer, entretenimento e preservação do meio ambiente. Passeios, trilhas, cachoeiras, e a saborosa cachaça Turmalina da Serra. ".', latitude:'6.9776' , longitude: '-35.7141', qrCode: 'https://me-qr.com/HVEUpwAf' },
            { url: require('../../../assets/img/galeria/areia/Teatro-Minerva.jpg'), nome: 'Teatro Minerva', historia: '" Primeiro teatro construído na Paraíba. Possui uma acústica de excelente qualidade e foi edificado com o objetivo de arrecadar fundos para a libertação dos escravos.O nome do teatro é uma homenagem à deusa das artes e da sabedoria “Minerva”, foi concebido pelo areiense Horácio de Almeida e foi construído pelas famílias mais ricas do lugar. "', latitude:'-6.9632' , longitude: '-35.7085', qrCode: 'https://me-qr.com/N5BBWNlu' },
            { url: require('../../../assets/img/galeria/areia/MuseuCasadePedroAmerico.jpg'), nome: 'Museu Casa Pedro \nAmérico', historia: '" Pedro Américo foi um dos maiores pintores do Brasil deixando obras que permanecem vivas até hoje no imaginário coletivo da nação, como “Batalha de Avaí”, “Fala do Trono” e “Tiradentes esquartejado”, reproduzidas aos milhões em livros escolares em todo o país. O imóvel tem construção simples, conjugada, com uma porta e duas janelas na frente. Havia outrora sala de visitas, sala de jantar, dois quartos, cozinha, banheiro e um pequeno quintal ."', latitude:'-6.9669' , longitude: '-35.7156', qrCode: 'https://me-qr.com/veM3ufr3' }, 
            { url: require('../../../assets/img/galeria/areia/IGREJA-DO-ROSARIO.jpg'), nome: 'Igreja de Nossa \nSenhora do Rosário \ndos Pretos ', historia: '" Uma das mais antigas da Paraíba e acha-se situada no centro da cidade de Areia, em frente a Praça Ministro José Américo de Almeida.A igreja foi construída com mão-de-obra dos escravos. De acordo com elas, os negros não podiam rezar na igreja matriz. A Igreja do Rosário passou algumas reformas, mas mesmo assim manteve a fachada, o altar e o interior, ambos construídos no estilo barroco ."', latitude:'-6.9645' , longitude: '-35.7155', qrCode: 'https://me-qr.com/U1ldPkAG' },
            { url: require('../../../assets/img/galeria/areia/igreja-matriz-nossa-senhora-da-conceição.jpg'), nome: 'Igreja Matriz Nossa \nSenhora da Conceição', historia: '" É um dos maiores patrimônios arquitetônicos da cidade. Sua construção norteou toda a ocupação em seu entorno e isso fez e faz com que ela seja a referência da comunidade, além de abrigar a padroeira do município. "', latitude:'-6.9646' , longitude: '-35.7102', qrCode: 'https://me-qr.com/ydkBoge7' },
            { url: require('../../../assets/img/galeria/areia/restaurante-vo-maria.png'), nome: 'Restaurante Rural \nVó Maria', historia: '" Possui um ambiente aconchegante e rústico, onde o mesmo oferece comidas regionais elaboradas através de receitas tradicionais, utilizando de ingredientes naturais e orgânicos cultivados pela própria comunidade. "', latitude:'-6.972539' , longitude: '-35.710616', qrCode: 'https://me-qr.com/6O8sJavy ' },
            { url: require('../../../assets/img/galeria/areia/POUSADA-VILLA-REAL-1.jpg'), nome: 'Pousada Villa Real', historia: '" Esta pousada rústica, decorada em tons de amarelo, está situada no centro da bela cidade de Areia, cercada por jardins floridos com redes. A propriedade dispõe da sua própria adega e bar de cachaças. "', latitude:'-6.9694' , longitude: '-35.7105', qrCode: 'https://me-qr.com/BXDjSV0l' },
        ];
    }else if (cidade === 'Bananeiras') { 
        imagens = [
            { url: require('../../../assets/img/galeria/bananeiras/cachoeira-do-roncador.jpg'), nome: 'Cachoeira do \nRoncador', historia: '" O Roncador é uma das belas áreas naturais do brejo paraibano, com sua vegetação exuberante e ainda conservada, mesmo com um fluxo de turistas elevado. A cahoeira fica ao pé da serra e tem aproximadamente 40 mestros de altura, e o estrondo de sua queda d água lhe conferem o nome ."', latitude:'-6.778979231969806' , longitude: '-35.55726822466484', qrCode: 'https://me-qr.com/4jK7oYv0 ' },
            { url: require('../../../assets/img/galeria/bananeiras/cruzeiroderomaBananeiras.webp'), nome: 'Cruzeiro De Roma ', historia: '" Um monumento religioso mais que centenário: o Cruzeiro de Roma. Composto de uma cruz sobre uma base elevada (entregue em 1901) e uma capela (construída em 1907) é um conjunto monumental dos mais antigos da Paraíba. "', latitude:' -6.737938391192148' , longitude: '-35.57114932096089', qrCode: 'https://me-qr.com/i1Lxs0rd' },
            { url: require('../../../assets/img/galeria/bananeiras/igreja-nossa-senhora-do-livramento.jpg'), nome: 'Igreja Nossa Senhora\n Do Livramento', historia: '" Seu nome veio como homenagem à padroeira do município, Nossa Senhora do Livramento, uma das invocações de Nossa Senhora que faz referência a uma graça alcançada pela esposa de um fidalgo português que esteve perto da morte durante o domínio espanhol sobre a Península Ibérica ."', latitude:'-6.753058624488622' , longitude: '-35.631272979958474', qrCode: 'https://me-qr.com/KumDVL11' },
            { url: require('../../..//assets/img/galeria/bananeiras/tunel-viração.jpg'), nome: 'Túnel da Serra da \nViração', historia: '" Foi construído entre o final de 1921 e meados de 1923, pela Inspectoria Federal de Obras Contra as Seccas – IFOCS, durante o mandato do governador paraibano Sólon de Lucena. "', latitude:'-6.760519528131298' , longitude: '-35.62775540389791', qrCode: 'https://me-qr.com/TCje8Via' },
            { url: require('../../../assets/img/galeria/bananeiras/engenho-goiamunduba.jpg'), nome: 'Engenho Goiamunduba', historia: '" É um dos mais antigos engenhos em pleno funcionamento, situado na cidade de Bananeiras, no brejo paraibano, região propícia ao cultivo da cana-de-açúcar e famoso pela produção de cachaça.  . "', latitude:'-6.73400579024588' , longitude: '-35.59441513207417', qrCode: 'https://me-qr.com/2vRJOxrt' },
        ];
    }else if (cidade === 'Boqueirão') {
        imagens = [
            { url: require('../../../assets/img/galeria/boqueirão/açude-epitacio.jpg'), nome: 'Açude Epitácio Pessoa', historia: '" A denominação oficial foi uma homenagem ao único Presidente do Brasil nascido na Paraíba. Já o termo popular é uma referência ao fato de no percurso do rio Paraíba as águas terem provocado um grande corte na Serra de Carnoió, formando assim uma “garganta de serra ou boqueirão”. "', latitude:'-7.4822252328780765' , longitude: '-36.127660166302', qrCode: 'https://me-qr.com/xa2GQjr1' },
            { url: require('../../../assets/img/galeria/boqueirão/lajedo-do-marinho.jpg'), nome: 'Lajedo do Marinho', historia: '" Além de sua paisagem única, o lajedo conta com vários atrativos, como área de camping, artesanato, trilhas ecológicas e históricas, etc. Sendo, dessa forma, um ótimo exemplo de integração da natureza, da cultura e da história local, em um só lugar. "', latitude:'-7.5893196741968865' , longitude: '-36.16847812412657', qrCode: 'https://me-qr.com/b0R7rmZV' },
        ];
    }else if (cidade === 'Cabaceiras') {
        imagens = [
            { url: require('../../../assets/img/galeria/cabaceiras/historia-e-museu-da-cultura.jpg'), nome: 'História e Museu \nda Cultura \nCariris Paraibanos', historia: '" O prédio funcionou como cadeia até fins da década de 1990, até então eram detidos ali prisioneiros de diversas localidades do estado, a ponto de ser chamada, nas palavras do historiador Luís Carlos Araújo Sousa, de Bastilha do cariri. . "', latitude:'-7.489355756780315' , longitude: '-36.28700384299544', qrCode: 'https://me-qr.com/N7ZArqjT' },
            { url: require('../../../assets/img/galeria/cabaceiras/roliude-nordestina.jpg'), nome: 'Letreiro Roliúde \nNordestina', historia: '" Letreiro "Roliude Nordestina" numa alusão ao fato da cidade ter sido cenário de produções cinematográficas, a mais conhecida foi "O Auto da Compadecida". "', latitude:'-7.484494201578062' , longitude: '-36.28456430749569', qrCode: 'https://me-qr.com/fwv4NPfQ' },
            { url: require('../../../assets/img/galeria/cabaceiras/praça.jpg'), nome: 'Praça do Coreto', historia: '" Aqui acontece o Festival do Bode Rei e vários pontos turisticos de Cabaceiras, estão próximos a esta praça. O legal é que tem outro letreiro e uma estátua de bode sensacionais para tirar fotos. "', latitude:'-7.4855622404617534' , longitude: '-36.27234785126319', qrCode: 'https://me-qr.com/EhobjHvW' },
            { url: require('../../../assets/img/galeria/cabaceiras/Lajeado-de-Pai-Mateus-na-Paraiba.jpg'), nome: 'Lajedo de Pai\n Mateus', historia: '" São obras da natureza que, em alguns casos, lembram objetos do cotidiano: uma das formações rochosas, por exemplo, ganhou o apelido de Pedra do Capacete. Outras apresentam um formato arqueado que lembra o de tetos de casas. E há ainda rochas arredondadas menores espalhadas aqui e acolá, como se fossem bolinhas de gude de um gigante.Foi eleito em primeiro lugar na votação da das 7 Maravilhas da Paraíba. É considerado como uma formação única em todo o continente americano e existem apenas parecido em pouquíssimos lugares no mundo. "', latitude:'-7.381807654005455' , longitude: '-36.29719370878561', qrCode: 'https://me-qr.com/2nmvc68N' },
            { url: require('../../../assets/img/galeria/cabaceiras/igreja-matriz-nossa-senhora.jpg'), nome: 'Paróquia Matriz\n Nossa Senhora \nda Conceição', historia: '" No ano seguinte, em 1835, foi criada a paróquia de N. S. da Conceição, de Cabaceiras. Foi cenario de uma das mais conhecidas produções cinematográficas feitas na Paraíba, "O Auto da Compadecida" . "', latitude:'-7.487290157440105' , longitude: '-36.28598834688097', qrCode: 'https://me-qr.com/u0FHQ2yf' },
            { url: require('../../../assets/img/galeria/cabaceiras/igreja-nossa-senhora-rosario.jpg'), nome: 'Igreja Nossa Senhora \ndo Rosário', historia: '" A igreja era utilizada basicamente pelos negros, onde eles podiam praticar sua religiosidade em forma de sincretismo. "', latitude:'-7.489321705680956' , longitude: '-36.286132111479496', qrCode: 'https://me-qr.com/kohioaPF' },
            { url: require('../../../assets/img/galeria/cabaceiras/sacas-de-la.jpg'), nome: 'Saco de Lâ', historia: '" É um misterioso paredão com enormes blocos de pedras em um formato peculiar de fardos de algodão empilhados um em cima do outro. Realmente a semelhança impressiona, mas o que mais intriga é saber como ele se formou dado o formato tão exótico. Independentemente da resposta cada vez mais turistas curiosos vão ao local checar e se admirar de perto. "', latitude:'-7.375254764160346' , longitude: '-36.323479206951355', qrCode: 'https://me-qr.com/shkGUgUe' },
            { url: require('../../../assets/img/galeria/cabaceiras/muralha-do-cariri.jpg'), nome: 'Muralha do Cariri', historia: '" Trata-se de um peculiar afloramento de rocha granítica, possuí cerca de 100 metros de comprimento e 3 metros de altura, formada a partir de processos distencionais na crosta terrestre há milhões de anos. "', latitude:'-7.362580952503698' , longitude: '-36.25130791666328', qrCode: 'https://me-qr.com/2Mn5UXC9' },
            { url: require('../../../assets/img/galeria/cabaceiras/lajeado-manuel-de-souza.jpg'), nome: 'Lajeado Manuel de Souza', historia: '" Recebe o nome de um antigo morador local, tem relativa altura em face do ponto de início da trilha e se destaca pela concentração de boulders (os matacões) de grande porte. Eis a imagem .Além do interesse geológico, o lajedo traz preciosas pinturas rupestres dos indígenas da Tradição Agreste, estimando-se idades variando entre 3.000 e 7.000 anos. "', latitude:'-7.37389283273174' , longitude: '-36.31980994503048', qrCode: 'https://me-qr.com/a4vLvj6k' },
    ];
}else if (cidade === 'Campina Grande') {
    imagens = [
            { url: require('../../../assets/img/galeria/campina/açude-novo.jpg'), nome: 'Parque Evaldo Cruz \n(Açude Novo)', historia: '" Construído no ano de 1830 com o objetivo de abastecer Campina Grande no período de seca, enquanto Açude Novo, o agora Parque Evaldo Cruz volta a ser entregue à população, desta vez visando proporcionar acesso ao lazer, cultura e práticas esportivas no coração da cidade Rainha da Borborema. "', latitude:'-7.221737144375447' , longitude: '-35.88945905998516', qrCode: 'https://me-qr.com/gMByD91l' },
            { url: require('../../../assets/img/galeria/campina/açude-velho.jpg'), nome: 'Açude Velho', historia: '" É um dos pontos mais fotografados em Campina Grande, seja pelos vários monumentos e museus no seu entorno como também pelo nascer e pôr do sol com a presença das ilustres garças. "', latitude:'-7.2256348718448296' , longitude: '-36.28449327465475', qrCode: 'https://me-qr.com/4eORO43E' },
            { url: require('../../../assets/img/galeria/campina/Jackson-luiz-gonzaga.jpg'), nome: 'Farra de Bodega', historia: '" A escultura é composta por duas figuras humanas, representando Jackson do Pandeiro e Luiz Gonzaga, é uma forma de manter viva a memória desses artistas e de sua contribuição para a cultura nordestina. A escultura é um convite para os visitantes conhecerem um pouco mais da rica cultura da região.O monumento é um dos principais pontos turísticos da cidade e é muito visitado por turistas de todo o Brasil e do mundo. É um lugar onde se pode conhecer um pouco mais sobre a cultura nordestina, além de ser um excelente cenário para belas fotografias. "', latitude:'-7.224265050497351' , longitude: '-35.87947558206734', qrCode: 'https://me-qr.com/8tAHdSwu' },
            { url: require('../../../assets/img/galeria/campina/museu-tres-pandeiros.jpg'), nome: 'Museu de Arte Popular\n_Três Pandeiros', historia: '" É um verdadeiro tesouro cultural que exibe o melhor da arte popular brasileira, reunindo obras de artistas talentosos e expondo a rica tradição artística do país. Com suas paredes curvas e linhas suaves, o museu é uma obra-prima da arquitetura moderna e a última criação de Niemeyer antes de nos deixar. Suas formas inusitadas parecem flutuar em harmonia com a natureza ao redor, proporcionando uma experiência única aos visitantes. "', latitude:'-7.224064799751909' , longitude: '-35.87807254185483', qrCode: 'https://me-qr.com/V8dKIebJ ' },
            { url: require('../../../assets/img/galeria/campina/sesi-museu-digital.jpg'), nome: 'Sesi Museu Digital', historia: '" O espaço é apresentando em forma sensorial e visual, gestos ações e sentimentos que formam o amplo, o simples e o audaz universo do tropeiro. Durante a experiência, é possível ter acesso a jogos interativos dando alusão ao desenvolvimento econômico e social em diversos setores da cidade. Além disso, os visitantes têm acesso à história de Campina Grande contada através de mapa interativo onde podem conferir a cidade e suas expressões artísticas e culturais e acompanhar o seu crescimento ao longo do século XX. "', latitude:'-7.225887194768229' , longitude: '-35.883727316723245', qrCode: 'https://me-qr.com/XmkfZ6Hw' },
            { url: require('../../../assets/img/galeria/campina/museu-algodão.jpg'), nome: 'Museu de História e \nTecnologia do Algodão', historia: '" Conta essa história de uma forma clara e didática, por meio de exposições que retratam os diversos aspectos do ciclo do algodão. O acervo do museu conta com objetos, fotografias e documentos que ajudam a compreender como funcionava a produção e a comercialização do algodão na região. Há também réplicas de máquinas e equipamentos utilizados na época, além de exposições que mostram a importância do algodão na cultura e na vida social da cidade. "', latitude:'-7.484384574238766' , longitude: ' -35.88393924370699', qrCode: 'https://me-qr.com/mrdboLOu' },
            { url: require('../../../assets/img/galeria/campina/maria-fumaça.jpg'), nome: 'Maria Fumaça', historia: '" Estas pequenas locomotivas eram destinadas ao transporte de lastro, e todo material empregado na construção de trechos ferroviários no Sertão, além de transportar o material na construção dos referidos reservatórios d"água.Trata-se do último exemplar ainda preservado deste tipo de locomotiva no Estado da Paraíba. Segundo alguns relatos colhidos, ela era conhecida carinhosamente de "Cafuringa". "', latitude:'-7.228821320777301' , longitude: '-35.88395013756376 ', qrCode: 'https://me-qr.com/WsWWr8bJ' },
            { url: require('../../../assets/img/galeria/campina/Museu_geografico.jpg'), nome: 'Museu Histórico e\n Geográfico', historia: '" É um museu brasileiro, e está localizado na Avenida Floriano Peixoto, em Campina Grande, Paraíba. O acervo do museu dedica-se ao desenvolvimento histórico, social e cultural de Campina Grande.O prédio foi inaugurado em 1814 para ser uma cadeia. Durante 60 anos o térreo serviu de cadeia e o primeiro andar funcionou como a "Casa da Câmara" (atual Câmara Municipal). Em 1896, foi inaugurada no prédio a Estação Telegráfica. Em 1893, foi transformado em museu histórico. "', latitude:'-7.218022772775567' , longitude: '-35.880922126510946', qrCode: 'https://me-qr.com/f1jDSBwE' },
            { url: require('../../../assets/img/galeria/campina/galeria-de-arte-assis.jpg'), nome: 'Galeria de Arte \nAssis Chateaubriand', historia: '" Foi inaugurado em 20 de outubro de 1967, através da Campanha Nacional dos Museus Regionais, idealizada pelo jornalista e empresário Assis Chateaubriand, paraibano da cidade de Umbuzeiro, criador, em 1947. Com considerações sobre sua importância, comenta que o museu além de ser uma grande conquista, oferecia a possibilidade de se enxergar além dos horizontes locais. "', latitude:'-7.2256348718448296' , longitude: '-35.881562480866044', qrCode: 'https://me-qr.com/yPkqxurw' },
            { url: require('../../../assets/img/galeria/campina/vila-do-artesão.jpg'), nome: 'Vila do Artesão', historia: '" É um local vibrante onde visitantes podem explorar a riqueza do artesanato regional, assistir a apresentações culturais e saborear a culinária típica em um ambiente acolhedor e autêntico. Além de ser um ponto turístico popular, é um importante centro de valorização e preservação das tradições artesanais de Campina Grande. "', latitude:'-7.228288481996429' , longitude: '-35.889480293383684', qrCode: 'https://me-qr.com/GHGuwBXa' },
            { url: require('../../../assets/img/galeria/campina/teatro-severino-cabral.jpg'), nome: 'Teatro Municipal \nSeverino Cabral', historia: '" É um ícone cultural, e um dos símbolos da cidade. Com uma localização privilegiada, bem no coração da cidade, o templo sagrado das artes e culturas campinenses tem uma beleza considera ímpar, com suas linhas arquitetônicas que encantam os campinenses e os turistas. Foi idealizado nos anos 1960, durante o regime militar, quando as manifestações artísticas enfrentaram a censura. "', latitude:'-7.221091623996557' , longitude: '-35.8867774381505', qrCode: 'https://me-qr.com/F6LvsppS' },
            { url: require('../../../assets/img/galeria/campina/sitio-sao-joao.jpg'), nome: 'Vila Sitio São João', historia: '" É uma cidade cenográfica, montada no mês de junho, em Campina Grande, Paraíba. Se caracteriza por ter o tamanho natural, com todos os componentes de um vilarejo rural , do final do século XIX. Casas com os móveis da época, mesas postas com os alimentos típicos, os mangáios, onde eram guardados os variados objetos, casas comerciais com estacionamento para jegues, equipamentos utilizados nos ciclos da farinha, algodão, couro e cana de açúcar. "', latitude:'-7.234328766081616' , longitude: '-35.914026361700614', qrCode: 'https://me-qr.com/K5KuhzvF' },
            { url: require('../../../assets/img/galeria/campina/parque-da-criança.jpg'), nome: 'Parque do Criança', historia: '" É um espaço encantador localizado em Campina Grande, na Paraíba, destinado ao entretenimento e diversão das crianças.Com uma história fascinante, o parque é um ponto de encontro para famílias e oferece uma ampla gama de atividades recreativas para os pequenos. "', latitude:'-7.2269047515517055' , longitude: '-35.877999681803914', qrCode: 'https://me-qr.com/ai7O5nOb' },
            { url: require('../../../assets/img/galeria/campina/parque-do-povo.jpeg'), nome: 'Parque do Povo', historia: '" É um dos locais mais emblemáticos e queridos de Campina Grande, na Paraíba. Mais do que apenas um parque, ele se torna o epicentro das festividades juninas durante o período do São João, transformando-se no coração pulsante da maior festa popular do Nordeste brasileiro. Não é apenas um espaço físico, mas um símbolo da identidade e da alegria do povo paraibano, onde as tradições são preservadas e celebradas com orgulho e paixão. "', latitude:'-7.223563950217415' , longitude: '-35.88670124000269', qrCode: 'https://me-qr.com/cXq3Hi8w' },
    ];
}else if (cidade === 'Queimadas') {
    imagens = [
            { url: require('../../../assets/img/galeria/queimadas/paroquia-nossa-senhora-da-guia.jpg'), nome: 'Paróquia Nossa \n Senhora da Guia', historia: '" Foi desmembrada da Paróquia de Fagundes-PB e erigida em 03 de Outubro de 1944 pelo então Bispo Arcebispo da Paraíba, Dom Moisés Coelho. Atualmente a Paróquia conta 44 comunidades distribuídas na zona urbana e rural do município e compõe a Forania Agreste I desta Diocese. "', latitude:'-7.3619082079345635' , longitude: '-35.89859827624542', qrCode: 'https://me-qr.com/bx6jl3o1' },
            { url: require('../../../assets/img/galeria/queimadas/mercado-publico.jpeg'), nome: 'Mercado Público \n Municipal', historia: '" É um dos maiores do Brasil e já chega com a visão de impulsionar a economia local transformando Queimadas em referência na região. São mais de 300 empreendedores comercializando produtos e serviços em diversos segmentos, a exemplo de hortifrúti, alimentação, carnes e frios, moda, variedades, entre outros. "', latitude:'-7.364217306925595' , longitude: '-35.8994180934416', qrCode: 'https://me-qr.com/OU658nTD' },
            { url: require('../../../assets/img/galeria/queimadas/centro-cultural-philus-hall.jpg'), nome: 'Centro Cultural \nPhilus Haus', historia: '" É um recanto dedicado a cultura e a natureza no coração do agreste paraibano. O visitante vai connhecer o acervo antigo da fazenda como peças , máquinas, porcelanas e obras de artes que marcaram o desenvolvimento da fazenda na época do ciclo do algodão. "', latitude:'-7.440670080535995' , longitude: '-35.871797716120064', qrCode: 'https://me-qr.com/LuFtsIJe' },
            { url: require('../../../assets/img/galeria/queimadas/pedra-do-bico.jpg'), nome: 'Pedra do Bico', historia: '" Com uma distância de apenas 20 quilômetros de Campina Grande. Com um rapel de 35 metros de altura de pura adrenalina a Pedra do Bico é visitada por vários aventureiros durante todo o ano. Belíssimas paisagens para quem adora fotografar, pois lá de cima da pedra do bico é possível ver os prédios de Campina Grande. "', latitude:'-7.367713204634982' , longitude: '-35.93418015831349', qrCode: 'https://me-qr.com/1Xn2xBx3' },
            { url: require('../../../assets/img/galeria/queimadas/pedra-do-touro.jpg'), nome: 'Pedra do Touro', historia: '" É uma matação com iscrições rupestres, que esta assentado em equilibrio por sobre o maciço granitico que forma o boqueirão de bodopitá. O nome alude a figura de um quadrupide existentes entre os desenhos rupestres, cuja silhueita lembra um touro zebu.Embora não deva se tratar do referido animal por que esses desenhos são bem anteriores à chegada dos portugueses com seus currais. È um bom atrativo para aqueles que gostam de uma aventura, pois é repleto de trilhas e pedras para praticar rapel,lá você encontrar adrenalina e lindas paisagens naturais. "', latitude:'-7.352399942736378' , longitude: '-35.90314661672143', qrCode: 'https://me-qr.com/szRloSSn' },
    ];
}
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {chunkArray(imagens, 2).map((chunk, chunkIndex) => (
                    <View key={chunkIndex} style={styles.imageRow}>
                        {chunk.map((imagem: any, imageIndex: any) => (
                            <TouchableOpacity key={imageIndex} onPress={() => handleAbrirModalConfirmarChecklist(imagem.nome, imagem.historia, imagem.latitude, imagem.longitude, imagem.url, imagem.qrCode)}>
                                <View>
                                    <Image source={imagem.url} style={styles.image} />
                                    <Text style={styles.imageText}>{imagem.nome}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <Modal animationType='fade' transparent={true} visible={confirmarCheckListVisible} onRequestClose={handleFecharModalConfirmarChecklist}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.locationName}>{stampInfo.nome}</Text>
                        <Text style={styles.locationHistory}>{stampInfo.historia}</Text>
                        <Text style={styles.carimboTitle}>Confirmar Check-in?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={handleConfirmarVisita}>
                                <Text style={[styles.buttonText, { color: '#2576BA' }]}>SIM</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleFecharModalConfirmarChecklist}>
                                <Text style={[styles.buttonText, { color: '#E83F33' }]}>NÃO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal animationType="fade" transparent={true} visible={qrCodeScannerVisible} onRequestClose={handleCloseCamera}>
                {qrCodeScannerVisible && (
                    <>
                        <CameraView
                            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                            barcodeScannerSettings={{
                                barcodeTypes: ["qr", "pdf417"],
                            }}
                            style={StyleSheet.absoluteFillObject}
                        />
                           <TouchableOpacity style={styles.closeButtonContainer} onPress={handleCloseCamera}>
                            <Text style={styles.closeButtonText}> Fechar </Text>
                          </TouchableOpacity>
                    </>
                )}
               {scanned && (
                            <TouchableOpacity  style={styles.scanAgainContainer} onPress={() => setScanned(false)}>
                                <Text style={styles.scanText}> Tap to Scan Again </Text>
                            </TouchableOpacity>
                        )}
            </Modal>
        </SafeAreaView>
    );
};

export default GaleriaRoteiro;