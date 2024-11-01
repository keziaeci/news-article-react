import { data } from 'autoprefixer'
import React, { useEffect ,useState} from 'react'
import { Link , useLocation, useParams } from 'react-router-dom'
import { Container, Flex, Text, Skeleton,Box,Card, Avatar } from '@radix-ui/themes'

export const BeritaList = () => {
    const [datas, setDatas] = useState([])
    const [res, setRes] = useState([])
    const [load, setLoad] = useState(false)
    const { name,path } = useParams()

    useEffect(() => {
        const getDatas = async () => {
            setLoad(true)

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/${name}/${path}`)
                // const res = await fetch(`https://api-berita-indonesia.vercel.app/cnbc/terbaru`)
                const {data} = await res.json()

                // console.log(res)
                setRes(res)
                setDatas(data)
                console.log(data)
            } catch (error) {
                console.log(error)
                throw error
            } finally {
                setLoad(false)
            }
        }

        getDatas()
    },[name,path])

    return (
        <div className='min-w-full flex flex-col'>
            <div className='flex flex-col items-center'>
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
                ) : ( datas == null ? (
                        <h1>Opps</h1>
                        ) : (
                        <>
                            <h1 className='font-semibold'>{datas?.title}</h1>
                            <h1 className='text-lg text-gray-300'>{datas?.description}</h1>
                            <Link to={`${datas?.link}`}>
                                <Flex gap="2">  
                                    <Avatar
                                        src={`${datas?.image}`}
                                    />
                                </Flex>
                            </Link>
    
                            <div className='flex flex-col items-start w-full m-5 gap-3'>
                                {datas?.posts?.map((post, index) => {
                                        const date = new Date(post.pubDate);
                                        const formattedDate = date.toLocaleString("en-US", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                        });
    
                                        return (
                                            <Link key={index} to={post?.link}>
                                                <Flex  gap="3">
                                                    <Avatar size="5" radius='none' src={`${post?.thumbnail}`} />
                                                    <div className='text-start'>
                                                        <h1 className='text-sm text-gray-200'>{formattedDate}</h1>
                                                        <h1 className='text-lg'>{post.title}</h1>
                                                        <h1 className='text-base font-thin text-gray-300'>{post.description}</h1>
                                                    </div>
                                                </Flex>
                                            </Link>
                                        );
                                    })}
                            </div>
                        </>
                        )
                )}
            </div>
        </div>
    )
}
