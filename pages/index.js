import React from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons.js'
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




export default function Home() {
  
  const gitHubUser = 'Hibrael01'
  const [comunidades, setComunidades] = React.useState([]);

  /*const comunidades = [
      'Alurakut'
  ]*/

  const pessoasFavoritas = ['rafaballerini', 'omariosouto', 'juunegreiros', 'felipefialho', 'gustavoguanabara', 'marcobrunodev']
  
  //Pegar array de dados do github
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function(){

    fetch('https://api.github.com/users/peas/followers').then(function (serverResponse){

      return serverResponse.json()
    }).then(function (completeResponse){
      setSeguidores(completeResponse)
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

            const comunidade = {
              id: new Date().toISOString,
              title: dataForm.get('title'),
              image: dataForm.get('image'),
            }

            if(dataForm.get('title') == ''){
              alert('Insira um nome para a comunidade')
            }else{
              const novasComunidades = [...comunidades, comunidade]
              setComunidades(novasComunidades)
            }  
            

          }}>

            <div>

              <input placeholder="Qual vai ser o nome da sua comunidade?"
              name="title"
              aria-label="Qual vai ser o nome da sua comunidade?">
              </input>
              <input placeholder="Qual a URL da imagem de sua comunidade?"
              name="image"
              aria-label="Qual a URL da imagem de sua comunidade?">
              </input>

            </div>
            <button>Criar comunidade</button>
            
          </form>
        </Box>

      </div> 

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>


        <ProfileRelationsBox title ='Seguidores: ' items={seguidores}/>  

        <ProfileRelationsBoxWrapper>
          <p>Pessoas Favoritas Dev: ({pessoasFavoritas.length})</p>

          <ul>
            {pessoasFavoritas.map((gitHubUser) => {
                  return(
                    <li key={gitHubUser}>
                      <a href={`/users/${gitHubUser}`} key={gitHubUser}>
                        <img src={`https://github.com/${gitHubUser}.png`} />
                        <span>{gitHubUser}</span>
                      </a>
                    </li>
                  )
                
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper>
          <p>Comunidades: ({comunidades.length})</p>

          <ul>
            {comunidades.map((comunidadeAtual) => {
                return(
                  <li key={comunidadeAtual.id}>
                    <a href={`/users/${comunidadeAtual.title}`}>
                      <img src={comunidadeAtual.image} />
                      <span>{comunidadeAtual.title}</span>
                    </a>
                  </li>
                )
            })}
          </ul>

        </ProfileRelationsBoxWrapper>

        
      </div>

    </MainGrid>
    </>
  )
}
