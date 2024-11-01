import React, { useEffect ,useState} from 'react'

export const Home = () => {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const getBerita = async () => {
            setLoad(true)
            try {
                const res = await fetch(`https://api-berita-indonesia.vercel.app/`)
                // console.log(res.json())
                const data = await res.json()
                // const {data} = await res.json()
                setData(data.endpoints)
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
            <h1>Loding</h1>
        ) : (
            <div>
                {data.map((data) => 
                    <div key={index}>
                        <h1></h1>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}
