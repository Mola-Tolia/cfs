import request from "../request";

//获取用户基本信息
export const getUserInfo = () => request.get('/user/getInfo')

//修改用户信息
export const updateUserInfo = (key,value) => request.post('/user/updateUserInfo',{key,value})

//文章的发布与暂存
export const publishArticle = (data,isPublish) => request.post('/user/publishArticle',{data,isPublish})

//获取用户所有文章
export const getAllArticle = () => request.get('/user/getAllArticle')

//通过id获取文章
export const getArticleById = (id) => request.post('/user/getArticleById',{id})

//通过id修改文章
export const updateArticle = (data) => request.patch('/user/updateArticle',{data})

//通过id删除文章
export const deleteArticle = (id) => request.delete('/user/deleteArticle',{data:{id}})

//获取点赞数组
export const getApproved = () => request.get('/user/getApproved')

//获取收藏数组
export const getCollection = () => request.get('/user/getCollection')

//获取记录文章数组
export const getRecordingArticle = (num) => request.post('/user/getRecordingArticle',{num})

//点赞文章
export const approveArticle = (array,article_id,value) => request.post('/user/approveArticle',{array,article_id,value})

//收藏文章
export const collectArticle = (array,article_id,value) => request.post('/user/collectArticle',{array,article_id,value})

//点赞或收藏消息
export const give = (article_userId) => request.post('/user/give',{article_userId})

//发布评论
export const sendComment = (article_id,content,article_userId) => request.post('/user/sendComment',{article_id,content,article_userId})

//获取评论消息
export const getCommentInfo = () => request.get('/user/getCommentInfo')

//获取认可消息
export const getAACInfo = () => request.get('/user/getAACInfo')

//获取用户收藏文章
export const getCollectionArticle = () => request.get('/user/getCollectionArticle')

//删除记录
export const deleteRecording = (array) => request.post('/user/deleteRecording',{array})

//添加记录
export const addRecording = (id) => request.post('/user/addRecording',{id})

//上传图片
export const uploadImage = (formData) => request.post('/user/uploadImage',formData,{headers:{'Content-Type':'multipart/form-data'}})

//获取头像图片
export const getImage = () => request.get('/user/getImage')