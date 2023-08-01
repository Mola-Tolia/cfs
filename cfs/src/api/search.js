import request from "../request";

//通过标题搜索文章
export const searchByTitle = (title,num) => request.post('/search/byTitle',{title,num})

//通过id获取文章
export const searchArticleById = (id) => request.post('/search/getArticleById',{id})

//文章id获取评论
export const getComments = (article_id) => request.post('search/getComments',{article_id})

//评论消息id删除评论消息
export const deleteCommentInfo = (id) => request.delete('/search/deleteCommentInfo',{data:{id}})

//认可消息id删除认可消息
export const deleteGiveInfo = (id) => request.delete('/search/deleteGiveInfo',{data:{id}})

//获取最新5篇文章
export const getNewestArticle = () => request.get('/search/getNewestArticle')

//获取最新5篇文章
export const getHotestArticle = () => request.get('/search/getHotestArticle')

//增加文章的访问量
export const increaseArticlesVisitedNum = (id) => request.post('/search/increaseArticlesVisitedNum',{id})

//获取用户主页信息
export const getUserInfo = (id) => request.post('/search/getUserInfo',{id})
