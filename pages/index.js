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


export default function Home() {
  
  const gitHubUser = 'Hibrael01'
  const [comunidades, setComunidades] = React.useState(['Alurakut']);

  /*const comunidades = [
      'Alurakut'
  ]*/

  const pessoasFavoritas = ['rafaballerini', 'omariosouto', 'juunegreiros', 'felipefialho', 'gustavoguanabara', 'marcobrunodev']
  
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

            id: new Date().toISOString;

            const dataForm = new FormData(e.target);
            console.log(dataForm.get('title'))

            if(dataForm.get('title') == ''){
              alert('Insira um nome para a comunidade')
            }else{
              const novasComunidades = [...comunidades, dataForm.get('title')]
              setComunidades(novasComunidades)
            }  
            

          }}>

            <div>
              <input placeholder="Qual vai ser o nome da sua comunidade?"
              name="title"
              aria-label="Qual vai ser o nome da sua comunidade?">
              </input>
              
            </div>
            <button>Criar comunidade</button>
            
          </form>
        </Box>

      </div> 

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
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
                    <a href={`/users/${comunidadeAtual}`}>
                      <img src={`https://yt3.ggpht.com/ytc/AKedOLRszi3O39AB5-uw_1jkrxJppwegjToBgIKFIOqiiA=s900-c-k-c0x00ffffff-no-rj`} />
                      <span>{comunidadeAtual}</span>
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
