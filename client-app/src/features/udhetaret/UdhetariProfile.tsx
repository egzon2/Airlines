import { observer } from 'mobx-react-lite';
import { Container, Grid, Header, Table, Icon, Message } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import UdhetariNavBar from './UdhetariNavBar';

export default observer( function UdhetariProfile () {
  const {udhetariStore: {udhetari}} = useStore();
  
    return (
      <>
      <Message
        attached="bottom"
        content="INFORMATA rreth sherbimeve--Perdoreni Id e gjeneruar nga aplikacioni per te kryer sherbime
        (ex. rezervimi i biletes) e cila ndodhet ne tabelen e meposhtme!"
        icon="info circle"
        color="black"
        warning
        style={{ width:"100%",marginTop:"0%",marginBottom:"-1%" }}
      />

      <Grid divided='vertically'>
        <Grid.Row columns={2}>
        <Grid.Column width='6' >
          <UdhetariNavBar />
        </Grid.Column>
        <Grid.Column>
          <Grid divided='vertically' style={{marginTop:"2em"}}>

            <Grid.Row columns={2} style={{marginBottom:"2em"}}>
              <Grid.Column width='5'>
    
              </Grid.Column>
              <div style={{backgroundColor:"#919995",width:"670px",padding:"10px",textAlign:"center",color:"white"}}>
                <Grid.Column style={{fontSize:"x-large"}} textAlign='center'>
                    <Container style={{textAlign:"center"}}>Username: {udhetari?.displayName} </Container>
                </Grid.Column>
              </div>
              
            </Grid.Row>

            <Grid.Row columns={1} >
              <Table celled >
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell style={{textTransform:"uppercase"}}><Icon style={{marginRight:"2em"}} className='id badge outline icon'/>Te dhena personale</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h4' image>
                          <Header.Content>
                            Email
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{udhetari?.email}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h4' image>
                          <Header.Content>
                            Emri
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{udhetari?.emri}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h4' image>
                          <Header.Content>
                            Mbiemri
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{udhetari?.mbiemri}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h4' image>
                          <Header.Content>
                            Data e lindjes
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{udhetari?.birthday}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>
                        <Header as='h4' image>
                          <Header.Content>
                            Id
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{udhetari?.id}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
            </Grid.Row>
          </Grid>
        </Grid.Column>
        </Grid.Row>
    </Grid>
    </>
    )
}
)