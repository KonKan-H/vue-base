import request from '@/utils/request'

export default{
	getHtlb(data) {
		return request({
			url: '/zshtdj/selectPage',
			method: 'get',
			params: { currentPage: data.currentPage, pageSize: data.pageSize },
	})},
	insertHtlb(data) {
		return request({
			url: '/zshtdj/insert',
			method: 'post',
			data,
		})
	},
	getysxmbyndsx(data){
			return request({
				url: '/ysxm/getysxmbyndsx',
				method: 'get',
				params: { year: data.year,ndsx:data.ndsx},
			})},
	saveysxm(data){
		return request({
			url: '/ysxm/saveysxm',
			method: 'post',
			params: { formdata: data.formdata,tabledata:data.tabledata},
		})},
			// let formdata = new FormData();
			// formdata.append('formdata',data)
			// return request({
			// 	url: '/ysxm/saveysxm',
			// 	method: 'post',
			// },formdata)},		
	ysxmsearch(data) {
		return request({
			url: '/ysxm/ysxmsearch',
			method: 'get',
			params: { year:data.year,zrdw:data.zrdw,xmmc:data.xmmc,ndsx:data.ndsx},
		})},

	
	getysxmmc(){
		return request({
				url: '/bqgl/getysxmmc',
				method: 'get',
			})
	},
	getysxmbyid(data){
		return request({
				url: '/ysxm/getysxmbyid',
				method: 'get',
				params: { id:data.id,year:data.year },
			})
	},
	getndsx(){
		return request({
				url: '/ysxm/getndsx',
				method: 'get',
			})
	},
	delxmbyid(data){
		return request({
				url: '/ysxm/delxmbyid',
				method: 'get',
				params: { selectdata:data},
			})
	},
	
	getysqkbyid(id){
		return request({
				url: '/bqgl/getysqkbyid',
				method: 'get',
				params: { id: id},
			})
	},
	getbqtree(year){
		return request({
				url: '/bqgl/getbqtree',
				method: 'get',
				params: { year:year},
			})
	},
	getxmofbq(data){
		return request({
				url: '/bqgl/getxmofbq',
				method: 'get',
				params: { ysdw: data.ysdw,xmmc:data.xmmc,kndsx:data.kndsx,checked:data.checked,nf:data.nf},
			})
	},
	getzrcs(data){
		return request({
				url: '/bqgl/getzrcs',
				method: 'get',
			})
	},
	getxmlb(data){
		return request({
				url: '/ysxm/getxmlb',
				method: 'get',
			})
	},
	getxmbysearch(data){
		return request({
				url: '/bqgl/getxmbysearch',
				method: 'get',
				params: { ysdw:data.ysdw,zrcs:data.zrcs,xmlb:data.xmlb,xmmc:data.xmmc,checked:data.checked,nf:data.nf},
			})
	},
	savebqtoxm(data){
		return request({
				url: '/bqgl/savebqtoxm',
				method: 'post',
				params: { data:data},
			})
	},
	xmtobqsearch(data){
		return request({
				url: '/bqgl/xmtobqsearch',
				method: 'get',
				params: { ysdw:data.ysdw,xmmc:data.xmmc,kndsx:data.kndsx,checked:data.checked},
			})
	},
	getxzqh(){
		return request({
				url: '/bqgl/getxzqh',
				method: 'get',
				
			})
	},
	getxmbybqid(data){
		return request({
				url: '/bqgl/getxmbybqid',
				method: 'get',
				params: { bqid:data.bqid,year:data.year,bqlx:data.bqlx},
			})
	},
	
	getbqbyxmid(data){
		return request({
				url: '/bqgl/getbqbyxmid',
				method: 'get',
				params: {xmid:data.xmid,year:data.year,bqlx:data.bqlx}
			})
	},
	getxmzt(){
		return request({
				url: '/bqgl/getxmzt',
				method: 'get',
			})
	},
	gettrzms(){
		return request({
				url: '/bqgl/gettrzms',
				method: 'get',
			})
	},
	
	
	
	getxzqh(){
		return request({
				url: '/ysxm/getxzqh',
				method: 'get',
			})
	},
	whhx(){
		return request({
				url: '/ysxm/whhx',
				method: 'get',
			})
	},
	gettrzms(){
		return request({
				url: '/ysxm/gettrzms',
				method: 'get',
			})
	},
	getxmzt(){
		return request({
				url: '/ysxm/getxmzt',
				method: 'get',
			})
	},
	getzrcs(){
		return request({
				url: '/ysxm/getzrcs',
				method: 'get',
			})
	},
	getysdw(year){
		return request({
				url: '/ysxm/getysdw',
				method: 'get',
				params: {year:year},
			})
	},
	getAllzb(year){
		return request({
				url: '/zbgl/getAllzb',
				method: 'get',
				params: {year:year},
			})
	},
	zbdwhx(){
		return request({
				url: '/zbgl/zbdwhx',
				method: 'get',
			})
	},
	searchzb(data){
		return request({
				url: '/zbgl/searchzb',
				method: 'get',
				params: { xmid: data.xmid, dwid:data.dwid,xmmc:data.xmmc,zbid:data.zbid,wh:data.wh,year:data.year,checked:data.checked},
			})
	},
	getzbdetailbyzbid(data){
		return request({
				url: '/zbgl/getzbdetailbyzbid',
				method: 'get',
				params: {zbid:data.zbid,year:data.year},
			})
	},
	savexmtozb(data){
		return request({
				url: '/zbgl/savexmtozb',
				method: 'post',
				params: {data:data},
			})
	},
	getzbbyxm(data){
		return request({
				url: '/zbgl/getzbbyxm',
				method: 'get',
				params: {xmid:data.xmid,year:data.year},
			})
	},
	
	delxmtozb(zbid){
		return request({
				url: '/zbgl/delxmtozb',
				method: 'get',
				params: {zbid:zbid},
			})
	},
	getxmbyzbid(data){
		return request({
				url: '/zbgl/getxmbyzbid',
				method: 'get',
				params: {zbid:data.zbid,year:data.year},
			})
	},
	delbqtoxm(data){
		return request({
				url: '/bqgl/delbqtoxm',
				method: 'get',
				params: {xmid:data.xmid,year:data.year},
			})
	},
	getxmdetail(data){
		return request({
				url: '/bqgl/getxmdetail',
				method: 'get',
				params: {year:data.year,xmid:data.xmid},
			})
	},
	
	getxmtree(year){
		return request({
				url: '/zbgl/getxmtree',
				method: 'get',
				params: {year:year},
			})
	},
	getbqxx(data){
		return request({
				url: '/ywwh/getbqxx',
				method: 'get',
				params: {year:data.year,bqid:data.bqid},
			})
	},
	
	updatebqxx(data){
		return request({
				url: '/ywwh/updatebqxx',
				method: 'get',
				params: {data:data},
			})
	},
	delbqbyid(data){
		return request({
				url: '/ywwh/delbqbyid',
				method: 'get',
				params: {id:data.id,year:data.year},
			})
	},
	getzbtree(year){
		return request({
				url: '/zbgl/getzbtree',
				method: 'get',
				params: {year:year},
			})
	},
	addzb(data){
		return request({
			url: '/zbgl/addzb',
			method: 'get',
			params: {dwid:data.dwid,xmmc:data.xmmc,zbid:data.zbid,wh:data.wh,year:data.year,checked:data.checked},
		})
	},
		
}



