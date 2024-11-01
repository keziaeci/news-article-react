import React, { useEffect ,useState} from 'react'
import { Link , useLocation, useParams } from 'react-router-dom'
import { Container, Flex, Text, Skeleton,Box,Card, Avatar } from '@radix-ui/themes'

export const Home = () => {
    const [data, setData] = useState([])
    const [endpoints, setEndpoints] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const getBerita = async () => {
            setLoad(true)
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}`)
                // console.log(res.json())
                const data = await res.json()
                // const {data} = await res.json()
                setEndpoints(data.endpoints)
                // setData(data.endpoints)
                // console.log({data})
                console.log(data)
            } catch (error) {
                throw error
            } finally {
                setLoad(false)
            }
        }

        getBerita()
    },[])
  return (
    <div>
        {load ? (
            <Container size="8">
                <Flex direction="column" gap="3">
                    <Text>
                        <Skeleton>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                            felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
                            erat, fringilla sed commodo sed, aliquet nec magna.
                        </Skeleton>
                    </Text>

                    <Skeleton>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                            felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
                            erat, fringilla sed commodo sed, aliquet nec magna.
                        </Text>
                    </Skeleton>
                </Flex>
            </Container>
        ) : (
            <div className='flex min-w-full flex-col items-start'>
                {endpoints.map((datas,index) =>
                    // console.log(datas) 
                    <div key={index} className=' flex flex-col items-start gap-3'>
                        <h1 className='font-semibold text-2xl'>{datas.name}</h1>
                        <div className='flex flex-wrap gap-4'>
                        {datas.paths.map((path,index) => 
                            <Link key={index} to={`/${datas.name}/${path.name}`}>
                                <Box maxWidth="240px">
                                    <Card>
                                        <Flex gap="3" align="center">
                                            <Box>
                                                {/* <Text as="div" size="2" weight="bold">
                                                    {path.name}
                                                </Text> */}
                                                <Text as="div" size="2" color="gray">
                                                    {path.name}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Card>
                                </Box>
                            </Link>
                        )}
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}
