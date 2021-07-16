import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons.js'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations'


function ProfileSideBar(propriedades) {
  return(
    <Box as="aside">
        <img src={`https://github.com/${propriedades.gitHubUser}.png`} />

        <hr/>

        <p>
          <a className="boxLink" href={`https://github.com/${propriedades.gitHubUser}`}>
            @{propriedades.gitHubUser}
          </a>
        </p>
        
        <hr/>

        <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
  
}

function ProfileRelationsBox(propriedades){
    return (
      <ProfileRelationsBoxWrapper>
      <p>{propriedades.title} ({propriedades.items.length})</p>

      <ul>
        {/*seguidores.map((itemAtual) => {
              return(
                <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
              )
            
        })*/}
      </ul>
    </ProfileRelationsBoxWrapper>
    )
}




export default function Home(props) {
  
  const gitHubUser = props.githubUser
  const [comunidades, setComunidades] = React.useState([]);

  const [mensagens, setMensagens] = React.useState([]);

  const pessoasFavoritas = ['rafaballerini', 'omariosouto', 'juunegreiros', 'felipefialho', 'gustavoguanabara', 'marcobrunodev', 'Hibrael01']
  
  //Pegar array de dados do github
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function(){
     
    
    //Utiliza GET
    fetch('https://api.github.com/users/hibrael01/followers').then(function (serverResponse){
      return serverResponse.json()
    }).then(function (completeResponse){
      setSeguidores(completeResponse)
    })

    //API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization' : 'e13cacd80a8ac0ad5859f564e5b448',
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({"query": `query {
        allCommunities{
          id
          title
          imageUrl
          creatorSlug
        }
      }`})

    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesDoDB = respostaCompleta.data.allCommunities;
      console.log(comunidadesDoDB)
      setComunidades(comunidadesDoDB)
    })

  //Setando Mensagens
  fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization' : 'e13cacd80a8ac0ad5859f564e5b448',
        'Content-Type' : 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({"query": `query {
        allMessages{
          id
          name
          yourmessage
        }
      }`})

    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const mensagensNoDb = respostaCompleta.data.allMessages;
      console.log(mensagensNoDb)
      setMensagens(mensagensNoDb)
    })

  }, [])

  


  return (

    <>
    <AlurakutMenu githubUser={gitHubUser}/>
    <MainGrid>

      {/* <Box style={{gridArea: 'profileArea'}}> */}    
      <div className="profileArea"  style={{gridArea: 'profileArea'}}>
        <ProfileSideBar gitHubUser={gitHubUser}/>
        
      </div>

      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className="title">Bem Vindo (a) {gitHubUser}</h1>
          <OrkutNostalgicIconSet/>
        </Box>

        <Box>
          <h2>O que deseja fazer hoje?</h2>

          <hr/>
          
          
          <form onSubmit={function createComunity(e){
            e.preventDefault();

            const dataForm = new FormData(e.target);
            console.log(dataForm.get('title'))
            console.log(dataForm.get('imageUrl'))

            const comunidade = {
              title: dataForm.get('title'),
              imageUrl: dataForm.get('imageUrl'),
              creatorSlug: gitHubUser,
            }

            if(dataForm.get('title') == ''){
              alert('Insira um nome para a comunidade')
            }else{

              fetch('/api/comunidades', {
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.createdRecord);
                const comunidade = dados.createdRecord
                console.log(comunidade)
                const novasComunidades = [...comunidades, comunidade]
                setComunidades(novasComunidades)
              })
             
            }  
            
          }}>

            <div>

              <input placeholder="Qual vai ser o nome da sua comunidade?"
              name="title"
              aria-label="Qual vai ser o nome da sua comunidade?">
              </input>
              <input placeholder="Qual a URL da imagem de sua comunidade?"
              name="imageUrl"
              aria-label="Qual a URL da imagem de sua comunidade?">
              </input>

            </div>
            <button>Criar comunidade</button>
            
            <hr/>
          </form>

          
          <form onSubmit={function createMessage(e){
            e.preventDefault();

            const dataForm = new FormData(e.target);
            console.log(dataForm.get('name'))
            console.log(dataForm.get('message'))

            const mensagem = {
              name: dataForm.get('name'),
              yourmessage: dataForm.get('message'),
            }

            if(dataForm.get('name') == ''){
              alert('Digite seu nome')
            }else{

              fetch('/api/mensagens', {
                method : 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(mensagem)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.createdRecord);
                const mensagem = dados.createdRecord
                console.log(mensagem)
                const novaMensagem = [...mensagens, mensagem]
                setMensagens(novaMensagem)
              })
             
            }  
            
          }}>

            <div>

              <input placeholder="Digite seu nome aqui:"
              name="name"
              aria-label="Digite seu nome aqui">
              </input>
              <input placeholder="Digite sua mensagem:"
              name="message"
              aria-label="Digite sua mensagem">
              </input>

            </div>
            <button>Deixar sua mensagem</button>
            
            <hr/><hr/>
          </form>


          <Box>
          <div className="messagesBox">
            <p className="subTitle">Mensagens: ({mensagens.length})</p>
            <ul>
              {mensagens.slice(0,10).map((mensagemAtual) => {
                  return(
                    <div className="messageStyle" key={mensagemAtual.id}>
                        <span className="nameStyle">{mensagemAtual.name} </span>
                        <p>{mensagemAtual.yourmessage}</p>
                    </div>
                  )
              })}
            </ul>
            <a className="boxLink" href="#">Ver Mais</a>
          </div>
        </Box>

        </Box>   
      </div> 

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>


        <ProfileRelationsBox title ='Seguidores: ' items={seguidores}/>  

        <ProfileRelationsBoxWrapper>
          <p>Devs Favoritos: ({pessoasFavoritas.length})</p>

          <ul>

            {pessoasFavoritas.slice(0,6).map((gitHubUser) => {  
                  return(
                    <li key={gitHubUser}>
                      <a href={`https://github.com/${gitHubUser}`} key={gitHubUser}>
                        <img src={`https://github.com/${gitHubUser}.png`} />
                        <span>{gitHubUser}</span>
                      </a>
                    </li>
                  )
                 
                
            })}
          </ul>
          <a className="boxLink" href="#">Ver Mais</a>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <p>Comunidades: ({comunidades.length})</p>

          <ul>
            {comunidades.slice(0,6).map((comunidadeAtual) => {
                return(
                  <li key={comunidadeAtual.id}>
                    <a href={`/comunidades/${comunidadeAtual.id}`}>
                      <img src={comunidadeAtual.imageUrl} />
                      <span>{comunidadeAtual.title}</span>
                    </a>
                  </li>
                )
            })}
          </ul>
        
          <a className="boxLink" href="#">Ver Mais</a>
        </ProfileRelationsBoxWrapper>

        
      </div>

    </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies =  nookies.get(context)
  const token = cookies.USER_TOKEN
  console.log('cookies:', jwt.decode(token).githubUser)
  const {githubUser} = jwt.decode(token)

  const {isAuthenticated} = await fetch('https://alurakut.vercel.app/api/auth', {

    headers: {
        Authorization:token
    }

    })
      .then((resposta) => resposta.json())

      console.log('isAuthenticated:', isAuthenticated);

      //TODO Descomentar o código em caso de login invalido quando API se estabilizar
      /*if(!isAuthenticated){
        return{
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }*/

  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}