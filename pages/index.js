import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons.js'
import ProfileRelationsBoxWrapper from '../src/components/ProfileRelations'

const gitHubUsuer = 'Hibrael01'

function ProfileSideBar(propriedades) {
  return(
    <Box>
        <img src={`https://github.com/${propriedades.gitHubUsuer}.png`} />
    </Box>
  )
  
}


export default function Home() {
  
  const gitHubUsuer = 'Hibrael01'
  const pessoasFavoritas = ['rafaballerini', 'omariosouto', 'juunegreiros', 'felipefialho', 'gustavoguanabara', 'marcobrunodev']
  
  return (

    <>
    <AlurakutMenu githubUser={gitHubUsuer}/>
    <MainGrid>

      {/* <Box style={{gridArea: 'profileArea'}}> */}    
      <div className="profileArea"  style={{gridArea: 'profileArea'}}>
        <ProfileSideBar gitHubUsuer={gitHubUsuer}/>
      </div>

      <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
        <Box>
          <h1 className="title">Bem Vindo (a)</h1>
          <OrkutNostalgicIconSet/>
        </Box>
      </div> 

      <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
          Pessoas Favoritas Dev: ({pessoasFavoritas.length})

          <ul>
            {pessoasFavoritas.map((gitHubUsuer) => {
                return(
                  <li>
                    <a href={`/users/${gitHubUsuer}`} key={gitHubUsuer}>
                      <img src={`https://github.com/${gitHubUsuer}.png`} />
                      <span>{gitHubUsuer}</span>
                    </a>
                  </li>
                )
            })}
          </ul>
        </ProfileRelationsBoxWrapper>

        <Box>
          Comunidade
        </Box>
      </div>

    </MainGrid>
    </>
  )
}
