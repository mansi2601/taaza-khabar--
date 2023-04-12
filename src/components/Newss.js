import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const Newss = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResuts, setTotalResults] = useState(0)
  //document.title=`${this.capitalizeFirstLetter(props.category)} -Taaza Khabar`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=78a55bef397d4a2aa9a2fcf4a8fa1d5c&category=${props.category}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResuts)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  
  }, [])

  /*handlePreviousClick =async()=>{
    
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=567e3a3b0f554c2691c1a60fe9bee3d4&page=${this.state.page-1}&pagesize=${props.pageSize}`;
    
    this.setState({loading:true});
    let data= await fetch(url);
    let parsedData= await data.json()
    console.log(parsedData);
    
    this.setState({
      page:this.state.page -1,
      articles: parsedData.articles,
      loading:false
    })
  }*/
  /*handleNextClick=async()=>{
    if(!(this.state.page+1 > Math.ceil(this.state.totalResuts/props.pageSize ))){
  
    let url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=567e3a3b0f554c2691c1a60fe9bee3d4&page=${this.state.page+1}&pagesize=${props.pageSize}`;
    this.setState({loading:true});  
    let data= await fetch(url);
      let parsedData= await data.json()
      
      this.setState({
        page:this.state.page +1 ,
        articles: parsedData.articles,
        loading:false
    })
  }}*/
  const fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&apiKey=78a55bef397d4a2aa9a2fcf4a8fa1d5c&category=${props.category}&pageSize=${props.pageSize}&page=${page + 1}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResuts)
    setLoading(false)

  };



  return (
    <div className='container my-3'>
      <h2 className='text-center ' >Top Headlines from {capitalizeFirstLetter(props.category)}</h2>
      {/*{this.state.loading&& <Spinner></Spinner>}*/}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResuts}
        loader={<Spinner />}>


        <div className='row my-4'>
          {articles.map((element) => {

            return < div className='col-md-4 my-3 ' key={element.url}>

              <Newsitem title={element.title ? element.title.slice(0, 45) : ""}
                description={element.description ? element.description.slice(0, 80) : ""} imgurl={element.urlToImage} url={element.url}
                author={!element.author ? "Unknown" : element.author} date={element.publishedAt} source={element.source.name}>
              </Newsitem>
            </div>
          })}</div></InfiniteScroll>
      <div className='container d-flex justify-content-between'>


      </div>



    </div>







  )
}

Newss.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general"
}
Newss.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number
}
export default Newss
